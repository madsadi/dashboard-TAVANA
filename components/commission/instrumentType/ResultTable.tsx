import React, {createContext, useState} from 'react';
import {commissionSearch} from "../../../api/commission.api";
import {toast} from "react-toastify";
import AccordionComponent from "../../common/components/AccordionComponent";
import TableComponent from "../../common/table/table-component";
import InputComponent from "../../common/components/InputComponent";
import InstrumentTypeToolbar from "./InstrumentTypeToolbar";

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

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const onSubmit = async (e: any, query: any) => {
        e.preventDefault()
        await commissionSearch(query)
            .then(res => setData(res?.result))
            .catch(() => toast.error('نا موفق'))
    };

    return (
        <InstrumentTypeContext.Provider value={{onSubmit,query,selectedRows}}>
            <div className={'relative flex flex-col grow overflow-hidden'}>
                <AccordionComponent>
                    <form onSubmit={(e) => onSubmit(e, query)}>
                        <div className="grid grid-cols-5 gap-4">
                            {
                                listOfFilters?.map((item: any) => {
                                    return <InputComponent key={item.title}
                                                           query={query}
                                                           title={item?.title}
                                                           name={item?.name}
                                                           queryUpdate={queryUpdate}
                                                           valueType={item?.valueType}
                                                           type={item?.type}
                                    />
                                })
                            }
                        </div>
                        <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                            <button className={'button bg-red-600'} onClick={(e) => {
                                e.preventDefault()
                                setQuery(initialValue)
                                onSubmit(e, initialValue)
                            }}>
                                لغو فیلتر ها
                            </button>
                            <button className={'button bg-lime-600'} type={'submit'}>
                                جستجو
                            </button>
                        </div>
                    </form>
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
