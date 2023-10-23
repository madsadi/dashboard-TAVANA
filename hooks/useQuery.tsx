import { useState, useEffect } from 'react';
import axios from 'axios';
import { throwToast } from "../components/common/functions/notification";


const useQuery = ({ url = '', params = {}, revalidateOnMount = false, notifResults = false }) => {
    const [data, setData] = useState<any>(null);
    const error = '';
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(null);

    const fetchData = async (query: any = {}) => {
        const params = new URLSearchParams();
        if (query) {
            Object.keys(query).map((item: any) => {
                if (query[item] !== null && query[item] !== undefined && query[item] !== '' && !Array.isArray(query[item])) {
                    params.append(item, query[item])
                } else if (Array.isArray(query[item])) {
                    query[item].forEach((value: any) => params.append(item, value));
                }
            })
        }

        setLoading(true)
        await axios.get(url, { params: params })
            .then((res) => {
                setData(res.data);
                if (notifResults) {
                    throwToast({ type: 'info', value: `${res?.data?.result?.pagedData ? res?.data?.result?.totalCount : res?.data?.result.length} نتیجه لیست شد ` })
                }
            })
            .catch((err) => {
                throwToast({ type: 'error', value: err })
            })
            .finally(() => {
                setQuery(query)
                setLoading(false);
            });
    };
    const fetchAsyncData = async (query: any = {}, endpoint = '') => {
        const params = new URLSearchParams();
        if (query) {
            Object.keys(query).map((item: any) => {
                if (query[item] !== null && query[item] !== undefined && query[item] !== '' && !Array.isArray(query[item])) {
                    params.append(item, query[item])
                } else if (Array.isArray(query[item])) {
                    query[item].forEach((value: any) => params.append(item, value));
                }
            })
        }
        return axios.get(url || endpoint, { params: params })
    };

    useEffect(() => {
        if (revalidateOnMount) fetchData(params);
    }, []);

    return { data, error, loading, query, fetchData, fetchAsyncData };
};

export default useQuery;