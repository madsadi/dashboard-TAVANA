import React, {useState, useMemo} from 'react';
import {formatNumber, jalali} from "../../common/functions/common-funcions";
import moment from "jalali-moment";
import TablePagination from "../../common/table/TablePagination";
import {enTierNameEnum} from '../../../dictionary/Enums'
import AccordionComponent from "../../common/components/AccordionComponent";
import TableComponent from "../../common/table/table-component";
import {toast} from "react-toastify";
import {netflowClearingDateRangeSearch} from "../../../api/netflow.api";
import SearchComponent from "../../common/components/Search.component";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number, EnTierName: string, SettlementDelay: string }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EnTierName: '',
    SettlementDelay: '',
}
const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'date', name: 'تاریخ', type: 'date'},
    {title: 'EnTierName', name: 'نام انگلیسی گروه', type: 'input'},
    {title: 'SettlementDelay', name: 'تاخیر', type: 'input'},
]

export default function ClearingDateRangeTTradeResultTableSection() {
    const columnDefStructure = [
        {
            field: 'georgianTradeDate',
            headerName: 'تاریخ معامله',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{jalali(props.data.georgianTradeDate).date}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 120,
        },
        {
            field: 'enTierName',
            headerName: 'نام گروه',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{enTierNameEnum.find((item: any) => props.data.enTierName === item.enTitle).faTitle}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 250,
        },
        {
            field: 'brokerCode',
            headerName: 'کد کارگزار',
        },
        {
            cellRenderer: 'agGroupCellRenderer',
            field: 'brokerName',
            headerName: 'نام کارگزار',
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر',
        },
        {
            field: 'buy',
            headerName: 'مبلغ خرید',
        },
        {
            field: 'sell',
            headerName: 'مبلغ فروش',
        },
        {
            field: 'sellerInterest',
            headerName: 'سود فروشنده',
        },
        {
            field: 'buyerInterest',
            headerName: 'سود خریدار',
        },
        {
            field: 'credit',
            headerName: 'بستانکار',
        },
        {
            field: 'debit',
            headerName: 'بدهکار',
        },
        {
            field: 'sellerBalance',
            headerName: 'مانده فروشنده',
        },
        {
            field: 'buyerBalance',
            headerName: 'مانده خریدار',
        },
    ]

    const [totalCount, setTotalCount] = useState<number>(0);
    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])

    const onSubmit = async (e: any, query: any) => {
        e?.preventDefault()
        await netflowClearingDateRangeSearch(query)
            .then(res => {
                setData(res?.result)
                setTotalCount(res?.totalRecord)
            })
            .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
    };

    const getRowStyle = (params: any) => {
        if (params?.node?.rowIndex === 0) {
            return {borderRight: '2px solid rgba(5,122,85,1)'};
        } else {
            return {borderRight: '2px solid rgba(225,29,72,1)'};
        }
    };
    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                rowStyle: {},
                getRowStyle: getRowStyle,
                columnDefs: [
                    {
                        field: 'type', headerName: 'سمت معامله',
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span
                                        className={`my-auto`}>{props.node.rowIndex === 0 ? 'کارمزد خرید' : 'کارمزد فروش'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                    {field: 'brokerCommission', headerName: 'کارگزار'},
                    {field: 'brfCommission', headerName: 'سهم صندوق توسعه'},
                    {field: 'accessCommission', headerName: 'کارمزد دسترسی'},
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    {field: 'tmcCommission', headerName: 'کارمزد فناوری'},
                    {field: 'csdCommission', headerName: 'کارمزد سپرده گزاری'},
                    {field: 'rayanBourseCommission', headerName: 'کارمزد رایان'},
                    {field: 'bourseCommisison', headerName: 'بورس مربوطه'},
                    {field: 'inventoryCommission', headerName: 'هزینه انبارداری'},
                    {field: 'farCommission', headerName: 'کارمزد فراوری'},
                    {field: 'tax', headerName: 'مالیات'},
                    {field: 'vatCommission', headerName: 'مالیات ارزش افزوده'},
                    {field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data?.buyCommission, params.data?.sellCommission])
            },
        };
    }, []);

    return (
        <div className={'relative flex flex-col grow overflow-hidden'}>
            <AccordionComponent >
                <SearchComponent query={query}
                                 setQuery={setQuery}
                                 listOfFilters={listOfFilters}
                                 initialValue={initialValue}
                                 onSubmit={onSubmit}
                />
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['sell','settlementDelay','enTierName','georgianTradeDate']}
                            masterDetail={true}
                            detailCellRendererParams={detailCellRendererParams}
            />
            <TablePagination onSubmit={onSubmit}
                             query={query}
                             setQuery={setQuery}
                             totalCount={totalCount}
            />
        </div>
    );
}
