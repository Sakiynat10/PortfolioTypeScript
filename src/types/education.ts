import UserType from "./user";

interface EducationType{
    description:string;
    endDate:string;
    startDate:string;
    level:string;
    name:string
    user:UserType | null;
}

export default EducationType