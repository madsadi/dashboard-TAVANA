import React, {useState} from "react";
import moment from "jalali-moment";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const TablePagination = dynamic(() => import('../../components/common/table/TablePagination'))
import { jalali} from "../../components/common/functions/common-funcions";
import {tradingDayTimeTable} from "../../api/oms";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number, InstrumentGroupId: string }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    InstrumentGroupId: '',
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
}
const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'InstrumentGroupId', name: 'کد گروه نماد', type: 'input'},
    {title: 'date', name: 'تاریخ', type: 'date'},
]

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
                        <>
                            <span>{rowData.data.tradingSessionDate ? jalali(rowData.data.tradingSessionDate).date : '-'}</span>
                        </>)
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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])
    const [totalCount, setTotal] = useState<any>(null);

    const onSubmit = async (e:any,query: any) => {
        e?.preventDefault()
        await tradingDayTimeTable(query)
            .then((res: any) => {
                setData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
    };

    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent>
                <SearchComponent query={query}
                                 setQuery={setQuery}
                                 listOfFilters={listOfFilters}
                                 initialValue={initialValue}
                                 onSubmit={onSubmit}
                />
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}
            />
            <TablePagination onSubmit={onSubmit}
                             query={query}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    )
}