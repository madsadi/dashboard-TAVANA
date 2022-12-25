import {useState} from "react";

type initialType = {instrumentGroupIdentification:string,orderSide:any,InstrumentId:string ,orderOrigin:string,orderTechnicalOrigin:string}
const initialValue = {
    InstrumentId:'',
    orderTechnicalOrigin:'',
    orderOrigin:'',
    orderSide:undefined,
    instrumentGroupIdentification:'',

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