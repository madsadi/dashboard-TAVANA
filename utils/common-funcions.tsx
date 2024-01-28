import moment from "jalali-moment";
import { EnumType } from "types/types";
import {
  AccountTypeEnum,
  activeStatus,
  AgentTypeEnums,
  ApplicationCodeEnums,
  AssetStatusEnums,
  AssignmentTypeEnums,
  BankAccountTypeEnums,
  bousreCodeType,
  CalculationBaseType,
  CalculationBaseTypeEnums,
  category,
  changeTypeEnums,
  CoefficientBaseTypeEnums,
  ContractTypeEnums,
  CustomerAgreementState,
  CustomerOriginEnums,
  customerTypeEnums,
  DepartmentEnums,
  FactorStatusEnums,
  genderEnums,
  GetOfferTypeEnums,
  GuaranteeTypeEnums,
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
  PeriodDateEnums,
  PersonNationalityEnums,
  personOriginEnums,
  personTypeEnums,
  personTypeSecondVersionEnums,
  PositionTypeEnums,
  RequestStatusEnums,
  riskLevel,
  sejamStatusEnums,
  SettlementDelayEnums,
  SettlementStateEnum,
  sides,
  SortBy,
  SortOrder,
  StakeholderTypeEnums,
  statesEnums,
  stationTypeEnum,
  StatusEnums,
  StatusTypeEnum,
  subsidiaryType,
  TradingKnowledgeLevelEnunms,
  TransactionLevelEnums,
  TypeOfBranches,
  UserType,
  validityType,
  Year,
} from "../constants/Enums";
import { banks } from "../components/online-registration/registration-report/enums";
import { useCallback } from "react";

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

export function lowerFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function upperFirstLetter(string: string) {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}

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
    "  " +
    (date && !hideTime && date_format.time !== "00:00:00"
      ? " - " + date_format.time
      : "")
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
    case "settlementDelayCode":
    case "settlementDelay":
      return SettlementDelayEnums;
    case "isActiveWithNoNull":
    case "twoFactorEnabled":
    case "firstName":
    case "valid":
      return isActiveWithNoNull;
    case "isActive":
      return activeStatus;
    case "requestStatus":
      return RequestStatusEnums;
    case "department":
      return DepartmentEnums;
    case "positionType":
    case "position":
      return PositionTypeEnums;
    case "periodDate":
    case "period":
      return PeriodDateEnums;
    case "coefficientBaseType":
    case "coefficientBaseTypeId":
    case "planName":
    case "PlanName":
    case "Plan":
      return CoefficientBaseTypeEnums;
    case "accountType":
      return AccountTypeEnum;
    case "operator":
      return operators;
    case "state":
      if (label === "وضعیت توافقنامه") {
        return CustomerAgreementState;
      } else {
        return statesEnums;
      }
    case "gender":
      return genderEnums;
    case "orderType":
      return OrderType;
    case "isValid":
      return IsValidEnums;
    case "orderStatus":
      return orderStatus;
    case "applicationSource":
      return originEnum;
    case "validityType":
      return validityType;
    case "timeInterval":
      return Interval;
    case "Side":
    case "side":
    case "orderSide":
    case "sideCode":
      return sides;
    case "personNationality":
      return PersonNationalityEnums;
    case "applicationCode":
      return ApplicationCodeEnums;
    case "customerTypeCode":
    case "customerCounterSideCode":
      return CustomerOriginEnums;
    case "offerTypeCode":
      return GetOfferTypeEnums;
    case "deleted":
    case "isDeleted":
      return Options;
    case "orderTechnicalOrigin":
      return orderTechnicalOrigin;
    case "orderOrigin":
      return orderOrigin;
    case "personType":
    case "PersonType":
      return personTypeEnums;
    case "personTypeSecondVersionEnums":
      return personTypeSecondVersionEnums;
    case "customerType":
      return customerTypeEnums;
    case "changeType":
      return changeTypeEnums;
    case "assignmentType":
      return AssignmentTypeEnums;
    case "personOrigin":
      return personOriginEnums;
    case "subsidiaryTypeCode":
      return subsidiaryType;
    case "calculationBase":
      return CalculationBaseType;
    case "sejamStatus":
      return sejamStatusEnums;
    case "registrationState":
      return onlineRegistrationStatusEnums;
    case "riskLevel":
      return riskLevel;
    case "settlementState":
      return SettlementStateEnum;
    case "bourseCodeType":
      return bousreCodeType;
    case "type":
      if (label === "نوع بازاریاب" || label === "نوع قرارداد بازاریابی") {
        return marketerTypeEnum;
      } else if (label === "نوع ایستگاه معاملاتی") {
        return stationTypeEnum;
      } else if (label === "نوع حساب بانکی") {
        return BankAccountTypeEnums;
      } else if (label === "نوع ذینفع") {
        return StakeholderTypeEnums;
      }
      if (label === "نوع کد بورسی") {
        return bousreCodeType;
      } else if ("نوع شعبه") {
        return TypeOfBranches;
      }
    case "isBourseCodeRequired":
    case "isRequired":
    case "isRequired":
    case "isReplica":
    case "isSejami":
    case "isCmdConcluded":
    case "isFreezed":
    case "isProfessionalInvestor":
    case "isProfessional":
    case "isPAMTrader":
    case "isDeceased":
    case "isDissolved":
    case "isDissolved":
    case "isFromSejam":
    case "isConfirmed":
    case "isExpired":
    case "isDefault":
    case "isMobile":
    case "isTbsInserted":
    case "hasSignatureRight":
    case "isTBSDocsInserted":
    case "inventoryStatus":
      return isRequired;
    case "month":
      return Months;
    case "year":
      return Year;
    case "contractType":
      return ContractTypeEnums;
    case "transactionLevel":
      return TransactionLevelEnums;
    case "tradingKnowledgeLevel":
      return TradingKnowledgeLevelEnunms;
    case "guaranteeType":
      return GuaranteeTypeEnums;
    case "legalPersonTypeCategory":
      return LegalPersonTypeEnums;
    case "legalPersonTypeSubCategory":
      return LegalPersonTypeSubEnums;
    case "calculationBaseType":
    case "calculationBaseTypeId":
      return CalculationBaseTypeEnums;
    case "managementType":
      return ManagementTypeEnums;
    case "agentType":
      return AgentTypeEnums;
    case "status":
      if (label === "وضعیت تغییر کارگزاری") {
        return AssetStatusEnums;
      } else if (label === "وضعیت فاکتور") {
        return FactorStatusEnums;
      } else if (label === "وضعیت اعتبار") {
        return StatusTypeEnum;
      } else {
        return StatusEnums;
      }
    case "userType":
      return UserType;
    case "sortBy":
      return SortBy;
    case "sortOrder":
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

export function numberWithCommas(x: any) {
  const value = x
    ?.toString()
    .replace(/^00+/, "0")
    .replace(/^0+[1-9]/, (d: any) => parseInt(d))
    .replace(/^.+/, (d: any) =>
      parseFloat(d) <= 1 && d[0] == "." ? `0${d}` : d
    );
  return value?.split(".").length
    ? value.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        (value.split(".").length > 1
          ? `.${value.split(".")[1].substring(0, 8)}`
          : "")
    : "";
}

export function p2e(x: any) {
  return x
    ?.toString()
    .replace(/[٠-٩]/g, (d: string) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

export function numberInput(x: any) {
  return p2e(x)
    ?.replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
}
