import {useState} from "react";

type initialType = { userName: string, firstName: string, lastName: string, phoneNumber: string, roleId: string, userId:string, nationalId:string}
const initialValue = {
    userName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    roleId: '',
    userId:'',
    nationalId:''
}

export default function useSearchUserForm(initial: initialType = initialValue) {
    //creat a state object for our inputs
    const [inputs, setInputs] = useState(initial)

    function handleChange(e: any) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    function reset() {
        setInputs(initialValue);
    }

    return {
        inputs,
        handleChange,
        reset
    }
}