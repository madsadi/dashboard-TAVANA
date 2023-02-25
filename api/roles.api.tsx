import axios from "axios";
import {USERS} from "./constants";

export const getRoles = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==null && body[`${item}`]!==undefined && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const users = await axios.get(`${USERS}/roles/search?${bodyToQuery.join('&')}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return users;
}
export const getRolePermission = async (id:string) => {
    const users = await axios.get(`${USERS}/roles/get-role-permission?id=${id}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return users;
}
export const changeRoleStatus = async (mode:string,id:string) => {
    const users = await axios.post(`${USERS}/roles/${mode}?id=${id}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return users;
}
export const createNewRole = async (body:string) => {
    const users = await axios.post(`${USERS}/roles/create`,body,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return users;
}
export const updateRole = async (body:string) => {
    const users = await axios.post(`${USERS}/roles/update`,body,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return users;
}
export const servicePermissions = async () => {
    const users = await axios.get(`${USERS}/service-permossion/get-all-service-permission`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return users;
}
export const addOrRemovePermissionToRole = async (mode:string,body:any) => {
    const users = await axios.post(`${USERS}/roles/${mode}-permission-to-role`,body,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return users;
}
