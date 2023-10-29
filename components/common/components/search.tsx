import InputComponent from "./input-generator";
import React, { forwardRef, useImperativeHandle, useState, memo } from "react";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { Button } from "./button/button";
import { SearchComponentTypes } from "types/types";


const SearchComponent: React.FC<SearchComponentTypes> = forwardRef((props, ref) => {
    const { onSubmit, module, loading, initialQuery, dynamicOptions = [], className, extraClassName } = props
    const { filters, initialValue, service, modules, restriction } = useSearchFilters(module)
    const [query, setQuery] = useState<any>(initialQuery || initialValue)

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
                            dynamicsOption={dynamicOptions}
                        />
                    })
                }
            </div>
            <div className={'flex space-x-3 space-x-reverse mr-auto mt-10 h-fit ' + extraClassName}>
                <Button label={'لغو فیلتر ها'}
                    className=" bg-error h-fit "
                    type="reset"
                    onClick={(e) => {
                        e.preventDefault()
                        setQuery(initialValue)
                    }}
                />
                <Button label={'جستجو'}
                    className="bg-primary h-fit relative "
                    type={'submit'}
                    disabled={loading}
                    loading={loading}
                    allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Read'].join('.')] : []}
                />
            </div>
        </form>
    )
})

export default memo(SearchComponent);
SearchComponent.displayName = 'SearchComponent';
