import React, {useState, useEffect, useRef, Fragment, useMemo, useCallback} from 'react';
import {addRule, filedList, remoteUrl, rulesList, updateRule} from "../../api/marketRulesManagement";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {shouldEditObject as shouldEditObjectFn, shouldEditObject} from "../../store/marketRulesConfig";
import {useDispatch, useSelector} from "react-redux";
import {validate as uuidValidate} from 'uuid';
import {toast} from "react-toastify";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {AgGridReact} from "ag-grid-react";
import RulesExpressionDetail from "../marketRulesManagement/RulesExpressionDetail";
import {formatNumber, jalali} from "../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../common/customOverlay";
import Modal from '../common/Modal';
import {Badge} from "flowbite-react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function RulesList() {


    const columnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
        },
        {
            field: 'id',
            headerName: 'شناسه',
            cellRenderer: 'agGroupCellRenderer',
            flex:0,
            width:90,
            minWidth:90
        },
        {
            field: 'name',
            headerName: 'نام قانون',
        },
        {
            field: 'errorMessage',
            headerName: 'پیام خطا',
        },
        {
            field: 'sequenceNumber',
            headerName: 'مرتبه/اولویت',
            flex:0,
            width:120,
            minWidth:120
        },
        {
            field: 'createDateTime',
            headerName: 'زمان ایجاد',
            flex:0,
            width:170,
            minWidth:170,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.createDateTime).date}</span>
                            <span className={'ml-2'}>{jalali(props.data.createDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'createBy',
            headerName: 'کاربر ایجاد کننده',
            flex:0,
            width:150,
            minWidth:150
        }, {
            field: 'updatedDateTime',
            headerName: 'زمان تغییر',
            flex:0,
            width:170,
            minWidth:170,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.updatedDateTime).date}</span>
                            <span className={'ml-2'}>{jalali(props.data.updatedDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'updatedBy',
            headerName: 'کاربر تغییر دهنده',
            flex:0,
            width:150,
            minWidth:150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            {uuidValidate(props.data.updatedBy) ? '-' : props.data.updatedBy}
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'userIP',
            headerName: 'آی پی کاربر',
            flex:0,
            width:120,
            minWidth:120
        }
    ]

    const [modal, setModal] = useState<boolean>(false);
    const [status, setStatus] = useState({name: '', isActive: null})
    const [name, setName] = useState<any>(null);
    const [query, setQuery] = useState<any>(null);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const states = [
        {name: 'فعال', isActive: true},
        {name: 'غیر فعال', isActive: false},
        {name: 'همه', isActive: null}
    ];

    const dispatch = useDispatch()


    //Grid
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            flex: 1,
            valueFormatter: formatNumber
        };
    }, []);
    const onGridReady = async (query:any) => {
        await rulesList(query)
            .then(res => gridRef.current.api.setRowData(res?.result))
            .catch(err => toast.error('نا موفق'))
    };
    const getRowId = useCallback((params: any) => {
        return params.data.id
    }, []);
    const loadingOverlayComponent = useMemo(() => {
        return LoadingOverlay;
    }, []);
    const loadingOverlayComponentParams = useMemo(() => {
        return {
            loadingMessage: 'در حال بارگزاری...',
        };
    }, []);
    const noRowsOverlayComponent = useMemo(() => {
        return NoRowOverlay;
    }, []);
    const noRowsOverlayComponentParams = useMemo(() => {
        return {
            noRowsMessageFunc: () => 'هنوز معامله ای ثبت نشده.',
        };
    }, []);
    //Grid

    const leftToolbarTemplate = () => {
        const openUpdate = () => {
            let selectedProducts = gridRef.current?.api?.getSelectedRows();
            if (selectedProducts.length === 1) {
                dispatch(shouldEditObject(selectedProducts[0]))
                setModal(true)
                if (typeof window !== undefined) {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    });
                }
            } else {
                toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
            }
        }

        return (
            <>
                <button className="rounded-full p-1 px-2 bg-orange-500" onClick={openUpdate}>تغییر</button>
                <button className="rounded-full p-1 px-2 bg-orange-500" onClick={(e)=> {
                    reset(e)
                    setModal(true);
                }}>قانون جدید</button>
            </>
        )
    }

    const header = () => {
        const dateRangeHandler = (selectedDayRange: any) => {
            if (selectedDayRange.from && selectedDayRange.to) {
                return ` از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}    تا   ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day} `
            } else if (!selectedDayRange.from && !selectedDayRange.to) {
                return ''
            } else if (!selectedDayRange.from) {
                return ''
            } else if (!selectedDayRange.to) {
                return `  از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا اطلاع ثانویه  `
            }
        }

        const renderCustomInput = ({ref}: { ref: any }) => (
            <div>
                <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
                <input readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
            </div>
        )

        return (
            <div className={'flex items-center space-x-reverse space-x-2 text-sm p-2'}>
                <div>
                    <label className={'block'} htmlFor="CustomerTypeTitle">وضیعت</label>
                    <div className="relative rounded">
                        <Listbox name={'status'} value={query?.isActive}
                                 onChange={(e) => setQuery({...query,isActive:e})}>
                            {({open}) => (
                                <div className="relative">
                                    <Listbox.Button
                                        className="relative flex min-w-[100px] cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{states.find((item: any) => item.isActive === query?.isActive)?.name}</span>
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
                                            {states.map((status: any) => (
                                                <Listbox.Option
                                                    key={status.name}
                                                    className={({active}) =>
                                                        classNames(
                                                            active ? 'bg-border' : '',
                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                        )
                                                    }
                                                    value={status.isActive}
                                                >
                                                    {({selected, active}) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {status.name}
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
                    <DatePicker
                        value={selectedDayRange}
                        onChange={(e) => {
                            setSelectedDayRange(e);
                            if (e.from) {
                                setQuery({
                                    ...query,
                                    createDateTimeFrom: `${e.from?.year}-${e.from?.month}-${e.from?.day}`
                                })
                            }
                            if (e.to) {
                                setQuery({
                                    ...query,
                                    createDateTimeTo: `${e.to?.year}-${e.to?.month}-${e.to?.day}`
                                })
                            }
                        }}
                        shouldHighlightWeekends
                        renderInput={renderCustomInput}
                        locale={'fa'}
                        calendarPopperPosition={'bottom'}
                        renderFooter={() => (
                            <div style={{display: 'flex', justifyContent: 'center', padding: '1rem 2rem'}}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedDayRange({from: null, to: null})
                                        setQuery({...query,createDateTimeFrom:null,createDateTimeTo:null})
                                    }}
                                >
                                    لغو
                                </button>
                            </div>
                        )}
                    />
                </div>
                <div>
                    <label className={'block'} htmlFor="name">عنوان قانون</label>
                    <input id="name" className={'w-full'} value={query?.name}
                           onChange={(e) => setQuery({...query,name:e.target.value})}/>
                </div>
                <div className={'flex grow items-center space-x-reverse space-x-2 justify-end'}>
                    {leftToolbarTemplate()}
                    {/*{rightToolbarTemplate()}*/}
                    <button className="rounded-full p-1 px-2 bg-lime-600" onClick={()=>onGridReady(query)}>جستجو</button>
                </div>
            </div>
        )
    }

    //modal
    const {shouldEditObject:edit} = useSelector((state: any) => state.marketRulesConfig)
    const [nameModal, setNameModal] = useState<string>('')
    const [sequence, setSequence] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [statusModal, setStatusModal] = useState({name: '', isActive: false});
    const [fieldOptions, setFieldOptions] = useState<{ name: string, displayName: string }[]>([])
    const [variableList, setVariableList] = useState<any>({name: '', fieldType: '', remoteUrl: '', displayName: ''})
    const [selectedOperator, setSelectedOperator] = useState<any>({name: '', symbol: ''})
    const [expression, setExpression] = useState<string[]>([])
    const [faExpression, setFaExpression] = useState<string[]>([])
    const [valueOptions, setValueOptions] = useState<string[]>([])
    const [value, setValue] = useState<string>('')

    const operators = [
        {name: ')', symbol: ')'},
        {name: '(', symbol: '('},
        {name: 'و', symbol: '&&'},
        {name: 'یا', symbol: '||'},
        {name: 'جمع', symbol: '+'},
        {name: 'تفریق', symbol: '-'},
        {name: 'ضرب', symbol: '*'},
        {name: 'تقسیم', symbol: '/'},
        {name: 'مساوی', symbol: '='},
        {name: 'مخالف', symbol: '!='},
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
        if (edit?.id) {
            setNameModal(edit?.name);
            setSequence(edit?.sequenceNumber);
            setErrorMessage(edit?.errorMessage);
            setStatusModal(edit?.isActive);
            expressionTranslate(edit?.expression)
        }
    }, [edit?.id])// eslint-disable-line react-hooks/exhaustive-deps

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

    const addToTable=useCallback((query:any)=>{
        gridRef.current?.api?.applyTransaction({
            addIndex: 0,
            add: [query]
        })
    },[])

    const UpdateTable=useCallback((query:any)=>{
        gridRef.current?.api?.applyTransaction({
            update: [query]
        })
    },[])

    const submitForm = async (e: any,query:any) => {
        e.preventDefault()
        if (edit?.id) {
            await updateRule(query)
                .then(res => {
                    toast.success('با موفقیت انجام شد');
                    reset(e)
                    UpdateTable(query)
                })
                .catch(err => toast.error('نا موفق'))
        } else {
            await addRule(query)
                .then((res) => {
                    toast.success('با موفقیت انجام شد');
                    reset(e)
                    addToTable({...query,id:res?.result.id})
                })
                .catch(() => toast.error('نا موفق'))
        }
    }

    const reset = (e: any) => {
        e.preventDefault()
        dispatch(shouldEditObjectFn(null));
        setName('');
        setSequence(null);
        setErrorMessage('');
        setStatusModal({name: '', isActive: false});
        setValue('')
        setExpression([])
        setFaExpression([])
    }

    //modal

    return (
        <div className={'relative flex flex-col grow overflow-hidden border border-border rounded'}>
            <Modal title={edit?.id ? 'ویرایش قانون':'ثبت قانون جدید'} setOpen={setModal} open={modal} ModalWidth={'max-w-5xl'}>
                <form onSubmit={(e)=>submitForm(e,edit?.id ? {
                    id: edit.id,
                    name: nameModal,
                    isActive: statusModal,
                    expression: expression.join(' '),
                    sequenceNumber: Number(sequence),
                    errorMessage: errorMessage
                }:{
                    name: name,
                    isActive: status.isActive,
                    expression: expression.join(' '),
                    sequenceNumber: Number(sequence),
                    errorMessage: errorMessage
                })}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        <div>
                            <label className={'block'} htmlFor="name">عنوان قانون</label>
                            <input id="name" className={'w-full'} value={edit?.id ? nameModal:name}
                                   onChange={(e) =>edit?.id ? setNameModal(e.target.value):setName(e.target.value)}/>
                        </div>
                        <div>
                            <label className={'block'} htmlFor="sequence">مرتبه/اولویت</label>
                            <input id={'sequence'} className={'w-full'} value={sequence}
                                   onChange={(e) => setSequence(e.target.value)}/>
                        </div>
                        <div>
                            <label className={'block'} htmlFor="status">وضیعت</label>
                            <div className="relative rounded">
                                <Listbox value={edit?.id ? statusModal:status}
                                         onChange={(e:any) =>edit?.id ? setStatusModal(e):setStatus(e)}>
                                    {({open}) => (
                                        <div className="relative">
                                            <Listbox.Button
                                                className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{states.find((item: any) => item.isActive === statusModal)?.name}</span>
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
                        <div className={'col-span-2'}>
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
                        <div className={'flex space-x-reverse space-x-2 my-5'}>
                            {faExpression.map((item: string, index) => {
                                let appearance: any = <div className={'flex items-center cursor-pointer text-sm'}>{item}<XCircleIcon
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
                    <div className={'flex justify-end'}>
                        {edit?.id && <button className={'rounded-full p-1 px-2 mt-5 bg-red-600 border-red-600'}
                                                         onClick={reset}>لغو</button>}
                        <button type={'submit'}
                                className={'mt-5 bg-lime-600 rounded-full p-1 px-2 mr-3'}>{edit?.id ? "ثبت تغییرات" : "تایید و ثبت"}</button>
                    </div>
                </form>
            </Modal>
            <div>
                {header()}
            </div>
            <div className={'relative grow'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        defaultColDef={defaultColDef}
                        loadingOverlayComponent={loadingOverlayComponent}
                        loadingOverlayComponentParams={loadingOverlayComponentParams}
                        noRowsOverlayComponent={noRowsOverlayComponent}
                        noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                        rowHeight={35}
                        headerHeight={35}
                        animateRows={true}
                        getRowId={getRowId}
                        asyncTransactionWaitMillis={1000}
                        columnHoverHighlight={true}
                        detailCellRenderer={'myDetailCellRenderer'}
                        detailRowHeight={100}
                        onGridReady={()=>onGridReady({})}
                        frameworkComponents={{myDetailCellRenderer: RulesExpressionDetail}}
                        masterDetail={true}
                        rowSelection={'single'}
                    />
                </div>
            </div>
        </div>
    );
}
