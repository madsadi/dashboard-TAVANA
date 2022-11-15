import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useRef, useState} from "react";
import {useSearchSymbol} from "../../api/useSearchSymbol";
import InfiniteScroll from "react-infinite-scroll-component";

export default function SymbolSearchSection({query,queryUpdate}: {query:any,queryUpdate:any}) {
    const [searchApi, setSearchApi] = useState('')
    const [page, setPage] = useState(1)
    const [searchItem, setSearchItem] = useState('')
    const [findings, setFindings] = useState<any>([])
    const [open, setOpen] = useState(true)
    const {data, mutate: search, isLoading} = useSearchSymbol(searchApi)

    const searchHandler = (item: string,page:number) => {
        if (item){
            setSearchApi(`/SearchInstrumentBySymbolTitle?SymbolTitle=${item}&IsValid=true&pageNumber=${page}`)
        }
        queryUpdate('InstrumentId',item)
        if (item.length > 3) {
            if (searchItem===item){
                setSearchItem(item)
                setPage(page+1)
                search()
            }else{
                setSearchItem(item)
                setPage(page+1)
                setFindings([])
                search()
            }
        }
    }

    useEffect(()=>{
        if (data){
            setFindings([...findings,...data?.result?.pagedData])
        }
    },[data])

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
    },[query?.InstrumentId])

    return (
        <div className={`relative`} ref={wrapperRef}>
            <div className={'relative'}>
                <label className={'block'} htmlFor="InstrumentId">شناسه نماد</label>
                <input id="InstrumentId" value={query.InstrumentId}
                       onFocus={() => setOpen(true)}
                       onChange={(e) => {
                           searchHandler(e.target.value,1);
                           setOpen(true)
                       }}/>
                <div className={'absolute left-1 bottom-2 flex space-x-reverse space-x-2'}>
                    {isLoading && query.InstrumentId &&
                        <img src={'/icons/spinner.svg'} className={'animate-spin h-6 w-6'}/>}
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