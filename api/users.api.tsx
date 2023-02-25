import axios from "axios";
import {USERS} from "./constants";

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
