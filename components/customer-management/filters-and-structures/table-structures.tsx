import {jalali} from "../../common/functions/common-funcions";
import React from "react";

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
        width: 500,
        flex: 0
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
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
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
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <>
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
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
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
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
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <>
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
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
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
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
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <>
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
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
    }, {
        field: 'reagentRefCode',
        headerName: 'کد معرفی',
    }, {
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
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
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
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <>
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
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
    }, {
        field: 'adminApprovalDateTime',
        headerName: 'زمان تائید امین',
    }, {
        field: 'startDateTime',
        headerName: 'تاریخ شروع',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <>
                        <span>{rowData.data.startDateTime ? jalali(rowData.data.startDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.startDateTime ? jalali(rowData.data.startDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    }, {
        field: 'endDateTime',
        headerName: ' تاریخ پایان',
        cellRendererSelector: () => {
            const ColourCellRenderer = (rowData: any) => {
                return (
                    <>
                        <span>{rowData.data.endDateTime ? jalali(rowData.data.endDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.endDateTime ? jalali(rowData.data.endDateTime).time : '-'}</span>
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
                        <span>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.createDateTime ? jalali(rowData.data.createDateTime).time : '-'}</span>
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
                        <span>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).date : '-'}</span>
                        <span
                            className={'ml-4'}>{rowData.data.updateDateTime ? jalali(rowData.data.updateDateTime).time : '-'}</span>
                    </>)
            };
            const moodDetails = {
                component: ColourCellRenderer,
            }
            return moodDetails;
        },
    }
]
