import React, {useState} from "react";

export default function AddNew(){
    const [modal,setModal] = useState(false)
    return(
        <>
            <button className="button bg-orange-500" onClick={(e)=> {
                setModal(true);
            }}>قانون جدید</button>
        </>
    )
}