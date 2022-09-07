import React, {useState} from 'react';
import {Card} from "primereact/card";
import {searchCommissionInstrumentType} from "../../api/useCommission";
import {Button} from "primereact/button";
import {InputSwitch} from "primereact/inputswitch";
import {InputText} from "primereact/inputtext";
import {useDispatch} from "react-redux";
import {searchResult} from "../../store/commissionConfig";
import {Dropdown} from "primereact/dropdown";

export default function SearchSection() {
    const [val1, setVal1] = useState<string>('');
    const [val2, setVal2] = useState<string>('');
    const [val3, setVal3] = useState<string>('');
    const [val4, setVal4] = useState<string>('');
    const [val5, setVal5] = useState<string>('');
    const [val6, setVal6] = useState<string>('');
    const [val7, setVal7] = useState<string>();
    const [val8, setVal8] = useState<{name:string,code:any}>({name:'',code:null});

    const dispatch=useDispatch()

    const cities = [
        { name: 'حذف شده', code: 'true' },
        { name: 'حذف نشده', code: 'false' },
        { name: 'تمام', code: null },
    ];

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await searchCommissionInstrumentType({
            CommissionInstrumentTypeId: val1,
            BourseTitle: val2,
            InstrumentTypeTitle: val3,
            InstrumentTypeDescription: val4,
            SectorTitle: val5,
            SubSectorTitle: val6,
            // CommissionInstrumentTypeDescription:val7,
            Deleted: val8.code,
        }).then(res=>dispatch(searchResult(res?.result)))
    }

    return (
        <Card className={'mb-3'}>
            <div className="card">
                <form className="p-fluid grid" onSubmit={onSubmit}>
                    <div className="p-float-label col-12 md:col-4 mt-4 md:mt-0">
                        <InputText id="basic" value={val1} onChange={(e) => setVal1(e.target.value)}/>
                        <label htmlFor="basic">آیدی ابزار مالی</label>
                    </div>

                    <div className="p-float-label col-12 md:col-4  mt-4 md:mt-0">
                        <InputText id="ssn" value={val2} onChange={(e) => setVal2(e.target.value)}/>
                        <label htmlFor="ssn">عنوان بورس</label>
                    </div>

                    <div className="p-float-label col-12 md:col-4  mt-4 md:mt-0">
                        <InputText id="date" value={val3} onChange={(e) => setVal3(e.target.value)}/>
                        <label htmlFor="date">عنوان نوع ابزار مالی</label>
                    </div>

                    <div className="p-float-label col-12 md:col-4 mt-4">
                        <InputText id="phone" value={val4} onChange={(e) => setVal4(e.target.value)}/>
                        <label htmlFor="phone">توضیحات نوع ابزار مالی</label>
                    </div>

                    <div className="p-float-label col-12 md:col-4 mt-4">
                        <InputText id="phoneext" value={val5} onChange={(e) => setVal5(e.target.value)}/>
                        <label htmlFor="phoneext">گروه صنعت</label>
                    </div>
                    <div className="p-float-label col-12 md:col-4 mt-4">
                        <InputText id="serial" value={val6} onChange={(e) => setVal6(e.target.value)}/>
                        <label htmlFor="serial">زیرگروه صنعت</label>
                    </div>
                    <div className="p-float-label col-12 md:col-4 mt-4">
                        <InputText id="serial" value={val7} onChange={(e) => setVal7(e.target.value)} disabled/>
                        <label htmlFor="serial">CommissionInstrumentTypeDescription</label>
                    </div>
                    <div className="flex flex-column col-12 md:col-4">
                        <div className={'mt-auto'}>حذف شده؟</div>
                        <Dropdown value={val8} options={cities} onChange={(e)=>setVal8(e.target.value)} optionLabel="name" />
                    </div>
                    <div className={'flex flex-grow-1'}>
                        <Button className={'mt-auto w-fit mr-auto'} type={'submit'}>
                            جستجو
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
