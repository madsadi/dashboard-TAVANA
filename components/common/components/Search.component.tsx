import InputComponent from "./InputComponent";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {useSearchFilters} from "../../../hooks/useSearchFilters";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {jalali} from "../functions/common-funcions";
import {SearchComponentTypes} from "../../../types/types";

const SearchComponent: React.FC<SearchComponentTypes|any> = forwardRef((props,ref) => {
    const {query:prevQuery}=useSelector((state:any)=>state.pageConfig)
    const {onSubmit,module, dynamicOptions = [],className,extraClassName} = props
    const {filters,initialValue} = useSearchFilters(module)
    const [query, setQuery] = useState<any>(initialValue)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const router = useRouter()

    useEffect(()=>{
        if (prevQuery && router.pathname.startsWith('/online-registration/registration-report')){
            setQuery(prevQuery)
            if (prevQuery.StartDate && prevQuery.EndDate){
                let shamsi_from_date = jalali(prevQuery.StartDate.replace('-','/')).date
                let from_date = shamsi_from_date.split('/')

                let shamsi_to_date = jalali(prevQuery.EndDate.replace('-','/')).date
                let to_date = shamsi_to_date.split('/')

                setSelectedDayRange({from:{year:Number(from_date[0]),month:Number(from_date[1]),day:Number(from_date[2])},to:{year:Number(to_date[0]),month:Number(to_date[1]),day:Number(to_date[2])}})
            }else if (prevQuery.StartDate && !prevQuery.EndDate){
                let shamsi_from_date = jalali(prevQuery.StartDate.replace('-','/')).date
                let from_date = shamsi_from_date.split('/')

                setSelectedDayRange({from:{year:Number(from_date[0]),month:Number(from_date[1]),day:Number(from_date[2])},to:selectedDayRange.to})
            }else if (!prevQuery.StartDate && prevQuery.EndDate){
                let shamsi_to_date = jalali(prevQuery.EndDate.replace('-','/')).date
                let to_date = shamsi_to_date.split('/')

                setSelectedDayRange({from:selectedDayRange.from,to:{year:Number(to_date[0]),month:Number(to_date[1]),day:Number(to_date[2])}})
            }

        }
    },[prevQuery])

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    useImperativeHandle(ref, () => ({
        changeQueries(key:string,value:any) {
            let _query: any = {...query};
            _query[key] = value
            setQuery(_query)
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
                <button className={'button bg-lime-600 h-fit'} type={'submit'}>
                    جستجو
                </button>
            </div>
        </form>
    )
})

export default SearchComponent;