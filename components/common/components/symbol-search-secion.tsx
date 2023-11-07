import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useSearchSymbol } from "../../../hooks/useSearchSymbol";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { QueryType } from "types/types";
import { FilterItemSearchType } from "types/constant-filters.types";

interface SymbolSearchProps {
    query: QueryType,
    queryUpdate: (key: string, value: any) => void,
    item: FilterItemSearchType
}
export default function SymbolSearchSection(props: SymbolSearchProps) {
    const { query, queryUpdate, item } = props
    const { isMultiple, title, isRequired, name, display } = item
    const [searchApi, setSearchApi] = useState('')
    const [page, setPage] = useState(1)
    const [searchItem, setSearchItem] = useState('')
    const [findings, setFindings] = useState<any>([])
    const [arrayOfSymbols, setArrayOfSymbols] = useState<{ faInsCode: string, instrumentId: string }[]>([])
    const [open, setOpen] = useState(false)
    const [displayer, setDisplayer] = useState(null)
    const { data, isLoading } = useSearchSymbol(searchApi)

    const searchHandler = (item: string, page: number) => {
        if (!isMultiple) queryUpdate(title, item)
        if (!open) setOpen(true)
        setSearchItem(item)
        if (item.length > 2) {
            if (searchItem === item) {
                setPage(page + 1)
                setSearchApi(`/SearchInstrumentBySymbolTitle?SymbolTitle=${item}&IsValid=true&pageNumber=${page + 1}`)
            } else {
                setPage(page)
                setFindings([])
                setSearchApi(`/SearchInstrumentBySymbolTitle?SymbolTitle=${item}&IsValid=true&pageNumber=${page}`)
            }
        }
    }

    useEffect(() => {
        if (data) {
            setFindings([...findings, ...data?.result?.pagedData])
        }
    }, [data])// eslint-disable-line react-hooks/exhaustive-deps

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const select = (symbol: any) => {
        if (isMultiple) {
            setArrayOfSymbols((prevState) => [...prevState, { faInsCode: symbol.faInsCode, instrumentId: symbol.instrumentId }])
            queryUpdate(title, [...arrayOfSymbols.map((item) => item.instrumentId), symbol.instrumentId])
        } else {
            setOpen(false)
            queryUpdate(title, symbol.instrumentId)
            if (display) setDisplayer(symbol[display])
        }
    }

    useEffect(() => {
        if (!query?.[title]) {
            if (isMultiple) {
                queryUpdate(title, [])
                setArrayOfSymbols([])
                setSearchItem('')
            } else {
                queryUpdate(title, '')
            }
        }
    }, [query?.[title]])// eslint-disable-line react-hooks/exhaustive-deps

    const removeHandler = (index: number) => {
        let _arrayOfSymbols = [...arrayOfSymbols]
        _arrayOfSymbols.splice(index, 1)
        setArrayOfSymbols(_arrayOfSymbols)
        queryUpdate(title, _arrayOfSymbols.map((item) => item.instrumentId))
    }
    return (
        <div className={`relative`} ref={wrapperRef}>
            <div className={'relative'}>
                <label className={'flex items-center text-sm'} htmlFor={title}>
                    {name}
                    {isRequired ? <span className={'min-w-5 mr-2'}>
                        <ExclamationCircleIcon
                            className={'h-4 w-4 text-red-500'} />
                    </span> : null}
                    {searchItem || query?.InstrumentId ?
                        <XCircleIcon className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => {
                            setSearchItem('')
                            queryUpdate(title, null)
                            setDisplayer(null)
                        }} /> : null}
                </label>
                <input id={title} className={'w-full h-[36px] '} value={isMultiple ? searchItem : (display ? displayer || query?.InstrumentId : query?.InstrumentId)}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => {
                        searchHandler(e.target.value, 1);
                    }} />
                <div className={'absolute left-1 bottom-0 -translate-y-1/3 flex'}>
                    {isLoading && query?.InstrumentId &&
                        <div className={'animate-spin h-5 w-5'}><Image alt={'search'} height={32} width={32} src={'/icons/spinner.svg'} /></div>}
                    <MagnifyingGlassIcon className={'h-5 w-5'} />
                </div>
                {query?.[title] && open && <div
                    className={'absolute w-full p-2 opacity-95 backdrop-blur-lg  bg-white shadow-md rounded-lg top-full mt-3 z-10'}>
                    <InfiniteScroll
                        dataLength={findings.length}
                        next={() => searchHandler(searchItem, page)}
                        hasMore={findings.length < data?.result?.totalCount}
                        loader={<h4>Loading...</h4>}
                        height={150}
                        className={'custom-scrollbar overflow-y-auto'}
                        endMessage={
                            <p className={'text-center max-w-full text-wrap'}>
                                <b>تمام نتایج برای {searchItem}</b>
                            </p>
                        }
                    >
                        {findings.length > 0 ? (findings.map((symbol: any) => {
                            return (
                                <li className={' odd:bg-gray-200 text-wrap rounded-md px-2 py-1 overflow-x-auto custom-scrollbar mb-0.5 flex items-center hover:bg-gray-400 cursor-pointer'} key={symbol.instrumentId} onClick={() => select(symbol)}>
                                    <div>{symbol.faInsCode} - {symbol.faInsName}</div>
                                </li>)
                        })) : <div>نتیجه ای یافت نشد</div>}
                    </InfiniteScroll>
                </div>}
            </div>
            {
                isMultiple && Array.isArray(query?.[title]) && query?.[title].length ? <div className="flex flex-wrap gap-2 mt-1">
                    {arrayOfSymbols.map((item, index) => <div key={item.faInsCode} className="rounded-full cursor-pointer text-sm bg-border px-2 py-1" onClick={() => removeHandler(index)}>{item.faInsCode}</div>)}
                </div> : null
            }
        </div>
    )
}

SymbolSearchSection.defaultProps = {
    query: false,
    setQuery: false
};