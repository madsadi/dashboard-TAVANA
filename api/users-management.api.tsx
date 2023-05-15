import axios from "axios";
import {ADMIN_GATEWAY, FILE_SERVER} from "./constants";

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

export const getLink = async (body: any) => {
    const log = await axios.get(`${ADMIN_GATEWAY}/request/marketer/GetReferalLink?marketerId=${body.marketerId}`)
        .then(({data}) => {
            return data
        })
    return log
}

