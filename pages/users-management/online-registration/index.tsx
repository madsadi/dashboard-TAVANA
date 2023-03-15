import React, {useState} from "react";
import AccordionComponent from "../../../components/common/components/AccordionComponent";
import SearchComponent from "../../../components/common/components/Search.component";
import TableComponent from "../../../components/common/table/table-component";
import TablePagination from "../../../components/common/table/TablePagination";
import { searchUser} from "../../../api/users-management.api";
import {toast} from "react-toastify";
import DateCell from "../../../components/common/table/DateCell";
import {useRouter} from "next/router";

type initialType = { PageNumber: number, PageSize: number, userId: string, nationalId: string, phoneNumber: string, StartDate: string, EndDate: string}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    // StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    StartDate: ``,
    EndDate: ``,
    userId: '',
    nationalId: '',
    phoneNumber: '',
}
const usersListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'userId', name: "شناسه کاربر", type: 'input' },
    { title: 'uniqueId', name: "کد ملی کاربر", type: 'input'},
    { title: 'mobileNumber', name: "تلفن همراه", type: 'input' },
    { title: 'personType', name: "نوع کاربر",type: 'selectInput'},
    { title: 'marketerId', name: "نوع کاربر",type: 'input'},
    { title: 'reagentId', name: "نوع کاربر",type: 'input'},
    { title: 'personOrigin', name: "نوع کاربر",type: 'selectInput'},
    { title: 'isSejami', name: "سجامی هست؟",type: 'selectInput'},
    { title: 'sejamStatus', name: "وضعیت سجامی",type: 'selectInput'},
    { title: 'registrationState', name: "وضعیت سجامی",type: 'selectInput'},
    { title: 'date', name: "تاریخ شروع و پایان",type: 'date'},
]

export default function OnlineRegistration(){
    const columnDefStructure: any = [
        {
            field: 'uniqueId',
            headerName: 'کد ملی',
        },
        {
            field: 'mobileNumber',
            headerName: 'شماره تلفن',
        },
        {
            field: 'email',
            headerName: 'ایمیل',
        },
        {
            field: 'personTypeTitle',
            headerName: 'نوع کاربر'
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
            field: 'agentTitle',
            headerName: 'نماینده'
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
            field: 'IsSejami',
            headerName: 'سجامی است؟',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <div className={'flex items-center space-x-2 space-x-reverse'}>
                            <span>{rowData.data.IsSejami ? 'سجامی':'غیر سجامی'}</span>
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
            field: 'changeReasonDescription',
            headerName: 'توضیحات',
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
            field: 'createDateTime',
            headerName: 'زمان ایجاد',
            cellRendererSelector: () => {
                const moodDetails = {
                    component: (rowData:any)=><DateCell date={rowData.data.createDateTime}/>,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'زمان بروزرسانی',
            cellRendererSelector: () => {
                const moodDetails = {
                    component: (rowData:any)=><DateCell date={rowData.data.updateDateTime}/>,
                }
                return moodDetails;
            },
        }
    ]

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([]);
    const [totalCount, setTotal] = useState<any>(null);
    const router = useRouter()

    const onSubmit = async (e:any,query: any) => {
        e?.preventDefault()
        if (query?.StartDate && query?.EndDate){
            await searchUser(query)
                .then((res: any) => {
                    setData(res?.result?.pagedData);
                    setTotal(res?.result?.totalCount)
                })
                .catch(() =>
                    setData([]))
        }else{
            toast.warning('ورودی تاریخ الزامی می باشد.')
        }
    };

    return(
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent query={query}
                                 setQuery={setQuery}
                                 listOfFilters={usersListOfFilters}
                                 initialValue={initialValue}
                                 onSubmit={onSubmit}
                />
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['userId']}
                            onRowClicked={(e: any) => {
                                router.push(`/users-management/online-registration/userId=${e.data.userId}&StartDate=${query.StartDate}&EndDate=${query.EndDate}`)
                            }}
            />
            <TablePagination onSubmit={onSubmit}
                             query={query}
                             setQuery={setQuery}
                             totalCount={totalCount}
            />
        </div>
    )
}