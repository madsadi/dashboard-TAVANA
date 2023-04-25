import React, {Fragment, useCallback, useContext, useEffect, useState} from "react";
import {addRule, filedList, remoteUrl, updateRule} from "../../api/market-rules-management.api";
import {toast} from "react-toastify";
import {operators} from '../../dictionary/Enums'
import Modal from "../common/layout/Modal";
import {Badge} from "flowbite-react";
import {XCircleIcon} from "@heroicons/react/24/outline";
import {MarketRulesContext} from "./RulesList";
import InputComponent from "../common/components/InputComponent";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import SymbolSearchSection from "../common/components/SymbolSearchSecion";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type queryType = {
    name: string,
    isActive: boolean,
    sequenceNumber: number,
    errorMessage: string
}
const initialQuery = {
    name: '',
    isActive: false,
    sequenceNumber: 0,
    errorMessage: ''
}
const listOfFilters = [
    {title: 'name', name: 'عنوان قانون', type: 'input'},
    {title: 'sequenceNumber', name: 'مرتبه/اولویت', type: 'input', valueType: 'number'},
    {title: 'isActive', name: 'وضیعت', type: 'selectInput'},
    {title: 'errorMessage', name: 'پیام خطا', type: 'input'},
]
const extraListOfFilters = [
    {title: 'variable', name: 'متغیر', type: 'dynamicSelectInput'},
    {title: 'operator', name: 'عملگر', type: 'selectInput'},
]
export default function Edit() {
    const [modal, setModal] = useState<boolean>(false)
    const {selectedRows,dynamicOptions,onSubmit,query:rulesQuery,setSelectedRows} = useContext<any>(MarketRulesContext)
    const [query, setQuery] = useState<queryType>(initialQuery)
    const [expressionQuery, setExpressionQuery] = useState<{ variable: any, operator: string, value: any, InstrumentId: string }>({
        variable: null,
        operator: '',
        value: '',
        InstrumentId: ''
    })
    const [valueOptions, setValueOptions] = useState<any>([])
    const [expression, setExpression] = useState<string[]>([])
    const [faExpression, setFaExpression] = useState<string[]>([])

    const expressionQueryUpdate = (key: string, value: any) => {
        let _query: any = {...expressionQuery};
        _query[key] = value
        setExpressionQuery(_query)

        if (key === 'InstrumentId') {
            _query.value = value
            setExpressionQuery(_query)
        }else{
            if (key === 'variable') {
                setExpression([...expression, value.name])
                setFaExpression([...faExpression, value.displayName])
            } else if (key === 'operator') {
                setExpression([...expression, value])
                setFaExpression([...faExpression, value])
            }
        }
    }

    const openUpdate = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }
    }

    useEffect(() => {
        expressionQueryUpdate('value','')
        if (expressionQuery.variable?.remoteUrl) {
            const getValueFromRemoteUrl = async (api: string) => {
                await remoteUrl(api)
                    .then(res => setValueOptions(res?.result))
                    .catch(() => toast.error('نا موفق'))
            }
            if (expressionQuery.variable?.displayName !== 'نماد') {
                getValueFromRemoteUrl(expressionQuery.variable?.remoteUrl)
            }
        }else{
            setValueOptions([])
        }
    }, [expressionQuery?.variable])

    const submitForm = async (e: any) => {
        e.preventDefault()
        if (selectedRows[0]?.id) {
            let _query = {
                id: selectedRows[0].id,
                expression: expression.join(' '),
                ...query
            }
            await updateRule(_query)
                .then(() => {
                    onSubmit(e,rulesQuery)
                    setSelectedRows([])
                    toast.success('با موفقیت انجام شد');
                    setModal(false)
                })
                .catch(() => toast.error('نا موفق'))
        }
    }

    const remove = (index: number) => {
        expression.splice(index, 1)
        faExpression.splice(index, 1)
        setFaExpression([...faExpression])
        setExpression([...expression])
    }

    const expressionTranslate = (expression: string) => {
        let _array = expression.split(' ')
        let _faArray: string[] = [];
        setExpression(_array)
        _array.map((item: any) => {
            if (dynamicOptions?.find((field: any) => field.name === item)) {
                //@ts-ignore
                _faArray.push(`"${dynamicOptions?.find((field: any) => field.name === item)?.displayName}"`)
                setFaExpression(_faArray)
            } else {
                _faArray.push(`"${item}"`)
                setFaExpression(_faArray)
            }
        })
    }
    useEffect(() => {
        if (!modal) {
            setExpressionQuery({variable: null, operator: '', value: '', InstrumentId: ''})
            setExpression([])
            setFaExpression([])
            setQuery(initialQuery)
        }else{
            if (selectedRows[0]){
                let _query: any = {name:selectedRows[0]?.name,sequenceNumber:selectedRows[0]?.sequenceNumber,errorMessage:selectedRows[0]?.errorMessage,isActive:selectedRows[0]?.isActive,};
                setQuery(_query)
                expressionTranslate(selectedRows[0]?.expression)
            }
        }
    }, [modal,selectedRows?.[0]])

    return (
        <>
            <button className="button bg-orange-500" onClick={openUpdate}>ویرایش</button>
            <Modal title={'ویرایش قانون'} setOpen={setModal} open={modal} ModalWidth={'max-w-5xl'}>
                <form onSubmit={submitForm}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        {
                            listOfFilters?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       setQuery={setQuery}
                                />
                            })
                        }
                        {
                            extraListOfFilters?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={expressionQuery}
                                                       item={item}
                                                       setQuery={setExpressionQuery}
                                                       queryUpdateAlternative={expressionQueryUpdate}
                                                       dynamicsOption={dynamicOptions}
                                />
                            })
                        }
                        <div className={'col-span-2 flex items-center'}>
                            <div className={'grow'}>
                                {expressionQuery?.variable?.displayName === 'نماد' ?
                                    <SymbolSearchSection query={expressionQuery} queryUpdate={expressionQueryUpdate}/> :
                                    <>
                                        <label className={'mt-auto'} htmlFor={'value'}>مقدار</label>
                                        <div className="relative rounded">
                                            <Listbox name={'value'} value={expressionQuery?.value}
                                                     onChange={(e) => expressionQueryUpdate('value', valueOptions.find((item: any) => item.id === e)?.title)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-r-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                <span className="flex items-center">
                                                    <span className="ml-2 block truncate text-sm">
                                                        {expressionQuery?.value}
                                                    </span>
                                                </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
                                                <ChevronDownIcon className="h-5 w-5 text-gray-400"
                                                                 aria-hidden="false"/>
                                            </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                className="absolute z-10 mt-1 min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                                {!expressionQuery?.variable?.isRemote && <input
                                                                    className={'w-full p-1.5 border border-border rounded-md'}
                                                                    type={expressionQuery?.variable?.valueType === 'int' ? 'number' : 'text'}
                                                                    value={expressionQuery?.value}
                                                                    onChange={(e) => expressionQueryUpdate('value', e.target.value)}/>}
                                                                {valueOptions.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.id}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.id}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.title}
                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span
                                                                                            className={classNames(
                                                                                                active ? '' : '',
                                                                                                'flex items-center mr-auto'
                                                                                            )}
                                                                                        >
                                                                            <CheckIcon className="h-5 w-5"
                                                                                       aria-hidden="true"/>
                                                                        </span>
                                                                                    ) : null}
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                )}
                                            </Listbox>
                                        </div>
                                    </>}
                            </div>
                            <button
                                className={`rounded-l ${expressionQuery?.value ? '' : 'bg-border text-gray-300'} h-[34px] mt-auto border-r-0 px-2 border border-border`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (expressionQuery?.variable?.fieldType === 'string') {
                                        setExpression([...expression, `\"${expressionQuery?.value}\"`])
                                        setFaExpression([...faExpression, `"${expressionQuery?.value}"`])
                                    } else {
                                        setExpression([...expression, valueOptions.length ? valueOptions.find((item:any)=>item.title === expressionQuery?.value).id:expressionQuery?.value])
                                        setFaExpression([...faExpression, `"${expressionQuery?.value}"`])
                                    }
                                }
                                }>اضافه
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className={'flex space-x-reverse space-x-2 my-5'}>
                            {faExpression.map((item: string, index) => {
                                let appearance: any = <div className={'flex items-center cursor-pointer text-sm'}>{item}<XCircleIcon
                                    className={'h-3 w-3 text-black'}/></div>
                                return (
                                    <Badge
                                        color="gray"
                                        key={index}
                                        onClick={() => remove(index)}>
                                        {appearance}
                                    </Badge>
                                )
                            })}
                        </div>
                        <textarea className={'w-full border border-border rounded shadow-sm'} placeholder={'عبارت'}
                                  value={faExpression.join(' ')}
                                  readOnly rows={5} cols={30}/>
                        <div className={'text-left ltr my-2'}>
                            <div>{expression.join(' ')}</div>
                            <div className={'flex space-x-2 my-2'}>
                                {expression.map((item: string, index) => {
                                    let appearance: any = <div
                                        className={'flex items-center cursor-pointer text-sm'}>{item} <XCircleIcon
                                        className={'h-3 w-3 text-black'}/></div>
                                    return (<Badge
                                        color="gray"
                                        key={index}
                                        onClick={() => remove(index)}
                                    >
                                        {appearance}
                                    </Badge>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2'}>
                        <button className={'button mt-5 bg-red-600'}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            setModal(false)
                                                        }}>
                            لغو
                        </button>
                        <button type={'submit'}
                                className={'button mt-5 bg-lime-600'}>ثبت تغییرات
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}