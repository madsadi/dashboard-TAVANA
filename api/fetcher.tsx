import axios from "axios";

export const fetcher = async ({url, params}:{url:string,params:any}) => {
    console.log(url,params)
    const resp = await axios.get(`${url}`,{
        params:params,
        headers:{
            "access-control-allow-origin": "https://cluster.tech1a.co"
        }
    })
        .then((res:any) => res.data);
    return resp;
};

