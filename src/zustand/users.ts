import { create } from "zustand";
import request from "../server/request";
import { BASE, LIMIT } from "../components/cosnt";
import dayjs from "dayjs";
import PhotoType from "../types/photo";
import { FormInstance} from "antd";
import UserType from "../types/user";

interface UserStateType{
  users:UserType[];
  total:number;
  page:number;
  change:boolean;
  loading:boolean;
  isOpen:boolean;
  btnLoading:boolean;
  selected:string|null;
  photo:PhotoType | null|string;
  checkPhoto:boolean;
  search:string;
  handleSearch:(e:React.ChangeEvent<HTMLInputElement>) => void;
  getUsers:() => void;
  getPage:(page:number) => void;
  switchChange:(e:boolean | undefined) => void;
  deleteUser:(id:string) => void;
  editUser:(form:FormInstance,  id:string) => void;
  handlePhoto:(e:React.ChangeEvent<HTMLInputElement>) => void;
  submit:(form:FormInstance) => void;
  deletePhoto:(id:string) => void;
  deleteUserPhoto:(id:string) => void;
  controlModal:() => void;
  showModal:(form:FormInstance) => void;
}

const useUsers = create<UserStateType>(
      (set, get) => ({
        users: [],
        clients: [],
        total: 0,
        page: 1,
        change: false,
        loading: false,
        isOpen: false,
        btnLoading: false,
        selected: null,
        photo: null,
        search: "",
        checkPhoto: false,    
        handleSearch: (e) => {
          const { getUsers } = get();
          set({ search: e.target.value });
          getUsers();
        },
        getUsers: async () => {
          try {
            const { page, change, search } = get();
            const params = { page, search, limit: LIMIT };
            set({ loading: true });
            const {
              data: { data, pagination },
            } = await request(`users?role=${change ? "client" : "user"}`, { params });
            console.log(data);
            set({ users: data, total: pagination.total });
            // set({clients:data.filter((client)=> client.role.includes("client") ), total:pagination.total})
          } finally {
            set({ loading: false });
          }
        },
      
        getPage: (page) => {
          const { getUsers } = get();
          set({ page });
          getUsers();
        },
        switchChange: (e) => {
          const { getUsers } = get();
          set({ change: e });
          getUsers();
        },
        deleteUser: async (id) => {
          const { getUsers } = get();
          await request.delete(`users/${id}`);
          getUsers();
        },
        submit: async (form) => {
          try {
            const { getUsers, selected, photo } = get();
            set({ btnLoading: true });
            const values = await form.validateFields();
            const fields = values.fields.split(",");
            const data = { ...values, photo , fields };
            if (selected === null) {
              await request.post("users", data);
            } else {
              await request.put(`users/${selected}`, data);
            }
            getUsers();
            set({isOpen:false})
          } finally {
            set({ btnLoading: false });
          }
        },
        editUser: async (form, id) => {
          set({ selected: id,  isOpen: true });
          const { data } = await request.get(`users/${id}`);
          form.setFieldsValue(data);
          try {
            await request(`${BASE}upload/${data?.photo}`);
            set({ checkPhoto: true });
          } catch {
            set({ checkPhoto: false });
          }
          set({ photo: data?.photo , selected:id }); 
          form.setFieldsValue({
            ...data,
            birthday: dayjs(data.birthday),
            fields: data.fields.toString(),
          });
        },
        handlePhoto: async (e) => {
            try {
              const formData = new FormData();
              const file = e.target.files?.[0]
              if(file){
                formData.append("file", file);
                set({ btnLoading: true });
                const { data } = await request.post("upload", formData);
                set({
                  photo: `${data._id}.${data.name.split(".")[1]}`,
                  checkPhoto: true,
                });
              }
            } finally {
              set({ btnLoading: false });
            }
        },
        deletePhoto: async (id) => {
          try {
            set({ btnLoading: true });
            await request.delete(`upload/${id}`);
            set({ photo: null });
          } finally {
            set({ btnLoading: false });
          }
        },
        deleteUserPhoto: async (id) => {
          try {
            set({ btnLoading: true });
            await request.delete(`auth/upload/${id}`);
            set({ photo: null });
          } finally {
            set({ btnLoading: false });
          }
        },
        controlModal: () => {
          set({ isOpen: false });
        },
        showModal: (form) => {
          set({ isOpen: true, selected: null, photo: null});
          form.resetFields();
        },
      })
);

export default useUsers;
