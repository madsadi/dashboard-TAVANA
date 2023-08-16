import React, { Dispatch } from "react";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import SymbolSearchSection from "./symbol-search-secion";
import { DayValue } from "react-modern-calendar-datepicker";
import RoleSearchSection from "./role-search-section";
import { BaseInput } from "./inputs/base-input";
import { PasswordInput } from "./inputs/password-input";
import { SelectInput } from "./inputs/select-input";
import { DynamicSelect } from "./inputs/dynamic-select";
import { SingleDateInput } from "./inputs/single-date-input";
import { SecondDynamicSelect } from "./inputs/second-dynamic-select";
import { RangeDateInput } from "./inputs/range-date-input";
import { TimeValueInput } from "./inputs/time-value-input";
import DynamicSearch from "./inputs/dynamic-search";

type PropsType = {
    query: any,
    onChange: any,
    setQuery?: Dispatch<any>,
    item: any,
    selectedDayRange: DayRange,
    setSelectedDayRange: Dispatch<DayRange>,
    dynamicsOption: any,
    selectedDay: DayValue,
    setSelectedDay: Dispatch<DayValue>,
}
const InputComponent = (props: PropsType) => {
    const {
        onChange,
        setQuery,
        query,
        item,
        selectedDayRange,
        setSelectedDayRange,
        selectedDay,
        setSelectedDay,
        dynamicsOption
    } = props

    const { title, type } = item

    const componentRender = () => {
        switch (type) {
            case "singleDate":
                return (
                    <SingleDateInput query={query}
                        setQuery={setQuery}
                        onChange={onChange}
                        setSelectedDay={setSelectedDay}
                        selectedDay={selectedDay}
                        item={item} />
                )
            case "date":
                return (
                    <RangeDateInput item={item}
                        query={query}
                        setQuery={setQuery}
                        setSelectedDayRange={setSelectedDayRange}
                        selectedDayRange={selectedDayRange}
                    />
                )
            case "input":
                return (
                    <BaseInput item={item} value={query?.[title]} onChange={onChange} />
                )
            case "password":
                return (
                    <PasswordInput item={item} onChange={onChange} value={query?.[title]} />
                )
            case "selectInput":
                return (
                    <SelectInput item={item} value={query?.[title]} onChange={onChange} dynamicsOption={dynamicsOption} />
                )
            case "selectInputTime":
                return (
                    <TimeValueInput query={query} item={item} onChange={onChange} dynamicsOption={dynamicsOption} />
                )
            case "dynamicSelectInput":
                return (
                    <SecondDynamicSelect item={item} value={query?.[title]} onChange={onChange} dynamicsOption={dynamicsOption} />
                )
            case "dynamic":
                return (
                    <DynamicSelect item={item} onChange={onChange} value={query?.[title]} />
                )
            case "dynamicSearch":
                return <DynamicSearch queryUpdate={onChange} setQuery={setQuery} query={query} item={item} />
            case "search":
                return (
                    <div>
                        <SymbolSearchSection query={query} queryUpdate={onChange} />
                    </div>
                )
            case "searchRoles":
                return (
                    <div>
                        <RoleSearchSection query={query} queryUpdate={onChange} />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        componentRender()
    )
}

export default InputComponent;

InputComponent.defaultProps = {
    setSelectedDayRange: null,
    selectedDayRange: '',
    dynamicsOption: [],
    setSelectedDay: null,
    selectedDay: null,
    queryUpdateAlternative: null
}
