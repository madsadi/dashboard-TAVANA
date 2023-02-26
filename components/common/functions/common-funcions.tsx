import moment from "jalali-moment";
import {
    activeStatus,
    category,
    Hours,
    isActiveWithNoNull, isRequired, marketerTypeEnum,
    Minutes,
    operators, Options, orderOrigin, orderStatus, orderTechnicalOrigin,
    OrderType, originEnum, sides, TypeOfBranches, validityType
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
        case 'OrderType':
            return OrderType
        case 'OrderStatus':
            return orderStatus
        case 'ApplicationSource':
            return originEnum
        case 'Type':
            return marketerTypeEnum
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
        case 'type':
            if (label === 'نوع بازاریاب'){
                return marketerTypeEnum
            }else{
                return TypeOfBranches
            }
        case 'isBourseCodeRequired':
        case 'isRequired':
            return isRequired
        default:
            return []
    }
}
