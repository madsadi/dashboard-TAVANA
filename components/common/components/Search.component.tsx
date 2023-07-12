import InputComponent from "./InputComponent";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {useSearchFilters} from "../../../hooks/useSearchFilters";
import {Loader} from "./Loader";
import moment from "jalali-moment";

const SearchComponent: React.FC<any> = forwardRef((props,ref) => {
    const {onSubmit,module,loading, dynamicOptions = [],className,extraClassName} = props
    const {filters,initialValue} = useSearchFilters(module)
    const [query, setQuery] = useState<any>(initialValue)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    useImperativeHandle(ref, () => ({
        changeQueries(newQuery: any) {//define the type object
            let _query: any = {...query};
            setQuery({..._query,...newQuery})
        }
    }));

    useEffect(()=>{
        if (initialValue){
            setQuery(initialValue)
            let _startDate=moment(initialValue?.StartDate).locale('fa').format('YYYY/M/D').split('/')
            let _endDate=moment(initialValue?.EndDate).locale('fa').format('YYYY/M/D').split('/')
            setSelectedDayRange({from:{year:Number(_startDate[0]),month:Number(_startDate[1]),day:Number(_startDate[2])},to:{year:Number(_endDate[0]),month:Number(_endDate[1]),day:Number(_endDate[2])}})

        }
    },[initialValue])

    return (
        <form className={'flex flex-col grow'} onSubmit={(e) => {
            e.preventDefault()
            onSubmit(query)
        }}>
            <div className={"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 "+className}>
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
            <div className={'flex space-x-3 space-x-reverse mr-auto mb-4 mt-10 h-fit '+extraClassName}>
                <button className={'button bg-red-600 h-fit'} type={'button'} onClick={(e) => {
                    e.preventDefault()
                    setQuery(initialValue)
                    setSelectedDayRange({from: null, to: null})
                }}>
                    لغو فیلتر ها
                </button>
                <button className={'button bg-lime-600 h-fit relative disabled:bg-gray-500'} type={'submit'} disabled={loading}>
                    جستجو
                    {loading ? <div className={'absolute left-2 top-1/2 -translate-y-1/2'}><Loader/></div>:null}
                </button>
            </div>
        </form>
    )
})
SearchComponent.displayName = 'SearchComponent';
export default SearchComponent;