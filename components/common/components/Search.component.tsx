import InputComponent from "./InputComponent";
import React, {useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";

const SearchComponent: React.FC<any> = (props) =>{
    const {query,setQuery,onSubmit,listOfFilters,initialValue,dynamicOptions=[]}=props
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    return(
        <form onSubmit={(e) => onSubmit(e, query)}>
            <div className="grid grid-cols-5 gap-4">
                {
                    listOfFilters?.map((item: any) => {
                        return <InputComponent key={item.title}
                                               query={query}
                                               title={item?.title}
                                               name={item?.name}
                                               setQuery={setQuery}
                                               valueType={item?.valueType}
                                               type={item?.type}
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