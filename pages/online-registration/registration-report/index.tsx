import React, {createContext, useMemo, useState} from "react";
import AccordionComponent from "../../../components/common/components/AccordionComponent";
import SearchComponent from "../../../components/common/components/Search.component";
import TableComponent from "../../../components/common/table/table-component";
import DateCell from "../../../components/common/table/DateCell";
import {useRouter} from "next/router";
import UserRegToolbarComponent from "../../../components/online-registration/registration-report/UserRegToolbar.component";
import {formatNumber} from "../../../components/common/functions/common-funcions";
import {EllipsisHorizontalCircleIcon} from "@heroicons/react/24/outline";
import useQuery from "../../../hooks/useQuery";
import {ADMIN_GATEWAY} from "../../../api/constants";
import {ModuleIdentifier} from "../../../components/common/functions/Module-Identifier";
import {useDispatch} from "react-redux";
import {query} from "../../../store/page.config";

export const OnlineRegContext = createContext({})
export default function OnlineRegistration() {
    const columnDefStructure: any = [
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
            field: 'uniqueId',
            headerName: 'کد ملی',
            cellRenderer: 'agGroupCellRenderer'
        },
        {
            field: 'mobileNumber',
            headerName: 'شماره تلفن',
        },
        {
            field: 'personTypeTitle',
            headerName: 'حقیقی / حقوقی'
        },
        {
            field: 'marketerRefCode',
            headerName: 'کد معرفی/بازاریابی'
        },
        {
            field: 'marketerTitle',
            headerName: 'بازاریاب'
        },
        {
            field: 'reagentTitle',
            headerName: 'معرف'
        },
        {
            field: 'agentTitle',
            headerName: 'نماینده'
        },
        {
            field: 'isSejami',
            headerName: 'سجامی است؟',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <div className={'flex items-center space-x-2 space-x-reverse'}>
                            <span>{rowData.data.isSejami ? 'سجامی' : 'غیر سجامی'}</span>
                            <DateCell date={rowData.data.isSejamiDateTime}/>
                        </div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'sejamStatusCodeTitle',
            headerName: 'وضعیت سجام',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <div className={'flex items-center space-x-2 space-x-reverse'}>
                            <span>{rowData.data.sejamStatusCodeTitle}</span>
                            <DateCell date={rowData.data.sejamStatusDateTime}/>
                        </div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'registrationStateCodeTitle',
            headerName: 'وضعیت ثبت نام',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <div className={'flex items-center space-x-2 space-x-reverse'}>
                            <span>{rowData.data.registrationStateCodeTitle}</span>
                            <DateCell date={rowData.data.registrationStateDateTime}/>
                        </div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'isTbsInserted',
            headerName: 'ثبت در TBS',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <div className={'flex items-center space-x-2 space-x-reverse'}>
                            <span>{rowData.data.isTbsInserted}</span>
                            <DateCell date={rowData.data.tbsInsertDateTime}/>
                        </div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field:'detail',
            headerName: 'جزییات',
            flex:0,
            width: 90,
            cellStyle:{
                cursor:'pointer',
                display:'flex'
            },
            // onCellClicked:(rowData:any)=>,
            cellRendererSelector: () => {
                return {
                    component: (rowData:any)=><div className={'flex h-full w-full'} onClick={()=>router.push(`/online-registration/registration-report/userId=${rowData.data.userId}&StartDate=${searchQuery.StartDate}&EndDate=${searchQuery.EndDate}`)}><EllipsisHorizontalCircleIcon className={'h-5 w-5 m-auto'}/></div>,
                };
            },
        }
    ]

    const [selectedRows, setSelectedRows] = useState<any>([])
    const {data,query:searchQuery,loading,fetchData}:any = useQuery({url:`${ADMIN_GATEWAY}/api/request/SearchUser`})

    const router = useRouter();
    const dispatch = useDispatch();
    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                // getRowId:(params:any)=>params.data.orderId,
                columnDefs: [
                    {
                        field: 'email',
                        headerName: 'ایمیل',
                    },
                    {
                        field: 'branchTitle',
                        headerName: 'شعبه'
                    },
                    {
                        field: 'countryName',
                        headerName: 'کشور'
                    },
                    {
                        field: 'foreignCSDCode',
                        headerName: 'کد فراگیر اتباع'
                    },
                    {
                        field: 'personOriginTitle',
                        headerName: 'گروه کاربر'
                    },
                    {
                        field: 'riskLevelTitle',
                        headerName: 'ریسک پذیری'
                    },
                    {
                        field: 'sejamToken',
                        headerName: 'توکن سجام',
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (rowData: any) => {
                                return (
                                    <div className={'flex items-center space-x-2 space-x-reverse'}>
                                        <span>{rowData.data?.sejamToken}</span>
                                        <DateCell date={rowData.data.sejamTokenDateTime}/>
                                    </div>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                    {
                        field: 'changeReasonDescription',
                        headerName: 'توضیحات',
                    },
                    {
                        field: 'createDateTime',
                        headerName: 'زمان ایجاد',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
                            }
                            return moodDetails;
                        },
                    },
                    {
                        field: 'updateDateTime',
                        headerName: 'زمان بروزرسانی',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
                            }
                            return moodDetails;
                        },
                    }
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data]);
            },
        };
    }, []);

    const fetchDataHandler=(newQuery:any)=>{
        dispatch(query(newQuery))
        fetchData(newQuery)
    }

    return (
        <OnlineRegContext.Provider value={{selectedRows,setSelectedRows,fetchData,searchQuery,data}}>
            <div className={'flex flex-col h-full flex-1'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchDataHandler} module={ModuleIdentifier.ONLINE_REGISTRATION}/>
                </AccordionComponent>
                <UserRegToolbarComponent/>
                <TableComponent data={data?.result?.pagedData}
                                loading={loading}
                                columnDefStructure={columnDefStructure}
                                rowId={['userId','id']}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                detailCellRendererParams={detailCellRendererParams}
                                masterDetail={true}
                                rowSelection={'multiple'}
                                pagination={true}
                                totalCount={data?.result?.totalCount}
                                fetcher={fetchData}
                                query={searchQuery}
                />
            </div>
        </OnlineRegContext.Provider>
    )
}