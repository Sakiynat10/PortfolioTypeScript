import RoleType from "./role";

interface UserType {
    _id:string;
    role:RoleType;
    client:boolean;
    firstName:string;
    lastName:string;
    username:string;
    fields?: string[];
    createdAt?:string;
    photo?:string | undefined;
    address?:string;
    birthday?:string;
    phoneNumber?:string;
    info?:string;
    github?:string;
    instagram?:string;
    telegram?:string;
    email?:string;
    youtube?:string;
    facebook?:string
}

export default UserType