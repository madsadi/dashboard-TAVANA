import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../../components/common/components/accordion'));
import useQuery from "../../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../../api/constants";
import { ModuleIdentifier } from "../../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import MarketerContractToolbar from "components/marketer-app/marketer-contract/toolbar/marketer-contract-toolbar";
import ToggleButton from "components/marketer-app/marketer-contract/toggle-button";
import DateCell from "components/common/table/date-cell";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

export const MarketerContractContext = createContext({})
function MarketerContract() {
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
            field: 'ContractID',
            headerName: 'شناسه قرارداد',
        },
        {
            field: 'MarketerID',
            headerName: 'شناسه بازاریاب',
        },
        {
            field: 'Title',
            headerName: 'عنوان بازاریاب',
        },
        {
            field: 'CalculationBaseType',
            headerName: 'نوع محاسابات',
        },
        {
            field: 'CoefficientBaseType',
            headerName: 'نوع ضرائب',
        },
        {
            field: 'ContractType',
            headerName: 'نوع قرارداد',
        },
        {
            field: 'Description',
            headerName: 'توضیحات',
        },
        {
            field: 'StartDate',
            headerName: 'تاریخ شروع',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <DateCell date={rowData.data.StartDate} hideTime /> };
            },
        },
        {
            field: 'EndDate',
            headerName: 'تاریخ پایان',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <DateCell date={rowData.data.EndDate} hideTime /> };
            },
        },
        {
            field: 'detail',
            headerName: 'جزییات',
            flex: 0,
            width: 90,
            cellStyle: {
                cursor: 'pointer',
                display: 'flex'
            },
            cellRendererSelector: () => {
                return {
                    component: (rowData: any) => {
                        return (<a className={'flex h-full w-full'} target="_blank" rel="noreferrer"
                            href={`/marketer-app/marketer-contract/${rowData.data.ContractID}`}>
                            <EllipsisHorizontalCircleIcon className={'h-5 w-5 m-auto'} />
                        </a>)
                    },
                };
            },
        }
    ]

    const {
        data, fetchData, query: searchQuery, loading
    }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer-contract/search` })

    return (
        <MarketerContractContext.Provider value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}>
            <div className={'flex flex-col h-full flex-1'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.MARKETER_APP_marketerContract} />
                </AccordionComponent>
                <MarketerContractToolbar />
                <TableComponent data={data?.result?.pagedData}
                    columnDefStructure={columnDefStructure}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    rowSelection={'multiple'}
                    rowId={['ContractID']}
                />
            </div>
        </MarketerContractContext.Provider>
    )
}

export default withPermission(MarketerContract, ModuleIdentifier.MARKETER_APP_marketerContract)