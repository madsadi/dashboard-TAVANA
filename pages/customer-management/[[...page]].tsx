import React, {useState, createContext, useEffect} from "react";
import dynamic from 'next/dynamic'
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const Toolbar = dynamic(() => import('../../components/customer-management/Toolbar'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
import usePageStructure from "../../hooks/usePageStructure";
import DetailComponent from "../../components/customer-management/Detail.component";
import useQuery from "../../hooks/useQuery";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";

export const CustomerManagement = createContext({})
export default function HoldingsSubPages() {
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [initialValue, setInitialValue] = useState<any>({PageNumber: 1, PageSize: 20});
    const {page} = usePageStructure()
    const {data,loading,fetchData,query} = useQuery({url:`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search`})


    useEffect(() => {
        if (page?.listOfFilters) {
            let _initialValue: any = initialValue;
            (page?.listOfFilters)?.map((item: any) => {
                if (item.title === 'date') {
                    _initialValue['StartDate'] = '';
                    _initialValue['EndDate'] = '';
                } else if (item.title !== 'PageNumber' && item.title !== 'PageSize') {
                    _initialValue[item.title] = '';
                }
            })
            setInitialValue(_initialValue)
        }
    }, [page?.listOfFilters])

    return (
        <CustomerManagement.Provider value={{fetchData, selectedRows, setSelectedRows, query}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent listOfFilters={page?.listOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={fetchData}
                    />
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