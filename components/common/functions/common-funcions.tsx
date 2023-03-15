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
    Minutes, onlineRegistrationStatusEnums,
    operators,
    Options,
    orderOrigin,
    orderStatus,
    orderTechnicalOrigin,
    OrderType,
    originEnum, personOriginEnums,
    personTypeEnums, sejamStatusEnums,
    sides,
    statesEnums,
    stationTypeEnum,
    subsidiaryType,
    TypeOfBranches,
    validityType
} from "../../../dictionary/Enums";

export const formatNumber = (params: any) => {
    if (typeof params.value ==='number'){
        return Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }else{
        return params.value
    }
};

export const jalali = (date: string) => {
    const jalali = moment(date).locale('fa');
    return {date: jalali.format("YYYY/MM/DD"), time: jalali.format("HH:mm:ss")}
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

export const FindEnum = (title:string,dynamicsOption:any,label='') => {
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
            return {hours: Hours, minutes: Minutes}
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
            if (label === 'نوع بازاریاب' || label === 'نوع قرارداد بازاریابی'){
                return marketerTypeEnum
            }else if (label === 'نوع ایستگاه معاملاتی'){
                return stationTypeEnum
            }else{
                return TypeOfBranches
            }
        case 'isBourseCodeRequired':
        case 'isRequired':
        case 'IsRequired':
        case 'isSejami':
            return isRequired
        default:
            return []
    }
}
