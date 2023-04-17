import LabelValue from "../../../common/components/LabelValue";
import {LegalPersonShareholderViewModelEnums} from "../enums";
import {useContext} from "react";
import {
    OnlineRegDetailContext
} from "../../../../pages/online-registration/registration-report/[...detail]";
import DaisyAccordionComponent from "../../../common/components/DaisyAccordion.component";

export default function LegalPersonShareholdersComponent(){
    const {data} = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.legalPersonShareholders

    return(
        <>
            {profile?.length ? <DaisyAccordionComponent title={'اطلاعات اعضای هیت مدیره'}>
                {
                    profile?.map((item: any) => {
                        return (
                            <div className="grid md:grid-cols-4 grid-cols-2  gap-3" key={item?.uniqueIdentifier}>
                                <LabelValue title={'نام'} value={item?.firstName}/>
                                <LabelValue title={'نام خانوادگی'} value={item?.lastName}/>
                                <LabelValue title={'کد ملی'}
                                            value={item?.uniqueIdentifier}/>
                                <LabelValue title={'کد پستی'} value={item?.postalCode}/>
                                <LabelValue title={'نشانی کامل'} value={item?.address}/>
                                <LabelValue title={'سمت'}
                                            value={LegalPersonShareholderViewModelEnums.find((item: any) => item?.id === item?.positionType)?.title}/>
                                <LabelValue title={'درصد سهامداری'} value={`% ${item?.percentageVotingRight}`}/>
                            </div>
                        )
                    })
                }
            </DaisyAccordionComponent>:null}
        </>
    )
}