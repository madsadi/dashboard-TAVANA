import { CopyButton } from "components/common/components/copy-button";
import { chunk, dateCell, formatNumber } from "./common-funcions";
import {
  AssetStatusEnums,
  CustomerOriginEnums,
  FactorStatusEnums,
  GetOfferTypeEnums,
  SettlementDelayEnums,
  changeTypeEnums,
  customerTypeEnums,
  enTierNameEnum,
  genderEnums,
  isRequired,
  personTypeEnums,
  sides,
} from "constants/Enums";
import { validate as uuidValidate } from "uuid";
import { ModuleIdentifier } from "./Module-Identifier";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import DateCell from "components/common/table/date-cell";
import { EnumType } from "types/types";

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
    minWidth: 90,
  },
  {
    colId: "faInsCode",
    field: "faInsCode",
    headerName: "نماد",
    flex: 0,
    minWidth: 100,
    width: 100,
  },
  {
    colId: "faInsName",
    field: "faInsName",
    headerName: "نام کامل نماد",
    flex: 0,
    width: 200,
  },
  {
    colId: "typeTitle",
    field: "typeTitle",
    headerName: "نوع",
  },
  {
    colId: "instrumentId",
    field: "instrumentId",
    headerName: "کد نماد",
    flex: 0,
    minWidth: 180,
    width: 180,
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
    colId: "serviceTitle",
    field: "serviceTitle",
    headerName: "عنوان سرویس",
  },
  {
    colId: "moduleTitle",
    field: "moduleTitle",
    headerName: "عنوان ماژول",
  },
  {
    colId: "actionTitle",
    field: "actionTitle",
    headerName: "عنوان عملیات",
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
    colId: "Period",
    field: "Period",
    headerName: "دوره زمانی",
    valueFormatter: (rowData: any) => {
      const months = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ];
      return (
        months[Number(rowData.data?.Period?.slice(4, 6)) - 1] +
        "-" +
        rowData.data?.Period?.slice(0, 4)
      );
    },
  },
  {
    colId: "Plan",
    field: "Plan",
    headerName: "پلکان",
  },
  {
    colId: "Status",
    field: "Status",
    headerName: "وضعیت فاکتور",
    valueFormatter: (rowData: any) => {
      return FactorStatusEnums.find(
        (item: any) => item.id === rowData?.data?.Status
      )?.title;
    },
  },
  {
    colId: "marketer-recite-detail",
    field: "detail",
    headerName: "جزییات",
    flex: 0,
    width: 90,
    cellStyle: {
      cursor: "pointer",
      display: "flex",
    },
    cellRendererSelector: () => {
      return {
        component: (rowData: any) => {
          return (
            <a
              className={"flex h-full w-full"}
              target="_blank"
              rel="noreferrer"
              href={`/marketer-app/recite/detail/${rowData.data?.FactorID}`}
            >
              <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
            </a>
          );
        },
      };
    },
  },
  {
    colId: "name",
    field: "name",
    flex: 0,
    width: 260,
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
    cellClassRules: {
      "text-red-500": (params: any) => params?.value === 2,
      "text-emerald-500": (params: any) => params?.value === 1,
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
    cellClassRules: {
      "text-red-500": (params: any) => params?.data?.side === 2,
      "text-emerald-500": (params: any) => params?.data?.side === 1,
    },
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
    flex: 0,
    width: 160,
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
    colId: "type",
    field: "type",
    headerName: "سمت معامله",
    cellRendererSelector: () => {
      const ColourCellRenderer = (props: any) => {
        return (
          <span className={`my-auto`}>
            {props.node.rowIndex === 0 ? "کارمزد خرید" : "کارمزد فروش"}
          </span>
        );
      };
      const moodDetails = {
        component: ColourCellRenderer,
      };
      return moodDetails;
    },
  },
  {
    colId: "netflow-rules-detail-type",
    field: "type",
    headerName: "دسته",
    rowSpan: (params: any) => (params.data?.side === 1 ? 2 : 1),
    cellClassRules: {
      "cell-span": (params: any) => params.data?.side === 1,
    },
    valueFormatter: (rowData: any) => {
      return rowData.node.rowIndex > 1 ? "ضریب کارمزد" : "سقف کارمزد";
    },
  },
  {
    colId: "fullName",
    field: "fullName",
    headerName: "نام",
    flex: 0,
    width: 260,
  },
  {
    colId: "side",
    field: "side",
    headerName: "سمت",
    valueFormatter: (rowData: any) => {
      return sides.find((item: EnumType) => item.id === rowData?.value)?.title;
    },
    cellClassRules: {
      "text-red-500": (params: any) =>
        params?.data?.side === "فروش" || params?.data?.side === 2,
      "text-emerald-500": (params: any) =>
        params?.data?.side === "خرید" || params?.data?.side === 1,
    },
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
    colId: "accountCommission",
    field: "accountCommission",
    headerName: "هزینه دسترسی",
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
    colId: "tradeCode",
    field: "tradeCode",
    headerName: "کد معاملاتی",
  },
  {
    colId: "stationName",
    field: "stationName",
    headerName: "نام ایستگاه",
  },
  {
    colId: "stationCode",
    field: "stationCode",
    headerName: "کد ایستگاه",
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
    colId: "brfCommission",
    field: "brfCommission",
    headerName: "سهم صندوق توسعه",
  },
  {
    colId: "seoCommission",
    field: "seoCommission",
    headerName: "کارمزد سازمان",
  },
  {
    colId: "rayanBourseCommission",
    field: "rayanBourseCommission",
    cellStyle: { direction: "ltr" },
    headerName: "کارمزد رایان",
  },
  {
    colId: "inventoryCommission",
    field: "inventoryCommission",
    headerName: "هزینه انبارداری",
  },
  {
    colId: "vatCommission",
    field: "vatCommission",
    headerName: "مالیات ارزش افزوده",
  },
  {
    colId: "vtsCommission",
    field: "vtsCommission",
    headerName: "مالیات ارزض افزوده هزینه انبارداری",
  },
  {
    colId: "farCommission",
    field: "farCommission",
    headerName: "هزینه فرآوری",
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
    cellStyle: { direction: "ltr" },
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
      "text-red-500": (props: any) => props.data.deleted,
      "text-emerald-500": (props: any) => !props.data.deleted,
    },
  },
  {
    colId: "isDeleted",
    field: "isDeleted",
    headerName: "حذف شده؟",
    flex: 0,
    width: 110,
    valueFormatter: (props: any) => {
      return props.data.isDeleted ? "حذف شده" : "حذف نشده";
    },
    cellClassRules: {
      "text-red-500": (props: any) => props.data.isDeleted,
      "text-emerald-500": (props: any) => !props.data.isDeleted,
    },
  },
  {
    colId: "lastUpdaterUserId",
    field: "lastUpdaterUserId",
    headerName: "کاربر تغییر دهنده",
    flex: 0,
    width: 120,
  },
  {
    colId: "bourseCode",
    field: "bourseCode",
    headerName: "کد بورسی",
    flex: 0,
    width: 120,
  },
  {
    colId: "nationalId",
    field: "nationalId",
    headerName: "کد ملی",
    flex: 0,
    width: 150,
  },
  {
    colId: "customerTitle",
    field: "customerTitle",
    headerName: "عنوان مشتری",
    flex: 0,
    width: 180,
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
      "text-red-500": (props: any) => props.data.deleted,
      "text-emerald-500": (props: any) => !props.data.deleted,
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
      "text-red-500": (rowData: any) =>
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
    colId: "userId",
    field: "userId",
    headerName: "شناسه کاربر",
  },
  {
    colId: "idOfBrokerIssuingTheOrder",
    field: "idOfBrokerIssuingTheOrder",
    headerName: "کد کارگزاری",
  },
  {
    colId: "sourceOfRequestTitle",
    field: "sourceOfRequestTitle",
    headerName: "نرم افزار",
  },

  { colId: "errorCode", field: "errorCode", headerName: "کد خطا" },
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
      "text-emerald-500": (params: any) =>
        params?.data?.secondshareCount > params?.data?.firstshareCount,
      "text-red-500": (params: any) =>
        params?.data?.secondshareCount < params?.data?.firstshareCount,
    },
  },
  {
    colId: "secondlastPrice",
    field: "secondlastPrice",
    headerName: "قیمت آخرین  معامله",
  },
  {
    colId: "secondclosingPrice",
    field: "secondclosingPrice",
    headerName: "قیمت پایانی",
  },
  {
    colId: "secondnetValuebyClosingPrice",
    field: "secondnetValuebyClosingPrice",
    headerName: "خالص ارزش فروش ",
  },
  {
    colId: "secondnetValuebyLastPrice",
    field: "secondnetValuebyLastPrice",
    headerName: "خالص ارزش فروش ",
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
  },
  {
    colId: "UniqueId",
    field: "UniqueId",
    cellClass: "textFormat",
    headerName: "کد ملی ",
  },
  {
    colId: "uniqueId",
    field: "uniqueId",
    cellClass: "textFormat",
    headerName: "کد ملی ",
    flex: 0,
    width: 100,
  },
  {
    colId: "portfolioValueByClosingPrice",
    field: "portfolioValueByClosingPrice",
    headerName: "ارزش پورتفوی",
  },
  {
    colId: "portfolioValueByLastPrice",
    field: "portfolioValueByLastPrice",
    headerName: "ارزش پورتفوی",
  },
  {
    colId: "portfolioWeightByClosingPrice",
    field: "portfolioWeightByClosingPrice",
    headerName: "وزن پورتفوی",
    valueFormatter: (rowData: any) => {
      return (
        formatNumber(
          { value: rowData?.data?.portfolioWeightByClosingPrice },
          2
        ) + " %"
      );
    },
    dir: "ltr",
  },
  {
    colId: "portfolioWeightByLastPrice",
    field: "portfolioWeightByLastPrice",
    headerName: "وزن پورتفوی",
    valueFormatter: (rowData: any) => {
      return (
        formatNumber({ value: rowData?.data?.portfolioWeightByLastPrice }, 2) +
        " %"
      );
    },
    dir: "ltr",
  },
  {
    colId: "userFirstName",
    field: "userFirstName",
    headerName: "نام کاربر",
  },
  {
    colId: "userLastName",
    field: "userLastName",
    headerName: "نام خانوادگی کاربر",
  },
  {
    colId: "userUniqueId",
    field: "userUniqueId",
    headerName: "کد ملی کاربر",
  },
  {
    colId: "Title",
    field: "Title",
    headerName: "عنوان ",
  },
  {
    colId: "title",
    field: "title",
    headerName: "عنوان مشتری",
  },
  {
    colId: "TypeTitle",
    field: "TypeTitle",
    headerName: "نوع بازاریاب",
  },
  {
    colId: "Mobile",
    field: "Mobile",
    headerName: "موبایل",
  },
  {
    colId: "SubsidiaryTitle",
    field: "SubsidiaryTitle",
    headerName: "عنوان شرکت",
  },
  {
    colId: "BranchTitle",
    field: "BranchTitle",
    headerName: "عنوان شعبه",
  },
  {
    colId: "ReagentRefLink",
    field: "ReagentRefLink",
    headerName: "لینک معرف",
    cellRendererSelector: () => {
      return {
        component: (rowData: any) => (
          <CopyButton
            condition={rowData?.data?.ReagentRefCode}
            id={rowData?.data?.MarketerID}
            entity={"reagentUrl"}
            inputModule={ModuleIdentifier.MARKETER_APP_marketers}
          />
        ),
      };
    },
  },
  {
    colId: "MarketerRefLink",
    field: "MarketerRefLink",
    headerName: "لینک بازاریاب",
    data: "marketerUrl",
    cellRendererSelector: () => {
      return {
        component: (rowData: any) => (
          <CopyButton
            condition={rowData?.data?.MarketerRefCode}
            id={rowData?.data?.MarketerID}
            entity={"marketerUrl"}
            inputModule={ModuleIdentifier.MARKETER_APP_marketers}
          />
        ),
      };
    },
  },
  {
    colId: "phoneNumber",
    field: "phoneNumber",
    headerName: "موبایل",
  },
  {
    colId: "branchTypeTitle",
    field: "branchTypeTitle",
    headerName: "نوع شعبه",
  },
  {
    colId: "tbsBranchId",
    field: "tbsBranchId",
    headerName: "شناسه شعبه در TBS",
  },
  {
    colId: "tbsBranchTitle",
    field: "tbsBranchTitle",
    headerName: "عنوان شعبه در TBS",
  },
  {
    colId: "subsidiaryTitle",
    field: "subsidiaryTitle",
    headerName: "عنوان شرکت",
  },
  {
    colId: "marketerTypeTitle",
    field: "marketerTypeTitle",
    headerName: "	نوع بازاریاب",
  },
  {
    colId: "tbsMarketerId",
    field: "tbsMarketerId",
    headerName: "شناسه بازاریاب در TBS",
  },
  {
    colId: "tbsMarketerTitle",
    field: "tbsMarketerTitle",
    headerName: "عنوان بازاریاب در TBS",
  },
  {
    colId: "firstName",
    field: "firstName",
    headerName: "نام",
  },
  {
    colId: "lastName",
    field: "lastName",
    headerName: "نام خانوادگی",
    flex: 0,
    width: 120,
  },
  { colId: "seriShChar", field: "seriShChar", headerName: "سری حرفی شناسنامه" },
  { colId: "seriSh", field: "seriSh", headerName: "سری عددی شناسنامه" },
  { colId: "shSerial", field: "shSerial", headerName: "	سریال شناسنامه" },
  { colId: "shNumber", field: "shNumber", headerName: "شماره شناسنامه" },
  { colId: "birthPlace", field: "birthPlace", headerName: "محل تولد" },
  { colId: "issuePlace", field: "issuePlace", headerName: "محل صدور" },
  {
    colId: "fatherName",
    field: "fatherName",
    headerName: "نام پدر",
    flex: 0,
    width: 120,
  },
  {
    colId: "detail-opener",
    headerName: "",
    field: "id",
    cellRenderer: "agGroupCellRenderer",
    flex: 0,
    minWidth: 50,
    maxWidth: 50,
  },
  {
    colId: "twoFactorEnabled",
    field: "twoFactorEnabled",
    headerName: "ورود دوعاملی",
    valueFormatter: (rowData: any) => {
      return rowData?.data?.twoFactorEnabled ? "فعال" : "غیر فعال";
    },
  },

  {
    colId: "IsActive",
    field: "IsActive",
    headerName: "وضعیت",
    valueFormatter: (rowData: any) => {
      return rowData?.data?.IsActive ? "فعال" : "غیر فعال";
    },
  },
  {
    colId: "isActive",
    field: "isActive",
    headerName: "وضعیت",
    valueFormatter: (rowData: any) => {
      return rowData?.data?.isActive ? "فعال" : "غیر فعال";
    },
  },
  {
    colId: "intraday-detail",
    field: "detail",
    headerName: "جزییات",
    flex: 0,
    width: 90,
    cellStyle: {
      cursor: "pointer",
      display: "flex",
    },
    cellRendererSelector: () => {
      return {
        component: (rowData: any) => {
          return (
            <a
              className={"flex h-full w-full"}
              target="_blank"
              rel="noreferrer"
              href={`/portfo/${rowData?.data?.customerId}&${rowData?.data?.instrumentId}&${rowData?.data?.effectiveDate}`}
            >
              <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
            </a>
          );
        },
      };
    },
  },
  {
    colId: "customer-detail",
    field: "detail",
    headerName: "جزییات",
    flex: 0,
    width: 90,
    cellStyle: {
      cursor: "pointer",
      display: "flex",
    },
    cellRendererSelector: () => {
      return {
        component: (rowData: any) => {
          return (
            <a
              className={"flex h-full w-full"}
              target="_blank"
              rel="noreferrer"
              href={`/customer-management/customer/${rowData?.data?.userId}`}
            >
              <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
            </a>
          );
        },
      };
    },
  },
  {
    colId: "MarketerFirstName",
    field: "MarketerFirstName",
    headerName: "نام بازاریاب",
  },
  {
    colId: "MarketerLastNAme",
    field: "MarketerLastNAme",
    headerName: "نام خانوادگی بازاریاب",
  },
  {
    colId: "TradeSide",
    field: "TradeSide",
    headerName: "سمت معامله",
  },
  {
    colId: "TradeCount",
    field: "TradeCount",
    headerName: "تعداد معاملات نرم افزار بازاریاب",
  },
  {
    colId: "TradeDate",
    field: "TradeDate",
    headerName: "تاریخ معامله",
  },
  {
    colId: "FollowerMarketerID",
    field: "FollowerMarketerID",
    headerName: "شناسه کاربری بازاریاب",
  },
  {
    colId: "CommissionCoefficient",
    field: "CommissionCoefficient",
    headerName: "ضریب کارمزد",
  },
  {
    colId: "LeaderMarketerID",
    field: "LeaderMarketerID",
    headerName: "شناسه بازاریاب",
  },
  {
    colId: "FollowerMarketerName",
    field: "FollowerMarketerName",
    headerName: " نام و نام خانوادگی بازاریاب زیر گروه",
  },
  {
    colId: "LeaderMarketerName",
    field: "LeaderMarketerName",
    headerName: "نام و نام خانوادگی بازاریاب سرگروه",
  },
  {
    colId: "FirstName",
    field: "FirstName",
    headerName: "نام ",
  },
  {
    colId: "LastName",
    field: "LastName",
    headerName: "نام خانوادگی",
  },
  { colId: "companyName", field: "companyName", headerName: "	عنوان شرکت" },
  { colId: "registerNumber", field: "registerNumber", headerName: "شماره ثبت" },
  { colId: "registerPlace", field: "registerPlace", headerName: "محل ثبت" },
  {
    colId: "evidenceReleaseCompany",
    field: "evidenceReleaseCompany",
    headerName: "صادر کنند مجوز ",
  },
  {
    colId: "relatedCustomerTitle",
    field: "relatedCustomerTitle",
    headerName: "عنوان مالک سبد",
  },
  {
    colId: "relatedCustomerUniqueId",
    field: "relatedCustomerUniqueId",
    headerName: "کد ملی مالک سبد",
  },
  {
    colId: "privatePortfolioTitle",
    field: "privatePortfolioTitle",
    headerName: "عنوان سبد اختصاصی",
  },
  {
    colId: "assetManagerTitle",
    field: "assetManagerTitle",
    headerName: "	عنوان مدیر سبد",
  },
  {
    colId: "assetManagerUniqueId",
    field: "assetManagerUniqueId",
    headerName: "	کد ملی مدیر سبد",
  },
  {
    colId: "customerUniqueId",
    field: "customerUniqueId",
    headerName: "کد ملی مشتری",
  },
  {
    colId: "customerPhoneNumber",
    field: "customerPhoneNumber",
    headerName: "تلفن تماس مشتری",
  },
  { colId: "sheba", field: "sheba", headerName: "شبای حساب" },
  { colId: "accountNumber", field: "accountNumber", headerName: "	شماره حساب" },
  { colId: "bankTitle", field: "bankTitle", headerName: "نام بانک" },
  { colId: "branchCode", field: "branchCode", headerName: "کد شعبه" },
  { colId: "cityTitle", field: "cityTitle", headerName: "شهر شعبه" },
  {
    colId: "isDefault",
    field: "isDefault",
    headerName: "حساب پیش فرض؟",
    valueFormatter: (rowData: any) => {
      return rowData.data?.isDefault ? "بله" : "خیر";
    },
  },
  {
    colId: "isFromSejam",
    field: "isFromSejam",
    headerName: "سجامی؟",
    valueFormatter: (rowData: any) => {
      return rowData.data?.isFromSejam ? "بله" : "خیر";
    },
  },
  {
    colId: "isConfirmed",
    field: "isConfirmed",
    headerName: "تائید شده؟",
    valueFormatter: (rowData: any) => {
      return rowData.data?.isConfirmed ? "بله" : "خیر";
    },
  },
  {
    colId: "managementTypeTitle",
    field: "managementTypeTitle",
    headerName: "نوع مدیریت سبد",
  },
  { colId: "agentTitle", field: "agentTitle", headerName: "عنوان نماینده" },
  {
    colId: "agentTypeTitle",
    field: "agentTypeTitle",
    headerName: "نوع نماینده",
  },
  {
    colId: "isExpired",
    field: "isExpired",
    headerName: "منقضی شده؟",
    valueFormatter: (rowData: any) => {
      return rowData?.data?.isExpired ? "بله" : "خیر";
    },
  },

  { colId: "economicCode", field: "economicCode", headerName: "کد اقتصادی" },

  {
    colId: "legalPersonTypeCategoryTitle",
    field: "legalPersonTypeCategoryTitle",
    headerName: "نوع موسه",
  },
  {
    colId: "legalPersonTypeSubCategoryTitle",
    field: "legalPersonTypeSubCategoryTitle",
    headerName: "گروه بندی موسسه",
  },
  {
    colId: "FirmTitle",
    field: "FirmTitle",
    headerName: "نام شرکت",
  },
  {
    colId: "TotalPureVolume",
    field: "TotalPureVolume",
    headerName: "خالص گردش",
  },
  {
    colId: "TotalFee",
    field: "TotalFee",
    headerName: "کل کارمزد",
  },
  {
    colId: "Mobile",
    field: "Mobile",
    headerName: "موبایل",
  },
  {
    colId: "BankAccountNumber",
    field: "BankAccountNumber",
    headerName: "شماره حساب بانکی",
  },
  {
    colId: "Email",
    field: "Email",
    headerName: "ایمیل",
  },
  {
    colId: "marketerContract-detail",
    field: "marketerContract-detail",
    headerName: "جزییات",
    flex: 0,
    width: 90,
    cellStyle: {
      cursor: "pointer",
      display: "flex",
    },
    cellRendererSelector: () => {
      return {
        component: (rowData: any) => {
          return (
            <a
              className={"flex h-full w-full"}
              target="_blank"
              rel="noreferrer"
              href={`/marketer-app/marketer-contract/${rowData?.data?.ContractID}`}
            >
              <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
            </a>
          );
        },
      };
    },
  },
  {
    colId: "CalculationBaseType",
    field: "CalculationBaseType",
    headerName: "نوع محاسبات",
  },
  {
    colId: "CoefficientBaseType",
    field: "CoefficientBaseType",
    headerName: "نوع ضرائب",
  },
  {
    colId: "ContractType",
    field: "ContractType",
    headerName: "نوع قرارداد",
  },
  {
    colId: "username",
    field: "username",
    headerName: "حساب کاربری",
  },
  {
    colId: "Description",
    field: "Description",
    headerName: "توضیحات",
  },
  {
    colId: "description",
    field: "description",
    headerName: "توضیحات",
  },
  {
    colId: "ContractID",
    field: "ContractID",
    headerName: "شناسه قرارداد",
  },
  {
    colId: "MarketerID",
    field: "MarketerID",
    headerName: "شناسه بازاریاب",
  },
  {
    colId: "orderSideTitle",
    field: "orderSideTitle",
    cellClassRules: {
      "text-emerald-500": (rowData: any) =>
        rowData?.data?.orderSideTitle === "خرید",
      "text-red-500": (rowData: any) =>
        rowData?.data?.orderSideTitle === "فروش",
    },
    width: 140,
    flex: 0,
    headerName: "سمت سفارش",
  },
  {
    colId: "instrumentGroupIdentification",
    field: "instrumentGroupIdentification",
    headerName: "کد گروه نمادها",
    width: 160,
    flex: 0,
  },
  {
    colId: "idOfTheBrokersOrderEntryServer",
    field: "idOfTheBrokersOrderEntryServer",
    headerName: "شناسه سرور سفارش",
  },
  {
    colId: "orderOriginTitle",
    field: "orderOriginTitle",
    width: 140,
    flex: 0,
    headerName: "نوع مشتری",
  },
  {
    colId: "orderTechnicalOriginTitle",
    field: "orderTechnicalOriginTitle",
    headerName: "مرجع تکنیکال سفارش",
    width: 160,
    flex: 0,
  },

  {
    colId: "errorText",
    field: "errorText",
    headerName: "خطا",
  },
  {
    colId: "CollateralCoefficient",
    field: "CollateralCoefficient",
    headerName: "ضریب حسن انجام کار",
    fixed: 2,
  },
  {
    colId: "TaxCoefficient",
    field: "TaxCoefficient",
    headerName: "ضریب مالیات",
    fixed: 2,
  },
  {
    colId: "InsuranceCoefficient",
    field: "InsuranceCoefficient",
    headerName: "ضریب بیمه",
    fixed: 2,
  },
  {
    colId: "ReturnDuration",
    field: "ReturnDuration",
    headerName: "دوره برگشت کسورات",
  },
  {
    colId: "regentTitle",
    field: "regentTitle",
    headerName: "معرف",
  },
  {
    colId: "CoefficientPercentage",
    field: "CoefficientPercentage",
    headerName: "درصد ضریب",
    fixed: 2,
  },
  {
    colId: "HighThreshold",
    field: "HighThreshold",
    headerName: "حد بالای پله",
  },
  {
    colId: "LowThreshold",
    field: "LowThreshold",
    headerName: "حد بالای پایین",
  },
  {
    colId: "StepNumber",
    field: "StepNumber",
    headerName: "شماره پله",
  },
  {
    colId: "IsCmdConcluded",
    field: "IsCmdConcluded",
    headerName: "سهم صندوق توسعه اضافه میشود؟",
    valueFormatter: (rowData: any) => {
      return rowData.data?.IsCmdConcluded ? "بله" : "خیر";
    },
  },
  {
    colId: "isCanceled",
    field: "isCanceled",
    headerName: "وضعیت",
    valueFormatter: (rowData: any) => {
      return rowData.data?.isCanceled ? "ابطال کامل معاملات" : "تائید شده";
    },
  },
  {
    colId: "customerNationalId",
    field: "customerNationalId",
    headerName: "کد ملی مشتری",
  },
  {
    colId: "customerId",
    field: "customerId",
    headerName: "شناسه مشتری",
  },
  {
    colId: "tradeId",
    field: "tradeId",
    headerName: "شناسه معامله",
  },
  {
    colId: "orderId",
    field: "orderId",
    headerName: "شناسه سفارش",
  },
  {
    colId: "userTitle",
    field: "userTitle",
    headerName: "عنوان کاربر",
  },
  {
    colId: "traderId",
    field: "traderId",
    headerName: "شناسه معاملاتی",
  },
  {
    colId: "ticket",
    field: "ticket",
    headerName: "شناسه",
    flex: 0,
    width: 160,
  },
  {
    colId: "symbol",
    field: "symbol",
    headerName: "نماد",
    flex: 0,
    width: 180,
  },
  {
    colId: "price",
    field: "price",
    headerName: "قیمت",
  },
  {
    colId: "shares",
    field: "shares",
    headerName: "حجم",
  },
  {
    colId: "settlementValue",
    field: "settlementValue",
    headerName: "ارزش ناخالص",
  },

  {
    colId: "enTierName",
    field: "enTierName",
    headerName: "نام گروه",
    valueFormatter: (rowData: any) => {
      return enTierNameEnum.find(
        (item: any) => rowData.data?.enTierName === item.enTitle
      )?.faTitle;
    },
  },
  {
    colId: "isProfessional",
    field: "isProfessional",
    headerName: "مشتری حرفه؟",
    valueFormatter: (rowData: any) => {
      return isRequired.find(
        (item: any) => rowData.data?.isProfessional === item.id
      )?.title;
    },
  },
  {
    colId: "isPAM",
    field: "isPAM",
    headerName: "مشتری نامک",
    valueFormatter: (rowData: any) => {
      return isRequired.find((item: any) => rowData.data?.isPAM === item.id)
        ?.title;
    },
  },
  {
    colId: "isDeceased",
    field: "isDeceased",
    headerName: "فوت شده؟",
    valueFormatter: (rowData: any) => {
      return isRequired.find(
        (item: any) => rowData.data?.isDeceased === item.id
      )?.title;
    },
  },
  {
    colId: "isDissolved",
    field: "isDissolved",
    headerName: "منحل شده؟",
    valueFormatter: (rowData: any) => {
      return isRequired.find(
        (item: any) => rowData.data?.isDissolved === item.id
      )?.title;
    },
  },
  {
    colId: "genderTitle",
    field: "genderTitle",
    headerName: "جنسیت",
    flex: 0,
    width: 100,
  },
  {
    colId: "sejamStatusTitle",
    field: "sejamStatusTitle",
    headerName: "وضعیت سجام",
  },
  {
    colId: "adminNote",
    field: "adminNote",
    headerName: "توضیحات ادمین",
  },
  {
    colId: "brokerCode",
    field: "brokerCode",
    headerName: "کد کارگزار",
  },
  {
    colId: "brokerName",
    field: "brokerName",
    headerName: "نام کارگزار",
  },
  {
    colId: "settlementDelay",
    field: "settlementDelay",
    headerName: "تاخیر",
  },
  {
    colId: "buyerCode",
    field: "buyerCode",
    headerName: "شناسه خریدار",
    flex: 0,
    width: 180,
  },
  {
    colId: "sellerCode",
    field: "sellerCode",
    headerName: "شناسه فروشنده",
  },
  {
    colId: "buy",
    field: "buy",
    headerName: "مبلغ خرید",
  },
  {
    colId: "sell",
    field: "sell",
    headerName: "مبلغ فروش",
  },
  {
    colId: "sellerInterest",
    field: "sellerInterest",
    headerName: "سود فروشنده",
  },
  {
    colId: "currentShareCount",
    field: "currentShareCount",
    headerName: "مانده",
  },
  {
    colId: "transactionId",
    field: "transactionId",
    headerName: "شناسه تراکنش",
  },
  {
    colId: "transactionTitle",
    field: "transactionTitle",
    headerName: "نوع تراکنش",
  },
  {
    colId: "sellableShareCount",
    field: "sellableShareCount",
    headerName: "قابل فروش",
  },
  {
    colId: "changeQuantity",
    field: "changeQuantity",
    headerName: "تغییر حجم تراکنش",
  },
  {
    colId: "openBuyOrder",
    field: "openBuyOrder",
    headerName: "سفارش باز خرید",
  },
  {
    colId: "openSellOrder",
    field: "openSellOrder",
    headerName: "سفارش باز فروش",
  },
  {
    colId: "intradayBuy",
    field: "intradayBuy",
    headerName: "خرید امروز",
  },
  {
    colId: "intradaySell",
    field: "intradaySell",
    headerName: "فروش امروز",
  },
  {
    colId: "remainAssetCount",
    field: "remainAssetCount",
    headerName: "مانده کاردکس",
  },
  {
    colId: "buyerInterest",
    field: "buyerInterest",
    headerName: "سود خریدار",
  },
  {
    colId: "credit",
    field: "credit",
    headerName: "بستانکار",
  },
  {
    colId: "debit",
    field: "debit",
    headerName: "بدهکار",
  },
  {
    colId: "sellerBalance",
    field: "sellerBalance",
    headerName: "مانده فروشنده",
  },
  {
    colId: "email",
    field: "email",
    headerName: "ایمیل",
  },
  {
    colId: "branchTitle",
    field: "branchTitle",
    headerName: "شعبه",
  },
  {
    colId: "countryName",
    field: "countryName",
    headerName: "کشور",
  },
  {
    colId: "foreignCSDCode",
    field: "foreignCSDCode",
    headerName: "کد فراگیر اتباع",
  },
  {
    colId: "personOriginTitle",
    field: "personOriginTitle",
    headerName: "گروه کاربر",
  },
  {
    colId: "riskLevelTitle",
    field: "riskLevelTitle",
    headerName: "ریسک پذیری",
  },
  {
    colId: "sejamToken",
    field: "sejamToken",
    headerName: "توکن سجام",
    cellRendererSelector: () => {
      const ColourCellRenderer = (rowData: any) => {
        return (
          <div className={"flex items-center space-x-2 space-x-reverse"}>
            <span>{rowData?.data?.sejamToken}</span>
            <DateCell date={rowData?.data?.sejamTokenDateTime} />
          </div>
        );
      };
      const moodDetails = {
        component: ColourCellRenderer,
      };
      return moodDetails;
    },
  },
  {
    colId: "changeReasonDescription",
    field: "changeReasonDescription",
    headerName: "توضیحات",
  },
  {
    colId: "buyerBalance",
    field: "buyerBalance",
    headerName: "مانده خریدار",
  },
  {
    colId: "instrumentGroupId",
    field: "instrumentGroupId",
    headerName: "کد گروه نماد",
  },
  {
    colId: "quantity",
    field: "quantity",
    headerName: "حجم",
  },
  {
    colId: "tradePrice",
    field: "tradePrice",
    headerName: "قیمت",
  },
  {
    colId: "tradeQuantity",
    field: "tradeQuantity",
    headerName: "حجم",
  },
  {
    colId: "exequtedQuantity",
    field: "exequtedQuantity",
    headerName: "حجم انجام شده",
  },
  {
    colId: "clientId",
    field: "clientId",
    headerName: "نرم افزار",
  },
  {
    colId: "succeed",
    field: "succeed",
    headerName: "وضعیت",
    cellClassRules: {
      "text-red-500": (rowData: any) => !rowData?.data?.succeed,
      "text-emerald-500": (rowData: any) => rowData?.data?.succeed,
    },
    valueFormatter: (rowData: any) => {
      return rowData.value ? "موفق" : "نا موفق";
    },
  },
  {
    colId: "ip",
    field: "ip",
  },
  {
    colId: "userAgent",
    field: "userAgent",
  },
  {
    colId: "browser",
    field: "browser",
    headerName: "مرورگر",
  },
  {
    colId: "os",
    field: "os",
    headerName: "سیستم عامل",
  },
  {
    colId: "isMobile",
    field: "isMobile",
    headerName: "از طریق موبایل",
    valueFormatter: (rowData: any) => {
      return rowData?.data?.isMobile ? "بله" : "خیر";
    },
  },
  {
    colId: "tradeTime",
    field: "tradeTime",
    headerName: "زمان معامله",
    valueFormatter: (rowData: any) => {
      return chunk(rowData?.data?.tradeTime, 2).join(":");
    },
  },
  {
    colId: "status",
    field: "status",
    headerName: "وضعیت ",
    valueFormatter: (rowData: any) => {
      return AssetStatusEnums.find(
        (item: any) => item.id === rowData?.data?.status
      )?.title;
    },
  },
  {
    colId: "applicationSourceName",
    field: "applicationSourceName",
    headerName: "نام نرم افزار",
  },
  {
    colId: "remainingQuantity",
    field: "remainingQuantity",
    headerName: "حجم باقی مانده",
  },
  {
    colId: "orderStatusTitle",
    field: "orderStatusTitle",
    headerName: "وضعیت سفارش",
  },
  {
    colId: "orderTypeTitle",
    field: "orderTypeTitle",
    headerName: "نوع سفارش",
  },
  {
    colId: "validityTypeTitle",
    field: "validityTypeTitle",
    headerName: "اعتبار سفارش",
  },
  {
    colId: "tradingDayInsGroupTitle",
    field: "tradingDayInsGroupTitle",
    headerName: "وضعیت معاملاتی گروه",
  },

  {
    colId: "afterOpeningInsGroupTitle",
    field: "afterOpeningInsGroupTitle",
    headerName: "وضعیت بعد از گشایش",
  },
  {
    colId: "sessionStatusCode",
    field: "sessionStatusCode",
    headerName: "کد وضعیت جلسه معاملاتی",
  },
  {
    colId: "sessionStatusTitle",
    field: "sessionStatusTitle",
    headerName: "وضعیت جلسه معاملاتی",
  },
  {
    colId: "mobileNumber",
    field: "mobileNumber",
    headerName: "شماره تلفن",
    cellClass: "textFormat",
  },
  {
    colId: "personTypeTitle",
    field: "personTypeTitle",
    headerName: "حقیقی / حقوقی",
  },
  {
    colId: "marketerRefCode",
    field: "marketerRefCode",
    headerName: "کد معرفی/بازاریابی",
  },
  {
    colId: "marketerTitle",
    field: "marketerTitle",
    headerName: "بازاریاب",
  },
  {
    colId: "reagentTitle",
    field: "reagentTitle",
    headerName: "معرف",
  },
  {
    colId: "agentUniqueId",
    field: "agentUniqueId",
    headerName: "نماینده",
    cellRendererSelector: () => {
      const ColourCellRenderer = (rowData: any) => {
        return (
          <div className={"flex items-center space-x-2 space-x-reverse"}>
            <span>{rowData?.data?.agentUniqueId}</span>
            {rowData?.data?.agentTitle && rowData?.data?.agentUniqueId ? (
              <span className="mx-1">-</span>
            ) : null}
            <span>{rowData?.data?.agentTitle}</span>
          </div>
        );
      };
      const moodDetails = {
        component: ColourCellRenderer,
      };
      return moodDetails;
    },
  },

  {
    colId: "online-registration-detail",
    field: "detail",
    headerName: "جزییات",
    flex: 0,
    width: 90,
    cellStyle: {
      cursor: "pointer",
      display: "flex",
    },
    cellRendererSelector: () => {
      return {
        component: (rowData: any) => {
          return (
            <a
              className={"flex h-full w-full"}
              target="_blank"
              rel="noreferrer"
              href={`/online-registration/registration-report/userId=${rowData?.data?.userId}`}
            >
              <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
            </a>
          );
        },
      };
    },
  },

  //with children
  {
    colId: "brokerCommission",
    field: "brokerCommission",
    headerName: "کارمزد کارگزار",
  },
  {
    colId: "brokerCmdCommission",
    field: "brokerCmdCommission",
    headerName: "کارمزد صندوق توسعه",
  },
  {
    colId: "seoControlCommission",
    field: "seoControlCommission",
    headerName: "کارمزد حق نظارت سازمان",
  },
  {
    colId: "csdCommission",
    field: "csdCommission",
    headerName: "کارمزد سپرده گذاری",
  },
  {
    colId: "tmcCommission",
    headerName: "کارمزد فناوری",
    field: "tmcCommission",
  },
  {
    colId: "bourseCommission",
    field: "bourseCommission",
    headerName: "کارمزد بورس مربوطه",
  },
  {
    colId: "rayanCommission",
    field: "rayanCommission",
    headerName: "کارمزد رایان بورس",
  },
  {
    colId: "accessCommission",
    field: "accessCommission",
    headerName: "کارمزد حق دسترسی",
  },
  {
    colId: "taxCommission",
    field: "taxCommission",
    headerName: "مالیات ارزش افزوده",
  },
  {
    colId: "first-date",
    field: "first-date",
    headerName: "تاریخ اول",
  },
  {
    colId: "second-date",
    field: "second-date",
    headerName: "تاریخ دوم",
  },

  //dates
  {
    colId: "georgianTradeDate",
    field: "georgianTradeDate",
    headerName: "تاریخ معامله",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
    flex: 0,
    width: 180,
  },
  {
    colId: "StartDate",
    field: "StartDate",
    headerName: "تاریخ شروع ",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "EndDate",
    field: "EndDate",
    headerName: "تاریخ پایان ",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "startDate",
    field: "startDate",
    headerName: "تاریخ شروع ",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "endDate",
    field: "endDate",
    flex: 0,
    width: 180,
    headerName: "تاریخ پایان ",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "lockOutEnd",
    field: "lockOutEnd",
    headerName: "قفل تا تاریخ",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "GCreateDate",
    field: "GCreateDate",
    headerName: "زمان ایجاد",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "transactionDateTime",
    field: "transactionDateTime",
    headerName: "زمان تراکنش",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "tradeDate",
    field: "tradeDate",
    headerName: "تاریخ معامله ",
    flex: 0,
    width: 180,
  },
  {
    colId: "GUpdateDate",
    field: "GUpdateDate",
    flex: 0,
    width: 180,
    headerName: "زمان بروزرسانی",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "fromActiveDateTime",
    field: "fromActiveDateTime",
    headerName: "زمان شروع",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "toActiveDateTime",
    field: "toActiveDateTime",
    headerName: "زمان پایان",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "createDateTime",
    field: "createDateTime",
    headerName: "زمان ایجاد",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "updateDateTime",
    field: "updateDateTime",
    flex: 0,
    width: 180,
    headerName: "زمان بروزرسانی",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "updatedDateTime",
    field: "updatedDateTime",
    headerName: "زمان تغییر",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "CreateDate",
    field: "CreateDate",
    headerName: "زمان تغییر",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "UpdateDate",
    field: "UpdateDate",
    headerName: "زمان تغییر",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "beginningEffectingDate",
    field: "beginningEffectingDate",
    headerName: "تاریخ شروع",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "endEffectingDate",
    field: "endEffectingDate",
    headerName: "تاریخ پایان",
    flex: 0,
    width: 180,
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
    width: 180,
  },
  {
    colId: "effectiveDate",
    field: "effectiveDate",
    flex: 0,
    width: 180,
    headerName: "تاریخ و زمان تغییر",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "RegisterDate",
    field: "RegisterDate",
    flex: 0,
    width: 180,
    headerName: "تاریخ ثبت نام",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "registerDate",
    field: "registerDate",
    headerName: "تاریخ ثبت",
    flex: 0,
    width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "evidenceReleaseDate",
    field: "evidenceReleaseDate",
    headerName: "تاریخ صدور مجوز",
    flex: 0,
    width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "managementStartDate",
    field: "managementStartDate",
    headerName: "	تاریخ شروع مدیریت سبد",
    flex: 0,
    width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "managementEndDate",
    field: "managementEndDate",
    headerName: "	تاریخ پایان مدیریت سبد",
    flex: 0,
    width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "evidenceExpirationDate",
    field: "evidenceExpirationDate",
    headerName: "تاریخ انقضا مجوز",
    flex: 0,
    width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "date",
    field: "date",
    headerName: "تاریخ",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
    flex: 0,
    width: 180,
  },
  {
    colId: "tradingDateTime",
    field: "tradingDateTime",
    headerName: "زمان اجرا",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "birthDate",
    field: "birthDate",
    headerName: "تاریخ تولد",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "deceasedDate",
    field: "deceasedDate",
    headerName: "تاریخ وفات",
    flex: 0,
    width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "tradingSessionDate",
    field: "tradingSessionDate",
    headerName: "تاریخ جلسه معاملاتی",
    flex: 0,
    width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "userRequestDateTime",
    field: "userRequestDateTime",
    flex: 0,
    width: 180,
    headerName: "زمان درخواست",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "expirationDate",
    field: "expirationDate",
    flex: 0,
    width: 120,
    headerName: "تاریخ انقضاء",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value, true);
    },
  },
  {
    colId: "receiveResponseFromCapServerDateTime",
    field: "receiveResponseFromCapServerDateTime",
    headerName: "زمان ثبت در هسته",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "eventTriggerTime",
    field: "eventTriggerTime",
    flex: 0,
    width: 180,
    headerName: "زمانبندی اجرای وضعیت",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },

  {
    colId: "changeDateTime",
    field: "changeDateTime",
    flex: 0,
    width: 180,
    headerName: "تاریخ وزمان تغییر",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "eventDate",
    field: "eventDate",
    flex: 0,
    width: 180,
    headerName: "تاریخ وزمان ارسال",
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "dateReceived",
    field: "dateReceived",
    headerName: "تاریخ و زمان دریافت",
    flex: 0,
    width: 180,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  {
    colId: "isSejami",
    field: "isSejami",
    headerName: "سجامی است؟",
    cellRendererSelector: () => {
      const ColourCellRenderer = (rowData: any) => {
        return (
          <div className={"flex items-center space-x-2 space-x-reverse"}>
            <span>{rowData?.data?.isSejami ? "سجامی" : "غیر سجامی"}</span>
            <DateCell
              date={
                rowData?.data?.isSejamiDateTime
                  ? rowData?.data?.isSejamiDateTime
                  : ""
              }
            />
          </div>
        );
      };
      const moodDetails = {
        component: ColourCellRenderer,
      };
      return moodDetails;
    },
  },
  {
    colId: "sejamStatusCodeTitle",
    field: "sejamStatusCodeTitle",
    headerName: "وضعیت سجام",
    cellRendererSelector: () => {
      const ColourCellRenderer = (rowData: any) => {
        return (
          <div className={"flex items-center space-x-2 space-x-reverse"}>
            <span>{rowData?.data?.sejamStatusCodeTitle}</span>
            <DateCell
              date={
                rowData?.data?.sejamStatusDateTime
                  ? rowData?.data?.sejamStatusDateTime
                  : ""
              }
            />
          </div>
        );
      };
      const moodDetails = {
        component: ColourCellRenderer,
      };
      return moodDetails;
    },
  },
  {
    colId: "registrationStateCodeTitle",
    field: "registrationStateCodeTitle",
    headerName: "وضعیت ثبت نام",
    cellRendererSelector: () => {
      const ColourCellRenderer = (rowData: any) => {
        return (
          <div className={"flex items-center space-x-2 space-x-reverse"}>
            <span>{rowData?.data?.registrationStateCodeTitle}</span>
            <DateCell
              date={
                rowData?.data?.registrationStateDateTime
                  ? rowData?.data?.registrationStateDateTime
                  : ""
              }
            />
          </div>
        );
      };
      const moodDetails = {
        component: ColourCellRenderer,
      };
      return moodDetails;
    },
  },
  {
    colId: "isTbsInserted",
    field: "isTbsInserted",
    headerName: "ثبت در TBS",
    cellRendererSelector: () => {
      const ColourCellRenderer = (rowData: any) => {
        return (
          <div className={"flex items-center space-x-2 space-x-reverse"}>
            <span>{rowData?.data?.isTbsInserted ? "بله" : "خیر"}</span>
            <DateCell
              date={
                rowData?.data?.tbsInsertDateTime
                  ? rowData?.data?.tbsInsertDateTime
                  : ""
              }
            />
          </div>
        );
      };
      const moodDetails = {
        component: ColourCellRenderer,
      };
      return moodDetails;
    },
  },
  {
    colId: "isTBSDocsInserted",
    field: "isTBSDocsInserted",
    headerName: "ثبت فایل قراردادها در TBS؟",
    cellRendererSelector: () => {
      const ColourCellRenderer = (rowData: any) => {
        return (
          <div className={"flex items-center space-x-2 space-x-reverse"}>
            <span>{rowData?.data?.isTBSDocsInserted ? "بله" : "خیر"}</span>
            <DateCell
              date={
                rowData?.data?.tbsDocsInsertDateTime
                  ? rowData?.data?.tbsDocsInsertDateTime
                  : ""
              }
            />
          </div>
        );
      };
      const moodDetails = {
        component: ColourCellRenderer,
      };
      return moodDetails;
    },
  },
] as const;

export default columnModel;
