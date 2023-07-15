import React, {Fragment, useContext, useEffect, useMemo, useState} from "react";
import Modal from "../common/layout/Modal";
import {Badge} from "flowbite-react";
import {XCircleIcon} from "@heroicons/react/24/outline";
import InputComponent from "../common/components/InputComponent";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import SymbolSearchSection from "../common/components/SymbolSearchSecion";
import {MarketRulesContext} from "./RulesList";
import {throwToast} from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import {ADMIN_GATEWAY} from "../../api/constants";
import useQuery from "../../hooks/useQuery";
import {useSearchFilters} from "../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../common/functions/Module-Identifier";

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
    isActive: true,
    sequenceNumber: 1,
    errorMessage: ''
}
export default function AddNew() {
    const {toolbar} = useSearchFilters(ModuleIdentifier.MARKET_RULES_MANAGEMENT,'add')
    const {toolbar:extra} = useSearchFilters(ModuleIdentifier.MARKET_RULES_MANAGEMENT,'extraAdd')
    const {fetchData,dynamicOptions, query: rulesQuery} = useContext<any>(MarketRulesContext)
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/api/request/AddRule`})
    const {fetchAsyncData:remoteUrl} = useQuery({})
    const [modal, setModal] = useState<boolean>(false)
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
        } else {
            if (key === 'variable') {
                setExpression([...expression, value.name])
                setFaExpression([...faExpression, value.displayName])
            } else if (key === 'operator') {
                setExpression([...expression, value])
                setFaExpression([...faExpression, value])
            }
        }
    }

    useEffect(() => {
        expressionQueryUpdate('value', '')
        if (expressionQuery.variable?.remoteUrl) {
            const getValueFromRemoteUrl = async (api: string) => {
                await remoteUrl({},api)
                    .then(res => setValueOptions(res?.data?.result))
                    .catch(() => throwToast({type:'customError',value:'نا موفق'}))
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
        let _query = {
            expression: expression.join(' '),
            ...query
        }
        await mutate(_query)
            .then(() => {
                fetchData(rulesQuery)
                throwToast({type:'success',value:'با موفقیت انجام شد'});
                setModal(false)
            })
            .catch(() => throwToast({type:'customError',value:'نا موفق'}))
    }

    const remove = (index: number) => {
        expression.splice(index, 1)
        faExpression.splice(index, 1)
        setFaExpression([...faExpression])
        setExpression([...expression])
    }

    useEffect(() => {
        if (!modal) {
            setExpressionQuery({variable: null, operator: '', value: '', InstrumentId: ''})
            setExpression([])
            setFaExpression([])
            setQuery(initialQuery)
        }
    }, [modal])

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>قانون جدید</button>
            <Modal title={'قانون جدید'} setOpen={setModal} open={modal} ModalWidth={'max-w-5xl'}>
                <form onSubmit={submitForm}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        {
                            toolbar?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       onChange={onChange}
                                />
                            })
                        }
                        {
                            extra?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={expressionQuery}
                                                       item={item}
                                                       onChange={expressionQueryUpdate}
                                                       dynamicsOption={dynamicOptions}
                                />
                            })
                        }
                        <div className={'col-span-2 flex items-center'}>
                            <div className={'grow'}>
                                {expressionQuery?.variable?.displayName === 'نماد' ?
                                    <SymbolSearchSection query={expressionQuery} queryUpdate={expressionQueryUpdate}/> :
                                    <>
                                        <label className={'flex items-center mt-auto text-sm'} htmlFor={'value'}>
                                            مقدار
                                        </label>
                                        <div className="relative rounded">
                                            <Listbox name={'value'} value={expressionQuery?.value}
                                                     onChange={(e) => expressionQueryUpdate('value', valueOptions.find((item: any) => item.code === e)?.title)}>
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
                                                                        key={item.code}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.code}
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
                        <div className={'flex flex-wrap gap-2 my-5'}>
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
                            <div className={'flex flex-wrap gap-2 my-2'}>
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
                                className={'button mt-5 bg-lime-600'}>ثبت
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}