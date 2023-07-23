import InputComponent from "./InputComponent";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import moment from "jalali-moment";
import { DayValue } from "react-modern-calendar-datepicker";
import { Button } from "./button/button";

const SearchComponent: React.FC<any> = forwardRef((props, ref) => {
    const { onSubmit, module, loading, dynamicOptions = [], className, extraClassName } = props
    const { filters, initialValue } = useSearchFilters(module)
    const [query, setQuery] = useState<any>(initialValue)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    useImperativeHandle(ref, () => ({
        changeQueries(newQuery: any) {//define the type object
            let _query: any = { ...query };
            setQuery({ ..._query, ...newQuery })
        }
    }));

    useEffect(() => {
        if (initialValue) {
            setQuery(initialValue)
            let SD: DayValue = null
            let ED: DayValue = null
            if (initialValue?.StartDate) {
                let _startDate = moment(initialValue?.StartDate).locale('fa').format('YYYY/M/D').split('/')
                SD = { year: Number(_startDate[0]), month: Number(_startDate[1]), day: Number(_startDate[2]) }
            }
            if (initialValue?.StartDate) {
                let _endDate = moment(initialValue?.EndDate).locale('fa').format('YYYY/M/D').split('/')
                ED = { year: Number(_endDate[0]), month: Number(_endDate[1]), day: Number(_endDate[2]) }
            }
            setSelectedDayRange({ from: SD, to: ED })
        }
    }, [initialValue])

    return (
        <form className={'flex flex-col grow'} onSubmit={(e) => {
            e.preventDefault()
            onSubmit(query)
        }}>
            <div className={"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 " + className}>
                {
                    filters?.map((item: any) => {
                        return <InputComponent key={item.title}
                            item={item}
                            query={query}
                            setQuery={setQuery}
                            onChange={onChange}
                            selectedDayRange={selectedDayRange}
                            setSelectedDayRange={setSelectedDayRange}
                            dynamicsOption={dynamicOptions}
                        />
                    })
                }
            </div>
            <div className={'flex space-x-3 space-x-reverse mr-auto mb-4 mt-10 h-fit ' + extraClassName}>
                <Button label={'لغو فیلتر ها'}
                    className=" bg-red-600 h-fit"
                    type="reset"
                    onClick={(e) => {
                        e.preventDefault()
                        setQuery(initialValue)
                        setSelectedDayRange({ from: null, to: null })
                    }}
                />
                <Button label={'جستجو'}
                    className=" bg-lime-600 h-fit relative"
                    type={'submit'}
                    disabled={loading}
                    loading={loading}
                    allowed={[[module?.service, module?.module, 'Read'].join('.')]}
                />
            </div>
        </form>
    )
})
SearchComponent.displayName = 'SearchComponent';
export default SearchComponent;