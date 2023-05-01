import axios from "axios";
import {FILE_SERVER} from "./constants";

export const uploadPhoto = async (body: any) => {
    const log = await axios.post(`${FILE_SERVER}admin-file-manager/upload`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(({data}) => {
            return data
        })
    return log
}

