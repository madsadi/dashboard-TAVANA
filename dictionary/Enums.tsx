export const OrderType: any = [
    {
        "id": 0,
        "name": "NotValid",
        "title": "نامعتبر"
    },
    {
        "id": 1,
        "name": "LimitOrder",
        "title": "قیمت در بازه"
    },
    {
        "id": 2,
        "name": "OpeningOrder",
        "title": "پیش گشایش"
    },
    {
        "id": 3,
        "name": "MarketOrder",
        "title": "قیمت بازار و حذف"
    },
    {
        "id": 4,
        "name": "StopOrder",
        "title": "حد ضرر"
    },
    {
        "id": 5,
        "name": "MarketToLimitOrder",
        "title": "قیمت بازار و ثبت"
    }
]

export const IsValidEnums: any =[
    {
        "id": true,
        "title": "معتبر"
    },
    {
        "id": false,
        "title": "نامعتبر"
    },
    {
        "id": null,
        "title": ""
    }
];

export const Hours:any[] = [
    "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
export const Minutes:any[] = [
    "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];

export const subsidiaryType = [
    {
        "id": 1,
        "code": 1,
        "enTitle": "FinancialGroup",
        "title": "گروه مالی"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "SecurityBrokerage",
        "title": "کارگزاری"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "AssetManagement",
        "title": "سبدگردانی"
    },
    {
        "id": 4,
        "code": 4,
        "enTitle": "CurrencyExchange",
        "title": "صرافی ارز"
    }
]
export const sides = [
    {
        "id": 1,
        "name": "Buy",
        "title": "خرید"
    },
    {
        "id": 2,
        "name": "Sell",
        "title": "فروش"
    },
    {
        "id": null,
        "name": "all",
        "title": "هردو"
    }
];

export const Options:any[] = [
    {
        "id": true,
        "title": "حذف شده"
    },
    {
        "id": false,
        "title": "حذف نشده"
    },
    {
        "id": null,
        "title": "همه"
    }
];

export const activeStatus:any[] = [
    {
        "id": true,
        "title": "فعال"
    },
    {
        "id": false,
        "title": "غیر فعال"
    },
    {
        "id": null,
        "title": "همه"
    }
];
export const statesEnums:any[] = [
    {
        "id": 1,
        "code": 1,
        "enTitle": "WaitingToApproveByCustomer",
        "title": "در انتظار تایید مشتری"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "ApprovedByCustomer",
        "title": "تایید مشتری"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "WaitingForValidation",
        "title": "در حال بررسی"
    },
    {
        "id": 4,
        "code": 4,
        "enTitle": "ApprovedByAdmin",
        "title": "تایید ادمین"
    },
    {
        "id": 5,
        "code": 5,
        "enTitle": "RejectedByAdmin",
        "title": "لغو ادمین"
    },
    {
        "id": 6,
        "code": 6,
        "enTitle": "Deactive",
        "title": "غیرفعال"
    }
];
export const isActiveWithNoNull:any[] = [
    {
        "id": true,
        "title": "فعال"
    },
    {
        "id": false,
        "title": "غیر فعال"
    }
];
export const category:any[] = [
    {title: 'فعال', id: 'GetAllActive'},
    {title: 'همه', id: 'GetAll'},
];
export const isRequired:any[] = [
    {
        "id": true,
        "title": "بله"
    },
    {
        "id": false,
        "title": "خیر"
    }
];

export const orderTechnicalOrigin:any[] = [
    // {
    //     "id": 1,
    //     "code": 0,
    //     "enTitle": "None",
    //     "title": "ناموجود"
    // },
    {
        "id": 1,
        "code": 1,
        "enTitle": "NotProvided",
        "title": "نامعین"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "OtherOrders",
        "title": "سایر"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "ManualBuyingInOrder",
        "title": "سفارش غیرخودکار"
    },
    {
        "id": 4,
        "code": 4,
        "enTitle": "AutomaticBuyingInOrder",
        "title": "سفارش خودکار"
    }
];

export const orderOrigin:any[] =  [
    // {
    //     "code": 0,
    //     "title": "نامعتبر",
    //     "enTitle": "NotValid",
    //     "isActive": true
    // },
    {
        "id": 1,
        "title": "کاربر",
        "enTitle": "Client",
        "isActive": true
    },
    {
        "id": 2,
        "title": "کارگزاري",
        "enTitle": "House",
        "isActive": true
    },
    {
        "id": 3,
        "title": "ايستگاه آنلاين",
        "enTitle": "Group",
        "isActive": true
    },
    {
        "id": 4,
        "title": "ساير",
        "enTitle": "Others",
        "isActive": true
    },
    {
        "id": 5,
        "title": "بازارگردان",
        "enTitle": "MarketMaker",
        "isActive": true
    },
    {
        "id": 6,
        "title": "بخش مرتبط",
        "enTitle": "RelatedParty",
        "isActive": true
    }
];

export const validityType =  [
    {
        "id": 1,
        "name": "Day",
        "title": "روز"
    },
    {
        "id": 2,
        "name": "GoodTillDate",
        "title": "معتبر تا تاریخ"
    },
    {
        "id": 3,
        "name": "GoodTillCancelled",
        "title": "معتبر تا لغو"
    },
    {
        "id": 4,
        "name": "FillAndKill",
        "title": "انجام و حذف"
    },
    // {
    //     "id": 5,
    //     "name": "Session",
    //     "title": "جلسه معاملاتی"
    // },
    // {
    //     "id": 6,
    //     "name": "SlidingValidity",
    //     "title": "معتبر تا یک سال"
    // }
]

export const orderStatus: any = [
    {
        "id": 1,
        "title": "در حال ارسال درخواست",
        "enTitle": "SendRequest"
    },
    {
        "id": 2,
        "title": "قسمتی معامله شده",
        "enTitle": "PartiallyExequted"
    },
    {
        "id": 3,
        "title": "ثبت در هسته معاملاتی",
        "enTitle": "OrderPutInTheBook"
    },
    {
        "id": 4,
        "title": "لغو شده",
        "enTitle": "OrderCancelledByTheBroker"
    },
    {
        "id": 5,
        "title": "لغو شده توسط ناظر",
        "enTitle": "OrderCancelledBySurveillance"
    },
    {
        "id": 6,
        "title": "لغو توسط هسته معاملاتی",
        "enTitle": "OrderAutomaticallyCancelledByTheCentralTradingEngine"
    },
    {
        "id": 8,
        "title": "انجام شده",
        "enTitle": "OrderCompletelyExecuted"
    },
    {
        "id": 12,
        "title": "انقضا به دلیل اتمام زمان اعتبار",
        "enTitle": "OrderEliminatedBecauseItHasReachedItsValidity"
    },
    {
        "id": 13,
        "title": "خطا در سفارش",
        "enTitle": "OrderError"
    },
    {
        "id": 15,
        "title": "ابطال کامل معاملات",
        "enTitle": "FullTradeCancellation"
    },
    {
        "id": 16,
        "title": "ابطال قسمتی از معاملات",
        "enTitle": "PartiallyTradeCancellation"
    },
    {
        "id": 14,
        "title": "درخواست پذیرفته شد",
        "enTitle": "RequestValidated"
    }
]

export const accountTypeEnums =  [
    {
        id: 1,
        faTitle:'بلند مدت',
        enTitle: "LongTermAccount"
    },
    {
        id: 2,
        faTitle:'کوناه مدت',
        enTitle: "ShortTermAccount"
    },
    {
        id: 3,
        faTitle:'حساب جاری',
        enTitle: "CurrentAccount"
    },
    {
        id: 4,
        faTitle:'قرض الحسنه',
        enTitle: "SavingAccount"
    }
]
export const personTypeEnums = [
    {
        "id": 1,
        "code": 1,
        "enTitle": "PrivatePerson",
        "title": "حقیقی"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "LegalPerson",
        "title": "حقوقی"
    },
    // {
    //     "id": 3,
    //     "code": 3,
    //     "enTitle": "PrivatePortfolio",
    //     "title": "سبد اختصاصی"
    // }
]
export const personOriginEnums = [
    {
        "id": 1,
        "code": 1,
        "enTitle": "Client",
        "title": "کاربر عادی"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "House",
        "title": "کارگزاری"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "PrivatePortfolio",
        "title": "سبد اختصاصی"
    },
    {
        "id": 4,
        "code": 4,
        "enTitle": "Group",
        "title": "آنلاین استیشن"
    },
    {
        "id": 5,
        "code": 5,
        "enTitle": "Others",
        "title": "سایر"
    },
    {
        "id": 6,
        "code": 6,
        "enTitle": "MarketMaker",
        "title": "بازارگردان"
    }
]
export const sejamStatusEnums = [
    {
        "id": 1,
        "code": 1,
        "enTitle": "Init",
        "title": "وضعیت اولیه"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "SuccessPayment",
        "title": "پرداخت موفق"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "PolicyAccepted",
        "title": "تعهدات"
    },
    {
        "id": 4,
        "code": 4,
        "enTitle": "PendingValidation",
        "title": "استعلام اطلاعات"
    },
    {
        "id": 5,
        "code": 5,
        "enTitle": "InvalidInformation",
        "title": "اطلاعات نامعتبر"
    },
    {
        "id": 6,
        "code": 6,
        "enTitle": "TraceCode",
        "title": "کد پیگیری"
    },
    {
        "id": 7,
        "code": 7,
        "enTitle": "Sejami",
        "title": "سجامی"
    },
    {
        "id": 8,
        "code": 8,
        "enTitle": "Suspend",
        "title": "سجامی ناقص-منقضی شده"
    },
    {
        "id": 9,
        "code": 9,
        "enTitle": "Dead",
        "title": "فوت شده"
    },
    {
        "id": 10,
        "code": 10,
        "enTitle": "SemiSejami",
        "title": "سجامی ناقص-نقص مدرک/عدم احرازهویت"
    }
]
export const onlineRegistrationStatusEnums = [
    {
        "id": 1,
        "code": 1,
        "enTitle": "AccountCreated",
        "title": "ایجاد کاربر"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "NotSejami",
        "title": "سجامی نیست"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "IncompleteSejam",
        "title": "نقص سجام"
    },
    {
        "id": 4,
        "code": 4,
        "enTitle": "PassedAway",
        "title": "فوت شده"
    },
    {
        "id": 5,
        "code": 5,
        "enTitle": "Sejami",
        "title": "سجامی"
    },
    {
        "id": 6,
        "code": 6,
        "enTitle": "SejamProfileReceived",
        "title": "دریافت اطلاعات سجام"
    },
    {
        "id": 7,
        "code": 7,
        "enTitle": "IdentificationInfoCompleted",
        "title": "تکمیل اطلاعات هویتی"
    },
    {
        "id": 8,
        "code": 8,
        "enTitle": "AgentInfoCompleted",
        "title": "تکمیل اطلاعات نماینده"
    },
    {
        "id": 9,
        "code": 9,
        "enTitle": "ShareholderInfoCompleted",
        "title": "تکمیل اطلاعات صاحبان سهام"
    },
    {
        "id": 10,
        "code": 10,
        "enTitle": "StakeholderInfoCompleted",
        "title": "تکمیل اطلاعات ذینفعان"
    },
    {
        "id": 11,
        "code": 11,
        "enTitle": "JobInfoCompleted",
        "title": "تکمیل اطلاعات شغلی"
    },
    {
        "id": 12,
        "code": 12,
        "enTitle": "AddressInfoCompleted",
        "title": "تکمیل آدرس"
    },
    {
        "id": 13,
        "code": 13,
        "enTitle": "BankAccountInfoCompleted",
        "title": "تکمیل شماره حساب بانکی"
    },
    {
        "id": 14,
        "code": 14,
        "enTitle": "FinancialInfoCompleted",
        "title": "تکمیل اطلاعات مالی"
    },
    {
        "id": 15,
        "code": 15,
        "enTitle": "IdentitficationScanUploaded",
        "title": "بارگذاری مدارک"
    },
    {
        "id": 16,
        "code": 16,
        "enTitle": "ExamPassed",
        "title": "تمکیل آزمون"
    },
    {
        "id": 17,
        "code": 17,
        "enTitle": "AgreementsConfirmed",
        "title": "تکمیل تعهدنامه ها"
    },
    {
        "id": 18,
        "code": 18,
        "enTitle": "CustomerConfirmed",
        "title": "تائید مشتری"
    },
    {
        "id": 19,
        "code": 19,
        "enTitle": "WaittingForAdminApproval",
        "title": "در حال بررسی"
    },
    {
        "id": 20,
        "code": 20,
        "enTitle": "RejectedByAdmin",
        "title": "رد شده"
    },
    {
        "id": 21,
        "code": 21,
        "enTitle": "AcceptedByAdmin",
        "title": "تائید شده"
    },
    {
        "id": 22,
        "code": 22,
        "enTitle": "SentToSejam",
        "title": "ارسال شده به سجام"
    },
    {
        "id": 23,
        "code": 23,
        "enTitle": "CustomerRegistered",
        "title": "ثبت شده"
    }
]

export const operators = [
    {title: ')', id: ')'},
    {title: '(', id: '('},
    {title: 'و', id: '&&'},
    {title: 'یا', id: '||'},
    {title: 'جمع', id: '+'},
    {title: 'تفریق', id: '-'},
    {title: 'ضرب', id: '*'},
    {title: 'تقسیم', id: '/'},
    {title: 'مساوی', id: '='},
    {title: 'مخالف', id: '!='},
    {title: 'بزرگتر', id: '>'},
    {title: 'کوچکتر', id: '<'},
    {title: 'بزرگتر یا مساوی', id: '>='},
    {title: 'کوچکتر یا مساوی', id: '<='},
    {title: 'شامل', id: 'contain'},
    {title: 'دقیقا شامل', id: 'exact'},
];

export const originEnum: any = [
    {
        "id": 1,
        "title": "وب"
    },
    {
        "id": 2,
        "title": "موبایل"
    }
]
export const marketerTypeEnum: any =  [
    {
        "id": 1,
        "title": "بازاریاب"
    },
    {
        "id": 2,
        "title": "معرف"
    },
    {
        "id": 3,
        "title": "هردو"
    }
]
export const CalculationBaseType: any =  [
    {
        "id": 1,
        "code": 1,
        "enTitle": "Turnover",
        "title": "گردش"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "Commission",
        "title": "کارمزد"
    }
]
export const stationTypeEnum: any =  [
    {
        "id": 1,
        "code": 1,
        "enTitle": "PamStation",
        "title": "ایستگاه معاملاتی فیزیکی"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "OnlineStation",
        "title": "ایستگاه معاملاتی آنلاین"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "OMS",
        "title": "OMS"
    }
]

export const TypeOfBranches: any = [
    {
        "id": 1,
        "title": "شعبه"
    },
    {
        "id": 2,
        "title": "نمایندگی"
    }
]

export const enTierNameEnum: any = [
    {
        "enTitle": "BTEF-T2"
    },
    {
        "enTitle": "ETF-T2",
        "faTitle": "صندوق سهام"
    },
    {
        "enTitle": "ETF-T3",
        "faTitle": "صندوق سهام"
    },
    {
        "enTitle": "IEE-ETF",
        "faTitle": "صندوق پروژه بورس انرژي"
    },
    {
        "enTitle": "IRR-NT2",
        "faTitle": "تهاتر ريالي سهام تمام بورسها-جديد"
    },
    {
        "enTitle": "IRR-T1",
        "faTitle": "تهاتر ريالي اوراق تمام بورسها"
    },
    {
        "enTitle": "IRR-T2",
        "faTitle": "صندوق مختلط"
    },
    {
        "enTitle": "IRR-T3",
        "faTitle": "تهاتر ريالي سهام تمام بورسها"
    },
    {
        "enTitle": "OTC-EPO"
    },
    {
        "enTitle": "OTC-FOFETF-T2"
    },
    {
        "enTitle": "OTC-FTEF-T1",
        "faTitle": "اوراق با درآمد ثابت ETF صندوق فرابورسي"
    },
    {
        "enTitle": "OTC-T1",
        "faTitle": "اوراق  فرابورس"
    },
    {
        "enTitle": "OTC-T2",
        "faTitle": "سهام فرابورس"
    },
    {
        "enTitle": "OTC-T3",
        "faTitle": "سهام فرابورس"
    },
    {
        "enTitle": "OTC-T-T1",
        "faTitle": "اوراق خزانه اسلامي"
    },
    {
        "enTitle": "OTC-VETF-T2",
        "faTitle": "صندوق جسورانه"
    },
    {
        "enTitle": "TME-ETF-T1",
        "faTitle": "صندوق ETF کالايي"
    },
    {
        "enTitle": "TME-T1",
        "faTitle": "گواهي سپرده کالايي-محصولات کشاورزی"
    },
    {
        "enTitle": "TME-T1-IRR",
        "faTitle": "ريال حاصل از اوراق سلف بورس کالا"
    },
    {
        "enTitle": "TME-T1-V",
        "faTitle": "گواهي سپرده کالايي-فلزات گران بها"
    },
    {
        "enTitle": "TME-T2",
        "faTitle": "بورس کالا-انبار-ريالي"
    },
    {
        "enTitle": "TSE-EPO"
    },
    {
        "enTitle": "TSE-FTEF-T1",
        "faTitle": "اوراق با درآمد ثابت ETF صندوق بورسي"
    },
    {
        "enTitle": "TSE-OTC-EPO"
    },
    {
        "enTitle": "TSE-OTC-T1",
        "faTitle": "تهاتر اوراق بورس و فرابورس"
    },
    {
        "enTitle": "TSE-OTC-T2",
        "faTitle": "تهاتر سهام بورس و فرابورس"
    },
    {
        "enTitle": "TSE-OTC-T3",
        "faTitle": "تهاتر سهام بورس و فرابورس"
    },
    {
        "enTitle": "TSE-T1",
        "faTitle": "اوراق بورس"
    },
    {
        "enTitle": "TSE-T2",
        "faTitle": "سهام بورس"
    },
    {
        "enTitle": "TSE-T3",
        "faTitle": "سهام بورس"
    }
]

export const errors:any =  [
    {
        "errorCode": 1,
        "errorText": "مشتری مجاز به خرید نميباشد",
        "description": "مشتری مجاز به خرید نمي باشد"
    },
    {
        "errorCode": 2,
        "errorText": "مشتری مجاز به خرید در این کارگزاری نميباشد",
        "description": "مشتری مجاز به خرید در این کارگزاری نمي باشد"
    },
    {
        "errorCode": 3,
        "errorText": "حجم درخواستی خارج از حد مجاز ميباشد",
        "description": "حجم درخواستی خارج از حد مجاز مي باشد"
    },
    {
        "errorCode": 4,
        "errorText": "حجم درخواستی باید مضربی از واحد معاملاتی باشد",
        "description": "حجم درخواستی باید مضربی از واحد معاملاتی باشد"
    },
    {
        "errorCode": 5,
        "errorText": "قيمت وارد شده خارج از آستانه ميباشد",
        "description": "قيمت وارد شده خارج از آستانه مي باشد"
    },
    {
        "errorCode": 6,
        "errorText": "قيمت درخواستی باید مضربی از تيک باشد",
        "description": "قيمت درخواستی باید مضربی از تيک باشد"
    },
    {
        "errorCode": 7,
        "errorText": "درخواست خرید برای این سهامدار قبلا ثبت گردیده است",
        "description": "درخواست خرید برای این سهامدار قبلا ثبت گردیده است"
    },
    {
        "errorCode": 9,
        "errorText": "زمان ورود درخواست برای عرضه اوليه هنوز شروع نشده است",
        "description": "زمان ورود درخواست برای عرضه اوليه هنوز شروع نشده است"
    },
    {
        "errorCode": 10,
        "errorText": "پایان زمان قبول درخواست",
        "description": "پایان زمان قبول درخواست"
    },
    {
        "errorCode": 11,
        "errorText": "این نماد شامل درخواست عرضه اوليه نميباشد",
        "description": "این نماد شامل درخواست عرضه اوليه نمي باشد"
    },
    {
        "errorCode": 12,
        "errorText": "هيچ رکوردی برای کنسل شدن پيدا نشد",
        "description": "هيچ رکوردی برای کنسل شدن پيدا نشد"
    },
    {
        "errorCode": 13,
        "errorText": "کدکارگزار در AccountID با کد کارگزار در TraderID یکسان نيست",
        "description": "کدکارگزار در AccountID با کد کارگزار در TraderID یکسان نيست"
    },
    {
        "errorCode": 14,
        "errorText": "کدکارگزار صحیح نمی باشد.",
        "description": "کدکارگزار صحیح نمی باشد"
    },
    {
        "errorCode": 15,
        "errorText": "این کارگزار اجازه ثبت درخواست عرضه اولیه را ندارد.",
        "description": "این کارگزار اجازه ثبت درخواست عرضه اولیه را ندارد."
    },
    {
        "errorCode": 98,
        "errorText": "REJECT",
        "description": "خطای ارتباط با سرور"
    },
    {
        "errorCode": 99,
        "errorText": "BookBuldingOrderEntryRejected",
        "description": "خطا در ارتباط با هسته"
    },
    {
        "errorCode": 1003,
        "errorText": "Group state doesn t allow this function",
        "description": "وضعیت گروه اجازه این عملیات را نمی دهد"
    },
    {
        "errorCode": 1004,
        "errorText": "Instrument state doesn t allow this function",
        "description": "وضعیت نماد اجازه این عملیات را نمی دهد "
    },
    {
        "errorCode": 1006,
        "errorText": "Price format is not valid",
        "description": "قیمت معتبر نیست"
    },
    {
        "errorCode": 1009,
        "errorText": "Group not authorized for this broker",
        "description": "گروه برای کارگزار مجاز نمی باشد"
    },
    {
        "errorCode": 1050,
        "errorText": "Field CLIENT ACCOUNT NUMBER is bad filled",
        "description": "کد معاملاتی مشتری پر نشده است"
    },
    {
        "errorCode": 1501,
        "errorText": "Nationality group cannot own more than n%",
        "description": "گروه ملیت نمی تواند بیش از n٪ داشته باشد"
    },
    {
        "errorCode": 1504,
        "errorText": "Investor suspended",
        "description": "سرمایه گذار به حالت تعلیق درآمد"
    },
    {
        "errorCode": 1520,
        "errorText": "No %Ownership for this instrument",
        "description": "بدون٪ مالکیت این ابزار"
    },
    {
        "errorCode": 1523,
        "errorText": "Limit Cap Eceeded",
        "description": "محدودیت ارسال سفارش در هسته"
    },
    {
        "errorCode": 1525,
        "errorText": "Held quantity of shares is insufficient",
        "description": "مانده سهام کافی نیست"
    },
    {
        "errorCode": 2005,
        "errorText": "Quantities must be multiple of traded lot",
        "description": "حجم باید ضریبی از LOT باشد"
    },
    {
        "errorCode": 2006,
        "errorText": "Type of price invalid or not authorized according to instr or GR state",
        "description": "نوع قیمت معتبر نیست یا طبق دستورالعمل GR یا مجاز نیست"
    },
    {
        "errorCode": 2009,
        "errorText": "CROSS orders forbidden in pre-opening stage",
        "description": "سفارشات CROSS در مرحله پیش گشایش ممنوع است"
    },
    {
        "errorCode": 2013,
        "errorText": "MARKET TO LIMIT order not supported by opposite limit",
        "description": "سفارش MARKET TO LIMIT با حد مخالف پشتیبانی نمی شود"
    },
    {
        "errorCode": 2014,
        "errorText": "Price must be valid against tick table",
        "description": "قیمت باید در برابر جدول تیک معتبر باشد"
    },
    {
        "errorCode": 2019,
        "errorText": "Validity date must be higher than current session date",
        "description": "تاریخ اعتبار باید بیشتر از تاریخ جلسه فعلی باشد"
    },
    {
        "errorCode": 2026,
        "errorText": "Validity date must be filled",
        "description": "تاریخ اعتبار در سفارش، پر نشده است"
    },
    {
        "errorCode": 2029,
        "errorText": "Min quantity forbidden for this order type",
        "description": "حداقل مقدار برای این نوع سفارش ممنوع می باشد"
    },
    {
        "errorCode": 2031,
        "errorText": "Disclosed quantity too small",
        "description": "مقدار افشا شده خیلی کم است"
    },
    {
        "errorCode": 2032,
        "errorText": "Disclosed quantity forbidden for FAK,MOO,CROSS,MARKET and STOP-LOSS ord",
        "description": "مقدار آشکار شده برای سفارش های FAK ، MOO ، CROSS ، MARKET و STOP-LOSS ممنوع است"
    },
    {
        "errorCode": 2040,
        "errorText": "Minimum quantity cannot be modified",
        "description": "حداقل مقدار قابل اصلاح نیست"
    },
    {
        "errorCode": 2044,
        "errorText": "Validity date for this type of order must be FAK",
        "description": "تاریخ اعتبار این نوع سفارش باید FAK باشد"
    },
    {
        "errorCode": 2045,
        "errorText": "This order is not in the book",
        "description": "سفارش وجود ندارد"
    },
    {
        "errorCode": 2046,
        "errorText": "Disclosed quantity cannot be greater than total or remaining qty",
        "description": "مقدار افشا شده نمی تواند از مقدار کل یا باقی مانده بیشتر باشد"
    },
    {
        "errorCode": 2058,
        "errorText": "STOP PRICE maxi-mini must be >= TRIGGER PRICE",
        "description": "STOP PRICE maxi-mini باید>> TRIGGER PRICE باشد\r\n"
    },
    {
        "errorCode": 2059,
        "errorText": "STOP PRICE maxi-mini must be <= TRIGGER PRICE",
        "description": "STOP PRICE maxi-mini باید <= TRIGGER PRICE باشد"
    },
    {
        "errorCode": 2060,
        "errorText": "TRIGGER PRICE must be < last price or last day price",
        "description": "قیمت باید کوچکتر از آخرین قیمت و یا قیمت آخرین روز باشد"
    },
    {
        "errorCode": 2061,
        "errorText": "TRIGGER PRICE must be > last price or last day price",
        "description": "قیمت باید بزرگتر از آخرین قیمت و یا قیمت آخرین روز باشد"
    },
    {
        "errorCode": 2115,
        "errorText": "Total quantity must be inside the limits",
        "description": "مقدار کل باید در آستانه مجاز باشد"
    },
    {
        "errorCode": 2130,
        "errorText": "Minimum quantity forbidden in pre-opening stage",
        "description": "حداقل مقدار در مرحله پیش گشایش ممنوع است"
    },
    {
        "errorCode": 2137,
        "errorText": "Order price is outside the thresholds",
        "description": "قیمت سفارش خارج از آستانه مجاز است"
    },
    {
        "errorCode": 2500,
        "errorText": "Confirmation mandatory for this order",
        "description": "تأیید برای این سفارش اجباری است"
    },
    {
        "errorCode": 2501,
        "errorText": "Order handled in PreOpening - rejected in Continuous Trading",
        "description": "سفارش ثبت شده در مرحله پیش گشایش، در زمان معامله رد شد"
    },
    {
        "errorCode": 2604,
        "errorText": "Trader Id is invalid",
        "description": "شناسه معامله گر نامعتبر است"
    },
    {
        "errorCode": 3402,
        "errorText": "CROSS order price must be inside the limits",
        "description": "قیمت سفارش CROSS باید در حد مجاز باشد"
    },
    {
        "errorCode": 6231,
        "errorText": "Group not authorized for this Trader",
        "description": "گروه برای این معامله گر مجاز نیست"
    },
    {
        "errorCode": 9010,
        "errorText": "Group not authorized on Buy Side for this broker",
        "description": "سفارش خرید در این گروه برای کارگزار مجاز نیست"
    },
    {
        "errorCode": 9011,
        "errorText": "Group not authorized on Sell Side for this broker",
        "description": "سفارش فروش در این گروه برای کارگزار مجاز نیست"
    },
    {
        "errorCode": 100000,
        "errorText": "UnknownError",
        "description": "خطای ناشناخته در سیستم"
    },
    {
        "errorCode": 100001,
        "errorText": "PortfolioError",
        "description": "سیستم : خطا در دارایی مشتری"
    },
    {
        "errorCode": 100002,
        "errorText": "CashflowError",
        "description": "سیستم : خطا در مانده مشتری"
    },
    {
        "errorCode": 100003,
        "errorText": "MarketRuleError",
        "description": "سیستم : خطای قوانین بازار"
    },
    {
        "errorCode": 100004,
        "errorText": "OrderIsDisabled",
        "description": "سیستم : سفارش غیر فعال می باشد"
    },
    {
        "errorCode": 100005,
        "errorText": "OrderIsLocked",
        "description": "سیستم : سفارش قفل می باشد"
    },
    {
        "errorCode": 100006,
        "errorText": "OrderNotExist",
        "description": "سیستم : سفارش وجود ندارد"
    },
    {
        "errorCode": 100008,
        "errorText": "Book Bulding Order Existance",
        "description": "تنها امکان ثبت یک سفارش فعال برای نماد عرضه اولیه امکان پذیر می باشد"
    },
    {
        "errorCode": 100009,
        "errorText": "Delay error",
        "description": "توالی زمان در ارسال سفارش رعایت نشده است"
    }
]

