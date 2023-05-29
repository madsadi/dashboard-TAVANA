import InputComponent from "./InputComponent";
import React, {Dispatch, useEffect, useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {useSearchFilters} from "../../../hooks/useSearchFilters";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

type PropsType = { query: any, setQuery: Dispatch<any>, onSubmit: Function, listOfFilters: any, initialValue: any, dynamicOptions: any }
const SearchComponent: React.FC<any> = (props) => {
    const {query:prevQuery}=useSelector((state:any)=>state.pageConfig)
    const {onSubmit,module, dynamicOptions = []} = props
    const {filters,initialValue} = useSearchFilters(module)
    const [query, setQuery] = useState<any>(initialValue)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const router = useRouter()
    // useEffect(()=>{
    //     if (initialValue && !query){
    //         setQuery(initialValue)
    //     }
    // },[initialValue])

    useEffect(()=>{
        if (prevQuery && router.pathname.startsWith('/online-registration/registration-report')){
            setQuery(prevQuery)
        }
    },[prevQuery])

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit(query)
        }}>
            <div className="grid grid-cols-5 gap-4">
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
            <div className={'flex space-x-3 space-x-reverse float-left mb-4 mt-10'}>
                <button className={'button bg-red-600'} type={'button'} onClick={(e) => {
                    e.preventDefault()
                    setQuery(initialValue)
                    setSelectedDayRange({from: null, to: null})
                }}>
                    لغو فیلتر ها
                </button>
                <button className={'button bg-lime-600'} type={'submit'}>
                    جستجو
                </button>
            </div>
        </form>
    )
}

export default SearchComponent;