import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
import { jalali } from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../../components/common/functions/notification";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";

export default function TradingSession() {
    const columnDefStructure = [
        {
            field: 'sessionStatusCode',
            headerName: 'کد وضعیت جلسه معاملاتی',
        },
        {
            field: 'sessionStatusTitle',
            headerName: 'وضعیت جلسه معاملاتی',
        },
        {
            field: 'startDate',
            headerName: 'تاریخ و زمان شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.startDate ? jalali(rowData.data.startDate).date : '-'}</span>
                            <span
                                className={'ml-4'}>{rowData.data.startDate ? jalali(rowData.data.startDate).time : '-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'endDate',
            headerName: 'تاریخ و زمان پایان',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.endDate ? jalali(rowData.data.endDate).date : '-'}</span>
                            <span
                                className={'ml-4'}>{rowData.data.endDate ? jalali(rowData.data.endDate).time : '-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const { data, loading, query, fetchData } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/GetTradingSessionStatus` })

    const fetchHandler = (query: any) => {
        if (query.StartDate && query?.EndDate) {
            fetchData(query)
        } else {
            throwToast({ type: 'warning', value: 'ورودی تاریخ الزامی می باشد' })
        }
    }

    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent>
                <SearchComponent onSubmit={fetchHandler} loading={loading} module={ModuleIdentifier.OMS_session} />
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                loading={loading}
                columnDefStructure={columnDefStructure}
                rowId={['id']}
                pagination={true}
                totalCount={data?.result?.totalCount}
                fetcher={fetchHandler}
                query={query}
            />
        </div>
    )
}