import React, {useState, useMemo} from 'react';
import {formatNumber, jalali} from "../../common/functions/common-funcions";
import moment from "jalali-moment";
import TablePagination from "../../common/table/TablePagination";
import {NETFLOW_BASE_URL} from "../../../api/constants";
import AccordionComponent from "../../common/components/AccordionComponent";
import TableComponent from "../../common/table/table-component";
import InputComponent from "../../common/components/InputComponent";
import {netflowClearedTradeSearch} from "../../../api/netflow.api";
import {toast} from "react-toastify";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number, Side: string, InstrumentId: string, Ticket: string, Symbol: string }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    Side: '',
    InstrumentId: '',
    Ticket: '',
    Symbol: ''
}
const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'date', name: 'تاریخ', type: 'date'},
    {title: 'Ticket', name: 'شماره تیکت', type: 'input'},
    {title: 'Symbol', name: 'نماد', type: 'input'},
    {title: 'InstrumentId', name: 'شناسه نماد', type: 'input'},
    {title: 'Side', name: 'سمت', type: 'selectInput'},
]

export default function ClearedTradeResultTableSection() {
    const columnDefStructure = [
        {
            field: 'ticket',
            headerName: 'شناسه',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            width: 160,
        },
        {
            field: 'date',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{jalali(props.data.date).date}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 180,
        },
        {
            field: 'symbol',
            headerName: 'نماد',
            flex: 0,
            width: 180,
        },
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'price',
            headerName: 'قیمت',
        },
        {
            field: 'shares',
            headerName: 'حجم',
        },
        {
            field: 'settlementValue',
            headerName: 'ارزش ناخالص',
        },
    ]

    const [totalCount, setTotalCount] = useState<number>(0);
    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                columnDefs: [
                    {field: 'brokerCommission', headerName: 'کارمزد کارگزاری'},
                    {field: 'brfCommission', headerName: 'سهم صندوق توسعه'},
                    {
                        field: 'bourseCommisison',
                        headerName: 'کارمزد بورس'
                    },
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    {field: 'tmcCommission', headerName: 'کارمزد فناوری'},
                    {field: 'accessCommission', headerName: 'حق دسترسی'},
                    {field: 'csdCommission', headerName: 'کارمزد سپرده گزاری'},
                    {field: 'rayanBourseCommission', headerName: 'کارمزد رایان'},
                    {field: 'inventoryCommission', headerName: 'هزینه انبارداری'},
                    {field: 'tax', headerName: 'مالیات'},
                    {field: 'vatCommission', headerName: 'مالیات ارزش افزوده'},
                    {field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری'},
                    {field: 'farCommission', headerName: 'هزینه فرآوری'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data?.feeDetail])
            },
        };
    }, []);

    const onSubmit = async (e: any, query: any) => {
        e.preventDefault()
        await netflowClearedTradeSearch(query)
            .then(res => {
                setData(res?.result)
                setTotalCount(res?.totalRecord)
            })
            .catch(() => toast.error('نا موفق'))
    };
    return (
        <div className={'relative flex flex-col grow overflow-hidden'}>
            <AccordionComponent >
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
                                                       setSelectedDayRange={setSelectedDayRange}
                                />
                            })
                        }
                    </div>
                    <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                        <button className={'button bg-red-600'} onClick={(e) => {
                            e.preventDefault()
                            setQuery(initialValue)
                            setSelectedDayRange({from:null,to:null})
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
                            rowId={['ticket']}
                            masterDetail={true}
                            detailCellRendererParams={detailCellRendererParams}
            />
            <TablePagination setData={setData}
                             query={query}
                             api={`${NETFLOW_BASE_URL}/Report/cleared-trade?`}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    );
}
