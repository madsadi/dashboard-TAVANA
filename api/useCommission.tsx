import axios from "axios";
import {COMMISSION_BASE_URL} from "./constants";

export const getCommission = async (id:string) => {
    const create = await axios.get(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Get?CommissionInstrumentTypeId=${id}`,
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
export const searchCommissionInstrumentType = async (body:any) => {
    const search = await axios.get(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Search?
    ${body.CommissionInstrumentTypeId ? `&CommissionInstrumentTypeId=${body.CommissionInstrumentTypeId}`:''}
    ${body.BourseTitle ? `&InstrumentTypeTitle=${body.BourseTitle}`:''}
    ${body.InstrumentTypeTitle ? `&InstrumentTypeTitle=${body.InstrumentTypeTitle}`:''}
    ${body.InstrumentTypeDescription ? `&InstrumentTypeDescription=${body.InstrumentTypeDescription}`:''}
    ${body.SectorTitle ? `&SectorTitle=${body.SectorTitle}`:''}
    ${body.SubSectorTitle ? `&SubSectorTitle=${body.SubSectorTitle}`:''}
    ${body.CommissionInstrumentTypeDescription ? `&CommissionInstrumentTypeDescription=${body.CommissionInstrumentTypeDescription}`:''}
    ${body.Deleted ? `&Deleted=${body.Deleted}`:''}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return search
}
