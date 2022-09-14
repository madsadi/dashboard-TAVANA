import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {shouldEditObject as shouldEditObjectFn} from "../../store/marketRulesConfig";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {addRule, filedList, remoteUrl, updateRule} from "../../api/marketRulesManagement";
import {Toast} from "primereact/toast";
import {Chip} from "primereact/chip";
import {useDispatch, useSelector} from "react-redux";

export default function CreateNewRule() {
    const {shouldEditObject} = useSelector((state: any) => state.marketRulesConfig)
    const [name, setName] = useState<string>('')
    const [sequence, setSequence] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [status, setStatus] = useState({name: '', isActive: false});
    const [fieldOptions, setFieldOptions] = useState<string[]>([])
    const [variableList, setVariableList] = useState<any>({name: '', fieldType: '', remoteUrl: '', displayName: ''})
    const [selectedOperator, setSelectedOperator] = useState<any>({name: '', symbol: ''})
    const [expression, setExpression] = useState<string[]>([])
    const [faExpression, setFaExpression] = useState<string[]>([])
    const [valueOptions, setValueOptions] = useState<string[]>([])
    const [value, setValue] = useState<string>('')

    const toast: any = useRef(null);

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
            .catch(err => toast.current?.show({
                severity: 'error',
                summary: 'مشکلی رخ داده است',
                detail: err?.response?.data?.title,
                life: 6000
            }))
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
    }, [shouldEditObject?.id])

    useEffect(() => {
        if (variableList?.remoteUrl) {
            getValueFromRemoteUrl(variableList?.remoteUrl)
        }
    }, [variableList?.remoteUrl])

    const getFieldItems = async () => {
        await filedList()
            .then(res => setFieldOptions(res?.result))
            .catch(err => toast.current?.show({
                severity: 'error',
                summary: 'مشکلی رخ داده است',
                detail: err?.response?.data?.title,
                life: 6000
            }))
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
                    toast.current?.show({
                        severity: 'success',
                        summary: 'با موفقیت انجام شد',
                        detail: 'با موفقیت اضافه شد',
                        life: 6000
                    });
                    reset(e)
                })
                .catch(err => toast.current?.show({
                    severity: 'error',
                    summary: 'مشکلی رخ داده است',
                    detail: err?.response?.data?.title,
                    life: 6000
                }))
        } else {
            await addRule({
                name: name,
                isActive: status.isActive,
                expression: expression.join(' '),
                sequenceNumber: sequence,
                errorMessage: errorMessage
            })
                .then(res => {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'با موفقیت انجام شد',
                        detail: 'با موفقیت اضافه شد',
                        life: 6000
                    });
                    reset(e)
                })
                .catch(err => toast.current?.show({
                    severity: 'error',
                    summary: 'مشکلی رخ داده است',
                    detail: err?.response?.data?.title,
                    life: 6000
                }))
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
            <Toast ref={toast} position="top-center"/>
            <Card>
                <form onSubmit={submitForm}>
                    <div>
                        <div className={'grid'}>
                            <div className={'col'}>
                                <div className="p-float-label py-2 h-fit">
                                    <InputText id="name" className={'w-full'} value={name}
                                               onChange={(e) => setName(e.target.value)}/>
                                    <label htmlFor="name">عنوان قانون</label>
                                </div>
                            </div>
                            <div className={'col'}>
                                <div className="p-float-label py-2 h-fit">
                                    <InputNumber className={'w-full'} inputId="sequence" value={sequence}
                                                 onChange={(e) => setSequence(e.value)} mode="decimal"
                                                 useGrouping={false}/>
                                    <label htmlFor="sequence">مرتبه/اولویت</label>
                                </div>
                            </div>
                            <div className={'col'}>
                                <div className="p-float-label py-2 h-fit">
                                    <Dropdown value={status} options={states} className={'w-full'}
                                              onChange={(e) => setStatus(e.target.value)} optionLabel={'name'}/>
                                    <label htmlFor="CustomerTypeTitle">وضیعت</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="p-float-label py-2">
                                    <InputText className={'w-full'} value={errorMessage}
                                               onChange={(e) => setErrorMessage(e.target.value)}/>
                                    <label htmlFor="CustomerTypeTitle">پیام خطا</label>
                                </div>
                            </div>
                        </div>
                        <div className={'grid mt-4'}>
                            <div className={'col'}>
                                <div className="p-float-label py-2 h-fit">
                                    <Dropdown value={variableList} filter filterBy="name,displayName"
                                              className={'w-full'} options={fieldOptions}
                                              onChange={(e) => {
                                                  setVariableList(e.target.value);
                                                  setExpression([...expression, e.target.value?.name])
                                                  setFaExpression([...faExpression, `"${e.target.value?.displayName}"`])
                                                  setVariableList({
                                                      name: '',
                                                      fieldType: '',
                                                      remoteUrl: '',
                                                      displayName: ''
                                                  })
                                              }} optionLabel={'displayName'}/>
                                    <label htmlFor="name">متغیر </label>
                                </div>
                            </div>
                            <div className={'col'}>
                                <div className="p-float-label py-2 h-fit">
                                    <Dropdown value={selectedOperator} filter filterBy="name" className={'w-full'}
                                              options={operators}
                                              onChange={(e) => {
                                                  setSelectedOperator(e.target.value);
                                                  setExpression([...expression, e.target.value?.symbol])
                                                  setFaExpression([...faExpression, `"${e.target.value?.symbol}"`])
                                                  setSelectedOperator({name: '', symbol: ''})
                                              }} optionLabel={'name'}/>
                                    <label htmlFor="name">عملگر</label>
                                </div>
                            </div>
                            <div className={'col'}>
                                <div className="p-inputgroup">
                                    <div className={'p-float-label py-2 h-fit'}>
                                        <Dropdown value={value} filter editable filterBy="value"
                                                  className={'w-full border-round-right'}
                                                  options={valueOptions}
                                                  onChange={(e) => setValue(e.target.value)} optionLabel={'value'}/>
                                        <label htmlFor="name">مقدار</label>
                                    </div>
                                    <Button
                                        className={`border-noround-right border-round-left my-2 ${value ? '' : 'surface-300'} border-300`}
                                        label="اضافه" onClick={(e) => {
                                        e.preventDefault()
                                        if (value) {
                                            setExpression([...expression, value])
                                            setFaExpression([...faExpression, `"${value}"`])
                                        }
                                    }
                                    }/>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            {faExpression.map((item: string, index) => {
                                let appearance: any = <div className={'flex align-items-center'}>{item}<i
                                    className="pi pi-times mr-1 cursor-pointer text-xs bg-white border-round-xl p-1"/></div>
                                return <Chip key={index} onClick={() => remove(index)} label={appearance}
                                             className="mr-2 mb-2"/>
                            })}
                        </div>
                        <InputTextarea className={'w-full'} placeholder={'عبارت'} value={faExpression.join(' ')}
                                       readOnly rows={5} cols={30}/>
                        <div className={'text-left ltr'}>
                            <div>{expression.join(' ')}</div>
                            {expression.map((item: string, index) => {
                                let appearance: any = <div className={'flex align-items-center'}>{item}<i
                                    className="pi pi-times ml-1 cursor-pointer text-xs bg-white border-round-xl p-1"/></div>
                                return <Chip key={index} onClick={() => remove(index)} label={appearance}
                                             className="mr-2 mb-2 "/>
                            })}
                        </div>
                    </div>
                    <div className={'flex'}>
                        <Button type={'submit'} className={'mt-5 mr-auto'}
                                label={shouldEditObject?.id ? "ثبت تغییرات" : "تایید و ثبت"}/>
                        {shouldEditObject?.id && <Button className={'mr-3 mt-5 bg-red-600 border-red-600'}
                                                         label={"لغو"} onClick={reset}/>}

                    </div>
                </form>
            </Card>
        </>
    )
}