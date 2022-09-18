import React, {useRef, useState} from 'react';
import {getBookBuilding} from "../../api/bookBuilding";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {Dropdown} from "primereact/dropdown";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Toast} from "primereact/toast";
import {bookBuildingResult} from "../../store/bookBuildingConfig";

export default function SearchSection() {
    const [val1, setVal1] = useState<{ name: string, code: any }>({name: 'همه', code: 'GetAll'});


    const toast: any = useRef(null);

    const dispatch = useDispatch()

    const options = [
        {name: 'فعال', code: 'GetAllActive'},
        {name: 'همه', code: 'GetAll'},
    ];

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await getBookBuilding(`${val1.code}`).then(res => {
            dispatch(bookBuildingResult(res?.result));
            toast.current?.show({
                severity: 'success',
                summary: 'با موفقیت انجام شد',
                detail: 'نتایج جستجو لیست شد',
                life: 6000
            });
        })
            .catch(err => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'مشکلی رخ داده',
                    detail: `${err?.response?.data.error?.message}`,
                    life: 6000
                });
            })
    }

    return (
        <>
            <Toast ref={toast} position="top-center"/>
            <Accordion className="accordion-custom " activeIndex={0}>
                <AccordionTab
                    header={<React.Fragment><i className="pi pi-search mx-1"/><span>جستجو</span></React.Fragment>}>
                    <form className="p-fluid grid" onSubmit={onSubmit}>
                        <div className="flex flex-column col-12 md:col-4">
                            <div className={'mt-auto'}>دسته بندی</div>
                            <Dropdown value={val1} options={options} onChange={(e) => setVal1(e.target.value)}
                                      optionLabel="name"/>
                        </div>
                        <div className={'flex flex-grow-1 mt-3'}>
                            <Button className={'mt-auto w-fit mr-auto'} type={'submit'}>
                                جستجو
                            </Button>
                        </div>
                    </form>
                </AccordionTab>
            </Accordion>
        </>
    );
}
