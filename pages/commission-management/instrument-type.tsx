import React, { createContext, useState } from 'react';
import dynamic from "next/dynamic";
const InstrumentTypeToolbar = dynamic(() => import('../../components/commission/instrumentType/instrument-type-toolbar'))
const SearchComponent = dynamic(() => import('../../components/common/components/search'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'))
import useQuery from "../../hooks/useQuery";
import { COMMISSION_BASE_URL } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";

export const InstrumentTypeContext = createContext({})
export default function InstrumentType() {
    const columnDefStructure = [
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
            field: 'id',
            headerName: 'شماره',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'bourseTitle',
            headerName: 'عنوان بورس',
            flex: 0,
        },
        {
            field: 'instrumentTypeCode',
            headerName: 'کد نوع ابزار مالی',
            flex: 0,
        },
        {
            field: 'instrumentTypeTitle',
            headerName: 'عنوان نوع ابزار مالی',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'sectorCode',
            headerName: 'کد گروه صنعت',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'sectorTitle',
            headerName: ' گروه صنعت',
            flex: 0,
            width: 150,
            minWidth: 150
        }, {
            field: 'subSectorCode',
            headerName: 'کد زیرگروه صنعت',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'subSectorTitle',
            headerName: 'زیرگروه صنعت',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'inventoryStatus',
            headerName: 'حذف شده',
            flex: 0,
            width: 120,
            minWidth: 120,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <div
                            className={`${props.data.deleted ? 'bg-red-400' : 'bg-green-400'} text-white text-xs`}>{`${props.data.deleted ? 'حذف شده' : 'حذف نشده'}`}</div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'instrumentTypeDescription',
            headerName: 'توضیحات',
            width: 120,
            minWidth: 120,
        }
    ]
    const { fetchData, query, loading, data } = useQuery({ url: `${COMMISSION_BASE_URL}/api/CommissionInstrumentType/Search` })
    const [selectedRows, setSelectedRows] = useState<any>([]);

    return (
        <InstrumentTypeContext.Provider value={{ fetchData, query, selectedRows }}>
            <div className={'relative flex flex-col grow overflow-hidden'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.COMMISSION_MANAGEMENT_instrument} />
                </AccordionComponent>
                <InstrumentTypeToolbar />
                <TableComponent data={data?.result}
                    module={ModuleIdentifier.COMMISSION_MANAGEMENT_instrument}
                    loading={loading}
                    columnDefStructure={columnDefStructure}
                    rowId={['id']}
                    rowSelection={'single'}
                    setSelectedRows={setSelectedRows}
                />
            </div>
        </InstrumentTypeContext.Provider>
    )
}