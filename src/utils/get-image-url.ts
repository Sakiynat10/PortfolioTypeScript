import { BASE } from "../components/cosnt";
import PhotoType from "../types/photo";

const getImageURL = (photo:PhotoType) => {
    return photo ? `${BASE}upload/${photo?._id}.${photo?.name.split('.')[1]}` : undefined
}

export default getImageURL;