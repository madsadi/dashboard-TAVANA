import axios from "axios";
import {MARKET_RULES_MANAGEMENT} from "./constants";

export const filedList = async () => {
    const create = await axios.get(`${MARKET_RULES_MANAGEMENT}/GetFieldsList`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return create
}
