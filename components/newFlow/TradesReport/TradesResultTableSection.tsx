import React, {useState, useMemo} from 'react';
import {formatNumber, jalali} from "../../common/functions/common-funcions";
import moment from "jalali-moment";
import TablePagination from "../../common/table/TablePagination";
import AccordionComponent from "../../common/components/AccordionComponent";
import TableComponent from "../../common/table/table-component";
import {toast} from "react-toastify";
import {netflowTradesSearch} from "../../../api/netflow.api";
import SearchComponent from "../../common/components/Search.component";

type initialType = {
    StartDate: string, EndDate: string, PageNumber: number, PageSize: number, Side: string, InstrumentId: string, Ticket: string, StationCode: string, BourseCode: string, NationalCode: string, LastName: string,
    FirstName: string,
    Symbol: string
}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    Side: '',
    InstrumentId: '',
    Ticket: '',
    StationCode: '',
    BourseCode: '',
    NationalCode: '',
    LastName: '',
    FirstName: '',
    Symbol: ''
}
const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'date', name: 'تاریخ', type: 'date'},
    {title: 'Ticket', name: 'شماره تیکت', type: 'input'},
    {title: 'Symbol', name: 'نماد', type: 'input'},
    {title: 'InstrumentId', name: 'شناسه نماد', type: 'input'},
    {title: 'FirstName', name: 'نام', type: 'input'},
    {title: 'LastName', name: 'نام خانوادگی', type: 'input'},
    {title: 'NationalCode', name: 'کد ملی', type: 'input'},
    {title: 'StationCode', name: 'کد ایستگاه معاملاتی', type: 'input'},
    {title: 'Side', name: 'سمت', type: 'selectInput'},
]

export default function TradesResultTableSection() {
    const columnDefStructure = [
        {
            field: 'ticket',
            headerName: 'شناسه',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            width: 160,
        },
        {
            field: 'georgianTradeDate',
            headerName: 'تاریخ',
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
            width: 180,
        },
        {
            field: 'symbol',
            headerName: 'نماد',
            flex: 0,
            width: 180,
        },
        {
            field: 'symbolName',
            headerName: 'نام نماد',
            flex: 0,
            width: 180,
        },
        {
            field: 'fullName',
            headerName: 'عنوان مشتری',
        },
        {
            field: 'nationalCode',
            headerName: 'کد ملی',
            flex: 0,
            width: 180
        },
        {
            field: 'stationName',
            headerName: 'ایستگاه معمالاتی',
        },
        {
            field: 'stationCode',
            headerName: 'کد ایستگاه',
        },
        // {
        //     field: 'ticket',
        //     headerName: 'تیکت',
        // },
        {
            field: 'tradeDate',
            headerName: 'تاریخ معامله',
        },
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر در تسویه',
            flex: 0,
            width: 120
        },
        {
            field: 'bourseCode',
            headerName: 'کد بورسی',
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
        {
            field: 'symbolMessage',
            headerName: 'متن پیام',
        },
    ]
    const [data, setData] = useState<any>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [query, setQuery] = useState<initialType>(initialValue)

    const onSubmit = async (e: any, query: any) => {
        e?.preventDefault()
        await netflowTradesSearch(query)
            .then(res => {
                setData(res?.result)
                setTotalCount(res?.totalRecord)
            })
            .catch(() => toast.error('نا موفق'))
    };

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


    return (
        <div className={'relative flex flex-col grow overflow-hidden'}>
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
                            rowId={['ticket']}
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
