import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {searchUser} from "../../../api/users-management.api";
import AccordionComponent from "../../../components/common/components/AccordionComponent";
import LabelValue from "../../../components/common/components/LabelValue";
import {jalali} from "../../../components/common/functions/common-funcions";
import {accountTypeEnums} from "../../../dictionary/Enums";
import Image from 'next/image';

export default function Detail() {
    const [metaData, setMetaData] = useState<any>([])
    const [data, setData] = useState<any>(null)
    const router = useRouter()
    let dep = router.query?.detail?.[0]
    const onSubmit = async (e: any, query: any) => {
        e?.preventDefault()
        await searchUser(query)
            .then((res: any) => {
                setMetaData(JSON.parse(res?.result?.pagedData[0]?.metaData));
                setData(JSON.parse(res?.result?.pagedData[0].sejamProfile));
            })
            .catch(() => {
                setMetaData([])
            })
    };

    console.log(metaData)
    useEffect(() => {
        if (dep) {
            const queryData = dep.split('&')
            let _query: any = {};

            _query['userId'] = queryData[0].split('=')[1];
            _query['StartDate'] = queryData[1].split('=')[1];
            _query['EndDate'] = queryData[2].split('=')[1];
            onSubmit(null, _query)
        }
    }, [dep])
    return (
        <div className={'w-full'}>
            {data ? <AccordionComponent title={'اطلاعات هویتی'}>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
                    <LabelValue title={'نام'} value={data?.privatePerson?.firstName}/>
                    <LabelValue title={'نام خانوادگی'} value={data?.privatePerson?.lastName}/>
                    <LabelValue title={'تاریخ تولد'} value={jalali(data?.privatePerson?.birthDate).date}/>
                    <LabelValue title={'نام پدر'} value={data?.privatePerson?.fatherName}/>
                    <LabelValue title={'محل تولد'} value={data?.privatePerson?.placeOfBirth}/>
                    <LabelValue title={'صادره از'} value={data?.privatePerson?.placeOfIssue}/>
                    <LabelValue title={'سریال شناسنامه'}
                                value={`${data?.privatePerson?.serial + `/` + data?.privatePerson?.seriShChar + data?.privatePerson?.seriSh}`}/>
                    <LabelValue title={'شماره شناسنامه'} value={data?.privatePerson?.shNumber}/>
                </div>
            </AccordionComponent> : null}
            <AccordionComponent title={'اطلاعات بانکی'}>
                {metaData?.Account?.map((item: any) => {
                    return (
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-3" key={item?.AccountNumber}>
                            <div>
                                <Image src={`/bankIcons/${item?.branchName}.svg`} height={24}
                                       width={24} alt={item?.branchName}/>
                            </div>
                            <LabelValue title={'شماره حساب'} value={item?.AccountNumber}/>
                            <LabelValue title={'نام بانک'} value={item?.bank?.Name}/>
                            <LabelValue title={'نام شعبه'} value={item?.BranchName}/>
                            <LabelValue title={'نام شعبه'} value={item?.branchCity?.Name}/>
                            <LabelValue title={'شماره شعبه'} value={item?.Sheba}/>
                            <LabelValue title={'نوع حساب'}
                                        value={accountTypeEnums.find((i: any) => i.enTitle === item?.Type)?.faTitle}/>
                        </div>
                    )
                })}
            </AccordionComponent>
        </div>
    )
}