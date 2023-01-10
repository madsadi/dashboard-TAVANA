import {useState} from "react";

type initialType = { MarketTitle: string, OfferTypeTitle: string, SettlementDelayTitle: string, SideTitle: string, CustomerTypeTitle: string, CustomerCounterSideTitle: string,SubSectorTitle:string,SectorTitle:string,InstrumentTypeTitle:string,BourseTitle:string,CommissionDetailId:string,rangeDate:any,Deleted:any,instrumentGroupIdentification:string,orderSide:any,instrumentId:string,InstrumentTypeDescription:string,CommissionInstrumentTypeId:number}
const initialValue = {
    MarketTitle: '',
    OfferTypeTitle: '',
    SettlementDelayTitle: '',
    SideTitle: '',
    CustomerTypeTitle: '',
    CustomerCounterSideTitle: '',
    SubSectorTitle:'',
    SectorTitle:'',
    InstrumentTypeTitle:'',
    BourseTitle:'',
    rangeDate:null,
    CommissionDetailId:'',
    Deleted:null,
    instrumentGroupIdentification:'',
    orderSide:undefined,
    instrumentId:'',
    InstrumentTypeDescription:'',
    CommissionInstrumentTypeId:-1
}

export default function useFormCommission(initial: initialType = initialValue) {
    //creat a state object for our inputs
    const [inputs, setInputs] = useState(initial)

    function handleChange(key:string,value:any) {
        setInputs({
            ...inputs,
            [key]: value
        });
    }

    function reset(e: any) {
        setInputs(initial);
    }

    return {
        inputs,
        handleChange,
        reset
    }
}