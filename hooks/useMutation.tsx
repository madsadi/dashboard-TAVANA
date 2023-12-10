import axios from "axios";
import { lowerFirstLetter } from "utils/common-funcions";
import { throwToast } from "utils/notification";

interface mutationProps {
  url: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  onSuccess?: () => void;
  setLoading?: (state: boolean) => void;
  onError?: () => void;
}

const useMutation = ({
  url = "",
  method = "POST",
  onSuccess = () => null,
  setLoading = (state: boolean) => null,
  onError = () => null,
}: mutationProps) => {
  const mutate = async (body: any = {}, params = {}, headers = {}) => {
    const purifyObject = (input: any) => {
      let bodyToQuery: any = {};
      Object.keys(input).map((item: any) => {
        if (
          input[item] !== null &&
          input[item] !== undefined &&
          input[item] !== ""
        ) {
          bodyToQuery[lowerFirstLetter(item)] = input[item];
        }
      });
      return bodyToQuery;
    };
    if (onSuccess) {
      setLoading(true);
      await axios({
        url: url,
        method: method,
        headers: headers,
        data: purifyObject(body),
        params: purifyObject(params),
      })
        .then(onSuccess)
        .catch((err) => {
          onError();
          throwToast({ type: "error", value: err });
        })
        .finally(() => setLoading(false));
    } else {
      return axios({
        url: url,
        method: method,
        headers: headers,
        data: purifyObject(body),
        params: purifyObject(params),
      });
    }
  };

  return { mutate };
};

export default useMutation;
