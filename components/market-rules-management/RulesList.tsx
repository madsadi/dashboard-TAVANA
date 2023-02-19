import React, {useState} from 'react';
import { rulesList} from "../../api/marketRulesManagement";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {validate as uuidValidate} from 'uuid';
import {toast} from "react-toastify";
import RulesExpressionDetail from ".//RulesExpressionDetail";
import {jalali} from "../common/functions/common-funcions";
import TableComponent from "../common/table/table-component";
import RulesToolbar from "./RulesToolbar";
import InputComponent from "../common/components/InputComponent";
import AccordionComponent from "../common/components/AccordionComponent";
import moment from "jalali-moment";

type initialType = { StartDate: string, EndDate: string, name: string,isActive:any }
const initialValue = {
    name: '',
    isActive: null,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
}
const listOfFilters = [
    {title: 'isActive', name: 'وضعیت', type: 'selectInput'},
    {title: 'name', name: 'عنوان قانون', type: 'input'},
    {title: 'date', name: 'تاریخ شروع و پایان', type: 'date'},
]

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

    const [selectedRows,setSelectedRows] = useState<any>([])
    const [data,setData] = useState<any>([])
    const [query, setQuery] = useState<initialType>(initialValue);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const onSubmit = async (e:any,query:any) => {
        e.preventDefault()
        await rulesList(query)
            .then(res => setData(res?.result))
            .catch(err => toast.error('نا موفق'))
    };

    return (
        <div className={'relative flex flex-col grow overflow-hidden border border-border rounded'}>
            <AccordionComponent>
                <form onSubmit={(e) => onSubmit(e, query)}>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            listOfFilters?.map((item: any) => {
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
            <RulesToolbar/>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}
                            rowSelection={'single'}
                            masterDetail={true}
                            setSelectedRows={setSelectedRows}
                            detailComponent={'myDetailCellRenderer'}
                            detailCellRendererParams={RulesExpressionDetail}
            />
        </div>
    );
}
