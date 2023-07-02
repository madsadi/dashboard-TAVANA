import axios from "axios";

export const fetcher = async (url:string) => {
    console.log(url)
    const resp = await axios.get(`${url}`)
        .then((res:any) => res.data);
    return resp;
};

