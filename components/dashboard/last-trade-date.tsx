import { lazy, useEffect, useState } from "react";
import { jalali } from "../common/functions/common-funcions";
import useMutation from "../../hooks/useMutation";
import { NETFLOW } from "../../api/constants";
import useQuery from "../../hooks/useQuery";
const AnimatedNumbers = lazy(() => import('react-animated-numbers'))

export default function LastTradeDate() {
    const { mutate: sellCount } = useMutation({ url: `${NETFLOW}/Trade/sell-declaration-count` })
    const { mutate: buyCount } = useMutation({ url: `${NETFLOW}/Trade/buy-declaration-count` })
    const { fetchAsyncData } = useQuery({ url: `${NETFLOW}/Report/last-trade-date` })
    const [date, setDate] = useState<any>({ 0: '', 1: '' })
    const [counts, setCounts] = useState<any>({ buyCount: '', sellCount: '' })

    const count = async (date: string, index: number) => {
        let _counts = counts
        if (index > 1) {
            sellCount({ date: date })
                .then(res => {
                    _counts['sellCount'] = res?.data
                    setCounts({ ...counts, ..._counts })
                })
        } else {
            buyCount({ date: date })
                .then(res => {
                    _counts['buyCount'] = res?.data
                    setCounts({ ...counts, ..._counts })
                })
        }
    }

    useEffect(() => {
        const fetchLastTradeDate = async (index: number) => {
            let _date: any = date
            await fetchAsyncData({ Side: index })
                .then(res => {
                    _date[index] = res?.data
                    setDate({ ...date, ..._date })
                    count((jalali(res?.data).date).replaceAll('/', ''), index)
                    if (index === 1) {
                        fetchLastTradeDate(index + 1)
                    }
                })
        }
        fetchLastTradeDate(1)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {Object.values(date).length ? <div className={'absolute top-[51px] w-full right-0 border border-border bg-yellow-100 flex flex-col md:flex-row space-x-reverse md:space-x-5 p-1 text-sm md:divide-x md:divide-y-0 divide-y divide-x-reverse'}>
                {Object.values(date).filter((item: any) => item).map((item: any, index: number) => {
                    return (
                        <div key={index} className={`pr-3 ${index > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            <div className={'flex flex-col md:flex-row'}>
                                <span className={'flex'}>
                                    <span className={'ml-2'}>{index > 0 ? 'تعداد معامله فروش:' : 'تعداد معامله خرید:'}</span>
                                    <div className="countdown">
                                        {index > 0 ? counts.sellCount : counts.buyCount}
                                    </div>
                                </span>
                                <span className={'md:mr-10'}>
                                    <span className={'ml-2'}>{index > 0 ? 'زمان آخرین معامله فروش:' : 'زمان آخرین معامله خرید:'}</span>
                                    {jalali(item).date}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div> : null
            }
        </>

    )
}