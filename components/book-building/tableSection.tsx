import React, {createContext, useState} from 'react';
import dynamic from 'next/dynamic'
import {jalali} from "../common/functions/common-funcions";
const ToolBar = dynamic(() => import('./ToolBar'))
const TableComponent = dynamic(() => import('../common/table/table-component'))
import AccordionComponent from "../common/components/AccordionComponent";
import {getBookBuilding} from "../../api/book-building.api";
import {toast} from "react-toastify";
import SearchComponent from "../common/components/Search.component";

const listOfFilters = [
    {title: 'api', name: 'دسته بندی', type: 'selectInput'},
]

const initialValue = {api:'GetAll'}
export const BookBuildingContext = createContext({})
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
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'faInsName',
            headerName: 'عنوان نماد',
            flex: 0,
            width: 150,
            minWidth: 150
        },
        {
            field: 'maxQuantity',
            headerName: 'بیشینه حجم سفارش',
        },
        {
            field: 'minPrice',
            headerName: 'حداقل قیمت سفارش',
        },
        {
            field: 'maxPrice',
            headerName: 'حداکثر قیمت سفارش',
        }, {
            field: 'fromActiveDateTime',
            headerName: 'زمان شروع',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.fromActiveDateTime).date}</span>
                            {/*<span>{jalali(props.data.fromActiveDateTime).time}</span>*/}
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'toActiveDateTime',
            headerName: 'زمان پایان',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.toActiveDateTime).date}</span>
                            {/*<span>{jalali(props.data.fromActiveDateTime).time}</span>*/}
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'createdBy',
            headerName: 'کاربر ایجاد کننده',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'createDateTime',
            headerName: 'زمان ایجاد',
            flex: 0,
            width: 120,
            minWidth: 120,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.createDateTime).date}</span>
                            {/*<span>{jalali(props.data.createDateTime).time}</span>*/}
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'updatedBy',
            headerName: 'کاربر تغییر دهنده',
            flex: 0,
            width: 120,
            minWidth: 120,
        },
        {
            field: 'updatedDateTime',
            headerName: 'زمان تغییر',
            flex: 0,
            width: 120,
            minWidth: 120,
            // cellRendererSelector: () => {
            //     const ColourCellRenderer = (props: any) => {
            //         return (
            //             <>
            //                 <span>{jalali(props.data.updatedDateTime).date}</span>
            //                 <span>{jalali(props.data.updatedDateTime).time}</span>
            //             </>
            //         )
            //     };
            //     const moodDetails = {
            //         component: ColourCellRenderer,
            //     }
            //     return moodDetails;
            // }
        }
    ]

    const [data, setData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [query, setQuery] = useState<{ api: any }>(initialValue)
    const onSubmit = async (event: any, query: { api: any }) => {
        event?.preventDefault()
        await getBookBuilding(query.api).then(res => {
            setData(res?.result);
            toast.success('با موفقیت انجام شد')
        })
            .catch(() => toast.success('نا موفق'))
    }

    return (
        <BookBuildingContext.Provider value={{selectedRows,query,onSubmit}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent query={query}
                                     setQuery={setQuery}
                                     listOfFilters={listOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={onSubmit}
                    />
                </AccordionComponent>
                <ToolBar/>
                <TableComponent data={data}
                                columnDefStructure={columnDefStructure}
                                rowId={['instrumentId']}
                                rowSelection={'single'}
                                setSelectedRows={setSelectedRows}
                />
            </div>
        </BookBuildingContext.Provider>
    );
}
