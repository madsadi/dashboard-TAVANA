import Modal from "../common/Modal";
import React, {useContext, useEffect, useState} from "react";
import usePageStructure from "../../hooks/usePageStructure";
import { addNew } from "../../api/holdings";
import InputComponent from "../common/InputComponent";
import { toast } from "react-toastify";
import moment from "jalali-moment";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import {fetchData} from "../../api/clearedTradesReport";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import {CustomerManagement} from "../../pages/financialHoldings/[[...page]]";

export default function AddNew({ gridRef }: { gridRef: any }) {
    const {setTotal:setTotalCount,query:searchFilter} = useContext<any>(CustomerManagement)
    const [modal, setModal] = useState(false)
    const { page } = usePageStructure()
    const [query, setQuery] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    let initialValue: any = {};

    useEffect(()=>{
        setQuery(null)
    },[modal])

    useEffect(() => {
        if (page?.form) {
            (page?.form)?.map((item: any) => {
                initialValue[item.title] = null;
            })
            setQuery(initialValue)
        }
    }, [page?.form])

    const queryUpdate = (key: string, value: any) => {
        let _query: any = { ...query };
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
        await fetchData(`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search`, bodyConstructor(query))
            .then((res) => {
                if (res.result?.pagedData){
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
    const addNewHandler = async (e:any) => {
        if (query && Object.values(query)?.every((item: any) => item)) {
            const generateGridObject = (query: any) => {
                let _query: any = {};
                page.form.map((item: any) => {
                    _query[item.title] = query?.[item.title]
                })
                _query['createDateTime'] = moment().locale('en').format('YYYY-MM-DDTHH:mm:ss')
                return _query
            }
            await addNew(page.api, query)
                .then((res) => {
                    // gridRef.current.api.applyTransactionAsync({
                    //     add: [{ id: res?.result?.id, ...generateGridObject(query) }],
                    //     addIndex: 0
                    // })
                    onSubmit(e,searchFilter)
                    setModal(false);
                    setQuery(page?.form)
                })
                .catch((err) => {
                    toast.error(`${err?.response?.data?.error?.message}`)
                    setModal(false);
                    setQuery(page?.form)
                })
            setQuery(initialValue)
        } else {
            toast.warning('تمام ورودی ها اجباری می باشد.')
        }
    }

    return (
        <>
            <Modal title={` ایجاد${page?.searchFilter} جدید `} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            (page?.form)?.map((item: any) => {
                                return <InputComponent key={item.title} query={query} title={item?.title}
                                    name={item?.name} queryUpdate={queryUpdate} valueType={item?.valueType}
                                    type={item?.type} selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange} />
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-4'}>
                        <button className="p-1 px-3 rounded-full bg-red-500"
                            onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="p-1 px-3 rounded-full bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="p-1 px-2 rounded-full bg-lime-600 mx-2" onClick={() => setModal(true)}>جدید
            </button>
        </>
    )
}