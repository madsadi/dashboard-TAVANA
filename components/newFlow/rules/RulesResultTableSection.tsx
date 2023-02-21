import React, {useState, useMemo} from 'react';
import {formatNumber} from "../../common/functions/common-funcions";
import TablePagination from "../../common/table/TablePagination";
import {NETFLOW_BASE_URL} from "../../../api/constants";
import AccordionComponent from "../../common/components/AccordionComponent";
import moment from "jalali-moment";
import TableComponent from "../../common/table/table-component";
import InputComponent from "../../common/components/InputComponent";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {rulesList} from "../../../api/market-rules-management.api";
import {toast} from "react-toastify";
import {netflowRulesSearch} from "../../../api/netflow.api";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number, Name: string, BuyerCode: string, SellerCode: string, Symbol: string, SettlementDelay: string }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    Name: '',
    BuyerCode: '',
    SellerCode: '',
    Symbol: '',
    SettlementDelay: ''
}
const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'date', name: 'تاریخ', type: 'date'},
    {title: 'Name', name: 'نام', type: 'input'},
    {title: 'BuyerCode', name: 'شناسه خریدار', type: 'input'},
    {title: 'SellerCode', name: 'شناسه فروشنده', type: 'input'},
    {title: 'Symbol', name: 'نماد', type: 'input'},
    {title: 'SettlementDelay', name: 'تاخیر', type: 'input'},
]

export default function RulesResultTableSection() {
    const columnDefStructure = [
        {
            field: 'name',
            headerName: 'نام',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            width: 260,
        },
        {
            field: 'startDate',
            headerName: 'تاریخ شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{props.data.startDate}</span>
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
            field: 'endDate',
            headerName: 'تاریخ شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{props.data.endDate}</span>
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
            field: 'buyerCode',
            headerName: 'شناسه خریدار',
            flex: 0,
            width: 180,
        },
        {
            field: 'sellerCode',
            headerName: 'شناسه فروشنده',
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر',
        }
    ]

    const [data, setData] = useState<any>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [query, setQuery] = useState<initialType>(initialValue)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    const getRowStyle = (params: any) => {
        if (params?.node?.data?.side === 1) {
            return {backgroundColor: 'rgba(5,122,85,0.18)'};
        } else {
            return {backgroundColor: 'rgba(225,29,72,0.18)'};
        }
    };
    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                rowStyle: {},
                getRowStyle: getRowStyle,
                suppressRowTransform: true,
                columnDefs: [
                    {
                        field: 'type', headerName: 'دسته', rowSpan: (params: any) => params.data.side === 1 ? 2 : 1,
                        cellClassRules: {
                            'cell-span': (params: any) => params.data.side === 1,
                        },
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span
                                        className={`my-auto`}>{props.node.rowIndex > 1 ? 'ضریب کارمزد' : 'سقف کارمزد'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                    {field: 'accountCommission', headerName: 'هزینه دسترسی'},
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    {field: 'tmcCommission', headerName: 'کارمزد فناوری'},
                    {field: 'csdCommission', headerName: 'کارمزد سپرده گزاری'},
                    {field: 'rayanBourseCommission', headerName: 'کارمزد رایان'},
                    {field: 'bourseCommission', headerName: 'بورس مربوطه'},
                    {field: 'brokerCommission', headerName: 'کارگزار'},
                    {field: 'tax', headerName: 'مالیات'},
                    {field: 'vatCommission', headerName: 'مالیات ارزش افزوده'},
                    {field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری'},
                    {
                        field: 'side', headerName: 'سمت',
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span>{props.data.side === 1 ? 'خرید' : 'فروش'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([...params.data?.feeBond, ...params.data?.feeValue])
            },
        };
    }, []);

    const onSubmit = async (e: any, query: any) => {
        e.preventDefault()
        await netflowRulesSearch(query)
            .then(res => {
                setData(res?.result);
                setTotalCount(res?.totalRecord)
            })
            .catch(() => toast.error('نا موفق'))
    };

    return (
        <>
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
                            rowId={['endDate','startDate','name','tierName']}
                            rowSelection={'single'}
                            masterDetail={true}
                            detailCellRendererParams={detailCellRendererParams}
            />
            <TablePagination setData={setData}
                             query={query}
                             api={`${NETFLOW_BASE_URL}/Report/rules?`}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </>
    );
}
