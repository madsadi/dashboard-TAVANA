import {useState} from "react";

type initialType = { MarketTitle: string, OfferTypeTitle: string, SettlementDelayTitle: string, SideTitle: string, CustomerTypeTitle: string, CustomerCounterSideTitle: string,SubSectorTitle:string,SectorTitle:string,InstrumentTypeTitle:string,BourseTitle:string,CommissionDetailId:string,rangeDate:any,Deleted:any }
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
    Deleted:null
}

export default function useForm(initial: initialType = initialValue) {
    //creat a state object for our inputs
    const [inputs, setInputs] = useState(initial)

    function handleChange(e: any) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    function reset(e: any) {
        setInputs({
            ...inputs,
            [e.target.name]: initial
        });
    }

    return {
        inputs,
        handleChange,
        reset
    }
}