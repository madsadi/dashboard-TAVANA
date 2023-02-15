import React, {useEffect, useState, createContext} from "react";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import TablePagination from "../../components/common/table/TablePagination";
import Toolbar from "../../components/customer-management/Toolbar";
import usePageStructure from "../../hooks/usePageStructure";
import {useRouter} from "next/router";
import TableComponent from "../../components/common/table/table-component";
import {fetchData} from "../../api/clearedTradesReport";
import {toast} from "react-toastify";

export const CustomerManagement = createContext({})
export default function HoldingsSubPages() {
    const [query, setQuery] = useState<any>(null)
    const [initialValue, setInitialValue] = useState<any>({})
    const [totalCount, setTotal] = useState<any>(null);
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const {page} = usePageStructure()
    const router = useRouter()

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
        event.preventDefault()
        const bodyConstructor = (query: any) => {
            let body: any = {}
            Object.keys(query).map((item: any) => {
                body[item] = query[item]
            })
            return body
        }

        await fetchData(`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search`, bodyConstructor(query))
            .then((res) => {
                setData(res.result?.pagedData)
                setTotal(res?.result?.totalCount)
                toast.success('با موفقیت انجام شد')
            })
            .catch(() => toast.error('ناموفق'))
    }

    return (
        <CustomerManagement.Provider value={{data, setData,onSubmit,query,selectedProducts,setSelectedProducts}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent query={query}
                                    setQuery={setQuery}
                                    api={`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search`}
                                    listOfFilters={page?.listOfFilters}
                                    initialValue={initialValue}
                                    setTotalCount={setTotal}
                                    context={CustomerManagement}
                                    />
                <Toolbar/>
                <TableComponent columnDefStructure={page?.columnsDefStructure}
                                rowId={['id']}
                                detailComponent={HoldingsBranchesDetail}
                                rowSelection={'single'}
                                masterDetail={router.query?.page?.[0] === 'branch'}
                                context={CustomerManagement}
                                />
                <TablePagination query={query}
                                 api={`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search?`}
                                 setQuery={setQuery}
                                 totalCount={totalCount}
                                 context={CustomerManagement}
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