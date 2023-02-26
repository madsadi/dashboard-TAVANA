import React, {createContext, useState} from 'react';
import dynamic from "next/dynamic";
const InstrumentTypeToolbar = dynamic(() => import('./InstrumentTypeToolbar'))
const SearchComponent = dynamic(() => import('../../common/components/Search.component'))
const TableComponent = dynamic(() => import('../../common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../common/components/AccordionComponent'))
import {commissionSearch} from "../../../api/commission.api";
import {toast} from "react-toastify";

type initialType = { CommissionInstrumentTypeId: string, BourseTitle: string, InstrumentTypeTitle: string, InstrumentTypeDescription: string, SectorTitle: string, SubSectorTitle: string, Deleted: string }
const initialValue = {
    CommissionInstrumentTypeId: '',
    BourseTitle: '',
    InstrumentTypeTitle: '',
    InstrumentTypeDescription: '',
    SectorTitle: '',
    SubSectorTitle: '',
    Deleted: '',
}
const listOfFilters = [
    // {title:'PageNumber',name:'شماره صفحه',type:null},
    // {title:'PageSize',name:'تعداد',type:null},
    // {title:'CommissionInstrumentTypeId',name:'تاریخ',type:'date'},
    {title: 'BourseTitle', name: 'عنوان بورس', type: 'input'},
    {title: 'InstrumentTypeTitle', name: 'عنوان نوع ابزار مالی', type: 'input'},
    {title: 'InstrumentTypeDescription', name: 'توضیحات نوع ابزار', type: 'input'},
    {title: 'SectorTitle', name: 'گروه صنعت', type: 'input'},
    {title: 'SubSectorTitle', name: 'زیرگروه صنعت', type: 'input'},
    {title: 'Deleted', name: 'دسته بندی', type: 'selectInput'},
]

export const InstrumentTypeContext = createContext({})
export default function ResultTable() {
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
    const [data, setData] = useState<any>([]);
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [query, setQuery] = useState<initialType>(initialValue);

    const onSubmit = async (e: any, query: any) => {
        e?.preventDefault()
        await commissionSearch(query)
            .then(res => setData(res?.result))
            .catch(() => toast.error('نا موفق'))
    };

    return (
        <InstrumentTypeContext.Provider value={{onSubmit,query,selectedRows}}>
            <div className={'relative flex flex-col grow overflow-hidden'}>
                <AccordionComponent>
                    <SearchComponent query={query}
                                     setQuery={setQuery}
                                     listOfFilters={listOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={onSubmit}
                    />
                </AccordionComponent>
                <InstrumentTypeToolbar/>
                <TableComponent data={data}
                                columnDefStructure={columnDefStructure}
                                rowId={['id']}
                                rowSelection={'single'}
                                setSelectedRows={setSelectedRows}
                />
            </div>
        </InstrumentTypeContext.Provider>
    );
}
