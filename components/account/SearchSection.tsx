
import React, { useState} from 'react';
import { InputMask } from 'primereact/inputmask';
import {Card} from "primereact/card";

export default function SearchSection (){
    const [val1, setVal1] = useState<string>();
    const [val2, setVal2] = useState<string>();
    const [val3, setVal3] = useState<string>();
    const [val4, setVal4] = useState<string>();
    const [val5, setVal5] = useState<string>();
    const [val6, setVal6] = useState<string>();

    return (
        <Card>
            <div className="card">
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="basic">Basic</label>
                        <InputMask id="basic" mask="99-999999" value={val1} placeholder="99-999999" onChange={(e) => setVal1(e.value)}></InputMask>
                    </div>

                    <div className="field col-12 md:col-4">
                        <label htmlFor="ssn">SSN</label>
                        <InputMask id="ssn" mask="999-99-9999" value={val2} placeholder="999-99-9999" onChange={(e) => setVal2(e.value)}></InputMask>
                    </div>

                    <div className="field col-12 md:col-4">
                        <label htmlFor="date">Date</label>
                        <InputMask id="date" mask="99/99/9999" value={val3} placeholder="99/99/9999" slotChar="mm/dd/yyyy" onChange={(e) => setVal3(e.value)}></InputMask>
                    </div>

                    <div className="field col-12 md:col-4">
                        <label htmlFor="phone">Phone</label>
                        <InputMask id="phone" mask="(999) 999-9999" value={val4} placeholder="(999) 999-9999" onChange={(e) => setVal4(e.value)}></InputMask>
                    </div>

                    <div className="field col-12 md:col-4">
                        <label htmlFor="phoneext">Phone Ext</label>
                        <InputMask id="phoneext" mask="(999) 999-9999? x99999" value={val5} placeholder="(999) 999-9999? x99999" onChange={(e) => setVal5(e.value)}></InputMask>
                    </div>

                    <div className="field col-12 md:col-4">
                        <label htmlFor="serial">Serial</label>
                        <InputMask id="serial" mask="a*-999-a999" value={val6} placeholder="a*-999-a999" onChange={(e) => setVal6(e.value)}></InputMask>
                    </div>
                </div>
            </div>
        </Card>
    );
}
