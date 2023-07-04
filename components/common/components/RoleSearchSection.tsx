import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useRef, useState} from "react";
import {useSearchSymbol} from "../../../hooks/useSearchSymbol";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import useQuery from "../../../hooks/useQuery";
import {IDP} from "../../../api/constants";

export default function RoleSearchSection({query,queryUpdate}: {query:any,queryUpdate:any}) {
    const {fetchAsyncData}: any = useQuery({url: `${IDP}/api/roles/search`})
    const [page, setPage] = useState(1)
    const [findings, setFindings] = useState<any>([])
    const [open, setOpen] = useState(true)
    const [role, setRole] = useState('')
    const [totalCount, setTotalCount] = useState('')
    const [loading, setLoading] = useState(false)

    const searchHandler = (item: string,page:number) => {
        setRole(item)
        if (item.length > 2) {
            setLoading(true)
            fetchAsyncData({PageNumber:page,PageSize:10,name:item,isActive:true})
                .then((res:any)=> {
                    setPage(page+1)
                    if (page===1){
                        setFindings(res?.data.result.pagedData)
                        setTotalCount(res?.data.result.totalCount)
                    }else{
                        setFindings([...findings,...res?.data.result.totalCount])
                    }
                })
                .finally(()=>setLoading(false))
        }
    }

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

    const select=(role:any)=>{
        setOpen(false)
        setRole(role.name)
        queryUpdate('RoleId',role.id)
    }

    useEffect(()=>{
        if (!query?.RoleId){
            setRole('')
        }
    },[query?.RoleId])

    return (
        <div className={`relative`} ref={wrapperRef}>
            <div className={'relative'}>
                <label className={'block text-sm'} htmlFor="InstrumentId">عنوان نقش کاربر</label>
                <input id="InstrumentId" className={'w-full'} value={role}
                       onFocus={() => setOpen(true)}
                       onChange={(e) => {
                           searchHandler(e.target.value,1);
                           setOpen(true)
                       }}/>
                <div className={'absolute left-1 bottom-0 -translate-y-1/3 flex'}>
                    {loading && role &&
                        <div className={'animate-spin h-5 w-5'}><Image alt={'search'} height={32} width={32} src={'/icons/spinner.svg'}/></div>}
                    <MagnifyingGlassIcon className={'h-5 w-5'}/>
                </div>
            </div>
            {role && open && <div
                className={'absolute w-full p-2 opacity-95 backdrop-blur-lg bg-white shadow-md rounded-lg top-full mt-3 z-10'}>
                <InfiniteScroll
                    dataLength={findings?.length}
                    next={()=>searchHandler(role,page)}
                    hasMore={findings.length<totalCount}
                    loader={<h4>Loading...</h4>}
                    height={150}
                    className={'custom-scrollbar overflow-y-auto'}
                    endMessage={
                        <p className={'text-center max-w-full text-wrap'}>
                            <b> تمام نتایج برای {role}</b>
                        </p>
                    }
                >
                    {findings.length > 0 ? (findings.map((role: any) => {
                        return (
                            <li className={'odd:bg-gray-200 text-wrap rounded-md px-2 py-1 overflow-x-auto custom-scrollbar mb-0.5 flex items-center hover:bg-gray-400 cursor-pointer'} key={role.id} onClick={()=>select(role)}>
                                <div>{role.name}</div>
                            </li>)
                    })) : <div>نتیجه ای یافت نشد</div>}
                </InfiniteScroll>
            </div>}
        </div>
    )
}

RoleSearchSection.defaultProps = {
    query:false,
    setQuery:false
};