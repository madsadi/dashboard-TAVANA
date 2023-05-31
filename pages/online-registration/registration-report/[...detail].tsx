import React, {createContext, useEffect, useMemo} from "react";
import {useRouter} from "next/router";
import IdentityComponent from "../../../components/online-registration/registration-report/detail/Identity.component";
import JobInfoComponent from "../../../components/online-registration/registration-report/detail/JobInfo.component";
import BankComponent from "../../../components/online-registration/registration-report/detail/Bank.component";
import LegalPersonShareholdersComponent
    from "../../../components/online-registration/registration-report/detail/LegalPersonShareholders.component";
import LegalPersonStakeholdersComponent
    from "../../../components/online-registration/registration-report/detail/LegalPersonStakeholders.component";
import BourseCodeComponent
    from "../../../components/online-registration/registration-report/detail/BourseCode.component";
import AgentComponent from "../../../components/online-registration/registration-report/detail/Agent.component";
import AddressesComponent from "../../../components/online-registration/registration-report/detail/Addresses.component";
import EconomicComponent from "../../../components/online-registration/registration-report/detail/Economic.component";
import AgreementComponent from "../../../components/online-registration/registration-report/detail/AgreementComponent";
import EditRegStateComponent from "../../../components/online-registration/registration-report/EditRegState.component";
import {
    InquirySejamStateComponent
} from "../../../components/online-registration/registration-report/InquirySejamState.component";

import {TBSComponent} from "../../../components/online-registration/registration-report/TBS.component";
import DocumentsComponent from "../../../components/online-registration/registration-report/detail/Documents.component";
import useQuery from "../../../hooks/useQuery";
import {ADMIN_GATEWAY} from "../../../api/constants";
import {AgreementToTbs} from "../../../components/online-registration/registration-report/AgreementToTbs";
import TableComponent from "../../../components/common/table/table-component";
import DateCell from "../../../components/common/table/DateCell";
import {EllipsisHorizontalCircleIcon} from "@heroicons/react/24/outline";
import {formatNumber} from "../../../components/common/functions/common-funcions";

export const OnlineRegDetailContext = createContext({})
export default function Detail() {
    const {data:info,fetchData}:any = useQuery({url:`${ADMIN_GATEWAY}/api/request/SearchUser`});
    let data = info?.result?.pagedData[0]
    const router = useRouter()
    let dep = router.query?.detail?.[0]

    const columnDefStructure: any = [
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
        }
    ]
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

    useEffect(() => {
        if (dep) {
            const queryData = dep.split('&')
            let _query: any = {};

            _query['UserId'] = queryData[0].split('=')[1];
            _query['StartDate'] = queryData[1].split('=')[1];
            _query['EndDate'] = queryData[2].split('=')[1];
            fetchData(_query)
        }
    }, [dep])

    return (
        <OnlineRegDetailContext.Provider value={{data}}>
            <div className={'flex flex-col h-full w-full'}>
                <div className={'border border-border rounded-t-lg'}>
                    <div className={'flex p-2 space-x-2 space-x-reverse'}>
                        <EditRegStateComponent/>
                        <InquirySejamStateComponent/>
                        <TBSComponent/>
                        <AgreementToTbs/>
                    </div>
                </div>
                <TableComponent data={info?.result?.pagedData}
                                columnDefStructure={columnDefStructure}
                                rowId={['userId','id']}
                                detailCellRendererParams={detailCellRendererParams}
                                masterDetail={true}
                />
                {data ? <div className={'w-full grow space-y-3 mt-5'}>
                    <DocumentsComponent/>
                    <IdentityComponent/>
                    <JobInfoComponent/>
                    <BankComponent/>
                    <LegalPersonShareholdersComponent/>
                    <LegalPersonStakeholdersComponent/>
                    <BourseCodeComponent/>
                    <AgentComponent/>
                    <AddressesComponent/>
                    <EconomicComponent/>
                    <AgreementComponent/>
                </div> : null}
            </div>
        </OnlineRegDetailContext.Provider>
    )
}