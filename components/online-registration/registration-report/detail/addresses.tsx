import LabelValue from "../../../common/components/label-value";
import { useContext } from "react";
import {
    OnlineRegDetailContext
} from "../../../../pages/online-registration/registration-report/[...detail]";
import DaisyAccordionComponent from "../../../common/components/daisy-accordion";

export default function AddressesComponent() {
    const { data } = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.addresses

    return (
        <>
            {profile?.length ? <DaisyAccordionComponent title={'اطلاعات ارتباطی'}>
                <div className={'space-y-5'}>
                    {
                        profile?.map((item: any, index: number) => {
                            let address = [item?.country?.name, item?.province?.name, item?.city?.name, item?.section?.name, item?.remnantAddress, item?.alley, item?.plaque]

                            return (
                                <div className="grid md:grid-cols-4 grid-cols-2 gap-3" key={item?.postalCode + item?.tel + index}>
                                    <LabelValue key={index} title={'ایمیل'} value={item?.email} />
                                    <LabelValue key={index} title={'شماره همراه'} value={item?.mobile} />
                                    <LabelValue key={index} title={'شماره ثابت'} value={item?.tel} />
                                    <LabelValue key={index} title={'شماره تماس اضطراری'}
                                        value={item?.emergencyTel ? ((item?.emergencyTelCityPrefix ? (item?.emergencyTelCityPrefix + '-') : '') + item?.emergencyTel) : null} />
                                    <LabelValue key={index} title={'کد پستی'} value={item?.postalCode} />
                                    <LabelValue key={index} title={'آدرس'}
                                        value={address.map((item: string) => item || '').join(', ')} />
                                </div>
                            )
                        })
                    }
                </div>
            </DaisyAccordionComponent> : null}
        </>

    )
}