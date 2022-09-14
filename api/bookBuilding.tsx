import axios from "axios";
import {BOOKBUILDING_BASE_URL} from "./constants";

export const getBookBuilding = async (api: string) => {
    const create = await axios.get(`${BOOKBUILDING_BASE_URL}/${api}`,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return create
}
export const addBookBuilding = async (
    body: {
        maxQuantity: any;
        instrumentId: string;
        minPrice: any;
        maxPrice: any;
        fromActiveDateTime: any;
        toActiveDateTime: any;}) => {
    const newBookBuilding = await axios.post(`${BOOKBUILDING_BASE_URL}/addBookBuilding`,
        body,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return newBookBuilding
}
export const deleteBookBuilding = async ( id: any ) => {
    const deleteBookBuilding = await axios.delete(`${BOOKBUILDING_BASE_URL}/DeleteBookBuilding?InstrumentId=${id}`,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return deleteBookBuilding
}
export const updateBookBuilding = async (body: {
    maxQuantity: any;
    instrumentId: string;
    minPrice: any;
    maxPrice: any;
    fromActiveDateTime: any;
    toActiveDateTime: any;
}) => {
    const updateBookBuilding = await axios.put(`${BOOKBUILDING_BASE_URL}/EditBookBuilding`,
        body,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return updateBookBuilding
}
