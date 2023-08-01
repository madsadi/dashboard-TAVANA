import React, { createContext, useState } from 'react';
import dynamic from 'next/dynamic'
const ToolBar = dynamic(() => import('./ToolBar'))
const TableComponent = dynamic(() => import('../common/table/table-component'))
const AccordionComponent = dynamic(() => import("../common/components/AccordionComponent"));
const SearchComponent = dynamic(() => import("../common/components/Search.component"));
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../common/functions/notification";
import DateCell from "../common/table/DateCell";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";

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
                    component: (props: any) => <DateCell date={props?.data?.fromActiveDateTime} />,
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
                    component: (props: any) => <DateCell date={props?.data?.toActiveDateTime} />,
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
                        <DateCell date={props.data.createDateTime} hideTime />
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
                    component: (props: any) => <DateCell date={props?.data?.updatedDateTime} />,
                };
            }
        }
    ]
    const { fetchAsyncData, query } = useQuery({})
    const [selectedRows, setSelectedRows] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState([])

    const submitHandler = (query: any) => {
        setLoading(true)
        fetchAsyncData({}, `${ADMIN_GATEWAY}/api/request/` + query?.api)
            .then((res) => setData(res?.data?.result))
            .catch(() => throwToast({ type: 'customError', value: 'نا موفق' }))
            .finally(() => setLoading(false))
    }

    return (
        <BookBuildingContext.Provider value={{ selectedRows, query, submitHandler }}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent onSubmit={submitHandler} loading={loading} module={ModuleIdentifier.BOOK_BUILDING} />
                </AccordionComponent>
                <ToolBar />
                <TableComponent data={data}
                    module={ModuleIdentifier.BOOK_BUILDING}
                    loading={loading}
                    columnDefStructure={columnDefStructure}
                    rowId={['instrumentId', 'createDateTime']}
                    rowSelection={'single'}
                    setSelectedRows={setSelectedRows}
                />
            </div>
        </BookBuildingContext.Provider>
    );
}
