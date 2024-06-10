import { Button, Input, Modal, Pagination, Table , Form, Flex, DatePicker } from "antd";
import { Fragment , useState } from "react";
import { LIMIT } from "../../../components/cosnt";
import { useCreateEducationMutation, useDeleteEducationMutation, useGetEducationMutation, useGetEducationsQuery, useUpdateEducationMutation } from "../../../redux/query/education";
import dayjs from "dayjs";
import PaginationType from "../../../types/pagination";
import EducationType from "../../../types/education";
import { useAppSelector } from "../../../redux/hooks";
import UserType from "../../../types/user";
import { RootState } from "../../../redux/store";


const {RangePicker} = DatePicker;



const EducationPage = () => {
  const {user} : {user:UserType} = useAppSelector((state:RootState) => state.auth)

  const [page , setPage] = useState<number>(1)
  const {data , isFetching , refetch} = useGetEducationsQuery( user?.role === "client" ? {user: user?._id, page} : {page}) as { data: {data:EducationType[]; pagination:PaginationType};  isFetching:boolean; refetch:() => void}
  const [deleteEducation] = useDeleteEducationMutation();
  const [createEducation] = useCreateEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [getEducation] = useGetEducationMutation();
  const education = data?.data || [];
  const total = data?.pagination?.total || 0;
  const [selected , setSelected] = useState<string | null>(null)
  const [isOpen , setIsOpen] = useState(false)
  const [btnLoading , setBtnLoading] = useState(false)

  const [form] = Form.useForm()

  const getPage = (page:number) => {
    setPage(page);
    refetch();
  }


  const showModal = () => {
    setIsOpen(true)
    form.resetFields()
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const submit = async () => {
    try{
      setBtnLoading(true)
      const values = await form.validateFields();
      values.startDate = values.interval[0]
      values.endDate = values.interval[1]
      delete values.interval
      if(selected === null) {
        await createEducation(values)
      }else{
        // await request.put(`education/${selected}` , education)
        await updateEducation({id:selected , data:values})
        console.log(selected);
      }
      setIsOpen(false)
    }finally{
      setBtnLoading(false)
    }
  }


  const editEducation = async (id:string) => {
    try{
      setSelected(id)
      setIsOpen(true)
      setBtnLoading(true)
      const {data} = await getEducation(id) as {data:EducationType}
      form.setFieldsValue({...data , interval: [dayjs(data?.startDate) , dayjs(data?.endDate)]})
    }finally{
      setBtnLoading(false)
    }
  }

  // const deleteEducation = async(id) => {
  //   try{
  //     setBtnLoading(true)
  //     await request.delete(`education/${id}`)
  //   }finally{
  //     setBtnLoading(false)
  //   }
  // }

  const handleSearch =(e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }


  const columns = [
    {
      title:'Name',
      col:3,
      dataIndex:"name",
      key:"name"
    },
    {
      title:'Level',
      col:3,

      dataIndex:"level",
      key:"level"
    },
    {
      title:'Description',
      col:3,

      dataIndex:"description",
      key:"description"
    },
    {
      title:'Start Date',
      col:3,

      dataIndex:"startDate",
      key:"startDate",
      render: (text:string) => {
         return text.split("T")[0]
      }
    },
    {
      title:'End Date',
      col:3,

      dataIndex:"endDate",
      key:"endData",
      render: (text:string) => {
        console.log(text.split("T")[0]);
        return text.split("T")[0]
     }
    },
    {
      title:'Action' ,
      dataIndex:'_id',
      col:3,
      key:'_id',
      render:(_id:string) => (
        <Flex>
          <Button type="primary" style={{marginRight:'16px'}} onClick={()=> editEducation(_id)} >Edit</Button>
          <Button type="primary"  onClick={() => deleteEducation( _id )} >Delete</Button>
        </Flex>
      )
    }
  ]
  return (<Fragment>
    <Input placeholder="Searching experiences ..." type="text" onChange={handleSearch} />
    <Table pagination={false} title={() => <Flex justify='space-between' align='center'><h1>Education {total}</h1> <Button type='dashed' onClick={showModal}> {selected === null ? "Add ": "Save"} </Button></Flex>} loading={isFetching} columns={columns} dataSource={education} />
    <Pagination total={total} showSizeChanger={false} pageSize={LIMIT}  onChange={getPage}/>
    <Modal title="Experiences data" open={isOpen} onOk={submit} okText={selected === null ?  "Add"  : "Save"} onCancel={closeModal} confirmLoading={btnLoading}>
      <Form
        form={form}
        name="education"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Level"
          name="level"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Range"
          name="interval"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <RangePicker/>
        </Form.Item>
      </Form>
    </Modal>
  </Fragment >
  )
}

export default EducationPage