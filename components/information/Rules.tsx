import {Card} from "primereact/card";
import React from "react";
import {Button} from "primereact/button";

export default function Rules() {

    const submitHandler = async () => {
        // await activation('/Trade/cleared-trade')
        //     .then(res => console.log(res?.result))
    }

    return (
        <Card>
            <div className={'field'}>
                <label htmlFor="username1" className="block mb-3">دریافت ضرایب کارکزد</label>
                <Button onClick={submitHandler} className="col-3 p-button-outlined" label="بروزرسانی"/>
            </div>
        </Card>
    )
}