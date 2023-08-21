import React, { useState, createContext } from "react";
import dynamic from 'next/dynamic'
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'))
const Toolbar = dynamic(() => import('../../components/customer-management/toolbar'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const SearchComponent = dynamic(() => import('../../components/common/components/search'))
import usePageStructure from "../../hooks/usePageStructure";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import DateCell from "../../components/common/table/date-cell";

const defStructure = (page: string) => {
    const D: any = {
        'marketer': [
            {
                field: 'tbsReagentName',
                headerName: 'عنوان معرف',
            },
            {
                field: 'tbsMarketerId',
                headerName: 'شناسه یازاریاب ',
            },
            {
                field: 'tbsMarketerName',
                headerName: 'عنوان بازاریاب',
            },
            {
                field: 'tbsReagentId',
                headerName: 'شناسه معرف',
            },
            {
                field: 'customerId',
                headerName: 'شناسه مشتری',
            },
            {
                field: 'branchId',
                headerName: 'شناسه شعبه',
            },
            {
                field: 'UserId',
                headerName: 'شناسه کاربر',
            }
        ],
        'contract': [
            {
                field: 'id',
                headerName: 'شناسه ',
            },
            {
                field: 'commissionCoefficient',
                headerName: 'ضرایب کارمزد',
            },
            {
                field: 'lowAmount',
                headerName: 'کف پله',
            },
            {
                field: 'highAmount',
                headerName: 'سقف پله',
            },
            {
                field: 'coefficientPercentage',
                headerName: 'ضریب کارمزد',
            },
            {
                field: 'deductionPercentage',
                headerName: 'ضریب کسورات',
            },
            {
                field: 'createDateTime',
                headerName: 'زمان ایجاد',
                cellRendererSelector: () => {
                    return {
                        component: (rowData: any) => <DateCell date={rowData.data.createDateTime} />,
                    };
                },
            },
            {
                field: 'updateDateTime',
                headerName: 'زمان ویرایش',
                cellRendererSelector: () => {
                    return {
                        component: (rowData: any) => <DateCell date={rowData.data.updateDateTime} />,
                    };
                },
            }
        ],
        'branch': [
            {
                field: 'id',
                headerName: 'شناسه آدرس ',
                cellRendererSelector: () => {
                    const ColourCellRenderer = (rowData: any) => {
                        return (
                            <span>{rowData.data.address?.id}</span>
                        )
                    };
                    const moodDetails = {
                        component: ColourCellRenderer,
                    }
                    return moodDetails;
                },
            },
        ]
    }
    return D[page]
}

export const CustomerManagement = createContext({})
export default function HoldingsSubPages() {
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const { page } = usePageStructure()
    const { data, loading, fetchData, query } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/${page?.api}/Search` })
    const detailCellRendererParams = (page: string) => {
        return {
            detailGridOptions: {
                enableRtl: true,
                getRowId: (params: any) => params.data.id,
                columnDefs: defStructure(page),
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data]);
            },
        };
    }

    return (
        <CustomerManagement.Provider value={{ fetchData, selectedRows, setSelectedRows, query }}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={page?.api ? ModuleIdentifier?.[`CUSTOMER_MANAGEMENT_${page?.api}`] : null} />
                </AccordionComponent>
                <Toolbar />
                <TableComponent data={data?.result?.pagedData}
                    module={ModuleIdentifier?.[`CUSTOMER_MANAGEMENT_${page?.api}`]}
                    loading={loading}
                    columnDefStructure={page?.columnsDefStructure}
                    rowId={['id']}
                    detailCellRendererParams={() => detailCellRendererParams(page?.api)}
                    rowSelection={'single'}
                    masterDetail={true}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    pagination={true}
                    totalCount={data?.result?.totalCount}
                    fetcher={fetchData}
                    query={query}
                />
            </div>
        </CustomerManagement.Provider>
    )
}