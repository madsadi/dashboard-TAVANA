import React, {createContext, useEffect, useState} from 'react';
import {filedList, rulesList} from "../../api/market-rules-management.api";
import {validate as uuidValidate} from 'uuid';
import {toast} from "react-toastify";
import RulesExpressionDetail from ".//RulesExpressionDetail";
import {jalali} from "../common/functions/common-funcions";
import TableComponent from "../common/table/table-component";
import RulesToolbar from "./RulesToolbar";
import AccordionComponent from "../common/components/AccordionComponent";
import SearchComponent from "../common/components/Search.component";

type initialType = { StartDate: string, EndDate: string, name: string, isActive: any }
const initialValue = {
    name: '',
    isActive: null,
    StartDate: ``,
    EndDate: ``,
}
const listOfFilters = [
    {title: 'isActive', name: 'وضعیت', type: 'selectInput'},
    {title: 'name', name: 'عنوان قانون', type: 'input'},
    {title: 'date', name: 'تاریخ شروع و پایان', type: 'date'},
]

export const MarketRulesContext = createContext({})
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
            flex: 0,
            width: 90,
            minWidth: 90
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
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'createDateTime',
            headerName: 'زمان ایجاد',
            flex: 0,
            width: 170,
            minWidth: 170,
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
            flex: 0,
            width: 150,
            minWidth: 150
        }, {
            field: 'updatedDateTime',
            headerName: 'زمان تغییر',
            flex: 0,
            width: 170,
            minWidth: 170,
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
            flex: 0,
            width: 150,
            minWidth: 150,
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
            flex: 0,
            width: 120,
            minWidth: 120
        }
    ]

    const [selectedRows, setSelectedRows] = useState<any>([])
    const [data, setData] = useState<any>([])
    const [query, setQuery] = useState<initialType>(initialValue);
    const [dynamicOptions, setDynamics] = useState<any>([])


    const onSubmit = async (e: any, query: any) => {
        e.preventDefault()
        await rulesList(query)
            .then(res => setData(res?.result))
            .catch(() => toast.error('نا موفق'))
    };

    useEffect(() => {
        const getFieldItems = async () => {
            await filedList()
                .then((res) => setDynamics(res.result))
        }

        getFieldItems()
    }, [])

    return (
        <MarketRulesContext.Provider value={{selectedRows, setData, dynamicOptions, onSubmit, query}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent query={query}
                                     setQuery={setQuery}
                                     listOfFilters={listOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={onSubmit}
                                     dynamicOptions={dynamicOptions}
                    />
                </AccordionComponent>
                <RulesToolbar/>
                <TableComponent data={data}
                                columnDefStructure={columnDefStructure}
                                rowId={['id']}
                                rowSelection={'single'}
                                masterDetail={true}
                                setSelectedRows={setSelectedRows}
                                detailComponent={RulesExpressionDetail}
                />
            </div>
        </MarketRulesContext.Provider>
    );
}
