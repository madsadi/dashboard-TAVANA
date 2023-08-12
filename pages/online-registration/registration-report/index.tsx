import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const AccordionComponent = dynamic(() => import("../../../components/common/components/accordion"));
const SearchComponent = dynamic(() => import("../../../components/common/components/search"));
const TableComponent = dynamic(() => import("../../../components/common/table/table-component"));
const DateCell = dynamic(() => import("../../../components/common/table/date-cell"));
const UserRegToolbarComponent
    = dynamic(() => import("../../../components/online-registration/registration-report/user-reg-toolbar"));
import { formatNumber } from "../../../components/common/functions/common-funcions";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { ModuleIdentifier } from "../../../components/common/functions/Module-Identifier";

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
            cellRenderer: 'agGroupCellRenderer',
            cellClass: "textFormat"
        },
        {
            field: 'mobileNumber',
            headerName: 'شماره تلفن',
            cellClass: "textFormat"
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
                            <DateCell date={rowData.data.isSejamiDateTime ? rowData.data.isSejamiDateTime : ''} />
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
                            <DateCell date={rowData.data.sejamStatusDateTime ? rowData.data.sejamStatusDateTime : ''} />
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
                            <DateCell
                                date={rowData.data.registrationStateDateTime ? rowData.data.registrationStateDateTime : ''} />
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
                            <span>{rowData.data.isTbsInserted ? 'بله' : 'خیر'}</span>
                            <DateCell date={rowData.data.tbsInsertDateTime ? rowData.data.tbsInsertDateTime : ''} />
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
            field: 'isTBSDocsInserted',
            headerName: 'ثبت فایل قراردادها در TBS؟',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <div>{rowData.data.isTBSDocsInserted ? 'بله' : 'خیر'}</div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'tbsDocsInsertDateTime',
            headerName: 'زمان ثبت فایل قراردادها در TBS',
            cellRendererSelector: () => {
                const moodDetails = {
                    component: (rowData: any) => <DateCell
                        date={rowData.data.tbsDocsInsertDateTime ? rowData.data.tbsDocsInsertDateTime : ''} />,
                }
                return moodDetails;
            },
        },
        {
            field: 'detail',
            headerName: 'جزییات',
            flex: 0,
            width: 90,
            cellStyle: {
                cursor: 'pointer',
                display: 'flex'
            },
            cellRendererSelector: () => {
                return {
                    component: (rowData: any) => {
                        return (<a className={'flex h-full w-full'} target="_blank" rel="noreferrer"
                            href={`/online-registration/registration-report/userId=${rowData.data.userId}`}>
                            <EllipsisHorizontalCircleIcon className={'h-5 w-5 m-auto'} />
                        </a>)
                    },
                };
            },
        }
    ]

    const [selectedRows, setSelectedRows] = useState<any>([])
    const {
        data,
        query: searchQuery,
        loading,
        fetchData
    }: any = useQuery({ url: `${ADMIN_GATEWAY}/api/request/SearchUser` })

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

    return (
        <OnlineRegContext.Provider value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}>
            <div className={'flex flex-col h-full flex-1'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.ONLINE_REGISTRATION} />
                </AccordionComponent>
                <UserRegToolbarComponent />
                <TableComponent data={data?.result?.pagedData}
                    module={ModuleIdentifier.ONLINE_REGISTRATION}
                    loading={loading}
                    columnDefStructure={columnDefStructure}
                    rowId={['userId', 'id']}
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