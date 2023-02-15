import {Accordion} from "flowbite-react";
import React, {Dispatch, useContext, useState} from "react";
import {fetchData} from "../../../api/clearedTradesReport";
import {toast} from "react-toastify";
import InputComponent from "./InputComponent";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {CustomerManagement} from "../../../pages/customer-management/[[...page]]";

export default function AccordionComponent({
                                               initialValue,
                                               listOfFilters,
                                               api,
                                               setTotalCount,
                                               query,
                                               setQuery,
                                               context
                                           }: { initialValue: any, listOfFilters: any, api: string, setTotalCount: Dispatch<number>, query: any, setQuery: Dispatch<any>,pagedData:boolean,context:any }) {
    const {setData} = useContext<any>(context)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const onSubmit = async (event: any,query:any) => {
        event.preventDefault()
        const bodyConstructor = (query: any) => {
            let body: any = {}
            Object.keys(query).map((item: any) => {
                body[item] = query[item]
            })
            return body
        }

        await fetchData(api, bodyConstructor(query))
            .then((res) => {
                if (res.result?.pagedData){
                    setData(res.result?.pagedData)
                    setTotalCount(res?.result?.totalCount)
                    toast.success('با موفقیت انجام شد')
                }else{
                    setData(res?.result)
                    setTotalCount(res?.totalRecord)
                    toast.success('با موفقیت انجام شد')
                }
            })
            .catch(() => toast.error('ناموفق'))
    }

    return (
        <React.StrictMode>
            <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                <Accordion.Panel>
                    <Accordion.Title style={{padding: '0.5rem'}}>
                        جستجو
                    </Accordion.Title>
                    <Accordion.Content style={{transition: 'all'}}>
                        <form onSubmit={(e)=>onSubmit(e,query)}>
                            <div className="grid grid-cols-5 gap-4">
                                {
                                    listOfFilters?.map((item: any) => {
                                        return <InputComponent key={item.title} query={query} title={item?.title}
                                                               name={item?.name} queryUpdate={queryUpdate} valueType={item?.valueType}
                                                               type={item?.type} selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange}/>
                                    })
                                }
                            </div>
                            <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                                <button className={'button bg-red-600'} onClick={(e) => {
                                    e.preventDefault()
                                    setQuery(initialValue)
                                    setSelectedDayRange({from:null,to:null})
                                    onSubmit(e,initialValue)
                                }}>
                                    لغو فیلتر ها
                                </button>
                                <button className={'button bg-lime-600'} type={'submit'}>
                                    جستجو
                                </button>
                            </div>
                        </form>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </React.StrictMode>
    )
}

AccordionComponent.defaultProps = {
    pagedData: false,
};