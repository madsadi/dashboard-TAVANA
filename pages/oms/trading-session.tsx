import React, {useState} from "react";
import moment from "jalali-moment";
import {jalali} from "../../components/common/functions/common-funcions";
import {tradingSession} from "../../api/oms";
import TablePagination from "../../components/common/table/TablePagination";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import InputComponent from "../../components/common/components/InputComponent";
import {DayRange} from "react-modern-calendar-datepicker";
import TableComponent from "../../components/common/table/table-component";


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
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const onSubmit = async (e:any,query: initialType) => {
        e.preventDefault()
        await tradingSession(query)
            .then((res: any) => {
                setData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
    };

    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent>
                <form onSubmit={(e) => onSubmit(e, query)}>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            listOfFilters?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       queryUpdate={queryUpdate}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
                                                       selectedDayRange={selectedDayRange}
                                                       setSelectedDayRange={setSelectedDayRange}/>
                            })
                        }
                    </div>
                    <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                        <button className={'button bg-red-600'} onClick={(e) => {
                            e.preventDefault()
                            setQuery(initialValue)
                            setSelectedDayRange({from: null, to: null})
                            onSubmit(e, initialValue)
                        }}>
                            لغو فیلتر ها
                        </button>
                        <button className={'button bg-lime-600'} type={'submit'}>
                            جستجو
                        </button>
                    </div>
                </form>
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}
            />
            <TablePagination setData={setData}
                             query={query}
                             api={`${MARKET_RULES_MANAGEMENT}/request/GetTradingSessionStatus?`}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    )
}