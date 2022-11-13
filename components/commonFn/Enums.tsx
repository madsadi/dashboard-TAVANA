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



