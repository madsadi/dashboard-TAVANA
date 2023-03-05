import React, {useEffect, useState, createContext} from "react";
import dynamic from 'next/dynamic'
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const Toolbar = dynamic(() => import('../../components/customer-management/Toolbar'))
const TablePagination = dynamic(() => import('../../components/common/table/TablePagination'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
import usePageStructure from "../../hooks/usePageStructure";
import {customerManagement} from "../../api/customer-management.api";
import {toast} from "react-toastify";
import ContractDetail from "../../components/customer-management/ContractDetail";

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
                                detailComponent={page?.api === 'contract' ? ContractDetail:HoldingsBranchesDetail}
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