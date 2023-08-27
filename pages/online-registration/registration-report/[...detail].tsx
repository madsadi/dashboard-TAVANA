import React, { createContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const IdentityComponent = dynamic(() => import("../../../components/online-registration/registration-report/detail/identity"));
const JobInfoComponent = dynamic(() => import("../../../components/online-registration/registration-report/detail/job-info"));
const BankComponent = dynamic(() => import("../../../components/online-registration/registration-report/detail/bank"));
const LegalPersonShareholdersComponent
    = dynamic(() => import("../../../components/online-registration/registration-report/detail/legal-person-shareholders"));
const LegalPersonStakeholdersComponent
    = dynamic(() => import("../../../components/online-registration/registration-report/detail/legal-person-stakeholders"));
const BourseCodeComponent
    = dynamic(() => import("../../../components/online-registration/registration-report/detail/bourse-code"));
const AgentComponent = dynamic(() => import("../../../components/online-registration/registration-report/detail/agent"));
const AddressesComponent = dynamic(() => import("../../../components/online-registration/registration-report/detail/addresses"));
const EconomicComponent = dynamic(() => import("../../../components/online-registration/registration-report/detail/economic"));
const AgreementComponent = dynamic(() => import("../../../components/online-registration/registration-report/detail/agreement"));
const EditRegStateComponent = dynamic(() => import("../../../components/online-registration/registration-report/edit-reg-state"));
const
    InquirySejamStateComponent
        = dynamic(() => import("../../../components/online-registration/registration-report/inquiry-sejam-state"));
const TBSComponent = dynamic(() => import("../../../components/online-registration/registration-report/tbs"));
const DocumentsComponent = dynamic(() => import("../../../components/online-registration/registration-report/detail/documents"));
const EditRefCode = dynamic(() => import("../../../components/online-registration/registration-report/edit-ref-code"));
const BuildAgreementsFiles = dynamic(() => import("../../../components/online-registration/registration-report/build-agreements-files"));
const AgreementToTbs = dynamic(() => import("../../../components/online-registration/registration-report/agreement-to-tbs"));
const TableComponent = dynamic(() => import("../../../components/common/table/table-component"));
const DateCell = dynamic(() => import("../../../components/common/table/date-cell"));
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { formatNumber } from "../../../components/common/functions/common-funcions";
import { useSelector } from "react-redux";
import { isAllowed } from "../../../components/common/functions/permission-utils";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../components/common/functions/Module-Identifier";
import EditBourseCode from "components/online-registration/registration-report/edit-bourse-code";
import { withPermission } from "components/common/layout/with-permission";

export const OnlineRegDetailContext = createContext({})
function Detail() {
    const { user_permissions: userPermissions } = useSelector((state: any) => state.appConfig);
    const { service, modules, restriction } = useSearchFilters(ModuleIdentifier.ONLINE_REGISTRATION, 'edit')
    const { data: info, fetchData }: any = useQuery({ url: `${ADMIN_GATEWAY}/api/request/SearchUser` });
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
            field: 'agentUniqueId',
            headerName: 'نماینده',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <div className={'flex items-center space-x-2 space-x-reverse'}>
                            <span>{rowData.data.agentUniqueId}</span>
                            {rowData.data.agentTitle && rowData.data.agentUniqueId ? <span className="mx-1">-</span> : null}
                            <span>
                                {rowData.data.agentTitle}
                            </span>
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
            field: 'isSejami',
            headerName: 'سجامی است؟',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <div className={'flex items-center space-x-2 space-x-reverse'}>
                            <span>{rowData.data.isSejami ? 'سجامی' : 'غیر سجامی'}</span>
                            <DateCell date={rowData.data.isSejamiDateTime} />
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
                            <DateCell date={rowData.data.sejamStatusDateTime} />
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
                            <DateCell date={rowData.data.registrationStateDateTime} />
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
                            <DateCell date={rowData.data.tbsInsertDateTime} />
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
                                        <DateCell date={rowData.data.sejamTokenDateTime} />
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
                                component: (rowData: any) => <DateCell date={rowData.data.createDateTime} />,
                            }
                            return moodDetails;
                        },
                    },
                    {
                        field: 'updateDateTime',
                        headerName: 'زمان بروزرسانی',
                        cellRendererSelector: () => {
                            const moodDetails = {
                                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime} />,
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
        if (dep && (restriction ? isAllowed({ userPermissions, whoIsAllowed: [[service?.[0], modules?.[0]?.[0], 'Read'].join('.')] }) : true)) {
            const queryData = dep.split('&')
            let _query: any = {};

            _query['UserId'] = queryData[0].split('=')[1];
            fetchData(_query)
        }
    }, [dep, userPermissions])


    return (
        <OnlineRegDetailContext.Provider value={{ data, fetchData }}>
            <div className={'h-full w-full'}>
                <div className={'border border-border rounded-t-lg'}>
                    <div className={'toolbar p-2'}>
                        <EditRegStateComponent />
                        <InquirySejamStateComponent />
                        <EditRefCode />
                        <BuildAgreementsFiles />
                        <EditRefCode />
                        <EditBourseCode />
                        <TBSComponent />
                        <AgreementToTbs />
                    </div>
                </div>
                <TableComponent data={info?.result?.pagedData}
                    columnDefStructure={columnDefStructure}
                    rowId={['userId', 'id']}
                    detailCellRendererParams={detailCellRendererParams}
                    masterDetail={true}
                    indexOfOpenedDetail={0}
                />
                {data ? <div className={'w-full grow space-y-3 mt-5'}>
                    <DocumentsComponent />
                    <IdentityComponent />
                    <JobInfoComponent />
                    <BankComponent />
                    <LegalPersonShareholdersComponent />
                    <LegalPersonStakeholdersComponent />
                    <BourseCodeComponent />
                    <AgentComponent />
                    <AddressesComponent />
                    <EconomicComponent />
                    <AgreementComponent />
                </div> : null}
            </div>
        </OnlineRegDetailContext.Provider>
    )
}

export default withPermission(Detail,ModuleIdentifier.ONLINE_REGISTRATION)
