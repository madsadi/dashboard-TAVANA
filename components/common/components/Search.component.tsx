import InputComponent from "./InputComponent";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {useSearchFilters} from "../../../hooks/useSearchFilters";
import {Loader} from "./Loader";

const SearchComponent: React.FC<any> = forwardRef((props,ref) => {
    const {onSubmit,module, dynamicOptions = [],className,extraClassName} = props
    const {filters,initialValue} = useSearchFilters(module)
    const [query, setQuery] = useState<any>(initialValue)
    const [loading, setLoading] = useState<boolean>(false)
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
                <button className={'button bg-lime-600 h-fit relative'} type={'submit'}>
                    جستجو
                    {loading ? <div className={'absolute left-2 top-1/2 -translate-y-1/2'}><Loader/></div>:null}
                </button>
            </div>
        </form>
    )
})
SearchComponent.displayName = 'SearchComponent';
export default SearchComponent;