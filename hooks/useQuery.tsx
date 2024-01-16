import { useState, useEffect } from "react";
import axios from "axios";
import { throwToast } from "../utils/notification";
import { QueryType } from "types/types";
import { lowerFirstLetter } from "utils/common-funcions";

const useQuery = ({
  url = "",
  params = {},
  revalidateOnMount = false,
  notifResults = false,
}) => {
  const [data, setData] = useState<any>(null);
  const error = "";
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<QueryType>({});

  const fetchData = async (
    query: QueryType = {},
    onSuccess?: () => void,
    onFail?: () => void
  ) => {
    const params = new URLSearchParams();
    if (query) {
      Object.keys(query).map((item: string) => {
        if (
          query[item] !== null &&
          query[item] !== undefined &&
          query[item] !== "" &&
          !Array.isArray(query[item])
        ) {
          params.append(lowerFirstLetter(item), query[item]);
        } else if (Array.isArray(query[item])) {
          query[item].forEach((value: any) =>
            params.append(lowerFirstLetter(item), value)
          );
        }
      });
    }

    setLoading(true);
    await axios
      .get(url, { params: params })
      .then((res) => {
        if (onSuccess) onSuccess();
        setData(res.data);
        setQuery(query);
        if (notifResults) {
          throwToast({
            type: "info",
            value: `${
              res?.data?.result?.pagedData
                ? res?.data?.result?.totalCount
                : res?.data?.result.length
            } نتیجه لیست شد `,
          });
        }
      })
      .catch((err) => {
        if (onFail) onFail();
        throwToast({ type: "error", value: err });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchAsyncData = async (query: QueryType = {}, endpoint = "") => {
    const params = new URLSearchParams();
    if (query) {
      Object.keys(query).map((item: string) => {
        if (
          query[item] !== null &&
          query[item] !== undefined &&
          query[item] !== "" &&
          !Array.isArray(query[item])
        ) {
          params.append(lowerFirstLetter(item), query[item]);
        } else if (Array.isArray(query[item])) {
          query[item].forEach((value: any) =>
            params.append(lowerFirstLetter(item), value)
          );
        }
      });
    }
    setQuery(query);
    return axios.get(url || endpoint, { params: params });
  };

  useEffect(() => {
    if (revalidateOnMount) fetchData(params);
  }, []);

  return { data, error, loading, query, fetchData, fetchAsyncData };
};

export default useQuery;
