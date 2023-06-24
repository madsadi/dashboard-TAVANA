import React, {createContext, useMemo, useState} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
import {formatNumber} from "../../components/common/functions/common-funcions";
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
            field: 'MarketerID',
            headerName: 'شناسه بازاریاب',
        },
        {
            field: 'YearandMonth',
            headerName: 'سال و ماه میلادی',
            cellRenderer: 'agGroupCellRenderer',
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
                        field: 'FollowerMarketerID',
                        headerName: 'شناسه کاربری بازاریاب',
                    },
                    {
                        field: 'CommissionCoefficient',
                        headerName: 'ضریب کارمزد',
                    },
                    {
                        field: 'StartDate',
                        headerName: 'تاریخ شروع ارتباط',
                    },
                    {
                        field: 'GEndDate',
                        headerName: 'تاریخ پایان ارتباط',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.GEndDate}/>,
                            }
                            return moodDetails;
                        },
                    },
                    {
                        field: 'GCreateDate',
                        headerName: 'زمان ایجاد',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.GCreateDate}/>,
                            }
                            return moodDetails;
                        },
                    },
                    {
                        field: 'GUpdateDate',
                        headerName: 'زمان بروزرسانی',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.GUpdateDate}/>,
                            }
                            return moodDetails;
                        },
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
                                rowSelection={'multiple'}
                                rowId={['LeaderMarketerID', 'FollowerMarketerID']}
                                detailCellRendererParams={detailCellRendererParams}
                                masterDetail={true}
                />
            </div>
        </ReciteContext.Provider>
    )
}