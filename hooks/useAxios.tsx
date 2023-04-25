import { useState, useEffect } from 'react';
import axios from 'axios';


const useQuery = ({ url='', params = null,revalidateOnMount=false }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        axios.get(url, {params:params})
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (revalidateOnMount) fetchData();
    }, [ url , params]);

    return { data, error, loading, fetchData };
};

export default useQuery;