import axios from "axios";

export const fetcher = async (url:string) => {
    const resp = await axios.get(`${url}`,{
        headers:{
            "access-control-allow-origin": "https://cluster.tech1a.co"
        }
    })
        .then((res:any) => res.data);
    return resp;
};

