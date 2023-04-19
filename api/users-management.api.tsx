import axios from "axios";
import {BOOKBUILDING_BASE_URL, fileServerApi, USERS} from "./constants";

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

export const getContent = async (userId:string) => {
    const log = await axios.get(`${fileServerApi}admin-file-manager/get-content?fileOwnerSoftware=1&userId=${userId}`)
        .then(({data}) => {
            return data
        })
    return log
}
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
export const lockFile = async (body: any) => {
    const log = await axios.post(`${fileServerApi}admin-file-manager/lock-file`, body)
        .then(({data}) => {
            return data
        })
    return log
}
export const unlockFile = async (body: any) => {
    const log = await axios.post(`${fileServerApi}admin-file-manager/unlock-file`, body)
        .then(({data}) => {
            return data
        })
    return log
}

export const downloadContent = async (id: string) => {
    const log = await axios.get(`${fileServerApi}file-manager/download?id=${id}`, {
        headers: {
            'content-disposition': 'attachment',
            'content-type': 'image/png'
        }
    })
        .then(({data}) => {
            return data
        })
    return log
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

export const pushToTbs = async (body:any) => {
    const users = await axios.post(`${BOOKBUILDING_BASE_URL}/PushToTbs`,body,
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
export const sendMessageToUncompletedUsers = async (registrationDateTime:any) => {
    const users = await axios.get(`${BOOKBUILDING_BASE_URL}/SendMessageToUncompletedUsers?registrationDateTime=${registrationDateTime}`,
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

export const checkUserSejamState = async (userId:string) => {
    const users = await axios.get(`${BOOKBUILDING_BASE_URL}/checkUserSejamState?userId=${userId}`,
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

export const updateAccount = async (body:any) => {
    const users = await axios.put(`${USERS}/account`,body,
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
export const twoFactor = async (enable:any) => {
    const users = await axios.put(`${USERS}/account/2fa?enabled=${enable}`)
        .then(({data}) => {
            return data
        })
    return users;
}

