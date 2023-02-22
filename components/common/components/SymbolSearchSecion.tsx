import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useRef, useState} from "react";
import {useSearchSymbol} from "../../../api/useSearchSymbol";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

export default function SymbolSearchSection({query,queryUpdate}: {query:any,queryUpdate:any}) {
    const [searchApi, setSearchApi] = useState('')
    const [page, setPage] = useState(1)
    const [searchItem, setSearchItem] = useState('')
    const [findings, setFindings] = useState<any>([])
    const [open, setOpen] = useState(true)
    const {data, isLoading} = useSearchSymbol(searchApi)

    const searchHandler = (item: string,page:number) => {

        queryUpdate('InstrumentId',item)
        if (item.length > 2) {
            if (searchItem===item){
                setSearchItem(item)
                setPage(page+1)
                setSearchApi(`/SearchInstrumentBySymbolTitle?SymbolTitle=${item}&IsValid=true&pageNumber=${page+1}`)
            }else{
                setSearchItem(item)
                setPage(page)
                setFindings([])
                setSearchApi(`/SearchInstrumentBySymbolTitle?SymbolTitle=${item}&IsValid=true&pageNumber=${page}`)
            }
        }
    }

    useEffect(()=>{
        if (data){
            setFindings([...findings,...data?.result?.pagedData])
        }
    },[data])// eslint-disable-line react-hooks/exhaustive-deps

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

    const select=(symbol:any)=>{
        setOpen(false)
        queryUpdate('InstrumentId',symbol.instrumentId)
    }

    useEffect(()=>{
        if (!query?.InstrumentId){
            queryUpdate('InstrumentId','')
        }
    },[query?.InstrumentId])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={`relative`} ref={wrapperRef}>
            <div className={'relative'}>
                <label className={'block'} htmlFor="InstrumentId">شناسه نماد</label>
                <input id="InstrumentId" className={'w-full'} value={query.InstrumentId}
                       onFocus={() => setOpen(true)}
                       onChange={(e) => {
                           searchHandler(e.target.value,1);
                           setOpen(true)
                       }}/>
                <div className={'absolute left-1 bottom-0 -translate-y-1/3 flex'}>
                    {isLoading && query.InstrumentId &&
                        <div className={'animate-spin h-5 w-5'}><Image alt={'search'} height={32} width={32} src={'/icons/spinner.svg'}/></div>}
                        <MagnifyingGlassIcon className={'h-5 w-5'}/>
                </div>
            </div>
            {query.InstrumentId && open && <div
                className={'absolute w-full p-2 opacity-95 backdrop-blur-lg dark:bg-appbar/50 bg-white shadow-md rounded-lg top-full mt-3 z-10'}>
                <InfiniteScroll
                    dataLength={findings.length}
                    next={()=>searchHandler(searchItem,page)}
                    hasMore={findings.length<data?.result?.totalCount}
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
                            <li className={'dark:odd:bg-slate-700 odd:bg-gray-200 text-wrap rounded-md px-2 py-1 overflow-x-auto custom-scrollbar mb-0.5 flex items-center hover:bg-gray-400 cursor-pointer'} key={symbol.id} onClick={()=>select(symbol)}>
                                <div>{symbol.faInsCode} - {symbol.faInsName}</div>
                            </li>)
                    })) : <div>نتیجه ای یافت نشد</div>}
                </InfiniteScroll>
            </div>}
        </div>
    )
}

SymbolSearchSection.defaultProps = {
    query:false,
    setQuery:false
};