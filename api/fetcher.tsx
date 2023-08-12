import axios from "axios";

export const fetcher = async ({ url, params }: { url: string, params: any }) => {
    const resp = await axios.get(`${url}`, { params: params })
        .then((res: any) => res.data);
    return resp;
};

