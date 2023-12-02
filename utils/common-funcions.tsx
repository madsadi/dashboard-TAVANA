import moment from "jalali-moment";
import { EnumType } from "types/types";
import {
  activeStatus,
  AgentTypeEnums,
  AssetStatusEnums,
  BankAccountTypeEnums,
  bousreCodeType,
  CalculationBaseType,
  CalculationBaseTypeEnums,
  category,
  changeTypeEnums,
  CoefficientBaseTypeEnums,
  ContractTypeEnums,
  CustomerOriginEnums,
  customerTypeEnums,
  FactorStatusEnums,
  genderEnums,
  GetOfferTypeEnums,
  Hours,
  Interval,
  isActiveWithNoNull,
  isRequired,
  IsValidEnums,
  LegalPersonTypeEnums,
  LegalPersonTypeSubEnums,
  ManagementTypeEnums,
  marketerTypeEnum,
  Minutes,
  Months,
  onlineRegistrationStatusEnums,
  operators,
  Options,
  orderOrigin,
  orderStatus,
  orderTechnicalOrigin,
  OrderType,
  originEnum,
  personOriginEnums,
  personTypeEnums,
  riskLevel,
  sejamStatusEnums,
  sides,
  SortBy,
  SortOrder,
  statesEnums,
  stationTypeEnum,
  StatusEnums,
  subsidiaryType,
  TradingKnowledgeLevelEnunms,
  TransactionLevelEnums,
  TypeOfBranches,
  UserType,
  validityType,
  Year,
} from "../constants/Enums";
import { banks } from "../components/online-registration/registration-report/enums";

export const formatNumber = (params: any, fixed: number) => {
  if (typeof params?.value === "number") {
    if (fixed) {
      return params.value
        .toFixed(fixed)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      if (params.value.toString().includes("e")) {
        const seperated = String(params.value).replace(".", "").split("e");
        if (seperated[1].includes("-")) {
          let arrayOfDigits = [];
          const power = +seperated[1].slice(1);
          for (let i = 1; i < power; i++) {
            arrayOfDigits.push("0");
          }
          return "0." + arrayOfDigits.join("") + seperated[0];
        } else {
          return params.value
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
      } else {
        const seperated = String(params.value).split(".");

        return (
          Number(seperated[0])
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") +
          (seperated.length > 1 ? "." + seperated[1] : "")
        );
      }
    }
  } else {
    return params.value;
  }
};

export function chunk(str: string, n: number) {
  var ret = [];
  var i;
  var len;

  for (i = 0, len = str?.length; i < len; i += n) {
    ret.push(str.substr(i, n));
  }

  return ret;
}

export const formatNumberSecond = (params: any) => {
  if (typeof params === "number") {
    return Math.floor(params)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return params;
  }
};

export const dateCell = (date: string, hideTime = false) => {
  let date_format = { date: "", time: "" };

  if (date) {
    date_format = jalali(date);
  }
  return (
    (date ? date_format.date : "-") +
    "   " +
    (date && !hideTime ? date_format.time : "")
  );
};

export const formatDecimals = (params: number) => {
  return Math.floor(params)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const jalali = (date: string) => {
  const jalaliD = moment(date).locale("fa");
  return {
    date: jalaliD.format("YYYY/MM/DD"),
    time: jalaliD.format("HH:mm:ss"),
  };
};

export function nFormatter(num: number, digits: any) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "هزار" },
    { value: 1e6, symbol: "میلیون" },
    { value: 1e9, symbol: "میلیارد" },
    { value: 1e12, symbol: "تریلیون" },
    { value: 1e15, symbol: " تیریلیارد" },
    { value: 1e18, symbol: "کادریلیارد" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? item.symbol + (num / item.value).toFixed(digits).replace(rx, "$1")
    : "0";
}

export const dateRangeHandler = (selectedDayRange: any) => {
  if (selectedDayRange.from && selectedDayRange.to) {
    return ` از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}   تا   ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day} `;
  } else if (!selectedDayRange.from && !selectedDayRange.to) {
    return "";
  } else if (!selectedDayRange.from) {
    return "";
  } else if (!selectedDayRange.to) {
    return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا اطلاع ثانویه`;
  }
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const FindEnum = (
  title: string,
  dynamicsOption: EnumType[] | undefined,
  label = ""
) => {
  switch (title) {
    case "variable":
      return dynamicsOption;
    case "api":
      return category;
    case "adminApprovalDateTime":
    case "customerApprovalDateTime":
    case "endDateTime":
    case "startDateTime":
    case "startHour":
    case "endHour":
      return { hours: Hours, minutes: Minutes };
    case "isActiveWithNoNull":
      return isActiveWithNoNull;
    case "isActive":
    case "IsActive":
      return activeStatus;
    case "operator":
      return operators;
    case "State":
    case "state":
      return statesEnums;
    case "Gender":
    case "gender":
      return genderEnums;
    case "OrderType":
      return OrderType;
    case "IsValid":
      return IsValidEnums;
    case "OrderStatus":
      return orderStatus;
    case "ApplicationSource":
      return originEnum;
    case "ValidityType":
      return validityType;
    case "TimeInterval":
      return Interval;
    case "Side":
    case "orderSide":
    case "OrderSide":
    case "SideCode":
      return sides;
    case "CustomerTypeCode":
    case "CustomerCounterSideCode":
      return CustomerOriginEnums;
    case "OfferTypeCode":
      return GetOfferTypeEnums;
    case "Deleted":
    case "IsDeleted":
      return Options;
    case "orderTechnicalOrigin":
      return orderTechnicalOrigin;
    case "orderOrigin":
      return orderOrigin;
    case "personType":
    case "PersonType":
      return personTypeEnums;
    case "CustomerType":
      return customerTypeEnums;
    case "ChangeType":
      return changeTypeEnums;
    case "personOrigin":
      return personOriginEnums;
    case "subsidiaryTypeCode":
      return subsidiaryType;
    case "CalculationBase":
    case "calculationBase":
      return CalculationBaseType;
    case "sejamStatus":
    case "SejamStatus":
      return sejamStatusEnums;
    case "registrationState":
      return onlineRegistrationStatusEnums;
    case "riskLevel":
      return riskLevel;
    case "type":
    case "Type":
      if (label === "نوع بازاریاب" || label === "نوع قرارداد بازاریابی") {
        return marketerTypeEnum;
      } else if (label === "نوع ایستگاه معاملاتی") {
        return stationTypeEnum;
      } else if (label === "نوع حساب بانکی") {
        return BankAccountTypeEnums;
      }
      if (label === "نوع کد بورسی") {
        return bousreCodeType;
      } else {
        return TypeOfBranches;
      }
    case "isBourseCodeRequired":
    case "isRequired":
    case "IsRequired":
    case "IsReplica":
    case "isSejami":
    case "IsCmdConcluded":
    case "IsFreezed":
    case "IsProfessionalInvestor":
    case "IsPAMTrader":
    case "IsDeceased":
    case "IsDissolved":
    case "isDissolved":
    case "isFromSejam":
    case "isConfirmed":
    case "isExpired":
    case "isDefault":
      return isRequired;
    case "Month":
      return Months;
    case "Year":
      return Year;
    case "ContractType":
      return ContractTypeEnums;
    case "transactionLevel":
      return TransactionLevelEnums;
    case "tradingKnowledgeLevel":
      return TradingKnowledgeLevelEnunms;
    case "ContractType":
      return ContractTypeEnums;
    case "legalPersonTypeCategory":
      return LegalPersonTypeEnums;
    case "legalPersonTypeSubCategory":
      return LegalPersonTypeSubEnums;
    case "CalculationBaseType":
      return CalculationBaseTypeEnums;
    case "managementType":
      return ManagementTypeEnums;
    case "agentType":
      return AgentTypeEnums;
    case "Status":
    case "status":
      if (label === "وضعیت تغییر کارگزاری") {
        return AssetStatusEnums;
      } else if (label === "وضعیت فاکتور") {
        return FactorStatusEnums;
      } else {
        return StatusEnums;
      }
    case "UserType":
      return UserType;
    case "SortBy":
      return SortBy;
    case "SortOrder":
      return SortOrder;
    default:
      return [];
  }
};

export function findBank(account: string) {
  if (account) {
    // const bankSelected : any = banks.find((item:any)=>String(item.number).startsWith(account?.slice(0,6)))
    const bankSelected: any = banks.find((item: any) => item.name === account);
    return bankSelected;
  } else {
    return "";
  }
}

export const splittedDate = (date: string) => {
  let _date = date.split("-");
  return {
    year: Number(_date[0]),
    month: Number(_date[1]),
    day: Number(_date[2]),
  };
};
