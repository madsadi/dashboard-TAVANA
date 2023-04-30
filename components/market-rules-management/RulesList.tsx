import React, {createContext, useState} from 'react';
import dynamic from "next/dynamic";
const RulesExpressionDetail = dynamic(() => import('./RulesExpressionDetail'))
const TableComponent = dynamic(() => import('../common/table/table-component'))
const RulesToolbar = dynamic(() => import('./RulesToolbar'))
const AccordionComponent = dynamic(() => import('../common/components/AccordionComponent'))
const SearchComponent = dynamic(() => import('../common/components/Search.component'))
import {jalali} from "../common/functions/common-funcions";
import {validate as uuidValidate} from 'uuid';
import useQuery from "../../hooks/useQuery";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import DateCell from "../common/table/DateCell";

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
            width: 200,
            minWidth: 200,
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
            width: 200,
            minWidth: 200,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <DateCell date={props?.data?.updatedDateTime}/>
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
    const {data,query,fetchData} = useQuery({url:`${MARKET_RULES_MANAGEMENT}/request/GetRules`})
    const {data:dynamics,fetchData:fetchFields} = useQuery({url:`${MARKET_RULES_MANAGEMENT}/request/GetFieldsList`,revalidateOnMount:true})
    let dynamicOptions = dynamics?.result

    return (
        <MarketRulesContext.Provider value={{selectedRows,setSelectedRows, dynamicOptions, fetchData, query}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent listOfFilters={listOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={fetchData}
                                     dynamicOptions={dynamicOptions}
                    />
                </AccordionComponent>
                <RulesToolbar/>
                <TableComponent data={data?.result}
                                columnDefStructure={columnDefStructure}
                                rowId={['id']}
                                rowSelection={'single'}
                                masterDetail={true}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                detailComponent={RulesExpressionDetail}
                />
            </div>
        </MarketRulesContext.Provider>
    );
}
