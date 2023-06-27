import React, {createContext, useMemo, useState} from "react";
import dynamic from "next/dynamic";

const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
import {formatNumber, jalali} from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import {MARKETER_ADMIN} from "../../api/constants";
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";
import DateCell from "../../components/common/table/DateCell";
import ReciteToolbar from "../../components/marketer-app/recite/toolbar/ReciteToolbar";

export const ReciteContext = createContext({})
export default function Recite() {
    const [selectedRows, setSelectedRows] = useState<any>([])

    const columnDefStructure: any = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
        },
        {
            field: 'MarketerName',
            headerName: 'نام بازاریاب',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'Doreh',
            headerName: 'دوره زمانه',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
                    return (
                        <div>
                            {months[Number(rowData.data.Doreh.split('1402')[1])-1]}
                        </div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const {
        data, fetchData, query: searchQuery
    }: any = useQuery({url: `${MARKETER_ADMIN}/factor/search-factor`})

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                // getRowId:(params:any)=>params.data.orderId,
                columnDefs: [
                    {
                        field: 'TotalPureVolume',
                        headerName: 'حجم خالص',
                    },
                    {
                        field: 'TotalFee',
                        headerName: 'کارمزد کل',
                    },
                    {
                        field: 'PureFee',
                        headerName: 'کارمزد خالص',
                    },{
                        field: 'MarketerFee',
                        headerName: 'کارمزد مارکتر',
                    },{
                        field: 'Plan',
                        headerName: 'پلکان',
                    },{
                        field: 'Tax',
                        headerName: 'مالیات',
                    },{
                        field: 'FinalFee',
                        headerName: 'کارمزد نهایی',
                    },{
                        field: 'Payment',
                        headerName: 'پرداختی',
                    }
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data]);
            },
        };
    }, []);

    return (
        <ReciteContext.Provider value={{selectedRows, setSelectedRows, fetchData, searchQuery, data}}>
            <div className={'flex flex-col h-full flex-1'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} module={ModuleIdentifier.MARKETER_APP_recite}/>
                </AccordionComponent>
                <ReciteToolbar/>
                <TableComponent data={data?.result.pagedData}
                                columnDefStructure={columnDefStructure}
                                setSelectedRows={setSelectedRows}
                                selectedRows={selectedRows}
                                rowSelection={'single'}
                                rowId={['IdpID']}
                                detailCellRendererParams={detailCellRendererParams}
                                masterDetail={true}
                />
            </div>
        </ReciteContext.Provider>
    )
}