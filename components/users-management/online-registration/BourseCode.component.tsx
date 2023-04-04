import React, {useContext} from 'react';
import LabelValue from "../../common/components/LabelValue";
import AccordionComponent from "../../common/components/AccordionComponent";
import {tradingCodeTypeEnums} from "./enums";
import {
    OnlineRegDetailContext
} from "../../../pages/users-management/online-registration/[...detail]";

export default function BourseCodeComponent(){
    const {data} = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.tradingCodes

    return(
        <>
            {profile?.length ? <AccordionComponent title={'کد های بورسی'}>
                <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                    {
                        profile?.map((item: any) => {
                            return (
                                <>
                                    <LabelValue title={'کد'} value={item?.code}/>
                                    <LabelValue title={'نوع کد بورسی'}
                                                value={tradingCodeTypeEnums.find((i: any) => i.id === item?.type)?.title}/>
                                </>
                            )
                        })
                    }
                </div>
            </AccordionComponent>:null}
        </>

    )
}