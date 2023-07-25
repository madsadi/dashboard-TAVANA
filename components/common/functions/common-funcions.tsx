import moment from "jalali-moment";
import {
    activeStatus,
    CalculationBaseType,
    category,
    Hours,
    isActiveWithNoNull,
    isRequired,
    IsValidEnums,
    marketerTypeEnum,
    Minutes, Months, onlineRegistrationStatusEnums,
    operators,
    Options,
    orderOrigin,
    orderStatus,
    orderTechnicalOrigin,
    OrderType,
    originEnum, personOriginEnums,
    personTypeEnums, sejamStatusEnums,
    sides,
    SortBy,
    SortOrder,
    statesEnums,
    stationTypeEnum,
    subsidiaryType,
    TypeOfBranches,
    UserType,
    validityType
} from "../../../constants/Enums";
import { banks } from "../../online-registration/registration-report/enums";

export const formatNumber = (params: any) => {
    if (typeof params?.value === 'number') {
        return Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
        return params.value
    }
};
export const formatDecimals = (params: any) => {
    return Math.floor(params)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const jalali = (date: string) => {
    const jalaliD = moment(date).locale('fa');
    return { date: jalaliD.format("YYYY/MM/DD"), time: jalaliD.format("HH:mm:ss") }
}

export const dateRangeHandler = (selectedDayRange: any) => {
    if (selectedDayRange.from && selectedDayRange.to) {
        return ` از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}   تا   ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day} `
    } else if (!selectedDayRange.from && !selectedDayRange.to) {
        return ''
    } else if (!selectedDayRange.from) {
        return ''
    } else if (!selectedDayRange.to) {
        return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا اطلاع ثانویه`
    }
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const FindEnum = (title: string, dynamicsOption: any, label = '') => {
    switch (title) {
        case 'variable':
            return dynamicsOption
        case 'api':
            return category
        case 'adminApprovalDateTime':
        case 'customerApprovalDateTime':
        case 'endDateTime':
        case 'startDateTime':
        case 'startHour':
        case 'endHour':
            return { hours: Hours, minutes: Minutes }
        case 'isActiveWithNoNull':
            return isActiveWithNoNull
        case 'isActive':
        case 'IsActive':
            return activeStatus
        case 'operator':
            return operators
        case 'State':
        case 'state':
            return statesEnums
        case 'OrderType':
            return OrderType
        case 'IsValid':
            return IsValidEnums
        case 'OrderStatus':
            return orderStatus
        case 'ApplicationSource':
            return originEnum
        case 'ValidityType':
            return validityType
        case 'Side':
        case 'orderSide':
        case 'OrderSide':
            return sides
        case 'Deleted':
        case 'IsDeleted':
            return Options
        case 'orderTechnicalOrigin':
            return orderTechnicalOrigin
        case 'orderOrigin':
            return orderOrigin
        case 'personType':
            return personTypeEnums
        case 'personOrigin':
            return personOriginEnums
        case 'subsidiaryTypeCode':
            return subsidiaryType
        case 'CalculationBase':
        case 'calculationBase':
            return CalculationBaseType
        case 'sejamStatus':
            return sejamStatusEnums
        case 'registrationState':
            return onlineRegistrationStatusEnums
        case 'type':
        case 'Type':
            if (label === 'نوع بازاریاب' || label === 'نوع قرارداد بازاریابی') {
                return marketerTypeEnum
            } else if (label === 'نوع ایستگاه معاملاتی') {
                return stationTypeEnum
            } else {
                return TypeOfBranches
            }
        case 'isBourseCodeRequired':
        case 'isRequired':
        case 'IsRequired':
        case 'isSejami':
            return isRequired
        case 'Period':
            return Months
        case 'UserType':
            return UserType
        case 'SortBy':
            return SortBy
        case 'SortOrder':
            return SortOrder
        default:
            return []
    }
}

export function findBank(account: string) {
    if (account) {
        // const bankSelected : any = banks.find((item:any)=>String(item.number).startsWith(account?.slice(0,6)))
        const bankSelected: any = banks.find((item: any) => item.name === account)
        return bankSelected;
    } else {
        return ''
    }
}
