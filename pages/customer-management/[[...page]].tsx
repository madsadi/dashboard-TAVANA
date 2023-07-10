import React, {useState, createContext, useEffect} from "react";
import dynamic from 'next/dynamic'
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const Toolbar = dynamic(() => import('../../components/customer-management/Toolbar'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
import usePageStructure from "../../hooks/usePageStructure";
import DetailComponent from "../../components/customer-management/Detail.component";
import useQuery from "../../hooks/useQuery";
import {ADMIN_GATEWAY} from "../../api/constants";
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";

export const CustomerManagement = createContext({})
export default function HoldingsSubPages() {
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const {page} = usePageStructure()
    const {data, loading, fetchData, query} = useQuery({url: `${ADMIN_GATEWAY}/api/request/${page?.api}/Search`})

    return (
        <CustomerManagement.Provider value={{fetchData, selectedRows, setSelectedRows, query}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier?.[`CUSTOMER_MANAGEMENT_${page?.api}`]}/>
                </AccordionComponent>
                <Toolbar/>
                <TableComponent data={data?.result?.pagedData}
                                loading={loading}
                                columnDefStructure={page?.columnsDefStructure}
                                rowId={['id']}
                                detailComponent={DetailComponent}
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