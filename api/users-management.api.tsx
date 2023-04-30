import axios from "axios";
import { fileServerApi} from "./constants";

export const uploadPhoto = async (body: any) => {
    const log = await axios.post(`${fileServerApi}admin-file-manager/upload`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(({data}) => {
            return data
        })
    return log
}

