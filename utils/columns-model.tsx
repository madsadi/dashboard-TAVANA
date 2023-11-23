import { dateCell } from "./common-funcions";
import {
  CustomerOriginEnums,
  GetOfferTypeEnums,
  SettlementDelayEnums,
  changeTypeEnums,
  customerTypeEnums,
  personTypeEnums,
  sides,
} from "constants/Enums";
import { validate as uuidValidate } from "uuid";

// columnModel.js
export const columnModel = [
  {
    colId: "checkbox",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    headerCheckboxSelectionFilteredOnly: true,
    resizable: false,
    minWidth: 40,
    maxWidth: 40,
  },
  {
    colId: "id",
    field: "id",
    headerName: "شناسه",
    flex: 0,
    width: 90,
    minWidth: 90,
  },
  {
    colId: "faInsCode",
    field: "faInsCode",
    headerName: "نماد",
    minWidth: 120,
    width: 120,
  },
  {
    colId: "faInsName",
    field: "faInsName",
    headerName: "نام کامل نماد",
  },
  {
    colId: "instrumentId",
    field: "instrumentId",
    headerName: "کد نماد",
    minWidth: 120,
    width: 120,
  },
  {
    colId: "maxQuantity",
    field: "maxQuantity",
    headerName: "بیشینه حجم سفارش",
  },
  {
    colId: "minPrice",
    field: "minPrice",
    headerName: "حداقل قیمت سفارش",
  },
  {
    colId: "maxPrice",
    field: "maxPrice",
    headerName: "حداکثر قیمت سفارش",
  },
  {
    colId: "createdBy",
    field: "createdBy",
    headerName: "کاربر ایجاد کننده",
    flex: 0,
    width: 120,
    minWidth: 120,
  },

  {
    colId: "updatedBy",
    field: "updatedBy",
    headerName: "کاربر تغییر دهنده",
    valueFormetter: (rowData: any) => {
      return uuidValidate(rowData.data?.updatedBy)
        ? "-"
        : rowData.data?.updatedBy;
    },
    flex: 0,
    width: 120,
    minWidth: 120,
  },

  {
    colId: "createBy",
    field: "createBy",
    headerName: "کاربر ایجاد کننده",
    flex: 0,
    width: 150,
    minWidth: 150,
  },
  {
    colId: "name",
    field: "name",
    headerName: "نام ",
  },
  {
    colId: "errorMessage",
    field: "errorMessage",
    headerName: "پیام خطا",
  },
  {
    colId: "sequenceNumber",
    field: "sequenceNumber",
    headerName: "مرتبه/اولویت",
    flex: 0,
    width: 120,
    minWidth: 120,
  },
  {
    colId: "marketCode",
    field: "marketCode",
    headerName: "کد بازار",
  },
  {
    colId: "marketTitle",
    field: "marketTitle",
    headerName: "بازار",
  },
  {
    colId: "offerTypeCode",
    field: "offerTypeCode",
    headerName: "نوع عرضه",
    valueFormatter: (rowData: any) => {
      return GetOfferTypeEnums.find(
        (item) => item.id === rowData?.data?.offerTypeCode
      )?.title;
    },
    flex: 0,
  },
  {
    colId: "offerTypeTitle",
    field: "offerTypeTitle",
    headerName: "نوع عرضه",
    flex: 0,
    width: 150,
    minWidth: 150,
  },
  {
    colId: "sideCode",
    field: "sideCode",
    headerName: "سمت سفارش",
    valueFormatter: (rowData: any) => {
      return sides.find((item) => item.id === rowData?.data?.sideCode)?.title;
    },
    flex: 0,
  },
  {
    colId: "sideTitle",
    field: "sideTitle",
    headerName: "سمت سفارش",
    flex: 0,
    width: 150,
    minWidth: 150,
  },
  {
    colId: "settlementDelayCode",
    field: "settlementDelayCode",
    headerName: "تاخیر در تسویه",
    flex: 0,
    width: 150,
    minWidth: 150,
    valueFormatter: (rowData: any) => {
      return SettlementDelayEnums.find(
        (item) => item.id === rowData?.data?.settlementDelayCode
      )?.title;
    },
  },
  {
    colId: "category",
    field: "category",
    headerName: "",
  },
  {
    colId: "broker",
    field: "broker",
    headerName: "کارگزاری",
  },
  {
    colId: "tradingCode",
    field: "tradingCode",
    headerName: "کد معاملاتی",
  },
  {
    colId: "access",
    field: "access",
    headerName: "حق دسترسی",
  },
  {
    colId: "settlementDelayTitle",
    field: "settlementDelayTitle",
    headerName: "تاخیر در تسویه",
    flex: 0,
    width: 120,
    minWidth: 120,
  },
  {
    colId: "customerTypeCode",
    field: "customerTypeCode",
    headerName: "نوع مشتری",
    valueFormatter: (rowData: any) => {
      return CustomerOriginEnums.find(
        (item) => item.id === rowData?.data?.customerTypeCode
      )?.title;
    },
    flex: 0,
    width: 150,
    minWidth: 150,
  },
  {
    colId: "customerTypeTitle",
    field: "customerTypeTitle",
    headerName: "نوع مشتری",
    flex: 0,
    width: 120,
    minWidth: 120,
  },
  {
    colId: "netBrokerCommissionCoeff",
    field: "netBrokerCommissionCoeff",
    headerName: "ضریب کارمزد نقد کارگزاری",
  },
  {
    colId: "customerCounterSideCode",
    field: "customerCounterSideCode",
    headerName: "نوع طرف مقابل",
    flex: 0,
    width: 120,
    minWidth: 120,
    valueFormatter: (rowData: any) => {
      return CustomerOriginEnums.find(
        (item) => item.id === rowData?.data?.customerCounterSideCode
      )?.title;
    },
  },
  {
    colId: "customerCounterSideTitle",
    field: "customerCounterSideTitle",
    headerName: "نوع طرف مقابل",
    flex: 0,
    width: 120,
    minWidth: 120,
  },
  {
    colId: "brokerCommissionCoeff",
    field: "brokerCommissionCoeff",
    headerName: "ضریب",
    flex: 0,
    width: 90,
  },
  {
    colId: "minBrokerCommissionValue",
    field: "minBrokerCommissionValue",
    headerName: "کمینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "maxBrokerCommissionValue",
    field: "maxBrokerCommissionValue",
    headerName: "بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "brokerCmdFundCoeff",
    field: "brokerCmdFundCoeff",
    headerName: "ضریب",
    flex: 0,
    width: 90,
  },
  {
    colId: "maxBrokerCmdFundValue",
    field: "maxBrokerCmdFundValue",
    headerName: "بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "seoControlCommissionCoeff",
    field: "seoControlCommissionCoeff",
    headerName: "ضریب",
    flex: 0,
    width: 90,
  },
  {
    colId: "maxSeoControlCommissionValue",
    field: "maxSeoControlCommissionValue",
    headerName: "بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "csdCommissionCoeff",
    field: "csdCommissionCoeff",
    headerName: "ضریب",
    flex: 0,
    width: 90,
  },
  {
    colId: "maxCsdCommissionValue",
    field: "maxCsdCommissionValue",
    headerName: "بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "tmcCommissionCoeff",
    field: "tmcCommissionCoeff",
    headerName: "ضریب",
    flex: 0,
    width: 90,
  },
  {
    colId: "maxTmcCommissionValue",
    field: "maxTmcCommissionValue",
    headerName: "بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "bourseCommissionCoeff",
    field: "bourseCommissionCoeff",
    headerName: "ضریب",
    flex: 0,
    width: 90,
  },
  {
    colId: "maxBourseCommissionValue",
    field: "maxBourseCommissionValue",
    headerName: "بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "rayanCommissionCoeff",
    field: "rayanCommissionCoeff",
    headerName: "ضریب",
    flex: 0,
    width: 90,
  },
  {
    colId: "maxRayanCommissionValue",
    field: "maxRayanCommissionValue",
    headerName: "بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "accessCommissionCoeff",
    field: "accessCommissionCoeff",
    headerName: "ضریب",
    flex: 0,
    width: 90,
  },
  {
    colId: "totalCommissionCoeff",
    field: "totalCommissionCoeff",
    headerName: "مجموع ضریب کارمزد",
    flex: 0,
    width: 110,
  },
  {
    colId: "netTradeCoeff",
    field: "netTradeCoeff",
    headerName: "ضریب ارزش تمام شده",
  },
  {
    colId: "breakEvenPriceCoeff",
    field: "breakEvenPriceCoeff",
    headerName: "ضریب قیمت سربسر",
  },
  {
    colId: "valid",
    field: "valid",
    headerName: "وضعیت نماد",
    valueFormatter: (rowData: any) => {
      return rowData?.data?.valid ? "فعال" : "غیر فعال";
    },
  },
  {
    colId: "maxAccessCommissionValue",
    field: "maxAccessCommissionValue",
    headerName: " بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "addedValueTax",
    field: "addedValueTax",
    headerName: "مقدار",
    flex: 0,
    width: 110,
  },
  {
    colId: "maxTaxValue",
    field: "maxTaxValue",
    headerName: "بیشینه مقدار",
    flex: 0,
    width: 110,
  },
  {
    headerName: "ضریب مالیات",
    colId: "taxCoeff",
    field: "taxCoeff",
    flex: 0,
    width: 90,
  },
  {
    colId: "charge",
    field: "charge",
    headerName: "ضریب کارمزد عوارض",
    flex: 0,
    width: 110,
  },
  {
    colId: "netTradeValueCoeff",
    field: "netTradeValueCoeff",
    headerName: "ضریب خالص ارزش معامله",
    flex: 0,
    width: 90,
  },
  {
    colId: "brokerCmdFund",
    field: "brokerCmdFund",
    headerName: "سهم صندوق توسعه",
  },
  {
    colId: "bourse",
    field: "bourse",
    headerName: "بورس",
  },
  {
    colId: "seoControl",
    field: "seoControl",
    headerName: "سازمان",
  },
  {
    colId: "csd",
    field: "csd",
    headerName: "شرکت سپرده گذاری",
  },
  {
    colId: "tmc",
    field: "tmc",
    headerName: "مدیرت فناوری",
  },
  {
    colId: "rayan",
    field: "rayan",
    headerName: "رایان بورس",
  },
  {
    colId: "tax",
    field: "tax",
    headerName: "مالیات",
  },
  {
    colId: "addedValue",
    field: "addedValue",
    headerName: "ارزش افزوده",
  },
  {
    colId: "inventory",
    field: "inventory",
    headerName: "انبارداری",
  },
  {
    colId: "inventoryAddedValueTax",
    field: "inventoryAddedValueTax",
    headerName: "ارزش افزوده انبارداری",
  },
  {
    colId: "deleted",
    field: "deleted",
    headerName: "حذف شده؟",
    flex: 0,
    width: 110,
    valueFormatter: (props: any) => {
      return props.data.deleted ? "حذف شده" : "حذف نشده";
    },
    cellClassRules: {
      "text-red-400": (props: any) => props.data.deleted,
      "text-emerald-500": (props: any) => !props.data.deleted,
    },
  },
  {
    colId: "lastUpdaterUserId",
    field: "lastUpdaterUserId",
    headerName: "کاربر تغییر دهنده",
    flex: 0,
    width: 120,
    minWidth: 120,
  },
  {
    colId: "bourseCode",
    field: "bourseCode",
    headerName: "کد بورسی",
    flex: 0,
  },
  {
    colId: "nationalId",
    field: "nationalId",
    headerName: "کد ملی",
  },
  {
    colId: "customerTitle",
    field: "customerTitle",
    headerName: "عنوان مشتری",
  },
  {
    colId: "bourseTitle",
    field: "bourseTitle",
    headerName: "عنوان بورس",
    flex: 0,
  },
  {
    colId: "instrumentTypeCode",
    field: "instrumentTypeCode",
    headerName: "کد نوع ابزار مالی",
    flex: 0,
  },
  {
    colId: "instrumentTypeTitle",
    field: "instrumentTypeTitle",
    headerName: "عنوان نوع ابزار مالی",
    flex: 0,
    width: 120,
    minWidth: 120,
  },
  {
    colId: "sectorCode",
    field: "sectorCode",
    headerName: "کد گروه صنعت",
    flex: 0,
    width: 150,
    minWidth: 150,
  },
  {
    colId: "sectorTitle",
    field: "sectorTitle",
    headerName: " گروه صنعت",
    flex: 0,
    width: 150,
    minWidth: 150,
  },
  {
    colId: "subSectorCode",
    field: "subSectorCode",
    headerName: "کد زیرگروه صنعت",
    flex: 0,
    width: 150,
    minWidth: 150,
  },
  {
    colId: "subSectorTitle",
    field: "subSectorTitle",
    headerName: "زیرگروه صنعت",
    flex: 0,
    width: 150,
    minWidth: 150,
  },
  {
    colId: "inventoryStatus",
    field: "inventoryStatus",
    headerName: "حذف شده",
    flex: 0,
    width: 120,
    minWidth: 120,
    valueFormatter: (props: any) => {
      return props.data.deleted ? "حذف شده" : "حذف نشده";
    },
    cellClassRules: {
      "text-red-400": (props: any) => props.data.deleted,
      "text-green-400": (props: any) => !props.data.deleted,
    },
  },
  {
    colId: "instrumentTypeDescription",
    field: "instrumentTypeDescription",
    headerName: "توضیحات",
    width: 120,
    minWidth: 120,
  },
  {
    colId: "customerType",
    field: "customerType",
    headerName: "حقیقی/حقوقی ",
    valueFormatter: (rowData: any) => {
      return customerTypeEnums.find(
        (item) => item.id === rowData?.data?.customerType
      )?.title;
    },
  },
  {
    colId: "shareChange",
    field: "shareChange",
    headerName: "تعداد تغییر ",
  },
  {
    colId: "shareCount",
    field: "shareCount",
    headerName: "تعداد مانده ",
  },
  {
    colId: "changeTypeCode",
    field: "changeTypeCode",
    headerName: "کد نوع تغییر",
  },
  {
    colId: "changeType",
    field: "changeType",
    headerName: "نوع تغییر",
    cellClassRules: {
      // out of range style
      "text-emerald-500": (rowData: any) =>
        rowData?.data?.changeType === 3 || rowData.data?.changeType === 1,
      "text-rose-500": (rowData: any) =>
        rowData?.data?.changeType === 4 || rowData.data?.changeType === 2,
    },
    valueFormatter: (rowData: any) => {
      return changeTypeEnums.find(
        (item) => item.id === rowData?.data?.changeType
      )?.title;
    },
  },
  {
    colId: "personType",
    field: "personType",
    headerName: "نوع مشتری",
    valueFormatter: (rowData: any) => {
      return personTypeEnums.find((item: any) => item.id === rowData?.value)
        ?.title;
    },
  },
  {
    colId: "userIP",
    field: "userIP",
    headerName: "آی پی کاربر",
    flex: 0,
    width: 120,
    minWidth: 120,
  },
  {
    colId: "isFreezed",
    field: "isFreezed",
    headerName: "وضعیت انجماد",
    valueFormatter: (rowData: any) => {
      return rowData?.data?.isFreezed ? "انجماد" : "آزاد";
    },
  },
  {
    colId: "lastPrice",
    field: "lastPrice",
    headerName: "قیمت آخرین  معامله",
  },
  {
    colId: "closingPrice",
    field: "closingPrice",
    headerName: "قیمت پایانی",
  },
  {
    colId: "netValueByClosingPrice",
    field: "netValueByClosingPrice",
    headerName: "خالص ارزش فروش با قیمت پایانی",
  },
  {
    colId: "netValueByLastPrice",
    field: "netValueByLastPrice",
    headerName: "خالص ارزش فروش با قیمت  آخرین معامله",
  },
  {
    colId: "firstshareCount",
    field: "firstshareCount",
    headerName: "تعداد مانده ",
  },
  {
    colId: "firstlastPrice",
    field: "firstlastPrice",
    headerName: "قیمت آخرین معامله",
  },
  {
    colId: "firstclosingPrice",
    field: "firstclosingPrice",
    headerName: "قیمت پایانی",
  },
  {
    colId: "firstnetValuebyClosingPrice",
    field: "firstnetValuebyClosingPrice",
    headerName: "خالص ارزش فروش ",
  },
  {
    colId: "firstnetValuebyLastPrice",
    field: "firstnetValuebyLastPrice",
    headerName: "خالص ارزش فروش ",
  },
  {
    colId: "firstClosingPricePercentage",
    field: "firstClosingPricePercentage",
    headerName: "درصد نماد ",
    valueFormatter: (data: any) =>
      data.data?.firstClosingPricePercentage
        ? data.data?.firstClosingPricePercentage?.toFixed(2) + "%"
        : null,
    aggFunc: (params: any) => {
      let total = 0;
      params.values.forEach((value: number) => (total += value));
      return total.toFixed(2) + "%";
    },
  },
  {
    colId: "firstLastPricePercentage",
    field: "firstLastPricePercentage",
    headerName: "درصد نماد ",
    valueFormatter: (data: any) =>
      data.data?.firstLastPricePercentage
        ? data.data?.firstLastPricePercentage?.toFixed(2) + "%"
        : null,
    aggFunc: (params: any) => {
      let total = 0;
      params.values.forEach((value: number) => (total += value));
      return total.toFixed(2) + "%";
    },
  },
  {
    colId: "secondshareCount",
    field: "secondshareCount",
    headerName: "تعداد مانده ",
    cellClassRules: {
      "bg-green-200": (params: any) =>
        params?.data?.secondshareCount > params?.data?.firstshareCount,
      "bg-red-200": (params: any) =>
        params?.data?.secondshareCount < params?.data?.firstshareCount,
    },
  },
  {
    colId: "secondlastPrice",
    field: "secondlastPrice",
    headerName: "قیمت آخرین  معامله",
    cellClassRules: {
      "bg-green-200": (params: any) =>
        params?.data?.secondshareCount > params?.data?.firstshareCount,
      "bg-red-200": (params: any) =>
        params?.data?.secondshareCount < params?.data?.firstshareCount,
    },
  },
  {
    colId: "secondclosingPrice",
    field: "secondclosingPrice",
    headerName: "قیمت پایانی",
    cellClassRules: {
      "bg-green-200": (params: any) =>
        params?.data?.secondshareCount > params?.data?.firstshareCount,
      "bg-red-200": (params: any) =>
        params?.data?.secondshareCount < params?.data?.firstshareCount,
    },
  },
  {
    colId: "secondnetValuebyClosingPrice",
    field: "secondnetValuebyClosingPrice",
    headerName: "خالص ارزش فروش ",
    cellClassRules: {
      "bg-green-200": (params: any) =>
        params?.data?.secondshareCount > params?.data?.firstshareCount,
      "bg-red-200": (params: any) =>
        params?.data?.secondshareCount < params?.data?.firstshareCount,
    },
  },
  {
    colId: "secondnetValuebyLastPrice",
    field: "secondnetValuebyLastPrice",
    headerName: "خالص ارزش فروش ",
    cellClassRules: {
      "bg-green-200": (params: any) =>
        params?.data?.secondshareCount > params?.data?.firstshareCount,
      "bg-red-200": (params: any) =>
        params?.data?.secondshareCount < params?.data?.firstshareCount,
    },
  },
  {
    colId: "secondClosingPricePercentage",
    field: "secondClosingPricePercentage",
    headerName: "درصد نماد ",
    valueFormatter: (data: any) =>
      data.data?.secondClosingPricePercentage
        ? data.data?.secondClosingPricePercentage.toFixed(2) + "%"
        : null,
    aggFunc: (params: any) => {
      let total = 0;
      params.values.forEach((value: number) => (total += value));
      return total.toFixed(2) + "%";
    },
    cellClassRules: {
      "bg-green-200": (params: any) =>
        params?.data?.secondshareCount > params?.data?.firstshareCount,
      "bg-red-200": (params: any) =>
        params?.data?.secondshareCount < params?.data?.firstshareCount,
    },
  },
  {
    colId: "secondLastPricePercentage",
    field: "secondLastPricePercentage",
    valueFormatter: (data: any) =>
      data.data?.secondLastPricePercentage
        ? data.data?.secondLastPricePercentage.toFixed(2) + "%"
        : null,
    headerName: "درصد نماد ",
    aggFunc: (params: any) => {
      let total = 0;
      params.values.forEach((value: number) => (total += value));
      return total.toFixed(2) + "%";
    },
    cellClassRules: {
      "bg-green-200": (params: any) =>
        params?.data?.secondshareCount > params?.data?.firstshareCount,
      "bg-red-200": (params: any) =>
        params?.data?.secondshareCount < params?.data?.firstshareCount,
    },
  },

  //with children
  {
    colId: "brokerCommission",
    headerName: "کارمزد کارگزار",
    children: [],
  },
  {
    colId: "brokerCmdCommission",
    headerName: "کارمزد صندوق توسعه",
    children: [],
  },
  {
    colId: "seoControlCommission",
    headerName: "کارمزد حق نظارت سازمان",
    children: [],
  },
  {
    colId: "csdCommission",
    headerName: "کارمزد سپرده گذاری",
    children: [],
  },
  {
    colId: "tmcCommission",
    headerName: "کارمزد فناوری",
    children: [],
  },
  {
    colId: "bourseCommission",
    headerName: "کارمزد بورس مربوطه",
    children: [],
  },
  {
    colId: "rayanCommission",
    headerName: "کارمزد رایان بورس",
    children: [],
  },
  {
    colId: "accessCommission",
    headerName: "کارمزد حق دسترسی",
    children: [],
  },
  {
    colId: "taxCommission",
    headerName: "مالیات ارزش افزوده",
    children: [],
  },
  {
    colId: "first-date",
    headerName: "تاریخ اول",
    children: [],
  },
  {
    colId: "second-date",
    headerName: "تاریخ دوم",
    children: [],
  },

  //dates
  {
    colId: "fromActiveDateTime",
    field: "fromActiveDateTime",
    headerName: "زمان شروع",
    flex: 0,
    width: 200,
    minWidth: 200,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "toActiveDateTime",
    field: "toActiveDateTime",
    headerName: "زمان پایان",
    flex: 0,
    width: 200,
    minWidth: 200,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "createDateTime",
    field: "createDateTime",
    headerName: "زمان ایجاد",
    flex: 0,
    width: 120,
    minWidth: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "updatedDateTime",
    field: "updatedDateTime",
    headerName: "زمان تغییر",
    flex: 0,
    width: 200,
    minWidth: 200,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "beginningEffectingDate",
    field: "beginningEffectingDate",
    headerName: "تاریخ شروع",
    flex: 0,
    width: 150,
    minWidth: 150,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "endEffectingDate",
    field: "endEffectingDate",
    headerName: "تاریخ پایان",
    flex: 0,
    width: 150,
    minWidth: 150,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "lastUpdateDateTime",
    field: "lastUpdateDateTime",
    headerName: "زمان تغییر",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
    flex: 0,
    width: 120,
    minWidth: 120,
  },
  {
    colId: "effectiveDate",
    field: "effectiveDate",
    headerName: "تاریخ و زمان تغییر",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
] as const;

export default columnModel;
