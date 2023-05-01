import React, {createContext, useState} from 'react';
import dynamic from 'next/dynamic'
import {jalali} from "../common/functions/common-funcions";
const ToolBar = dynamic(() => import('./ToolBar'))
const TableComponent = dynamic(() => import('../common/table/table-component'))
import AccordionComponent from "../common/components/AccordionComponent";
import SearchComponent from "../common/components/Search.component";
import useQuery from "../../hooks/useQuery";
import {ADMIN_GATEWAY} from "../../api/constants";
import {throwToast} from "../common/functions/notification";
import DateCell from "../common/table/DateCell";

const listOfFilters = [
    {title: 'api', name: 'دسته بندی', type: 'selectInput'},
]

const initialValue = {api:'GetAll'}
export const BookBuildingContext = createContext({})
export default function BookBuilding() {
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
            width: 200,
            minWidth: 200,
            cellRendererSelector: () => {
                return {
                    component: (props:any)=><DateCell date={props?.data?.fromActiveDateTime}/>,
                };
            }
        },
        {
            field: 'toActiveDateTime',
            headerName: 'زمان پایان',
            flex: 0,
            width: 200,
            minWidth: 200,
            cellRendererSelector: () => {
                return {
                    component: (props:any)=><DateCell date={props?.data?.toActiveDateTime}/>,
                };
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
            width: 200,
            minWidth: 200,
            cellRendererSelector: () => {
                return {
                    component: (props:any)=><DateCell date={props?.data?.updatedDateTime}/>,
                };
            }
        }
    ]
    const {fetchAsyncData,query,loading} = useQuery({})
    const [selectedRows, setSelectedRows] = useState([])
    const [data, setData] = useState([])

    const submitHandler = (query:any)=>{
        fetchAsyncData({},`${ADMIN_GATEWAY}/request/`+query?.api)
            .then((res)=>setData(res?.data?.result))
            .catch(() => throwToast({type:'customError',value:'نا موفق'}))
    }

    return (
        <BookBuildingContext.Provider value={{selectedRows,query,submitHandler}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent listOfFilters={listOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={submitHandler}
                    />
                </AccordionComponent>
                <ToolBar/>
                <TableComponent data={data}
                                loading={loading}
                                columnDefStructure={columnDefStructure}
                                rowId={['instrumentId','createdBy']}
                                rowSelection={'single'}
                                setSelectedRows={setSelectedRows}
                />
            </div>
        </BookBuildingContext.Provider>
    );
}
