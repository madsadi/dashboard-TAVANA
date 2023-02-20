import React, {Fragment, useEffect, useRef, useState} from "react";
import {shouldEditObject as shouldEditObjectFn} from "../../store/marketRulesConfig";
import {addRule, filedList, remoteUrl, updateRule} from "../../api/market-rules-management.api";
import {useDispatch, useSelector} from "react-redux";
import {Accordion, Badge} from "flowbite-react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {toast} from "react-toastify";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function CreateNewRule() {
    const {shouldEditObject} = useSelector((state: any) => state.marketRulesConfig)
    const [name, setName] = useState<string>('')
    const [sequence, setSequence] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [status, setStatus] = useState({name: '', isActive: false});
    const [fieldOptions, setFieldOptions] = useState<{ name: string, displayName: string }[]>([])
    const [variableList, setVariableList] = useState<any>({name: '', fieldType: '', remoteUrl: '', displayName: ''})
    const [selectedOperator, setSelectedOperator] = useState<any>({name: '', symbol: ''})
    const [expression, setExpression] = useState<string[]>([])
    const [faExpression, setFaExpression] = useState<string[]>([])
    const [valueOptions, setValueOptions] = useState<string[]>([])
    const [value, setValue] = useState<string>('')

    const dispatch = useDispatch();
    const states = [
        {name: 'فعال', isActive: true},
        {name: 'غیر فعال', isActive: false},
    ];
    const operators = [
        {name: ')', symbol: ')'},
        {name: '(', symbol: '('},
        {name: 'و', symbol: '&&'},
        {name: 'یا', symbol: '||'},
        {name: 'جمع', symbol: '+'},
        {name: 'تفریق', symbol: '-'},
        {name: 'ضرب', symbol: 'X'},
        {name: 'تقسیم', symbol: '/'},
        {name: 'مساوی', symbol: '='},
        {name: 'بزرگتر', symbol: '>'},
        {name: 'کوچکتر', symbol: '<'},
        {name: 'بزرگتر یا مساوی', symbol: '>='},
        {name: 'کوچکتر یا مساوی', symbol: '<='},
        {name: 'شامل', symbol: 'contain'},
        {name: 'دقیقا شامل', symbol: 'exact'},
    ];

    const getValueFromRemoteUrl = async (api: string) => {
        await remoteUrl(api)
            .then(res => setValueOptions(res?.result))
            .catch(err => toast.error('نا موفق'))
    }

    const expressionTranslate = (expression: string) => {
        let _array = expression.split(' ')
        let _faArray: string[] = [];
        setExpression(_array)
        _array.map((item: any) => {
            if (fieldOptions?.find((field: any) => field.name === item)) {
                //@ts-ignore
                _faArray.push(`"${fieldOptions?.find((field: any) => field.name === item)?.displayName}"`)
                setFaExpression(_faArray)
            } else {
                _faArray.push(`"${item}"`)
                setFaExpression(_faArray)
            }
        })
    }

    useEffect(() => {
        if (shouldEditObject?.id) {
            setName(shouldEditObject?.name);
            setSequence(shouldEditObject?.sequenceNumber);
            setErrorMessage(shouldEditObject?.errorMessage);
            setStatus({name: shouldEditObject?.isActive ? 'فعال' : 'غیرفعال', isActive: shouldEditObject?.isActive});
            expressionTranslate(shouldEditObject?.expression)
        }
    }, [shouldEditObject?.id])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (variableList?.remoteUrl) {
            getValueFromRemoteUrl(variableList?.remoteUrl)
        }
    }, [variableList?.remoteUrl])

    const getFieldItems = async () => {
        await filedList()
            .then(res => setFieldOptions(res?.result))
            .catch(err => toast.error('نا موفق'))
    }

    useEffect(() => {
        getFieldItems()
    }, [])

    const remove = (index: number) => {
        expression.splice(index, 1)
        faExpression.splice(index, 1)
        setFaExpression([...faExpression])
        setExpression([...expression])
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        if (shouldEditObject?.id) {
            await updateRule({
                id: shouldEditObject.id,
                name: name,
                isActive: status.isActive,
                expression: expression.join(' '),
                sequenceNumber: sequence,
                errorMessage: errorMessage
            })
                .then(res => {
                    toast.success('با موفقیت انجام شد');
                    reset(e)
                })
                .catch(err => toast.error('نا موفق'))
        } else {
            await addRule({
                name: name,
                isActive: status.isActive,
                expression: expression.join(' '),
                sequenceNumber: sequence,
                errorMessage: errorMessage
            })
                .then(res => {
                    toast.success('با موفقیت انجام شد');
                    reset(e)
                })
                .catch(err => toast.error('نا موفق'))
        }
    }

    const reset = (e: any) => {
        e.preventDefault()
        dispatch(shouldEditObjectFn(null));
        setName('');
        setSequence(null);
        setErrorMessage('');
        setStatus({name: '', isActive: false});
        setValue('')
        setExpression([])
        setFaExpression([])
    }

    return (
        <>
            <Accordion alwaysOpen={true}>
                <Accordion.Panel>
                    <Accordion.Title style={{padding: '0.5rem'}}>
                        ثبت قانون جدید
                    </Accordion.Title>
                    <Accordion.Content style={{transition: 'all'}}>
                        <form onSubmit={submitForm}>
                            <div className={'grid grid-cols-4 gap-4'}>
                                <div>
                                    <label className={'block'} htmlFor="name">عنوان قانون</label>
                                    <input id="name" className={'w-full'} value={name}
                                           onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="sequence">مرتبه/اولویت</label>
                                    <input id={'sequence'} className={'w-full'} value={sequence}
                                           onChange={(e) => setSequence(e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="status">وضیعت</label>
                                    <div className="relative rounded">
                                        <Listbox value={status}
                                                 onChange={(e) => setStatus(e)}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{states.find((item: any) => item.isActive === status)?.name}</span>
                                                        </span>
                                                        <span className="pointer-events-none flex items-center mr-auto">
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
                                                            {states.map((side: any) => (
                                                                <Listbox.Option
                                                                    key={side.name}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={side.isActive}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {side.name}
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
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="CustomerTypeTitle">پیام خطا</label>
                                    <input className={'w-full'} id={'CustomerTypeTitle'} value={errorMessage}
                                           onChange={(e) => setErrorMessage(e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="fieldOptions">متغیر</label>
                                    <div className="relative rounded">
                                        <Listbox name={'fieldOptions'} value={variableList}
                                                 onChange={(e) => {
                                                     setVariableList(e);
                                                     setExpression([...expression, e?.name])
                                                     setFaExpression([...faExpression, `${e?.displayName}`])
                                                     // setVariableList({
                                                     //     name: '',
                                                     //     fieldType: '',
                                                     //     remoteUrl: '',
                                                     //     displayName: ''
                                                     // })
                                                 }}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{variableList.displayName}</span>
                                                        </span>
                                                        <span className="pointer-events-none flex items-center mr-auto">
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
                                                            {fieldOptions.map((option: any) => (
                                                                <Listbox.Option
                                                                    key={option.name}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={option}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {option.displayName}
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
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="operator">عملگر</label>
                                    <div className="relative rounded">
                                        <Listbox name={'status'} value={selectedOperator}
                                                 onChange={(e) => {
                                                     setSelectedOperator(e);
                                                     setExpression([...expression, e?.symbol])
                                                     setFaExpression([...faExpression, `"${e?.symbol}"`])
                                                     setSelectedOperator({name: '', symbol: ''})
                                                 }}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                <span className="flex items-center">
                                                    <span
                                                        className="ml-2 block truncate text-sm">{selectedOperator.name}</span>
                                                </span>
                                                        <span className="pointer-events-none flex items-center mr-auto">
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
                                                            {operators.map((operator: any) => (
                                                                <Listbox.Option
                                                                    key={operator.name}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={operator}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                            <span>
                                                                {operator.name}
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
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="value">مقدار</label>
                                    <div className={'flex'}>
                                        <div className="relative grow">
                                            <Listbox name={'status'} value={value}
                                                     onChange={(e) => setValue(e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer border rounded-r border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                    <span className="flex items-center">
                                                        <span
                                                            className="ml-2 block truncate text-sm">{value}</span>
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
                                                                <div className={'flex w-full p-1 items-center'}>
                                                                    <label className={'text-sm min-w-fit ml-2'} htmlFor="value">مقدار دلخواه:</label>
                                                                    <input id={'value'} className={'w-full'} onChange={(e)=>setValue(e.target.value)} value={value}/>
                                                                </div>
                                                                {valueOptions.map((value: any) => (
                                                                    <Listbox.Option
                                                                        key={value.id}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={value.id}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                <span>
                                                                    {value.title}
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
                                        <button
                                            className={`rounded-l ${value ? '' : 'bg-border text-gray-300'} shadow-sm border-r-0 px-2 border border-border`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                if (value) {
                                                    setExpression([...expression, value])
                                                    setFaExpression([...faExpression, `"${value}"`])
                                                }
                                            }
                                            }>اضافه
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={'flex space-x-reverse space-x-2 my-2'}>
                                    {faExpression.map((item: string, index) => {
                                        let appearance: any = <div className={'flex items-center cursor-pointer'}>{item}<XCircleIcon
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
                                <textarea className={'w-full border border-border rounded shadow-sm'} placeholder={'عبارت'}
                                          value={faExpression.join(' ')}
                                          readOnly rows={5} cols={30}/>
                                <div className={'text-left ltr my-2'}>
                                    <div>{expression.join(' ')}</div>
                                    <div className={'flex space-x-2 my-2'}>
                                        {expression.map((item: string, index) => {
                                            let appearance: any = <div
                                                className={'flex items-center cursor-pointer'}>{item} <XCircleIcon
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
                            <div className={'flex justify-end'}>
                                {shouldEditObject?.id && <button className={'rounded-full p-1 px-2 mt-5 bg-red-600 border-red-600'}
                                                                 onClick={reset}>لغو</button>}
                                <button type={'submit'}
                                        className={'mt-5 bg-lime-600 rounded-full p-1 px-2 mr-3'}>{shouldEditObject?.id ? "ثبت تغییرات" : "تایید و ثبت"}</button>
                            </div>
                        </form>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </>
    )
}