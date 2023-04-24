import InputComponent from "./InputComponent";
import React, {Dispatch, useState} from "react";
import {DayRange, DayValue} from "@amir04lm26/react-modern-calendar-date-picker";

type PropsType = {query:any,setQuery:Dispatch<any>,onSubmit:Function,listOfFilters:any,initialValue:any,dynamicOptions:any}
const SearchComponent: React.FC<any> = (props) =>{
    const {query,setQuery,onSubmit,listOfFilters,initialValue,dynamicOptions=[]}=props
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    console.log(query)
    return(
        <form onSubmit={(e) => onSubmit(e, query)}>
            <div className="grid grid-cols-5 gap-4">
                {
                    listOfFilters?.map((item: any) => {
                        return <InputComponent key={item.title}
                                               item={item}
                                               query={query}
                                               setQuery={setQuery}
                                               selectedDayRange={selectedDayRange}
                                               setSelectedDayRange={setSelectedDayRange}
                                               dynamicsOption={dynamicOptions}
                        />
                    })
                }
            </div>
            <div className={'flex space-x-3 space-x-reverse float-left mb-4 mt-10'}>
                <button className={'button bg-red-600'} onClick={(e) => {
                    e.preventDefault()
                    setQuery(initialValue)
                    setSelectedDayRange({from: null, to: null})
                    onSubmit(e, initialValue)
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