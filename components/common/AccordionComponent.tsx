import {Accordion} from "flowbite-react";
import React, {Dispatch} from "react";
import {fetchData} from "../../api/clearedTradesReport";
import {toast} from "react-toastify";
import InputComponent from "./InputComponent";

export default function AccordionComponent({
                                               initialValue,
                                               listOfFilters,
                                               gridRef,
                                               api,
                                               setTotalCount,
                                               query,
                                               setQuery,
                                               pagedData
                                           }: { initialValue: any, listOfFilters: any, gridRef: any, api: string, setTotalCount: Dispatch<number>, query: any, setQuery: Dispatch<any>,pagedData:boolean }) {

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const bodyConstructor = (query: any) => {
        let body: any = {}
        Object.keys(query).map((item: any) => {
            body[item] = query[item]
        })
        return body
    }

    const onSubmit = async (event: any,query:any) => {
        event.preventDefault()
        await fetchData(api, bodyConstructor(query))
            .then((res) => {
                if (pagedData){
                    gridRef?.current?.api?.setRowData(res.result?.pagedData)
                    setTotalCount(res?.result?.totalCount)
                    toast.success('با موفقیت انجام شد')
                }else{
                    gridRef?.current?.api?.setRowData(res?.result)
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
                                                               name={item?.name} queryUpdate={queryUpdate}
                                                               type={item?.type}/>
                                    })
                                }
                            </div>
                            <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                                <button className={'p-1 px-2 rounded-full bg-red-600'} onClick={(e) => {
                                    e.preventDefault()
                                    setQuery(initialValue)
                                    onSubmit(e,initialValue)
                                }}>
                                    لغو
                                </button>
                                <button className={'p-1 px-2 rounded-full bg-lime-600 '} type={'submit'}>
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