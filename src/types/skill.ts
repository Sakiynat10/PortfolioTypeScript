import UserType from "./user";

interface SkillType {
    name:string;
    percent:number;
    user:UserType | null
}

export default SkillType;