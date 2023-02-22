import axios from "axios";
import {COMMISSION_BASE_URL} from "./constants";

export const getCommission = async (body: any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==undefined && body[`${item}`]!==null && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const create = await axios.get(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Get?${bodyToQuery.join('&')}`,
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
export const addNewCommission = async (body: any) => {
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
export const commissionSearch = async (body: any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==undefined && body[`${item}`]!==null && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const search = await axios.get(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Search?${bodyToQuery.join('&')}`,
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

export const commissionCategorySearch = async (body: any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==undefined && body[`${item}`]!==null && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const search = await axios.get(`${COMMISSION_BASE_URL}/CommissionCategory/Search?${bodyToQuery.join('&')}`,
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
