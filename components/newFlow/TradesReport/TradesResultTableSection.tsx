import React, {useMemo} from 'react';
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../common/components/Search.component'))
const AccordionComponent = dynamic(() => import('../../common/components/AccordionComponent'))
const TableComponent = dynamic(() => import('../../common/table/table-component'))
import {formatNumber, jalali} from "../../common/functions/common-funcions";
import moment from "jalali-moment";
import useQuery from "../../../hooks/useQuery";
import { NETFLOW_BASE_URL } from '../../../api/constants';
import DateCell from "../../common/table/DateCell";

type initialType = {
    StartDate: string, EndDate: string, PageNumber: number, PageSize: number, Side: string, InstrumentId: string, Ticket: string, StationCode: string, BourseCode: string, NationalCode: string, LastName: string,
    FirstName: string,
    Symbol: string
}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: ``,
    // StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: ``,
    // EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
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
            width:150,
            minWidth:150,
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
            width:200,
            minWidth: 200,
            cellRendererSelector: () => {
                return {
                    component: (props:any)=><DateCell date={props.data.georgianTradeDate}/>,
                };
            },
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
    const {fetchData,data,loading,query} = useQuery({url:`${NETFLOW_BASE_URL}/Report/trades`})

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
                <SearchComponent listOfFilters={listOfFilters}
                                 initialValue={initialValue}
                                 onSubmit={fetchData}
                />
            </AccordionComponent>
            <TableComponent data={data?.result}
                            loading={loading}
                            columnDefStructure={columnDefStructure}
                            rowId={['ticket']}
                            masterDetail={true}
                            detailCellRendererParams={detailCellRendererParams}
                            pagination={true}
                            totalCount={data?.totalRecord}
                            fetcher={fetchData}
                            query={query}
            />
        </div>
    );
}
