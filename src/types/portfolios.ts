import PhotoType from "./photo";
import UserType from "./user";

interface PortfolioType {
    _id:string;
    description:string;
    name:string;
    url:string;
    photo:PhotoType  |null;
    user:UserType | null;
}

export default PortfolioType;