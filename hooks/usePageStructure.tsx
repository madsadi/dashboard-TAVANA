import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {jalali} from "../components/commonFn/commonFn";

export default function usePageStructure() {
    //creat a state object for our inputs
    const [page, setPage] = useState<any>(null);

    const router = useRouter()

    const branchesColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه شعبه',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'subsidiaryId',
            headerName: 'شناسه شرکت',
        },
        {
            field: 'code',
            headerName: 'کد شعبه',
        },
        {
            field: 'type',
            headerName: 'نوع شعبه',
        },
        {
            field: 'title',
            headerName: 'عنوان شعبه',
        },
        {
            field: 'subsidiaryTypeCode',
            headerName: 'کد نوع شرکت',
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const employeeColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه کارمند',
        },
        {
            field: 'firstName',
            headerName: 'نام',
        },
        {
            field: 'lastName',
            headerName: 'نام خانوادگی',
        },
        {
            field: 'nationalId',
            headerName: 'کد ملی',
        },
        {
            field: 'mobile',
            headerName: 'موبایل',
        },
        {
            field: 'workPhone',
            headerName: 'تلفن',
        },
        {
            field: 'email',
            headerName: 'ایمیل',
        },{
            field: 'idpAccountId',
            headerName: 'شناسه حساب کاربری',
        },{
            field: 'branchId',
            headerName: 'شناسه شعبه',
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const subsidiaryColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه شرکت',
        },
        {
            field: 'sejamProfileId',
            headerName: 'شناسه ثبت نام شرکت',
        },
        {
            field: 'title',
            headerName: 'عنوان شرکت',
        },
        {
            field: 'subsidiaryTypeCode',
            headerName: 'کد نوع شرکت',
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const businessUnitColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه واحد کاری',
        },
        {
            field: 'code',
            headerName: 'کد واحد کاری',
        },
        {
            field: 'title',
            headerName: 'عنوان واحد کاری',
        },
        {
            field: 'businessUnitOrder',
            headerName: 'اولویت واحد کاری',
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const stationColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه ایستگاه معاملاتی',
        },
        {
            field: 'brokerCode',
            headerName: 'کد کارگزاری',
        },
        {
            field: 'code',
            headerName: 'کد ایستگاه معاملاتی',
        },
        {
            field: 'title',
            headerName: 'نوع ایستگاه معاملاتی',
        },
        {
            field: 'branchId',
            headerName: 'شناسه شعبه کارگزاری',
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const traderColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه معامله گر',
        },
        {
            field: 'stationId',
            headerName: 'شناسه ایستگاه معاملاتی',
        },
        {
            field: 'employeeId',
            headerName: 'شناسه کارمند',
        },
        {
            field: 'title',
            headerName: 'عنوان معامله گر',
        },
        {
            field: 'isActive',
            headerName: 'فعال/غیرفعال',
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const marketerColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه بازاریاب',
        },
        {
            field: 'type',
            headerName: 'نوع بازاریاب',
        },
        {
            field: 'customerId',
            headerName: 'شناسه مشتری',
        },
        {
            field: 'branchId',
            headerName: 'شناسه شعبه',
        },
        {
            field: 'marketerRefCode',
            headerName: 'کدبازاریابی',
        },{
            field: 'reagentRefCode',
            headerName: 'کد معرفی',
        },{
            field: 'isActive',
            headerName: 'فعال/غیرفعال',
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const agreementColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه توافقنامه',
        },
        {
            field: 'subsidiaryId',
            headerName: 'شناسه شرکت',
        },
        {
            field: 'bourseCodeType',
            headerName: 'نوع کدبورسی',
        },
        {
            field: 'name',
            headerName: 'عنوان توافقنامه',
        },
        {
            field: 'description',
            headerName: 'توضیحات',
        },{
            field: 'context',
            headerName: 'متن توافقنامه',
        },{
            field: 'defaultFileId',
            headerName: 'شناسه فایل پیش فرض توافقنامه',
        },{
            field: 'isBourseCodeRequired',
            headerName: 'کد بورسی نیاز دارد؟',
        },{
            field: 'isRequired',
            headerName: 'توافقنامه اجباری است؟',
        },{
            field: 'isActive',
            headerName: 'فعال/غیرفعال',
        },{
            field: 'isDeleted',
            headerName: 'حذف شده/نشده',
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const customerAgreementColumnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
            flex:0
        },
        {
            field: 'id',
            headerName: 'شناسه ردیف',
        },
        {
            field: 'customerId',
            headerName: 'شناسه مشتری',
        },
        {
            field: 'agreementId',
            headerName: 'شناسه توافقنامه',
        },
        {
            field: 'bourseCode',
            headerName: 'کدبورسی مشتری',
        },
        {
            field: 'tradeCode',
            headerName: 'کدمعاملاتی',
        },{
            field: 'state',
            headerName: 'وضعیت',
        },{
            field: 'description',
            headerName: 'توضیحات',
        },{
            field: 'customerApprovalDateTime',
            headerName: 'زمان تائید مشتری',
        },{
            field: 'adminApprovalDateTime',
            headerName: 'زمان تائید امین',
        },{
            field: 'startDateTime',
            headerName: 'تاریخ شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.startDateTime ? jalali(rowData.data.startDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.startDateTime ? jalali(rowData.data.startDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },{
            field: 'endDateTime',
            headerName: ' تاریخ پایان',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.endDateTime ? jalali(rowData.data.endDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.endDateTime ? jalali(rowData.data.endDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'createDateTime',
            headerName: 'تاریخ ایجاد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'تاریخ ویرایش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]

    const branchesListOfForm = [
        {title:'subsidiaryId',name:'آیدی شرکت',type:'input'},
        {title:'code',name:'کد شعبه',type:'input'},
        {title:'title',name:'نام شعبه',type:'input'},
        {title:'countryId',name:'شناسه کشور (برای آدرس شعبه)',type:'input'},
        {title:'provinceId',name:'شناسه استان (برای آدرس شعبه)',type:'input'},
        {title:'cityId',name:'شناسه شهر (برای آدرس شعبه)',type:'input'},
        {title:'sectionId',name:'شناسه بخش (برای آدرس شعبه)',type:'input'},
        {title:'tel',name:'شماره تلفن',type:'input'},
        {title:'mobile',name:'شماره موبایل',type:'input'},
        {title:'fax',name:'فکس',type:'input'},
        {title:'address',name:'آدرس خیابان',type:'input'},
        {title:'alley',name:'نام کوچه',type:'input'},
        {title:'plaque',name:'پلاک',type:'input'},
        {title:'postalCode',name:'کد پستی',type:'input'},
    ]
    const subsidiaryListOfForm = [
        {title:'sejamProfileId',name:'شناسه ثبت نام شرکت',type:'input'},
        {title:'title',name:'عنوان شرکت',type:'input'},
        {title:'subsidiaryTypeCode',name:'کد نوع شرکت',type:'input'},
    ]
    const employeeListOfForm = [
        {title:'firstName',name:'نام',type:'input'},
        {title:'lastName',name:' نام خانوادگی',type:'input'},
        {title:'nationalId',name:'کد ملی',type:'input'},
        {title:'mobile',name:'موبایل',type:'input'},
        {title:'workPhone',name:'تلفن',type:'input'},
        {title:'email',name:'ایمیل',type:'input'},
        {title:'idpAccountId',name:'شناسه حساب کاربری',type:'input'},
        {title:'branchId',name:'شناسه شعبه',type:'input'},
    ]
    const businessUnitListOfForm = [
        {title:'code',name:'کد واحد کاری',type:'input'},
        {title:'title',name:'عنوان واحد کاری',type:'input'},
        {title:'businessUnitOrder',name:'اولویت واحد کاری',type:'input'},
    ]
    const stationListOfForm = [
        {title:'brokerCode',name:'کد کارگزاری',type:'input'},
        {title:'code',name:'کد ایستگاه معاملاتی',type:'input'},
        {title:'title',name:'عنوان ایستگاه معاملاتی',type:'input'},
        {title:'type',name:'نوع ایستگاه معاملاتی',type:'input'},
        {title:'branchId',name:'شناسه شعبه کارگزاری',type:'input'},
    ]
    const traderListOfForm = [
        {title:'stationId',name:'شناسه ایستگاه معاملاتی',type:'input'},
        {title:'employeeId',name:'شناسه کارمند',type:'input'},
        {title:'title',name:'عنوان معامله گر',type:'input'},
        {title:'isActive',name:'فعال/غیرفعال',type:'input'},
    ]
    const marketerListOfForm = [
        {title:'type',name:'نوع بازاریاب',type:'input'},
        {title:'customerId',name:'شناسه مشتری',type:'input'},
        {title:'branchId',name:'شناسه شعبه',type:'input'},
    ]
    const agreementListOfForm = [
        {title:'subsidiaryId',name:'شناسه شرکت',type:'input'},
        {title:'bourseCodeType',name:'نوع کدبورسی',type:'input'},
        {title:'name',name:'عنوان توافقنامه',type:'input'},
        {title:'description',name:'توضیحات',type:'input'},
        {title:'context',name:'متن توافقنامه',type:'input'},
        {title:'defaultFileId',name:'شناسه فایل پیش فرض توافقنامه',type:'input'},
        {title:'isBourseCodeRequired',name:'کد بورسی نیاز دارد؟',type:'input'},
        {title:'isRequired',name:'توافقنامه اجباری است؟',type:'input'},
    ]
    const customerAgreementListOfForm = [
        {title:'customerId',name:'شناسه مشتری',type:'input'},
        {title:'agreementId',name:'شناسه توافقنامه',type:'input'},
        {title:'bourseCode',name:'کدبورسی مشتری',type:'input'},
        {title:'tradeCode',name:'کدمعاملاتی',type:'input'},
        {title:'state',name:'وضعیت',type:'input'},
        {title:'description',name:'توضیحات',type:'input'},
        {title:'customerApprovalDateTime',name:'زمان تائید مشتری',type:'date'},
        {title:'adminApprovalDateTime',name:'زمان تائید امین',type:'date'},
        {title:'startDateTime',name:'تاریخ شروع',type:'date'},
        {title:'endDateTimeک ',name:'تاریخ پایان',type:'date'},
    ]

    useEffect(()=>{
        if (router.query?.page?.[0]){
            switch (router.query?.page?.[0]){
                case 'subsidiary':
                    setPage(
                        {
                            api:'subsidiary',
                            columnsDefStructure:subsidiaryColumnDefStructure,
                            searchFilter:'شرکت',
                            form:subsidiaryListOfForm
                        }
                    )
                    break;
                case 'branches':
                    setPage(
                        {
                            api:'branch',
                            columnsDefStructure:branchesColumnDefStructure,
                            searchFilter:'شعبه',
                            form:branchesListOfForm
                        }
                    )
                    break;
                case 'employee':
                    setPage(
                        {
                            api:'employee',
                            columnsDefStructure:employeeColumnDefStructure,
                            searchFilter:'کارمند',
                            form:employeeListOfForm
                        }
                    )
                    break;
                case 'businessUnit':
                    setPage(
                        {
                            api:'businessUnit',
                            columnsDefStructure:businessUnitColumnDefStructure,
                            searchFilter:'واحده کاری',
                            form:businessUnitListOfForm
                        }
                    )
                    break;
                case 'station':
                    setPage(
                        {
                            api:'station',
                            columnsDefStructure:stationColumnDefStructure,
                            searchFilter:'ایستگاه معاملاتی',
                            form:stationListOfForm
                        }
                    )
                    break;
                case 'trader':
                    setPage(
                        {
                            api:'trader',
                            columnsDefStructure:traderColumnDefStructure,
                            searchFilter:'معامله گران',
                            form:traderListOfForm
                        }
                    )
                    break;
                case 'marketer':
                    setPage(
                        {
                            api:'marketer',
                            columnsDefStructure:marketerColumnDefStructure,
                            searchFilter:'بازاریاب ها',
                            form:marketerListOfForm
                        }
                    )
                    break;
                case 'agreement':
                    setPage(
                        {
                            api:'agreement',
                            columnsDefStructure:agreementColumnDefStructure,
                            searchFilter:'توافقنامه ها',
                            form:agreementListOfForm
                        }
                    )
                    break;
                case 'customerAgreement':
                    setPage(
                        {
                            api:'customerAgreement',
                            columnsDefStructure:customerAgreementColumnDefStructure,
                            searchFilter:'توافقنامه های بین طرفین',
                            form:customerAgreementListOfForm
                        }
                    )
                    break;
            }
        }
    },[router.query?.page?.[0]])


    return {
        page
    }
}