import axios from "axios";

export const fetcher = async (url: string) => {
    const resp = await axios.get(`${url}`)
        .then((res: any) => res.data);
    return resp;
};

