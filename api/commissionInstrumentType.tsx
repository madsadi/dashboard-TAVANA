import axios from "axios";
import {COMMISSION_BASE_URL} from "./constants";

export const getCommission = async (id: string) => {
    const create = await axios.get(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Get?CommissionInstrumentTypeId=${id}`,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return create
}
export const addNewCommission = async (body: {
    bourseCode: string,
    instrumentTypeCode: string,
    sectorCode: string,
    subSectorCode: string
}) => {
    const newCommission = await axios.post(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Add`,
        body,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return newCommission
}
export const deleteCommission = async (body: { id: number }) => {
    const deleteComm = await axios.put(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Delete`,
        body,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return deleteComm
}
export const updateCommission = async (body: {
    id: number,
    sectorCode: string,
    subSectorCode: string
}) => {
    const updateComm = await axios.put(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Update`,
        body,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return updateComm
}
export const commissionSearch = async (api:string,body: any) => {
    let bodyToQuery = body.map((item:any)=> {
            if (Object.values(item)[0]) {
                return `&${Object.keys(item)[0]}=${Object.values(item)[0]}`
            }
        }).join('')

    const search = await axios.get(`${COMMISSION_BASE_URL}${api}${bodyToQuery}`,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return search
}
