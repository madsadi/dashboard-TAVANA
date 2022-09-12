import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import RulesBox from "./RulesBox";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {filedList} from "../../api/marketRulesManagement";
import {Toast} from "primereact/toast";
import {Chip} from "primereact/chip";

export default function CreateNewRule() {
    const [name, setName] = useState<string>('')
    const [sequence, setSequence] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [status, setStatus] = useState({name:'',isActive:false});
    const [fieldOptions, setFieldOptions] = useState<string[]>([])
    const [variableList, setVariableList] = useState<any>({name:'',fieldType:'',remoteUrl:'',displayName:''})
    const [selectedOperator, setSelectedOperator] = useState<any>({name:'',symbol:''})
    const [expression, setExpression] = useState<string[]>([])
    const [faExpression, setFaExpression] = useState<string[]>([])

    const toast:any = useRef(null);

    const states = [
        { name: 'فعال', isActive: true },
        { name: 'غیر فعال', isActive: false },
    ];
    const operators = [
        { name: 'و', symbol: '&&' },
        { name: 'یا', symbol: '||' },
        { name: 'جمع', symbol: '+' },
        { name: 'تفریق', symbol: '-' },
        { name: 'ضرب', symbol: 'X' },
        { name: 'تقسیم', symbol: '÷' },
        { name: 'مساوی', symbol: '=' },
        { name: 'بزرگتر', symbol: '>' },
        { name: 'کوچکتر', symbol: '<' },
        { name: 'بزرگتر یا مساوی', symbol: '>=' },
        { name: 'کوچکتر یا مساوی', symbol: '<=' },
        { name: 'شامل', symbol: 'idk' },
        { name: 'دقیقا شامل', symbol: 'idk' },
    ];

    const getFieldItems=async ()=>{
        await filedList()
            .then(res=>setFieldOptions(res?.result))
            .catch(err=>toast.current?.show({
                severity: 'error',
                summary: 'مشکلی رخ داده است',
                detail: err?.response?.data?.title,
                life: 6000
            }))
    }
    useEffect(()=>{
        getFieldItems()
    },[])

    return (
        <>
            <Toast ref={toast} position="top-center"/>
            <Card>
                <form>
                    <div className="grid">
                        <div className="col-8">
                            <div className={'grid'}>
                                <div className={'col-8'}>
                                    <div className="p-float-label py-2 h-fit">
                                        <InputText id="name" className={'w-full'} value={name} onChange={(e) => setName(e.target.value)}/>
                                        <label htmlFor="name">عنوان قانون</label>
                                    </div>
                                </div>
                                <div className={'col-4'}>
                                    <div className="p-float-label py-2 h-fit">
                                        <InputNumber className={'w-full'} inputId="sequence" value={sequence} onChange={(e) => setSequence(e.value)} mode="decimal" useGrouping={false} />
                                        <label htmlFor="sequence">ترتیب</label>
                                    </div>
                                </div>
                            </div>
                            <div className={'grid mt-4'}>
                                <div className={'col-4'}>
                                    <div className="p-float-label py-2 h-fit">
                                        <Dropdown value={status} options={states} className={'w-full'} onChange={(e)=>setStatus(e.target.value)} optionLabel={'name'}/>
                                        <label htmlFor="CustomerTypeTitle">وضیعت</label>
                                    </div>
                                </div>
                                <div className={'col-4'}>
                                    <div className="p-float-label py-2 h-fit">
                                        <Dropdown value={variableList} className={'w-full'} options={fieldOptions} onChange={(e)=> {
                                            setVariableList(e.target.value);
                                            setExpression([...expression,e.target.value.name])
                                            setFaExpression([...faExpression,e.target.value.displayName])
                                        }} optionLabel={'displayName'}/>
                                        <label htmlFor="name">متغیر </label>
                                    </div>
                                </div>
                                <div className={'col-4'}>
                                    <div className="p-float-label py-2 h-fit">
                                        <Dropdown value={selectedOperator} className={'w-full'} options={operators} onChange={(e)=> {
                                            setSelectedOperator(e.target.value);
                                            setExpression([...expression,e.target.value.symbol])
                                            setFaExpression([...faExpression,e.target.value.name])
                                        }} optionLabel={'name'}/>
                                        <label htmlFor="name">عملگر</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="py-2">
                                <InputTextarea className={'w-full'} placeholder={'پیام خطا'} value={errorMessage} onChange={(e) => setErrorMessage(e.target.value)} rows={5} cols={30} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <InputTextarea className={'w-full'} placeholder={'عبارت'} value={faExpression.join(' ')} readOnly rows={5} cols={30}/>
                        <div className={'flex'}>
                            <div>
                                {faExpression.map((item:string,index)=>{
                                    return <Chip key={index} label={item} className="mr-2 mb-2" />
                                })}
                            </div>
                            <div className={'mr-auto'}>
                                {expression.map((item:string,index)=>{
                                    return <Chip key={index} label={item} className="mr-2 mb-2" />
                                })}
                            </div>
                        </div>
                    </div>
                    {/*<Button type={'submit'} className={'border-round-left border-noround-right my-2'} label="اضافه"/>*/}
                </form>
            </Card>
        </>
    )
}