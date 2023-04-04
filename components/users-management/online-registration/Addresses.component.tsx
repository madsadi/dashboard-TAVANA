import LabelValue from "../../common/components/LabelValue";
import AccordionComponent from "../../common/components/AccordionComponent";
import {useContext} from "react";
import {
    OnlineRegDetailContext
} from "../../../pages/users-management/online-registration/[...detail]";

export default function AddressesComponent(){
    const {data} = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.addresses

    return(
        <>
            {profile?.length ? <AccordionComponent title={'اطلاعات ارتباطی'}>
                <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                    {
                        profile?.map((item: any, index: number) => {
                            return (
                                <>
                                    <LabelValue key={index} title={'ایمیل'} value={item?.email}/>
                                    <LabelValue key={index} title={'شماره همراه'} value={item?.mobile}/>
                                    <LabelValue key={index} title={'شماره ثابت'} value={item?.tel}/>
                                    <LabelValue key={index} title={'شماره تماس اضطراری'}
                                                value={item?.emergencyTelCityPrefix + '-' + item?.emergencyTel}/>
                                    <LabelValue key={index} title={'کد پستی'} value={item?.postalCode}/>
                                    <LabelValue key={index} title={'آدرس'}
                                                value={item?.country.name + ' ' + item?.city?.name + ' ' + item?.section?.name + ' ' + item?.remnantAddress + ' ' + item?.alley + ' ' + item?.plaque}/>
                                </>
                            )
                        })
                    }
                </div>
            </AccordionComponent>:null}
        </>

    )
}