import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
import { jalali} from "../../components/common/functions/common-funcions";
import DateCell from "../../components/common/table/DateCell";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import {throwToast} from "../../components/common/functions/notification";
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";

export default function TradingDayTimetable() {
    const columnDefStructure = [
        {
            field: 'instrumentGroupId',
            headerName: 'کد گروه نماد',
        },
        {
            field: 'tradingSessionDate',
            headerName: 'تاریخ جلسه معاملاتی',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <DateCell date={rowData.data.tradingSessionDate}/>
                        )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }, {
            field: 'tradingDayInsGroupTitle',
            headerName: 'وضعیت معاملاتی گروه',
        }, {
            field: 'eventTriggerTime',
            headerName: 'زمانبندی اجرای وضعیت',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.eventTriggerTime ? jalali(rowData.data.eventTriggerTime).date : '-'}</span>
                            <span
                                className={'ml-4'}>{rowData.data.eventTriggerTime ? jalali(rowData.data.eventTriggerTime).time : '-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }, {
            field: 'afterOpeningInsGroupTitle',
            headerName: 'وضعیت بعد از گشایش',
        },
        {
            field: 'eventDate',
            headerName: 'تاریخ وزمان ارسال',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.eventDate ? jalali(rowData.data.eventDate).date : '-'}</span>
                            <span
                                className={'ml-4'}>{rowData.data.eventDate ? jalali(rowData.data.eventDate).time : '-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'dateReceived',
            headerName: 'تاریخ و زمان دریافت',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.dateReceived ? jalali(rowData.data.dateReceived).date : '-'}</span>
                            <span
                                className={'ml-4'}>{rowData.data.dateReceived ? jalali(rowData.data.dateReceived).time : '-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const {data,loading,query,fetchData} = useQuery({url:`${ADMIN_GATEWAY}/api/request/GetTradingDayTimetable`})

    const fetchHandler = (query:any)=>{
        if (query.StartDate && query?.EndDate){
            fetchData(query)
        }else{
            throwToast({type:'warning',value:'ورودی تاریخ الزامی می باشد'})
        }
    }

    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent>
                <SearchComponent onSubmit={fetchHandler} module={ModuleIdentifier.OMS_timetable}/>
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