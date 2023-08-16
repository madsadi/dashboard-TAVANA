import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
import useQuery from "../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import DateCell from "../../components/common/table/date-cell";
import RelationToolbar from "../../components/marketer-app/relations/toolbar/relation-toolbar";

export const RelationsContext = createContext({})
export default function Relations() {
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
            field: 'LeaderMarketerID',
            headerName: 'شناسه بازاریاب',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'FollowerMarketerName',
            headerName: ' نام و نام خانوادگی بازاریاب زیر گروه',
        },
        {
            field: 'LeaderMarketerName',
            headerName: 'نام و نام خانوادگی بازاریاب سرگروه',
        }
    ]
    const {
        data, fetchData, query: searchQuery, loading
    }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer/search-marketers-relations` })

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
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.StartDate} hideTime={true} />,
                            }
                            return moodDetails;
                        },
                    },
                    {
                        field: 'EndDate',
                        headerName: 'تاریخ پایان ارتباط',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.EndDate} hideTime={true} />,
                            }
                            return moodDetails;
                        },
                    },
                    {
                        field: 'GCreateDate',
                        headerName: 'زمان ایجاد',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.GCreateDate} />,
                            }
                            return moodDetails;
                        },
                    },
                    {
                        field: 'GUpdateDate',
                        headerName: 'زمان بروزرسانی',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.GUpdateDate} />,
                            }
                            return moodDetails;
                        },
                    }
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    // valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data]);
            },
        };
    }, []);

    return (
        <RelationsContext.Provider value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}>
            <div className={'flex flex-col h-full flex-1'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.MARKETER_APP_RELATIONS} />
                </AccordionComponent>
                <RelationToolbar />
                <TableComponent data={data?.result?.pagedData}
                    columnDefStructure={columnDefStructure}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    rowSelection={'multiple'}
                    rowId={['LeaderMarketerID', 'FollowerMarketerID']}
                    detailCellRendererParams={detailCellRendererParams}
                    masterDetail={true}
                />
            </div>
        </RelationsContext.Provider>
    )
}