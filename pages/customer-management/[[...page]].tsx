import React, {useEffect, useState, createContext} from "react";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import TablePagination from "../../components/common/table/TablePagination";
import Toolbar from "../../components/customer-management/Toolbar";
import usePageStructure from "../../hooks/usePageStructure";
import TableComponent from "../../components/common/table/table-component";
import {fetchData} from "../../api/clearedTradesReport";
import {toast} from "react-toastify";
import InputComponent from "../../components/common/components/InputComponent";
import {DayRange} from "react-modern-calendar-datepicker";

export const CustomerManagement = createContext({})
export default function HoldingsSubPages() {
    const [query, setQuery] = useState<any>(null)
    const [initialValue, setInitialValue] = useState<any>({})
    const [totalCount, setTotal] = useState<any>(0);
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    const [data, setData] = useState<any>([]);
    const {page} = usePageStructure()

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }


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
        <CustomerManagement.Provider value={{onSubmit,selectedRows,setSelectedRows,query}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <form onSubmit={(e) => onSubmit(e, query)}>
                        <div className="grid grid-cols-5 gap-4">
                            {
                                (page?.listOfFilters)?.map((item: any) => {
                                    return <InputComponent key={item.title}
                                                           query={query}
                                                           title={item?.title}
                                                           name={item?.name}
                                                           queryUpdate={queryUpdate}
                                                           valueType={item?.valueType}
                                                           type={item?.type}
                                                           selectedDayRange={selectedDayRange}
                                                           setSelectedDayRange={setSelectedDayRange}/>
                                })
                            }
                        </div>
                        <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                            <button className={'button bg-red-600'} onClick={(e) => {
                                e.preventDefault()
                                setQuery(initialValue)
                                setSelectedDayRange({from: null, to: null})
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
                <TablePagination setData={setData}
                                 query={query}
                                 api={`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search?`}
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