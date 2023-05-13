import React from "react";
import {marketerTypeEnum, stationTypeEnum, TypeOfBranches} from "../../../dictionary/Enums";
import DateCell from "../../common/table/DateCell";
import ToggleButton from "../ToggleButton";
import {CopyButton} from "../../common/components/CopyButton";
import {LinkIcon} from "@heroicons/react/20/solid";
import useQuery from "../../../hooks/useQuery";
import {ADMIN_GATEWAY} from "../../../api/constants";
import {getLink} from "../../../api/users-management.api";
import {throwToast} from "../../common/functions/notification";
export const branchesColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
    },
    {
        field: 'id',
        headerName: 'شناسه شعبه',
        cellRenderer: 'agGroupCellRenderer',
    },
    {
        field: 'subsidiaryTitle',
        headerName: 'عنوان شرکت',
    },
    {
        field: 'subsidiaryId',
        headerName: 'شناسه شرکت',
    },
    {
        field: 'code',
        headerName: 'کد شعبه',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.code}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'type',
        headerName: 'نوع شعبه',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{TypeOfBranches.find((item: any) => item.id === rowData.data.type)?.title}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'title',
        headerName: 'عنوان شعبه',
    },
    {
        field: 'isDeleted',
        headerName: 'وضعیت',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.isDeleted ? 'حذف شده' : 'حذف نشده'}</span>
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
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const employeeColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
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
    }, {
        field: 'idpAccountId',
        headerName: 'شناسه حساب کاربری',
    }, {
        field: 'branchId',
        headerName: 'شناسه شعبه',
    },
    {
        field: 'createDateTime',
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const subsidiaryColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
    },
    {
        field: 'id',
        headerName: 'شناسه شرکت',
    },
    {
        field: 'onlineRegistrationProfileId',
        headerName: 'شناسه ثبت نام شرکت',
    },
    {
        field: 'title',
        headerName: 'عنوان شرکت',
    },
    {
        field: 'subsidiaryTypeTitle',
        headerName: 'عنوان نوع شرکت',
    },
    {
        field: 'createDateTime',
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const businessUnitColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
    },
    {
        field: 'id',
        headerName: 'شناسه واحد کاری',
    },
    {
        field: 'code',
        headerName: 'کد واحد کاری',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.code}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'title',
        headerName: 'عنوان واحد کاری',
    },
    {
        field: 'businessUnitOrder',
        headerName: 'اولویت واحد کاری',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.businessUnitOrder}</span>
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
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const stationColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
    },
    {
        field: 'id',
        headerName: 'شناسه ایستگاه معاملاتی',
    },
    {
        field: 'brokerCode',
        headerName: 'کد کارگزاری',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.brokerCode}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'brokerTitle',
        headerName: 'نام کارگزاری',
    },
    {
        field: 'code',
        headerName: 'کد ایستگاه معاملاتی',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.code}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'title',
        headerName: 'عنوان ایستگاه معاملاتی',
    },
    {
        field: 'type',
        headerName: 'نوع ایستگاه معاملاتی',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{stationTypeEnum.find((item: any) => item.id === rowData.data.type)?.title}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'branchId',
        headerName: 'شناسه شعبه کارگزاری',
    },
    {
        field: 'branchTitle',
        headerName: 'عنوان شعبه کارگزاری',
    },
    {
        field: 'createDateTime',
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const traderColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
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
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const marketerColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
    },
    {
        field: 'id',
        headerName: 'شناسه بازاریاب',
    },
    {
        field: 'type',
        headerName: 'نوع بازاریاب',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{marketerTypeEnum.find((item: any) => item.id === rowData.data.type).title}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
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
        field: 'reagentRefCode',
        headerName: 'کد معرفی',
    },
    {
        field: 'reagentUrl',
        headerName: 'لینک معرف',
        cellRendererSelector: () => {
            const getLinkReq = async (id:string)=>{
                await getLink({marketerId:id})
                    .then((res)=>{
                        navigator.clipboard.writeText(res?.result.reagentUrl)
                        throwToast({type:'success',value:'لینک معرف کپی شد'})
                    })
                    .catch(()=>throwToast({type:'error',value:'دوباره امتحان کنید'}))
            }
            return {component: (rowData:any)=> <>{rowData?.data.reagentRefCode ?
                    <button className={'flex mt-1 border border-border rounded-lg p-1 bg-white items-center h-6'}
                            onClick={() => getLinkReq(rowData?.data?.id)}><LinkIcon className={'h-4 w-4'}/> کپی
                    </button>:null
                }</>}
        },
    },
    {
        field: 'marketerRefCode',
        headerName: 'کدبازاریابی',
    },
    {
        field: 'marketerUrl',
        headerName: 'لینک بازاریاب',
        cellRendererSelector: () => {
            const getLinkReq = async (id:string)=>{
                await getLink({marketerId:id})
                    .then((res)=>{
                        navigator.clipboard.writeText(res?.result.marketerUrl)
                        throwToast({type:'success',value:'لینک بازاریاب کپی شد'})
                    })
                    .catch(()=>throwToast({type:'error',value:'دوباره امتحان کنید'}))
            }
            return {component: (rowData:any)=><>{rowData?.data.marketerRefCode ? <button
                    className={'flex mt-1 border border-border rounded-lg p-1 bg-white items-center h-6'}
                    onClick={() => getLinkReq(rowData?.data?.id)}><LinkIcon className={'h-4 w-4'}/> کپی </button>:null}</>}
        },
    },
    {
        field: 'isActive',
        headerName: 'فعال/غیرفعال',
        cellRendererSelector: () => {
            return {component: (rowData:any)=><ToggleButton data={{isActive:rowData.data.isActive,id:rowData.data.id}} api={'marketer'}/>};
        },
    },
    {
        field: 'createDateTime',
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const contractColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
    },
    {
        field: 'title',
        headerName: 'عنوان',
        cellRenderer: 'agGroupCellRenderer',
    },
    {
        field: 'typeTitle',
        headerName: 'نوع قرارداد',
    },
    {
        field: 'calculationBaseTitle',
        headerName: 'روش محاسبه کارمزد',
    },
    {
        field: 'commissionCoefficientTitle',
        headerName: 'نوع ضریب',
    },
    {
        field: 'isDeleted',
        headerName: 'وضعیت',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.isDeleted ? 'حذف شده' : 'حذف نشده'}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'isActive',
        headerName: 'وضعیت فعالیت',
        cellRendererSelector: () => {
            return {component: (rowData:any)=><ToggleButton data={{isActive:rowData.data.isActive,id:rowData.data.id}} api={'contract'}/>};
        },
    },
    {
        field: 'passwordSetDate',
        headerName: 'تاریخ تغییر رمز عبور',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.passwordSetDate}/>,
            };
        },
    },
    {
        field: 'createDateTime',
        headerName: 'تاریخ تغییر رمز عبور',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const marketerContractColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
    },
    {
        field: 'contractNumber',
        headerName: 'شماره قرارداد',
    },
    {
        field: 'contractTitle',
        headerName: 'عنوان قرارداد',
    },
    {
        field: 'marketerTitle',
        headerName: 'عنوان بازاریاب',
    },
    {
        field: 'description',
        headerName: 'توضیحات قرارداد',
    },{
        field: 'mobile',
        headerName: 'تلفن بازاریاب',
    },{
        field: 'marketerTypeTitle',
        headerName: 'نوع بازاریاب',
    },{
        field: 'subsidiaryTitle',
        headerName: 'عنوان شرکت',
    },{
        field: 'branchTitle',
        headerName: 'عنوان شعبه',
    },
    {
        field: 'isDeleted',
        headerName: 'وضعیت',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.isDeleted ? 'حذف شده' : 'حذف نشده'}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'isActive',
        headerName: 'وضعیت فعالیت',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data.isActive ? 'فعال' : 'غیر فعال'}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'isValid',
        headerName: 'اعتبار دارد؟',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <span>{rowData.data['isValid'] ? 'معتبر' : 'نامعتبر'}</span>
                )
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    },
    {
        field: 'contractStartDateTime',
        headerName: 'زمان شروع قرارداد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.contractStartDateTime}/>,
            };
        },
    },
    {
        field: 'contractEndDateTime',
        headerName: 'زمان پایان قرارداد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.contractEndDateTime}/>,
            };
        },
    },
    {
        field: 'createDateTime',
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]

export const agreementColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
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
    }, {
        field: 'context',
        headerName: 'متن توافقنامه',
    }, {
        field: 'defaultFileId',
        headerName: 'شناسه فایل پیش فرض توافقنامه',
    }, {
        field: 'isBourseCodeRequired',
        headerName: 'کد بورسی نیاز دارد؟',
    }, {
        field: 'isRequired',
        headerName: 'توافقنامه اجباری است؟',
    }, {
        field: 'isActive',
        headerName: 'فعال/غیرفعال',
    }, {
        field: 'isDeleted',
        headerName: 'حذف شده/نشده',
    },
    {
        field: 'createDateTime',
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]
export const customerAgreementColumnDefStructure = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        headerCheckboxSelectionFilteredOnly: true,
        resizable: false,
        minWidth: 40,
        maxWidth: 40,
        flex: 0
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
    }, {
        field: 'state',
        headerName: 'وضعیت',
    }, {
        field: 'description',
        headerName: 'توضیحات',
    }, {
        field: 'customerApprovalDateTime',
        headerName: 'زمان تائید مشتری',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.customerApprovalDateTime}/>,
            };
        },
    }, {
        field: 'adminApprovalDateTime',
        headerName: 'زمان تائید امین',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.adminApprovalDateTime}/>,
            };
        },
    }, {
        field: 'startDateTime',
        headerName: 'تاریخ شروع',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.startDateTime}/>,
            };
        },
    }, {
        field: 'endDateTime',
        headerName: ' تاریخ پایان',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.endDateTime}/>,
            };
        },
    },
    {
        field: 'createDateTime',
        headerName: 'تاریخ ایجاد',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
            };
        },
    },
    {
        field: 'updateDateTime',
        headerName: 'تاریخ ویرایش',
        cellRendererSelector: () => {
            return {
                component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
            };
        },
    }
]

