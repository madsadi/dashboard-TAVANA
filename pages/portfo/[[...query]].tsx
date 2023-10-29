import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
import { useRouter } from "next/router";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { withPermission } from "components/common/layout/with-permission";
import { ModuleIdentifier } from "components/common/functions/Module-Identifier";
import moment from "jalali-moment";
import DateCell from "components/common/table/date-cell";
import AccordionComponent from "components/common/components/accordion";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));

type initialType = { CustomerId: string, InstrumentId: string, PageNumber: number, Date: string, PageSize: number }
const initialValue = {
    InstrumentId: '',
    CustomerId: '',
    Date: '',
    PageNumber: 1,
    PageSize: 20,
}

function PortfolioBook() {
    const columnDefStructure = [
        {
            field: 'id',
            headerName: 'شناسه ردیف',
        },
        {
            field: 'transactionId',
            headerName: 'شناسه تراکنش',
        },
        {
            field: 'transactionTitle',
            headerName: 'نوع تراکنش',
        },
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'currentShareCount',
            headerName: 'مانده',
        },
        {
            field: 'sellableShareCount',
            headerName: 'قابل فروش',
        },
        {
            field: 'changeQuantity',
            headerName: 'تغییر حجم تراکنش',
        },
        {
            field: 'openBuyOrder',
            headerName: 'سفارش باز خرید',
        }, {
            field: 'openSellOrder',
            headerName: 'سفارش باز فروش',
        },
        {
            field: 'intradayBuy',
            headerName: 'خرید امروز',
        },
        {
            field: 'intradaySell',
            headerName: 'فروش امروز',
        },
        {
            field: 'remainAssetCount',
            headerName: 'مانده کاردکس',
        },
        {
            field: 'transactionDateTime',
            headerName: 'زمان تراکنش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <DateCell date={props.data.transactionDateTime} />
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'effectiveDate',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <DateCell date={props.data.effectiveDate} />
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]

    const router = useRouter()
    const [query, setQuery] = useState<initialType>(initialValue)
    const { data, loading, fetchData } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/SearchPortfolioTransaction` })

    let userInfo = data?.result?.pagedData?.[0]
    let dep = router.query?.query?.[0]
    useEffect(() => {
        if (dep) {
            const queryData = dep.split('&')
            let _query = { ...query };
            _query['InstrumentId'] = queryData[1];
            _query['CustomerId'] = queryData[0];
            _query['Date'] = moment(queryData[2]).locale('en').format('YYYY-MM-DD');
            setQuery(_query)
            fetchData({ ...query, ..._query })
        }
    }, [dep]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent isOpen={false}>
                <SearchComponent onSubmit={fetchData} initialQuery={query} loading={loading} module={ModuleIdentifier.PORTFO_detail} />
            </AccordionComponent>
            <div className={'border-x border-border flex space-x-4 justify-around p-3'}>
                <div>
                    کدمعاملاتی:
                    <span className={'mr-2 font-bold'}>{userInfo?.tradingCode}</span>
                </div>
                <div>
                    کدملی:
                    <span className={'mr-2 font-bold'}>{userInfo?.nationalId}</span>
                </div>
                <div>
                    عنوان مشتری:
                    <span className={'mr-2 font-bold'}>{userInfo?.customerTitle}</span>
                </div>
                <div>
                    کدبورسی:
                    <span className={'mr-2 font-bold'}>{userInfo?.bourseCode}</span>
                </div>
            </div>
            <TableComponent data={data?.result?.pagedData}
                loading={loading}
                columnDefStructure={columnDefStructure}
                rowId={['id']}
                pagination={true}
                totalCount={data?.result?.totalCount}
                fetcher={fetchData}
                query={query}
            />
        </div>
    )
}

export default withPermission(PortfolioBook, ModuleIdentifier.LIVE_PORTFO)