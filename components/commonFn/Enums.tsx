
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
        "id": 'true',
        "title": "حذف شده"
    },
    {
        "id": 'false',
        "title": "حذف نشده"
    },
    {
        "id": null,
        "title": "همه"
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

export const EnumsStatus: any = [
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



