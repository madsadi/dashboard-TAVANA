import React from "react";
import {
    activeStatus,
    category,
    Hours,
    isActiveWithNoNull, isRequired,
    Minutes,
    operators, Options, orderOrigin,
    orderStatus, orderTechnicalOrigin,
    OrderType, originEnum, sides, TypeOfBranches, validityType
} from "../dictionary/Enums";

export default function useEnumFinder(title:string,dynamicsOption:any) {

    const FindEnum = () => {
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
                return TypeOfBranches
            case 'isBourseCodeRequired':
            case 'isRequired':
                return isRequired
            default:
                return []
        }
    }

    return FindEnum()
}

