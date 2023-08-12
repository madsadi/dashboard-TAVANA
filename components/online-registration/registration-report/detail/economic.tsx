import React, { useContext } from "react";
import LabelValue from "../../../common/components/label-value";
import { formatDecimals } from "../../../common/functions/common-funcions";
import {
    tradingKnowledgeLevelEnums,
    transactionLevelLegalPersonEnums,
    transactionLevelPrivatePersonEnums
} from "../enums";
import {
    OnlineRegDetailContext
} from "../../../../pages/online-registration/registration-report/[...detail]";
import DaisyAccordionComponent from "../../../common/components/daisy-accordion";

export default function EconomicComponent() {
    const { data } = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.financialInfo

    return (
        <>
            {profile ?
                <DaisyAccordionComponent title={'اطلاعات مالی'}>
                    <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                        <LabelValue title={'ارزش دارایی'} value={profile?.assetsValue ? formatDecimals(profile?.assetsValue) : ''} />
                        <LabelValue title={'متوسط درآمد ماهیانه'}
                            value={profile?.inComingAverage ? formatDecimals(profile?.inComingAverage) : ''} />
                        <LabelValue title={'مبلغ معاملات بورسهای اوراق بهادار و فرابورس'}
                            value={profile?.sExchangeTransaction ? formatDecimals(profile?.sExchangeTransaction) : ''} />
                        <LabelValue title={'مبلغ معاملات بورسهای کالایی'}
                            value={profile?.cExchangeTransaction ? formatDecimals(profile?.cExchangeTransaction) : ''} />
                        <LabelValue title={'مبلغ معاملات بورسهای خارج از کشور (یورو)'}
                            value={profile?.outExchangeTransaction ? formatDecimals(profile?.outExchangeTransaction) : ''} />
                        <LabelValue title={'پیش بینی سطح ارزش ریالی معاملات'}
                            value={profile?.legalPerson ? transactionLevelLegalPersonEnums.find((item: { id: string, title: string }) => item.id === profile?.transactionLevel)?.title : transactionLevelPrivatePersonEnums.find((item: { id: string, title: string }) => item.id === profile?.transactionLevel)?.title} />
                        <LabelValue title={' میزان آشنایی با مفاهیم مالی'}
                            value={tradingKnowledgeLevelEnums.find((item: { id: string, title: string }) => item.id === profile?.tradingKnowledgeLevel)?.title} />
                        <LabelValue title={'هدف از سرمایه گذاری در بورس کالای ایران'}
                            value={profile?.companyPurpose} />
                        <LabelValue title={'نام مرجع رتبه بندی کننده'}
                            value={profile?.referenceRateCompany} />
                        <LabelValue title={'تاریخ رتبه بندی'} value={profile?.rateDate} />
                        <LabelValue title={'رتبه اخذ شده'} value={profile?.rate} />
                        <div>
                            <LabelValue title={'کارگزاری ها'} value={null} />
                            {
                                (profile?.financialBrokers)?.map((item: any) => {
                                    return <LabelValue key={item.broker?.id} title={''} value={item?.broker?.title} />
                                })
                            }
                        </div>
                    </div>
                </DaisyAccordionComponent> : null
            }
        </>
    )
}