import React, {useState, useMemo} from 'react';
import {formatNumber} from "../../common/functions/common-funcions";
import TablePagination from "../../common/table/TablePagination";
import AccordionComponent from "../../common/components/AccordionComponent";
import moment from "jalali-moment";
import TableComponent from "../../common/table/table-component";
import {toast} from "react-toastify";
import {netflowRulesSearch} from "../../../api/netflow.api";
import SearchComponent from "../../common/components/Search.component";

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
        e?.preventDefault()
        await netflowRulesSearch(query)
            .then(res => {
                setData(res?.result);
                setTotalCount(res?.totalRecord)
            })
            .catch(() => toast.error('نا موفق'))
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
                            rowId={['endDate', 'startDate', 'name', 'tierName']}
                            rowSelection={'single'}
                            masterDetail={true}
                            detailCellRendererParams={detailCellRendererParams}
            />
            <TablePagination onSubmit={onSubmit}
                             query={query}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    );
}
