import UserType from "./user"

interface ExperienceType {
    workName:string
    companyName:string
    description:string
    startDate:string
    endDate:string
    user:UserType | null
}

export default ExperienceType