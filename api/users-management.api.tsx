import axios from "axios";
import {BOOKBUILDING_BASE_URL, USERS} from "./constants";

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
    let bodyToQuery:any={};
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==null && body[`${item}`]!==undefined){
            bodyToQuery[item]=body[item]
        }else{
            bodyToQuery[item]=''
        }
    })
    const users = await axios.post(`${USERS}/roles/${mode}-permission-${mode==='remove' ? 'from':'to'}-role`,bodyToQuery,
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

export const getUsers = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==null && body[`${item}`]!==undefined && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const users = await axios.get(`${USERS}/users/SearchUserAccount?${bodyToQuery.join('&')}`,
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
export const createUsers = async (body:any) => {
    const users = await axios.post(`${USERS}/users/create`,
        body,
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
export const updateUsers = async (body:any) => {
    const users = await axios.post(`${USERS}/users/update`,
        body,
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
export const changeUserPassword = async (body:any) => {
    const users = await axios.post(`${USERS}/users/change-user-password`,
        body,
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
export const changeUserActiveStatus = async (body:any) => {
    const users = await axios.post(`${USERS}/users/change-user-active-status`,
        body,
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
export const changeLockOut = async (body:any) => {
    const users = await axios.post(`${USERS}/users/set-lockout-end-date`,
        body,
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
export const addUserRole = async (body:any) => {
    const users = await axios.post(`${USERS}/users/add-user-to-role`,
        body,
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
export const removeUserRole = async (body:any) => {
    const users = await axios.post(`${USERS}/users/remove-user-from-role`,
        body,
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
export const getUserRoles = async (UserId:string) => {
    const users = await axios.get(`${USERS}/users/get-user-roles?UserId=${UserId}`,
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
export const getActiveRoles = async () => {
    const users = await axios.get(`${USERS}/roles/search?IsActive=true`,
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

export const getUsersLogs = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const users = await axios.get(`${USERS}/users/SearchUserActivityLogs?${bodyToQuery.join('&')}`,
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

export const searchUser = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==null && body[`${item}`]!==undefined && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const users = await axios.get(`${BOOKBUILDING_BASE_URL}/SearchUser?${bodyToQuery.join('&')}`,
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

export const editRegState = async (body:any) => {
    const users = await axios.post(`${BOOKBUILDING_BASE_URL}/EditRegistrationState`,body,
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

