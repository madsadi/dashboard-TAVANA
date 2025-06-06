import moment from "jalali-moment";

export const OrderType: any = [
  {
    id: 0,
    name: "NotValid",
    title: "نامعتبر",
  },
  {
    id: 1,
    name: "LimitOrder",
    title: "قیمت در بازه",
  },
  {
    id: 2,
    name: "OpeningOrder",
    title: "پیش گشایش",
  },
  {
    id: 3,
    name: "MarketOrder",
    title: "قیمت بازار و حذف",
  },
  {
    id: 4,
    name: "StopOrder",
    title: "حد ضرر",
  },
  {
    id: 5,
    name: "MarketToLimitOrder",
    title: "قیمت بازار و ثبت",
  },
];

export const Interval: any = [
  {
    id: 1,
    name: "Daily",
    title: "روزانه",
  },
  {
    id: 2,
    name: "Weekly",
    title: "هفتگی ",
  },
  {
    id: 3,
    name: "Monthly",
    title: "ماهانه",
  },
];

export const GetOfferTypeEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "IPO",
    title: "عرضه اولیه",
  },
  {
    id: 4,
    code: 4,
    enTitle: "NPO",
    title: "معاملات عادی",
  },
];

export const RequestStatusEnums = [
  {
    id: 1,
    code: 1,
    title: "ارسال مشتري",
    enTitle: "CustomerRequest",
  },
  {
    id: 2,
    code: 2,
    title: "در حال بررسي",
    enTitle: "Pending",
  },
  {
    id: 3,
    code: 3,
    title: "در انتظار تائيد مشتري",
    enTitle: "AwaitingCustomerApproval",
  },
  {
    id: 4,
    code: 4,
    title: "رد مشتري",
    enTitle: "CustomerRejection",
  },
  {
    id: 5,
    code: 5,
    title: "تائيد مشتري",
    enTitle: "CustomerConfirmation",
  },
  {
    id: 6,
    code: 6,
    title: "ثبت ادمين",
    enTitle: "AdminRegistration",
  },
  {
    id: 7,
    code: 7,
    title: "رد ادمين",
    enTitle: "AdminRejection",
  },
  {
    id: 8,
    code: 8,
    title: "فعال",
    enTitle: "Active",
  },
  {
    id: 9,
    code: 9,
    title: "فسخ شده",
    enTitle: "Canceled",
  },
  {
    id: 10,
    code: 10,
    title: "منقضي",
    enTitle: "Expired",
  },
  {
    id: 11,
    code: 11,
    title: "تسويه شده",
    enTitle: "Cleared",
  },
  {
    id: 12,
    code: 12,
    title: "لغو مشتري",
    enTitle: "CustomerCancellation",
  },
];
export const PeriodDateEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Month",
    title: "یک ماهه",
  },
  {
    id: 2,
    code: 2,
    enTitle: "3Month",
    title: "سه ماهه",
  },
  {
    id: 6,
    code: 6,
    enTitle: "6Month",
    title: "شش ماهه",
  },
  {
    id: 12,
    code: 12,
    enTitle: "year",
    title: "یک ساله",
  },
];

export const CustomerOriginEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Client",
    title: "کاربر عادی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "House",
    title: "کارگزاری",
  },
  {
    id: 4,
    code: 4,
    enTitle: "Group",
    title: "ایستگاه معاملاتی (آنلاین)",
  },
  {
    id: 5,
    code: 5,
    enTitle: "Others",
    title: "سایر",
  },
  {
    id: 6,
    code: 6,
    enTitle: "MarketMaker",
    title: "بازارگردان",
  },
  {
    id: 7,
    code: 7,
    enTitle: "RelatedParty",
    title: "اشخاص مرتبط با کارگزار",
  },
  {
    code: 8,
    id: 8,
    enTitle: "All",
    title: "همه",
  },
];
export const IsValidEnums: any = [
  {
    id: true,
    title: "معتبر",
  },
  {
    id: false,
    title: "نامعتبر",
  },
  {
    id: null,
    title: "",
  },
];

export const StatusEnums: any = [
  {
    id: 1,
    title: " ثبت شده",
  },
  {
    id: 2,
    title: "در حال بررسی",
  },
  {
    id: 3,
    title: "تایید شده",
  },
  {
    id: 4,
    title: "رد شده",
  },
  {
    id: 5,
    title: "لغو شده",
  },
];
export const FactorStatusEnums: any = [
  {
    id: 1,
    code: 1,
    enTitle: "Created",
    title: "ایجاد شده",
  },
  {
    id: 2,
    code: 2,
    enTitle: "WaitingForBranch",
    title: "در انتظار تایید شعب",
  },
  {
    id: 3,
    code: 3,
    enTitle: "ApprovedByBranch",
    title: "تایید شده توسط شعب",
  },
  {
    id: 4,
    code: 4,
    enTitle: "RefusedByBranch",
    title: "رد شده توسط شعب",
  },
  {
    id: 5,
    code: 5,
    enTitle: "ApprovedByFinancial",
    title: "تایید شده توسط مالی",
  },
  {
    id: 6,
    code: 6,
    enTitle: "RefusedByFinancial",
    title: "رد شده توسط مالی",
  },
  {
    id: 7,
    code: 7,
    enTitle: "WaitingForPaying",
    title: "در انتظار پرداخت",
  },
  {
    id: 8,
    code: 8,
    enTitle: "IsPayed",
    title: "پرداخت شده",
  },
  {
    id: 9,
    code: 9,
    enTitle: "IsDeleted",
    title: "ابطال شده",
  },
  {
    id: 10,
    code: 10,
    enTitle: "IsChanged",
    title: "اصلاح شده",
  },
  {
    id: 11,
    code: 11,
    enTitle: "WaitingForMarketer",
    title: "در انتظار تایید مارکتر",
  },
  {
    id: 12,
    code: 12,
    enTitle: "ApprovedByMarketer",
    title: "تایید شده توسط مارکتر",
  },
  {
    id: 13,
    code: 13,
    enTitle: "RefusedByMarketer",
    title: "رد شده توسط مارکتر",
  },
];

export const GuaranteeTypeEnums = [
  {
    id: 1,
    code: 1,
    title: "چک",
    enTitle: "Check",
  },
  {
    id: 2,
    code: 2,
    title: "سفته",
    enTitle: "Promissory",
  },
  {
    id: 3,
    code: 3,
    title: "چک و سفته",
    enTitle: "Check and Promissory",
  },
];

export const Hours: any[] = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];
export const Minutes: any[] = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];

export const subsidiaryType = [
  {
    id: 1,
    code: 1,
    enTitle: "SecurityBrokerage",
    title: "کارگزاری",
  },
  {
    id: 2,
    code: 2,
    enTitle: "AssetManagement",
    title: "مدیریت دارایی",
  },
  {
    id: 3,
    code: 3,
    enTitle: "EnergyBrokerage",
    title: "انرژی",
  },
  {
    id: 4,
    code: 4,
    enTitle: "MerchandiseBrokerage",
    title: "کالا",
  },
  {
    id: 5,
    code: 5,
    enTitle: "ITTechnology",
    title: "آی تی",
  },
  {
    id: 6,
    code: 6,
    enTitle: "FinancialGroup",
    title: "هلدینگ",
  },
  {
    id: 7,
    code: 7,
    enTitle: "CurrencyExchange",
    title: "صرافی",
  },
];
export const sides = [
  {
    id: 1,
    name: "Buy",
    title: "خرید",
  },
  {
    id: 2,
    name: "Sell",
    title: "فروش",
  },
  {
    id: null,
    name: "all",
    title: "هردو",
  },
];

export const SettlementDelayEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "OneDaySettlement",
    title: "تسویه یک روزه",
  },
  {
    id: 2,
    code: 2,
    enTitle: "TwoDaySettlement",
    title: "تسویه دو روزه",
  },
  {
    id: 3,
    code: 3,
    enTitle: "ThreeDaySettlement",
    title: "تسویه سه روزه",
  },
  {
    id: 5,
    code: 5,
    enTitle: "FiveDaySettlement",
    title: "تسویه پنج روزه",
  },
];

export const Options: any[] = [
  {
    id: true,
    title: "حذف شده",
  },
  {
    id: false,
    title: "حذف نشده",
  },
  {
    id: null,
    title: "همه",
  },
];

export const activeStatus: any[] = [
  {
    id: true,
    title: "فعال",
  },
  {
    id: false,
    title: "غیر فعال",
  },
  {
    id: null,
    title: "همه",
  },
];

export const genderEnums: any[] = [
  {
    id: 1,
    title: "مرد",
  },
  {
    id: 2,
    title: "زنان",
  },
];

export const statesEnums: any[] = [
  {
    id: 1,
    code: 1,
    enTitle: "WaitingToApproveByCustomer",
    title: "در انتظار تایید مشتری",
  },
  {
    id: 2,
    code: 2,
    enTitle: "ApprovedByCustomer",
    title: "تایید مشتری",
  },
  {
    id: 3,
    code: 3,
    enTitle: "WaitingForValidation",
    title: "در حال بررسی",
  },
  {
    id: 4,
    code: 4,
    enTitle: "ApprovedByAdmin",
    title: "تایید ادمین",
  },
  {
    id: 5,
    code: 5,
    enTitle: "RejectedByAdmin",
    title: "لغو ادمین",
  },
  {
    id: 6,
    code: 6,
    enTitle: "Deactive",
    title: "غیرفعال",
  },
];

export const isActiveWithNoNull: any[] = [
  {
    id: true,
    title: "فعال",
  },
  {
    id: false,
    title: "غیر فعال",
  },
];

export const category: any[] = [
  { title: "فعال", id: "GetAllActive" },
  { title: "همه", id: "GetAll" },
];
export const isRequired: any[] = [
  {
    id: true,
    title: "بله",
  },
  {
    id: false,
    title: "خیر",
  },
];

export const CalculationBaseTypeEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "PlanOne",
    title: "جدول شماره 1",
  },
  {
    id: 2,
    code: 2,
    enTitle: "PlanTwo",
    title: "جدول شماره 2",
  },
  {
    id: 3,
    code: 3,
    enTitle: "PlanThree",
    title: "جدول شماره 3",
  },
  {
    id: 4,
    code: 4,
    enTitle: "NoPlan",
    title: "نامشخص",
  },
  {
    id: 5,
    code: 5,
    enTitle: "ConstOne",
    title: "ثابت شماره 1",
  },
  {
    id: 6,
    code: 6,
    enTitle: "ConstTwo",
    title: "ثابت شماره 2",
  },
  {
    id: 7,
    code: 7,
    enTitle: "ConstThree",
    title: "ثابت شماره 3",
  },
  {
    id: 8,
    code: 8,
    enTitle: "ConstFour",
    title: "ثابت شماره 4",
  },
];

export const CoefficientBaseTypeEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Plan",
    title: "پلکان",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Const",
    title: "ثابت",
  },
  {
    id: 3,
    code: 3,
    enTitle: "Unknown",
    title: "نامشخص",
  },
];

export const AccountTypeEnum = [
  {
    title: "معاملات مشتری کارگزاری",
    enTitle: "BrokerCustomerTrading",
    id: 1,
  },
];

export const AssignmentTypeEnums = [
  {
    title: "مبلغ",
    id: "1",
  },
  {
    title: "درصد",
    id: "2",
  },
];

export const SettlementStateEnum = [
  {
    title: "تسویه شده",
    id: 1,
  },
  {
    title: "تسویه نشده",
    id: 2,
  },
  {
    title: "هر دو",
    id: 3,
  },
];

export const ManagementTypeEnums = [
  {
    title: "رسمی",
    id: 1,
  },
  {
    title: "غیر رسمی",
    id: 2,
  },
  {
    title: "هر دو",
    id: null,
  },
];

export const DepartmentEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Board",
    title: "هیئت مدیره",
  },
  {
    id: 2,
    code: 2,
    enTitle: "FinanceAndAccounting",
    title: "مالی و حسابداری",
  },
  {
    id: 3,
    code: 3,
    enTitle: "Trading",
    title: "معاملات",
  },
  {
    id: 4,
    code: 4,
    enTitle: "Investment",
    title: "سرمایه گذاری",
  },
  {
    id: 5,
    code: 5,
    enTitle: "Branches",
    title: "شعب",
  },
  {
    id: 6,
    code: 6,
    enTitle: "Marketing",
    title: "توسعه بازار",
  },
  {
    id: 7,
    code: 7,
    enTitle: "CustomerRegistartion",
    title: "پذیرش",
  },
  {
    id: 8,
    code: 8,
    enTitle: "HumanResources",
    title: "منابع انسانی",
  },
  {
    id: 9,
    code: 9,
    enTitle: "CallCenter",
    title: "مرکز تماس",
  },
  {
    id: 10,
    code: 10,
    enTitle: "LegalAffair",
    title: "معاونت حقوقی",
  },
  {
    id: 11,
    code: 11,
    enTitle: "SupportCenter",
    title: "پشتیبانی",
  },
  {
    id: 12,
    code: 12,
    enTitle: "Executive",
    title: "عملیات و اجرا",
  },
];

export const PositionEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Chairman",
    title: "رئیس هیئت مدیره",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Member",
    title: "عضو هیئت مدیره",
  },
  {
    id: 3,
    code: 3,
    enTitle: "CEO",
    title: "مدیرعامل",
  },
  {
    id: 4,
    code: 4,
    enTitle: "VP",
    title: "معاونت",
  },
  {
    id: 5,
    code: 5,
    enTitle: "CTO",
    title: "مدیر فنی",
  },
  {
    id: 6,
    code: 6,
    enTitle: "CPO",
    title: "مدیر محصول",
  },
  {
    id: 7,
    code: 7,
    enTitle: "Manager",
    title: "مدیر",
  },
  {
    id: 8,
    code: 8,
    enTitle: "Chief",
    title: "سرپرست",
  },
  {
    id: 9,
    code: 9,
    enTitle: "Supervisor",
    title: "رئیس",
  },
  {
    id: 10,
    code: 10,
    enTitle: "SeniorStaff",
    title: "کارشناس ارشد",
  },
  {
    id: 11,
    code: 11,
    enTitle: "Staff",
    title: "کارشناس",
  },
  {
    id: 12,
    code: 12,
    enTitle: "JuniorStaff",
    title: "کارآموز",
  },
  {
    id: 13,
    code: 13,
    enTitle: "Trader",
    title: "معامله گر",
  },
];
export const ContractTypeEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Agency",
    title: "نمایندگی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Independent",
    title: "مستقل",
  },
];

const buildYears = (year: string) => {
  let arrayOfYears = [];
  for (let y = 0; y < 15; y++) {
    arrayOfYears.push({
      title: String(Number(year) - y),
      id: Number(year) - y,
    });
  }
  return arrayOfYears;
};
export const Year: any[] = buildYears(moment().locale("fa").format("YYYY"));
export const Months: any[] = [
  {
    id: "01",
    title: "فروردین",
  },
  {
    id: "02",
    title: "اردیبهشت",
  },
  {
    id: "03",
    title: "خرداد",
  },
  {
    id: "04",
    title: "تیر",
  },
  {
    id: "05",
    title: "مرداد",
  },
  {
    id: "06",
    title: "شهریور",
  },
  {
    id: "07",
    title: "مهر",
  },
  {
    id: "08",
    title: "آبان",
  },
  {
    id: "09",
    title: "آذر",
  },
  {
    id: "10",
    title: "دی",
  },
  {
    id: "11",
    title: "بهمن",
  },
  {
    id: "12",
    title: "اسفند",
  },
];

export const UserType: any = [
  {
    title: "فعال",
    id: "active",
  },
  {
    title: "غیر فعال",
    id: "inactive",
  },
];
export const SortBy: any = [
  {
    title: "تاریخ ثبت نام",
    id: "RegisterDate",
  },
  {
    title: "گردش خالص ثبت شده",
    id: "TotalPureVolume",
  },
];

export const SortOrder: any = [
  {
    title: "صعودی",
    id: 1,
  },
  {
    title: "نزولی",
    id: -1,
  },
];
export const orderTechnicalOrigin: any[] = [
  // {
  //     "id": 1,
  //     "code": 0,
  //     "enTitle": "None",
  //     "title": "ناموجود"
  // },
  {
    id: 1,
    code: 1,
    enTitle: "NotProvided",
    title: "نامعین",
  },
  {
    id: 2,
    code: 2,
    enTitle: "OtherOrders",
    title: "سایر",
  },
  {
    id: 3,
    code: 3,
    enTitle: "ManualBuyingInOrder",
    title: "سفارش غیرخودکار",
  },
  {
    id: 4,
    code: 4,
    enTitle: "AutomaticBuyingInOrder",
    title: "سفارش خودکار",
  },
];

export const orderOrigin: any[] = [
  // {
  //     "code": 0,
  //     "title": "نامعتبر",
  //     "enTitle": "NotValid",
  //     "isActive": true
  // },
  {
    id: 1,
    title: "کاربر",
    enTitle: "Client",
    isActive: true,
  },
  {
    id: 2,
    title: "کارگزاري",
    enTitle: "House",
    isActive: true,
  },
  {
    id: 3,
    title: "ايستگاه آنلاين",
    enTitle: "Group",
    isActive: true,
  },
  {
    id: 4,
    title: "ساير",
    enTitle: "Others",
    isActive: true,
  },
  {
    id: 5,
    title: "بازارگردان",
    enTitle: "MarketMaker",
    isActive: true,
  },
  {
    id: 6,
    title: "بخش مرتبط",
    enTitle: "RelatedParty",
    isActive: true,
  },
];

export const validityType = [
  {
    id: 1,
    name: "Day",
    title: "روز",
  },
  {
    id: 2,
    name: "GoodTillDate",
    title: "معتبر تا تاریخ",
  },
  {
    id: 3,
    name: "GoodTillCancelled",
    title: "معتبر تا لغو",
  },
  {
    id: 4,
    name: "FillAndKill",
    title: "انجام و حذف",
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
];

export const orderStatus: any = [
  {
    id: 1,
    title: "در حال ارسال درخواست",
    enTitle: "SendRequest",
  },
  {
    id: 2,
    title: "قسمتی معامله شده",
    enTitle: "PartiallyExequted",
  },
  {
    id: 3,
    title: "ثبت در هسته معاملاتی",
    enTitle: "OrderPutInTheBook",
  },
  {
    id: 4,
    title: "لغو شده",
    enTitle: "OrderCancelledByTheBroker",
  },
  {
    id: 5,
    title: "لغو شده توسط ناظر",
    enTitle: "OrderCancelledBySurveillance",
  },
  {
    id: 6,
    title: "لغو توسط هسته معاملاتی",
    enTitle: "OrderAutomaticallyCancelledByTheCentralTradingEngine",
  },
  {
    id: 8,
    title: "انجام شده",
    enTitle: "OrderCompletelyExecuted",
  },
  {
    id: 12,
    title: "انقضا به دلیل اتمام زمان اعتبار",
    enTitle: "OrderEliminatedBecauseItHasReachedItsValidity",
  },
  {
    id: 13,
    title: "خطا در سفارش",
    enTitle: "OrderError",
  },
  {
    id: 15,
    title: "ابطال کامل معاملات",
    enTitle: "FullTradeCancellation",
  },
  {
    id: 16,
    title: "ابطال قسمتی از معاملات",
    enTitle: "PartiallyTradeCancellation",
  },
  {
    id: 14,
    title: "درخواست پذیرفته شد",
    enTitle: "RequestValidated",
  },
];

export const personTypeEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "PrivatePerson",
    title: "حقیقی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "LegalPerson",
    title: "حقوقی",
  },
  {
    id: 3,
    code: 3,
    enTitle: "PrivatePortfolio",
    title: "سبد اختصاصی",
  },
];

export const personTypeSecondVersionEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "PrivatePerson",
    title: "حقیقی",
  },
  {
    id: 0,
    code: 0,
    enTitle: "LegalPerson",
    title: "حقوقی",
  },
];

export const LegalPersonTypeEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Commercial",
    title: "شرکت های تجاری",
  },
  {
    id: 2,
    code: 2,
    enTitle: "NonCommercial",
    title: "موسسات غیرتجاری",
  },
  {
    id: 3,
    code: 3,
    enTitle: "RegisteredWithLaw",
    title: "ثبت شده به موجب قانون",
  },
  {
    id: 4,
    code: 4,
    enTitle: "InvestmentFunds",
    title: "صندوق سرمایه گذاری",
  },
];

export const LegalPersonTypeSubEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "PrivateCompany",
    title: "سهامی خاص",
  },
  {
    id: 2,
    code: 2,
    enTitle: "LimitedCompany",
    title: "با مسئولیت محدود",
  },
  {
    id: 3,
    code: 3,
    enTitle: "PublicCompany",
    title: "سهامی عام",
  },
  {
    id: 4,
    code: 4,
    enTitle: "CooperativeCompany",
    title: "تعاونی",
  },
  {
    id: 5,
    code: 5,
    enTitle: "GeneralPartnership",
    title: "تضامنی",
  },
  {
    id: 6,
    code: 6,
    enTitle: "ProportionalLiabilityPartnership",
    title: "نسبی",
  },
  {
    id: 7,
    code: 7,
    enTitle: "JointMixedCompany",
    title: "مختلط سهامی",
  },
  {
    id: 8,
    code: 8,
    enTitle: "Profit",
    title: "انتفاعی",
  },
  {
    id: 9,
    code: 9,
    enTitle: "NonProfit",
    title: "غیرانتفاعی",
  },
  {
    id: 10,
    code: 10,
    enTitle: "LimitedPartnershipCompany",
    title: "مختلط غیرسهامی",
  },
  {
    id: 11,
    code: 11,
    enTitle: "Governmental",
    title: "شخصیت حقوقی دولتی",
  },
  {
    id: 12,
    code: 12,
    enTitle: "NonGovernmental",
    title: "شخصیت حقوقی عمومی",
  },
  {
    id: 13,
    code: 13,
    enTitle: "DedicatedMarketing",
    title: "اختصاصی بازارگردانی",
  },
  {
    id: 14,
    code: 14,
    enTitle: "RealEstate",
    title: "املاک و مستغلات",
  },
  {
    id: 15,
    code: 15,
    enTitle: "Project",
    title: "پروژه ای",
  },
  {
    id: 16,
    code: 16,
    enTitle: "VentureCapitalFund",
    title: "جسورانه",
  },
  {
    id: 17,
    code: 17,
    enTitle: "Private",
    title: "خصوصی",
  },
  {
    id: 18,
    code: 18,
    enTitle: "FixedIncomeSecurities",
    title: "در اوراق بهادار با درآمد ثابت",
  },
  {
    id: 19,
    code: 19,
    enTitle: "SecuritiesWithCommodityDeposits",
    title: "در اوراق بهادار مبتنی بر سپرده کالایی",
  },
  {
    id: 20,
    code: 20,
    enTitle: "InStock",
    title: "در سهام",
  },
  {
    id: 21,
    code: 21,
    enTitle: "LandAndBuildings",
    title: "زمین و ساختمان",
  },
  {
    id: 22,
    code: 22,
    enTitle: "Mixed",
    title: "مختلط",
  },
];
export const customerTypeEnums = [
  {
    id: 0,
    code: 0,
    enTitle: "LegalPerson",
    title: "حقوقی",
  },
  {
    id: 1,
    code: 1,
    enTitle: "PrivatePerson",
    title: "حقیقی",
  },
];

export const riskLevel = [
  {
    id: 1,
    code: 1,
    enTitle: "VeryLow",
    title: "خیلی کم",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Low",
    title: "کم",
  },
  {
    id: 3,
    code: 3,
    enTitle: "Medium",
    title: "عادی",
  },
  {
    id: 4,
    code: 4,
    enTitle: "High",
    title: "زیاد",
  },
  {
    id: 5,
    code: 5,
    enTitle: "VeyHigh",
    title: "خیلی زیاد",
  },
];

export const changeTypeEnums = [
  {
    id: 0,
    code: 0,
    enTitle: "UnKnown",
    title: "نامشخص",
  },
  {
    id: 1,
    code: 1,
    enTitle: "Buy",
    title: "خرید",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Sell",
    title: "فروش",
  },
  {
    id: 3,
    code: 3,
    enTitle: "SwitchIn",
    title: "ورود سهام با تغییر ناظر",
  },
  {
    id: 4,
    code: 4,
    enTitle: "SwitchOut",
    title: "خروج سهام با تغییر ناظر",
  },
];
export const personOriginEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Client",
    title: "کاربر عادی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "House",
    title: "کارگزاری",
  },
  {
    id: 3,
    code: 3,
    enTitle: "PrivatePortfolio",
    title: "سبد اختصاصی",
  },
  {
    id: 4,
    code: 4,
    enTitle: "Group",
    title: "آنلاین استیشن",
  },
  {
    id: 5,
    code: 5,
    enTitle: "Others",
    title: "سایر",
  },
  {
    id: 6,
    code: 6,
    enTitle: "MarketMaker",
    title: "بازارگردان",
  },
];
export const sejamStatusEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Init",
    title: "وضعیت اولیه",
  },
  {
    id: 2,
    code: 2,
    enTitle: "SuccessPayment",
    title: "پرداخت موفق",
  },
  {
    id: 3,
    code: 3,
    enTitle: "PolicyAccepted",
    title: "تعهدات",
  },
  {
    id: 4,
    code: 4,
    enTitle: "PendingValidation",
    title: "استعلام اطلاعات",
  },
  {
    id: 5,
    code: 5,
    enTitle: "InvalidInformation",
    title: "اطلاعات نامعتبر",
  },
  {
    id: 6,
    code: 6,
    enTitle: "TraceCode",
    title: "کد پیگیری",
  },
  {
    id: 7,
    code: 7,
    enTitle: "Sejami",
    title: "سجامی",
  },
  {
    id: 8,
    code: 8,
    enTitle: "Suspend",
    title: "سجامی ناقص-منقضی شده",
  },
  {
    id: 9,
    code: 9,
    enTitle: "Dead",
    title: "فوت شده",
  },
  {
    id: 10,
    code: 10,
    enTitle: "SemiSejami",
    title: "سجامی ناقص-نقص مدرک/عدم احرازهویت",
  },
];

export const CustomerAgreementState = [
  {
    id: 1,
    code: 1,
    enTitle: "WaitingForCustomerApproval",
    title: "در انتظار تایید مشتری",
  },
  {
    id: 2,
    code: 2,
    enTitle: "ApprovedByCustomer",
    title: "تایید شده توسط مشتری",
  },
  {
    id: 3,
    code: 3,
    enTitle: "RejectedByCustomer",
    title: "رد شده توسط مشتری",
  },
  {
    id: 4,
    code: 4,
    enTitle: "WaitingForAdminApproval",
    title: "در حال بررسی",
  },
  {
    id: 5,
    code: 5,
    enTitle: "ApprovedByAdmin",
    title: "تایید شده توسط ادمین",
  },
  {
    id: 6,
    code: 6,
    enTitle: "RejectedByAdmin",
    title: "رد شده توسط ادمین",
  },
];
export const onlineRegistrationStatusEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "AccountCreated",
    title: "ایجاد کاربر",
  },
  {
    id: 2,
    code: 2,
    enTitle: "NotSejami",
    title: "سجامی نیست",
  },
  {
    id: 3,
    code: 3,
    enTitle: "IncompleteSejam",
    title: "نقص سجام",
  },
  {
    id: 4,
    code: 4,
    enTitle: "PassedAway",
    title: "فوت شده",
  },
  {
    id: 5,
    code: 5,
    enTitle: "Sejami",
    title: "سجامی",
  },
  {
    id: 6,
    code: 6,
    enTitle: "SejamProfileReceived",
    title: "دریافت اطلاعات سجام",
  },
  {
    id: 7,
    code: 7,
    enTitle: "IdentificationInfoCompleted",
    title: "تکمیل اطلاعات هویتی",
  },
  {
    id: 8,
    code: 8,
    enTitle: "AgentInfoCompleted",
    title: "تکمیل اطلاعات نماینده",
  },
  {
    id: 9,
    code: 9,
    enTitle: "ShareholderInfoCompleted",
    title: "تکمیل اطلاعات صاحبان سهام",
  },
  {
    id: 10,
    code: 10,
    enTitle: "StakeholderInfoCompleted",
    title: "تکمیل اطلاعات ذینفعان",
  },
  {
    id: 11,
    code: 11,
    enTitle: "JobInfoCompleted",
    title: "تکمیل اطلاعات شغلی",
  },
  {
    id: 12,
    code: 12,
    enTitle: "AddressInfoCompleted",
    title: "تکمیل آدرس",
  },
  {
    id: 13,
    code: 13,
    enTitle: "BankAccountInfoCompleted",
    title: "تکمیل شماره حساب بانکی",
  },
  {
    id: 14,
    code: 14,
    enTitle: "FinancialInfoCompleted",
    title: "تکمیل اطلاعات مالی",
  },
  {
    id: 15,
    code: 15,
    enTitle: "IdentitficationScanUploaded",
    title: "بارگذاری مدارک",
  },
  {
    id: 16,
    code: 16,
    enTitle: "ExamPassed",
    title: "تکمیل آزمون",
  },
  {
    id: 17,
    code: 17,
    enTitle: "AgreementsConfirmed",
    title: "تکمیل تعهدنامه ها",
  },
  {
    id: 18,
    code: 18,
    enTitle: "CustomerConfirmed",
    title: "تائید مشتری",
  },
  {
    id: 19,
    code: 19,
    enTitle: "WaittingForAdminApproval",
    title: "در حال بررسی",
  },
  {
    id: 20,
    code: 20,
    enTitle: "RejectedByAdmin",
    title: "رد شده",
  },
  {
    id: 21,
    code: 21,
    enTitle: "AcceptedByAdmin",
    title: "تائید شده",
  },
  {
    id: 22,
    code: 22,
    enTitle: "SentToSejam",
    title: "ارسال شده به سجام",
  },
  {
    id: 23,
    code: 23,
    enTitle: "CustomerRegistered",
    title: "ثبت شده",
  },
];

export const operators = [
  { title: ")", id: ")" },
  { title: "(", id: "(" },
  { title: "و", id: "&&" },
  { title: "یا", id: "||" },
  { title: "جمع", id: "+" },
  { title: "تفریق", id: "-" },
  { title: "ضرب", id: "*" },
  { title: "تقسیم", id: "/" },
  { title: "مساوی", id: "=" },
  { title: "مخالف", id: "!=" },
  { title: "بزرگتر", id: ">" },
  { title: "کوچکتر", id: "<" },
  { title: "بزرگتر یا مساوی", id: ">=" },
  { title: "کوچکتر یا مساوی", id: "<=" },
  { title: "شامل", id: "contain" },
  { title: "دقیقا شامل", id: "exact" },
];

export const originEnum: any = [
  {
    id: 1,
    title: "وب",
  },
  {
    id: 2,
    title: "موبایل",
  },
];
export const marketerTypeEnum: any = [
  {
    id: 1,
    title: "بازاریاب",
  },
  {
    id: 2,
    title: "معرف",
  },
  {
    id: 3,
    title: "هردو",
  },
];
export const CalculationBaseType: any = [
  {
    id: 1,
    code: 1,
    enTitle: "Turnover",
    title: "گردش",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Commission",
    title: "کارمزد",
  },
];
export const stationTypeEnum: any = [
  {
    id: 1,
    code: 1,
    enTitle: "PamStation",
    title: "ایستگاه معاملاتی فیزیکی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "OnlineStation",
    title: "ایستگاه معاملاتی آنلاین",
  },
  {
    id: 3,
    code: 3,
    enTitle: "OMS",
    title: "OMS",
  },
];

export const AssetStatusEnums: any = [
  {
    id: 1,
    code: 1,
    enTitle: "Registered",
    title: "ثبت شده",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Pending",
    title: "در حال بررسی",
  },
  {
    id: 3,
    code: 3,
    enTitle: "Accepted",
    title: "تایید شده",
  },
  {
    id: 4,
    code: 4,
    enTitle: "Rejected",
    title: "رد شده",
  },
  {
    id: 5,
    code: 5,
    enTitle: "Canceled",
    title: "لغو شده",
  },
];

export const StatusTypeEnum = [
  {
    id: "1",
    code: 1,
    title: "فعال",
    enTitle: "Active",
  },
  {
    id: "2",
    code: 2,
    title: "غيرفعال",
    enTitle: "Deactive",
  },
];

export const PersonNationalityEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "Iranian",
    title: "ایرانی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Foreign",
    title: "غیر ایرانی",
  },
];

export const ApplicationCodeEnums: any = [
  {
    id: 1,
    title: "وب",
  },
  {
    id: 2,
    title: "موبایل",
  },
];
export const bousreCodeType: any = [
  {
    id: 1,
    code: 1,
    enTitle: "Energy",
    title: "انرژی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Product",
    title: "کالا",
  },
  {
    id: 3,
    code: 3,
    enTitle: "StockExchange",
    title: "بورس-فرابورس",
  },
  {
    id: 4,
    code: 4,
    enTitle: "None",
    title: "نامشخص",
  },
];

export const TypeOfBranches: any = [
  {
    id: 1,
    title: "شعبه",
  },
  {
    id: 2,
    title: "نمایندگی",
  },
  {
    id: "",
    title: "همه",
  },
];

export const TransactionLevelEnums = [
  {
    id: 1,
    code: 1,
    enTitle: "One",
    title: "کمتر از 250 میلیون ریال",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Two",
    title: "بین 250 تا 1000 میلیون ریال",
  },
  {
    id: 3,
    code: 3,
    enTitle: "Three",
    title: "بین 1000 تا 5000 میلیون ریال",
  },
  {
    id: 4,
    code: 4,
    enTitle: "Four",
    title: "بین 5000 تا 10000 میلیون ریال",
  },
  {
    id: 5,
    code: 5,
    enTitle: "Five",
    title: "بیش از 10000 میلیون ریال",
  },
  {
    id: 6,
    code: 6,
    enTitle: "Eleven",
    title: "کمتر از 500 میلیون ریال",
  },
  {
    id: 7,
    code: 7,
    enTitle: "Twelve",
    title: "بین 500 تا 1000 میلیون ریال",
  },
  {
    id: 8,
    code: 8,
    enTitle: "Thirteen",
    title: "بین 1000 تا 5000 میلیون ریال",
  },
  {
    id: 9,
    code: 9,
    enTitle: "Fourteen",
    title: "بین 5000 تا 10000 میلیون ریال",
  },
  {
    id: 10,
    code: 10,
    enTitle: "Fifteen",
    title: "بیش از 10000 میلیون ریال",
  },
];

export const TradingKnowledgeLevelEnunms = [
  {
    id: 1,
    code: 1,
    enTitle: "Excellent",
    title: "عالی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Good",
    title: "خوب",
  },
  {
    id: 3,
    code: 3,
    enTitle: "Medium",
    title: "متوسط",
  },
  {
    id: 4,
    code: 4,
    enTitle: "Low",
    title: "کم",
  },
  {
    id: 5,
    code: 5,
    enTitle: "VeryLow",
    title: "بسیار کم",
  },
];
export const BankAccountTypeEnums: any = [
  {
    id: 1,
    code: 1,
    enTitle: "None",
    title: "نامشخص",
  },
  {
    id: 2,
    code: 2,
    enTitle: "ShortTermAccount",
    title: "کوتاه مدت",
  },
  {
    id: 3,
    code: 3,
    enTitle: "CurrentAccount",
    title: "جاری",
  },
  {
    id: 4,
    code: 4,
    enTitle: "SavingAccount",
    title: "قرض الحسنه",
  },
];

export const PositionTypeEnums: any = [
  {
    enTitle: "Chairman",
    id: 1,
    title: "رییش هیت مدیره",
  },
  {
    enTitle: "DeputyChairman",
    id: 2,
    title: "نایب رییس هیت مدیره",
  },
  {
    enTitle: "Ceo",
    id: 3,
    title: "مدیر عامل",
  },
  {
    enTitle: "Member",
    id: 4,
    title: "عضو هیت مدیره",
  },
  {
    enTitle: "Others",
    id: 5,
    title: "سابر",
  },
  {
    enTitle: "Inspector",
    id: 6,
    title: "بازرس",
  },
  {
    enTitle: "Auditor",
    id: 7,
    title: "حسابرس",
  },
  {
    enTitle: "FinancialAccountHolder",
    id: 8,
    title: "ذی حساب مالی",
  },
  {
    enTitle: "Deputy",
    id: 9,
    title: "قائم مقام ",
  },
  {
    enTitle: "Agent",
    id: 10,
    title: "نماینده",
  },
];

export const BourseCodeTypeEnum = [
  {
    id: 1,
    code: 1,
    enTitle: "Energy",
    title: "انرژی",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Product",
    title: "کالا",
  },
  {
    id: 3,
    code: 3,
    enTitle: "StockExchange",
    title: "بورس-فرابورس",
  },
  {
    id: 4,
    code: 4,
    enTitle: "None",
    title: "نامشخص",
  },
];
export const AgentTypeEnums: any = [
  {
    id: 1,
    code: 1,
    enTitle: "Attorney",
    title: "وکیل",
  },
  {
    id: 2,
    code: 2,
    enTitle: "Province",
    title: "ولی",
  },
  {
    id: 3,
    code: 3,
    enTitle: "Conspiracy",
    title: "قیم",
  },
  {
    id: 4,
    code: 4,
    enTitle: "Prescriptive",
    title: "وصی",
  },
];

export const StakeholderTypeEnums = [
  {
    enTitle: "Manager",
    title: "عضو هیئت مدیره",
    id: 1,
  },
  {
    enTitle: "TakeAccess",
    title: "عضو دارای حق برداشت",
    id: 2,
  },
  {
    enTitle: "OrderAccess",
    title: "عضو دارای حق سفارش",
    id: 3,
  },
  {
    enTitle: "Agent",
    title: "نماینده",
    id: 4,
  },
];
export const enTierNameEnum: any = [
  {
    enTitle: "BTEF-T2",
  },
  {
    enTitle: "ETF-T2",
    faTitle: "صندوق سهام",
  },
  {
    enTitle: "ETF-T3",
    faTitle: "صندوق سهام",
  },
  {
    enTitle: "IEE-ETF",
    faTitle: "صندوق پروژه بورس انرژي",
  },
  {
    enTitle: "IRR-NT2",
    faTitle: "تهاتر ريالي سهام تمام بورسها-جديد",
  },
  {
    enTitle: "IRR-T1",
    faTitle: "تهاتر ريالي اوراق تمام بورسها",
  },
  {
    enTitle: "IRR-T2",
    faTitle: "صندوق مختلط",
  },
  {
    enTitle: "IRR-T3",
    faTitle: "تهاتر ريالي سهام تمام بورسها",
  },
  {
    enTitle: "OTC-EPO",
  },
  {
    enTitle: "OTC-FOFETF-T2",
  },
  {
    enTitle: "OTC-FTEF-T1",
    faTitle: "اوراق با درآمد ثابت ETF صندوق فرابورسي",
  },
  {
    enTitle: "OTC-T1",
    faTitle: "اوراق  فرابورس",
  },
  {
    enTitle: "OTC-T2",
    faTitle: "سهام فرابورس",
  },
  {
    enTitle: "OTC-T3",
    faTitle: "سهام فرابورس",
  },
  {
    enTitle: "OTC-T-T1",
    faTitle: "اوراق خزانه اسلامي",
  },
  {
    enTitle: "OTC-VETF-T2",
    faTitle: "صندوق جسورانه",
  },
  {
    enTitle: "TME-ETF-T1",
    faTitle: "صندوق ETF کالايي",
  },
  {
    enTitle: "TME-T1",
    faTitle: "گواهي سپرده کالايي-محصولات کشاورزی",
  },
  {
    enTitle: "TME-T1-IRR",
    faTitle: "ريال حاصل از اوراق سلف بورس کالا",
  },
  {
    enTitle: "TME-T1-V",
    faTitle: "گواهي سپرده کالايي-فلزات گران بها",
  },
  {
    enTitle: "TME-T2",
    faTitle: "بورس کالا-انبار-ريالي",
  },
  {
    enTitle: "TSE-EPO",
  },
  {
    enTitle: "TSE-FTEF-T1",
    faTitle: "اوراق با درآمد ثابت ETF صندوق بورسي",
  },
  {
    enTitle: "TSE-OTC-EPO",
  },
  {
    enTitle: "TSE-OTC-T1",
    faTitle: "تهاتر اوراق بورس و فرابورس",
  },
  {
    enTitle: "TSE-OTC-T2",
    faTitle: "تهاتر سهام بورس و فرابورس",
  },
  {
    enTitle: "TSE-OTC-T3",
    faTitle: "تهاتر سهام بورس و فرابورس",
  },
  {
    enTitle: "TSE-T1",
    faTitle: "اوراق بورس",
  },
  {
    enTitle: "TSE-T2",
    faTitle: "سهام بورس",
  },
  {
    enTitle: "TSE-T3",
    faTitle: "سهام بورس",
  },
];

export const errors: any = [
  {
    errorCode: 1,
    errorText: "مشتری مجاز به خرید نميباشد",
    description: "مشتری مجاز به خرید نمي باشد",
  },
  {
    errorCode: 2,
    errorText: "مشتری مجاز به خرید در این کارگزاری نميباشد",
    description: "مشتری مجاز به خرید در این کارگزاری نمي باشد",
  },
  {
    errorCode: 3,
    errorText: "حجم درخواستی خارج از حد مجاز ميباشد",
    description: "حجم درخواستی خارج از حد مجاز مي باشد",
  },
  {
    errorCode: 4,
    errorText: "حجم درخواستی باید مضربی از واحد معاملاتی باشد",
    description: "حجم درخواستی باید مضربی از واحد معاملاتی باشد",
  },
  {
    errorCode: 5,
    errorText: "قيمت وارد شده خارج از آستانه ميباشد",
    description: "قيمت وارد شده خارج از آستانه مي باشد",
  },
  {
    errorCode: 6,
    errorText: "قيمت درخواستی باید مضربی از تيک باشد",
    description: "قيمت درخواستی باید مضربی از تيک باشد",
  },
  {
    errorCode: 7,
    errorText: "درخواست خرید برای این سهامدار قبلا ثبت گردیده است",
    description: "درخواست خرید برای این سهامدار قبلا ثبت گردیده است",
  },
  {
    errorCode: 9,
    errorText: "زمان ورود درخواست برای عرضه اوليه هنوز شروع نشده است",
    description: "زمان ورود درخواست برای عرضه اوليه هنوز شروع نشده است",
  },
  {
    errorCode: 10,
    errorText: "پایان زمان قبول درخواست",
    description: "پایان زمان قبول درخواست",
  },
  {
    errorCode: 11,
    errorText: "این نماد شامل درخواست عرضه اوليه نميباشد",
    description: "این نماد شامل درخواست عرضه اوليه نمي باشد",
  },
  {
    errorCode: 12,
    errorText: "هيچ رکوردی برای کنسل شدن پيدا نشد",
    description: "هيچ رکوردی برای کنسل شدن پيدا نشد",
  },
  {
    errorCode: 13,
    errorText: "کدکارگزار در AccountID با کد کارگزار در TraderID یکسان نيست",
    description: "کدکارگزار در AccountID با کد کارگزار در TraderID یکسان نيست",
  },
  {
    errorCode: 14,
    errorText: "کدکارگزار صحیح نمی باشد.",
    description: "کدکارگزار صحیح نمی باشد",
  },
  {
    errorCode: 15,
    errorText: "این کارگزار اجازه ثبت درخواست عرضه اولیه را ندارد.",
    description: "این کارگزار اجازه ثبت درخواست عرضه اولیه را ندارد.",
  },
  {
    errorCode: 98,
    errorText: "REJECT",
    description: "خطای ارتباط با سرور",
  },
  {
    errorCode: 99,
    errorText: "BookBuldingOrderEntryRejected",
    description: "خطا در ارتباط با هسته",
  },
  {
    errorCode: 1003,
    errorText: "Group state doesn t allow this function",
    description: "وضعیت گروه اجازه این عملیات را نمی دهد",
  },
  {
    errorCode: 1004,
    errorText: "Instrument state doesn t allow this function",
    description: "وضعیت نماد اجازه این عملیات را نمی دهد ",
  },
  {
    errorCode: 1006,
    errorText: "Price format is not valid",
    description: "قیمت معتبر نیست",
  },
  {
    errorCode: 1009,
    errorText: "Group not authorized for this broker",
    description: "گروه برای کارگزار مجاز نمی باشد",
  },
  {
    errorCode: 1050,
    errorText: "Field CLIENT ACCOUNT NUMBER is bad filled",
    description: "کد معاملاتی مشتری پر نشده است",
  },
  {
    errorCode: 1501,
    errorText: "Nationality group cannot own more than n%",
    description: "گروه ملیت نمی تواند بیش از n٪ داشته باشد",
  },
  {
    errorCode: 1504,
    errorText: "Investor suspended",
    description: "سرمایه گذار به حالت تعلیق درآمد",
  },
  {
    errorCode: 1520,
    errorText: "No %Ownership for this instrument",
    description: "بدون٪ مالکیت این ابزار",
  },
  {
    errorCode: 1523,
    errorText: "Limit Cap Eceeded",
    description: "محدودیت ارسال سفارش در هسته",
  },
  {
    errorCode: 1525,
    errorText: "Held quantity of shares is insufficient",
    description: "مانده سهام کافی نیست",
  },
  {
    errorCode: 2005,
    errorText: "Quantities must be multiple of traded lot",
    description: "حجم باید ضریبی از LOT باشد",
  },
  {
    errorCode: 2006,
    errorText:
      "Type of price invalid or not authorized according to instr or GR state",
    description: "نوع قیمت معتبر نیست یا طبق دستورالعمل GR یا مجاز نیست",
  },
  {
    errorCode: 2009,
    errorText: "CROSS orders forbidden in pre-opening stage",
    description: "سفارشات CROSS در مرحله پیش گشایش ممنوع است",
  },
  {
    errorCode: 2013,
    errorText: "MARKET TO LIMIT order not supported by opposite limit",
    description: "سفارش MARKET TO LIMIT با حد مخالف پشتیبانی نمی شود",
  },
  {
    errorCode: 2014,
    errorText: "Price must be valid against tick table",
    description: "قیمت باید در برابر جدول تیک معتبر باشد",
  },
  {
    errorCode: 2019,
    errorText: "Validity date must be higher than current session date",
    description: "تاریخ اعتبار باید بیشتر از تاریخ جلسه فعلی باشد",
  },
  {
    errorCode: 2026,
    errorText: "Validity date must be filled",
    description: "تاریخ اعتبار در سفارش، پر نشده است",
  },
  {
    errorCode: 2029,
    errorText: "Min quantity forbidden for this order type",
    description: "حداقل مقدار برای این نوع سفارش ممنوع می باشد",
  },
  {
    errorCode: 2031,
    errorText: "Disclosed quantity too small",
    description: "مقدار افشا شده خیلی کم است",
  },
  {
    errorCode: 2032,
    errorText:
      "Disclosed quantity forbidden for FAK,MOO,CROSS,MARKET and STOP-LOSS ord",
    description:
      "مقدار آشکار شده برای سفارش های FAK ، MOO ، CROSS ، MARKET و STOP-LOSS ممنوع است",
  },
  {
    errorCode: 2040,
    errorText: "Minimum quantity cannot be modified",
    description: "حداقل مقدار قابل اصلاح نیست",
  },
  {
    errorCode: 2044,
    errorText: "Validity date for this type of order must be FAK",
    description: "تاریخ اعتبار این نوع سفارش باید FAK باشد",
  },
  {
    errorCode: 2045,
    errorText: "This order is not in the book",
    description: "سفارش وجود ندارد",
  },
  {
    errorCode: 2046,
    errorText:
      "Disclosed quantity cannot be greater than total or remaining qty",
    description:
      "مقدار افشا شده نمی تواند از مقدار کل یا باقی مانده بیشتر باشد",
  },
  {
    errorCode: 2058,
    errorText: "STOP PRICE maxi-mini must be >= TRIGGER PRICE",
    description: "STOP PRICE maxi-mini باید>> TRIGGER PRICE باشد\r\n",
  },
  {
    errorCode: 2059,
    errorText: "STOP PRICE maxi-mini must be <= TRIGGER PRICE",
    description: "STOP PRICE maxi-mini باید <= TRIGGER PRICE باشد",
  },
  {
    errorCode: 2060,
    errorText: "TRIGGER PRICE must be < last price or last day price",
    description: "قیمت باید کوچکتر از آخرین قیمت و یا قیمت آخرین روز باشد",
  },
  {
    errorCode: 2061,
    errorText: "TRIGGER PRICE must be > last price or last day price",
    description: "قیمت باید بزرگتر از آخرین قیمت و یا قیمت آخرین روز باشد",
  },
  {
    errorCode: 2115,
    errorText: "Total quantity must be inside the limits",
    description: "مقدار کل باید در آستانه مجاز باشد",
  },
  {
    errorCode: 2130,
    errorText: "Minimum quantity forbidden in pre-opening stage",
    description: "حداقل مقدار در مرحله پیش گشایش ممنوع است",
  },
  {
    errorCode: 2137,
    errorText: "Order price is outside the thresholds",
    description: "قیمت سفارش خارج از آستانه مجاز است",
  },
  {
    errorCode: 2500,
    errorText: "Confirmation mandatory for this order",
    description: "تأیید برای این سفارش اجباری است",
  },
  {
    errorCode: 2501,
    errorText: "Order handled in PreOpening - rejected in Continuous Trading",
    description: "سفارش ثبت شده در مرحله پیش گشایش، در زمان معامله رد شد",
  },
  {
    errorCode: 2604,
    errorText: "Trader Id is invalid",
    description: "شناسه معامله گر نامعتبر است",
  },
  {
    errorCode: 3402,
    errorText: "CROSS order price must be inside the limits",
    description: "قیمت سفارش CROSS باید در حد مجاز باشد",
  },
  {
    errorCode: 6231,
    errorText: "Group not authorized for this Trader",
    description: "گروه برای این معامله گر مجاز نیست",
  },
  {
    errorCode: 9010,
    errorText: "Group not authorized on Buy Side for this broker",
    description: "سفارش خرید در این گروه برای کارگزار مجاز نیست",
  },
  {
    errorCode: 9011,
    errorText: "Group not authorized on Sell Side for this broker",
    description: "سفارش فروش در این گروه برای کارگزار مجاز نیست",
  },
  {
    errorCode: 100000,
    errorText: "UnknownError",
    description: "خطای ناشناخته در سیستم",
  },
  {
    errorCode: 100001,
    errorText: "PortfolioError",
    description: "سیستم : خطا در دارایی مشتری",
  },
  {
    errorCode: 100002,
    errorText: "CashflowError",
    description: "سیستم : خطا در مانده مشتری",
  },
  {
    errorCode: 100003,
    errorText: "MarketRuleError",
    description: "سیستم : خطای قوانین بازار",
  },
  {
    errorCode: 100004,
    errorText: "OrderIsDisabled",
    description: "سیستم : سفارش غیر فعال می باشد",
  },
  {
    errorCode: 100005,
    errorText: "OrderIsLocked",
    description: "سیستم : سفارش قفل می باشد",
  },
  {
    errorCode: 100006,
    errorText: "OrderNotExist",
    description: "سیستم : سفارش وجود ندارد",
  },
  {
    errorCode: 100008,
    errorText: "Book Bulding Order Existance",
    description:
      "تنها امکان ثبت یک سفارش فعال برای نماد عرضه اولیه امکان پذیر می باشد",
  },
  {
    errorCode: 100009,
    errorText: "Delay error",
    description: "توالی زمان در ارسال سفارش رعایت نشده است",
  },
];
