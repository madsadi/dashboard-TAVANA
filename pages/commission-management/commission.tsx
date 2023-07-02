import React, {createContext, useEffect, useRef, useState} from 'react';
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import SearchComponent from "../../components/common/components/Search.component";
import TableComponent from "../../components/common/table/table-component";
import useQuery from "../../hooks/useQuery";
import {COMMISSION_BASE_URL} from "../../api/constants";
import {CategoryResultModal} from "../../components/commission/index/CategoryResultModal";
import {throwToast} from "../../components/common/functions/notification";
import {InstrumentTypeResultModal} from "../../components/commission/index/InstrumentTypeResultModal";
import {CommissionToolbar} from "../../components/commission/index/Commission-toolbar";
import DateCell from "../../components/common/table/DateCell";

export const CommissionContext = createContext({})
export default function Commission() {
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
            field: 'brokerCommissionCoeff',
            headerName: 'ضریب کارمزد کارگزار',
        },
        {
            field: 'minBrokerCommissionValue',
            headerName: 'کمینه ضریب کارمزد کارگزار',
        },
        {
            field: 'maxBrokerCommissionValue',
            headerName: 'بیشینه ضریب کارمزد کارگزار',
        },
        {
            field: 'bourseCommissionCoeff',
            headerName: 'ضریب کارمزد بورس مربوطه',
        },
        {
            field: 'maxBourseCommissionValue',
            headerName: 'بیشینه کارمزد بورس مربوطه',
        },
        {
            field: 'seoControlCommissionCoeff',
            headerName: 'ضریب کارمزد حق نظارت سازمان',
        },{
            field: 'maxSeoControlCommissionValue',
            headerName: 'بیشینه ضریب کارمزد حق نظارت سازمان',
        },{
            field: 'csdCommissionCoeff',
            headerName: 'ضریب کارمزد سپرده گذاری',
        },{
            field: 'maxCsdCommissionValue',
            headerName: 'بیشینه ضریب کارمزد سپرده گذاری',
        },{
            field: 'tmcCommissionCoeff',
            headerName: 'ضریب کارمزد فناوری',
        },{
            field: 'maxTmcCommissionValue',
            headerName: 'بیشینه ضریب کارمزد فناوری',
        },{
            field: 'taxCoeff',
            headerName: 'ضریب مالیات',
        },{
            field: 'rayanCommissionCoeff',
            headerName: 'ضریب کارمزد رایان بورس',
        },{
            field: 'maxRayanCommissionValue',
            headerName: 'بیشینه ضریب کارمزد رایان بورس',
        },{
            field: 'accessCommissionCoeff',
            headerName: 'ضریب کارمزد حق دسترسی',
        },{
            field: 'totalCommissionCoeff',
            headerName: 'مجموع ضریب کارمزد حق دسترسی',
        },{
            field: 'netTradeValueCoeff',
        },{
            field: 'addedValueTax',
            headerName: 'ضریب مالیات ارزش افزوده'
        },{
            field: 'charge',
            headerName: 'ضریب کارمزد عوارض',
        },
        {
            field: 'StartDate',
            headerName: 'تاریخ شروع فعالیت کارمزد',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                            <DateCell date={props.data.StartDate}/>

                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'EndDate',
            headerName: 'تاریخ پایان فعالیت کارمزد',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <DateCell date={props.data.EndDate}/>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'deleted',
            headerName: 'حذف شده؟',
        },
        {
            field: 'brokerCmdFundCoeff',
            headerName: 'ضریب کارمزد صندوق توسعه',
        },
        {
            field: 'maxBrokerCmdFundValue',
            headerName: 'بیشینه کارمزد صندوق توسعه',
        },
        {
            field: 'maxAccessCommissionValue',
            headerName: ' بیشینه کارمزد حق دسترسی',
        },
        {
            field: 'maxTaxValue',
            headerName: 'بیشینه مالیات',
        },
        {
            field: 'lastUpdaterUserId',
            headerName: 'کاربر تغییر دهنده',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'lastUpdateDateTime',
            headerName: 'زمان تغییر',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <DateCell date={props.data.lastUpdateDateTime}/>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 120,
            minWidth: 120
        }
    ]
    const {data:categoryData,query:categoryQuery,fetchData:categorySearch}:any = useQuery({url:`${COMMISSION_BASE_URL}/api/CommissionCategory/Search`})
    const {data:instrumentData,fetchData:instrumentSearch}:any = useQuery({url:`${COMMISSION_BASE_URL}/api/CommissionInstrumentType/Search`})
    const {fetchAsyncData:detailSearch}:any = useQuery({url:`${COMMISSION_BASE_URL}/api/CommissionDetail/Search`})
    const [categoryModal,setCategoryModal]=useState(false)
    const [instrumentType,setInstrumentTypeModal]=useState(false)
    const [rowData,setRowData]=useState<any>([])
    const [instrumentMessage,setInstrumentMessage]=useState<string>('')
    const [categoryMessage,setCategoryMessage]=useState<string>('')
    const [selectedRows,setSelectedRows]=useState<any>([])
    const ref:any=useRef()
    useEffect(()=>{
        if (categoryData?.result?.pagedData?.length) {
            setCategoryModal(true)
            setCategoryMessage('')
        }else if (categoryData!==null){
            setCategoryMessage('نتیجه ای پیدا نشد')
        }
    },[categoryData])

    useEffect(()=>{
        if (instrumentData?.result?.length) {
            setInstrumentTypeModal(true)
            setInstrumentMessage('')
        }else if (instrumentData!==null){
            setInstrumentMessage('نتیجه ای پیدا نشد')
        }
    },[instrumentData])

    const queryHandler=(newQuery:any)=>{
        ref?.current?.changeQueries(newQuery)
    }

    const detailSearchHandler=(query:any)=>{
        const {CommissionCategoryTitle,CommissionInstrumentTypeTitle,...rest}=query
        detailSearch(rest)
            .then((res:any)=>setRowData(res?.data?.result))
            .catch((err:any)=>throwToast({type:'err',value:err}))
    }

    return (
        <CommissionContext.Provider value={{categoryQuery,selectedRows}}>
            <div className={'flex flex-col h-full grow'}>
                <CategoryResultModal open={categoryModal} setOpen={setCategoryModal} queryHandler={queryHandler} data={categoryData?.result}/>
                <InstrumentTypeResultModal open={instrumentType} setOpen={setInstrumentTypeModal} queryHandler={queryHandler} data={instrumentData?.result}/>
                <AccordionComponent>
                    <div className={'grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2'}>
                        <div className={'flex flex-col border border-dashed border-border p-2 rounded'}>
                            <div className={'font-bold text-lg mb-5 flex'}>
                                ابزار مالی گروه بندی ضرایب
                                <p className={'text-red-500 text-base mr-2'}>{instrumentMessage}</p>
                            </div>
                            <SearchComponent className={'!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 '} extraClassName={'sm:mt-auto'} onSubmit={instrumentSearch} module={ModuleIdentifier.COMMISSION_MANAGEMENT_instrument}/>
                        </div>
                        <div className={'border border-dashed border-border p-2 rounded'}>
                            <div className={'font-bold text-lg mb-5 flex'}>
                                گروه بندی ضرایب
                                <p className={'text-red-500 text-base mr-2'}>{categoryMessage}</p>
                            </div>
                            <SearchComponent className={'!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 '} onSubmit={categorySearch} module={ModuleIdentifier.COMMISSION_MANAGEMENT_category}/>
                        </div>
                        <div className={'flex flex-col border border-dashed border-border p-2 rounded'}>
                            <div className={'font-bold text-lg mb-5'}>
                                 ضرایب کارمزد
                            </div>
                            <SearchComponent ref={ref} className={'!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 '} extraClassName={'sm:mt-auto'} onSubmit={detailSearchHandler} module={ModuleIdentifier.COMMISSION_MANAGEMENT_detail}/>
                        </div>
                    </div>
                </AccordionComponent>
                <CommissionToolbar/>
                <TableComponent data={rowData}
                                columnDefStructure={columnDefStructure}
                                rowId={['id']}
                                rowSelection={'single'}
                                setSelectedRows={setSelectedRows}
                />
            </div>
        </CommissionContext.Provider>
    )
}