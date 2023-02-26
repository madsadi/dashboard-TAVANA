import React, {useState} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TablePagination = dynamic(() => import('../../components/common/table/TablePagination'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
import moment from "jalali-moment";
import {jalali} from "../../components/common/functions/common-funcions";
import {tradingSession} from "../../api/oms";


type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
}
const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'date', name: 'تاریخ', type: 'date'},
]

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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])
    const [totalCount, setTotal] = useState<any>(null);

    const onSubmit = async (e:any,query: initialType) => {
        e?.preventDefault()
        await tradingSession(query)
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