import React, {useContext} from 'react';
import LabelValue from "../../../common/components/LabelValue";
import {tradingCodeTypeEnums} from "../enums";
import {
    OnlineRegDetailContext
} from "../../../../pages/online-registration/registration-report/[...detail]";
import DaisyAccordionComponent from "../../../common/components/DaisyAccordion.component";

export default function BourseCodeComponent(){
    const {data} = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.tradingCodes

    return(
        <>
            {profile?.length ? <DaisyAccordionComponent title={'کد های بورسی'}>
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
            </DaisyAccordionComponent>:null}
        </>

    )
}