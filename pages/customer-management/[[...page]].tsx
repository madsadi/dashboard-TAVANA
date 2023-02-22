import React, {useEffect, useState, createContext} from "react";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import TablePagination from "../../components/common/table/TablePagination";
import Toolbar from "../../components/customer-management/Toolbar";
import usePageStructure from "../../hooks/usePageStructure";
import TableComponent from "../../components/common/table/table-component";
import {customerManagement} from "../../api/customer-management.api";
import {toast} from "react-toastify";
import SearchComponent from "../../components/common/components/Search.component";

export const CustomerManagement = createContext({})
export default function HoldingsSubPages() {
    const [query, setQuery] = useState<any>(null)
    const [initialValue, setInitialValue] = useState<any>({})
    const [totalCount, setTotal] = useState<any>(0);
    const [selectedRows, setSelectedRows] = useState<any>([]);

    const [data, setData] = useState<any>([]);
    const {page} = usePageStructure()

    useEffect(() => {
        if (page?.listOfFilters) {
            let initialValue: any = {PageNumber: 1, PageSize: 20};
            (page?.listOfFilters)?.map((item: any) => {
                if (item.title === 'date') {
                    initialValue['StartDate'] = '';
                    initialValue['EndDate'] = '';
                } else if (item.title !== 'PageNumber' && item.title !== 'PageSize') {
                    initialValue[item.title] = '';
                }
            })
            setQuery(initialValue)
            setInitialValue(initialValue)
        }
    }, [page?.listOfFilters])

    const onSubmit = async (event: any, query: any) => {
        event?.preventDefault()
        const bodyConstructor = (query: any) => {
            let body: any = {}
            Object.keys(query).map((item: any) => {
                body[item] = query[item]
            })
            return body
        }

        await customerManagement(page?.api, query)
            .then((res) => {
                setData(res.result?.pagedData)
                setTotal(res?.result?.totalCount)
                toast.success('با موفقیت انجام شد')
            })
            .catch((err) => {
                toast.error(`${err?.response?.data.error?.message}`)
            })
    }

    return (
        <CustomerManagement.Provider value={{onSubmit, selectedRows, setSelectedRows, query}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent query={query}
                                     setQuery={setQuery}
                                     listOfFilters={page?.listOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={onSubmit}
                    />
                </AccordionComponent>
                <Toolbar/>
                <TableComponent data={data}
                                columnDefStructure={page?.columnsDefStructure}
                                rowId={['id']}
                                detailComponent={HoldingsBranchesDetail}
                                rowSelection={'single'}
                                masterDetail={true}
                                setSelectedRows={setSelectedRows}
                                selectedRows={selectedRows}
                />
                <TablePagination onSubmit={onSubmit}
                                 query={query}
                                 setQuery={setQuery}
                                 totalCount={totalCount}
                />
            </div>
        </CustomerManagement.Provider>
    )
}

export const HoldingsBranchesDetail = ({data}: { data: any }) => {
    return (<div className={'p-5'}>
        شناسه آدرس:
        <span className={'mx-2'}>
            {data?.address?.id}
        </span>
    </div>)
}