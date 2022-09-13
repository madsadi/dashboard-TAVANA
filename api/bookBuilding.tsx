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
export const addBookBuilding = async (body: { maxQuantity: any; instrumentId: any; minPrice: any; maxPrice: any; fromActiveDateTime: any; toActiveDateTime: any }) => {
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
export const deleteBookBuilding = async (body: { id: number }) => {
    const deleteBookBuilding = await axios.put(`${BOOKBUILDING_BASE_URL}/CommissionInstrumentType/Delete`,
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
    return deleteBookBuilding
}
export const updateBookBuilding = async (body: {
    id: number,
    sectorCode: string,
    subSectorCode: string
}) => {
    const updateBookBuilding = await axios.put(`${BOOKBUILDING_BASE_URL}/CommissionInstrumentType/Update`,
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
