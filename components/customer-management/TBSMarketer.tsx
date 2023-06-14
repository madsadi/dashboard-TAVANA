import React, {useContext, useState} from "react";
import {ADMIN_GATEWAY} from "../../api/constants";
import {throwToast} from "../common/functions/notification";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";
import useQuery from "../../hooks/useQuery";

export const TBSMarketer=()=>{
    const {fetchAsyncData} = useQuery({url:`${ADMIN_GATEWAY}/api/request/GetAndSaveMarketers`})
    const { fetchData,query:searchQuery } = useContext<any>(CustomerManagement)
    const [loading,setLoading]=useState(false)
    const submitHandler=()=>{
        setLoading(true)
        fetchAsyncData()
            .then((res)=> {
                fetchData(searchQuery)
                throwToast({type: 'success', value: `${res?.data.result.message}`})
            })
            .catch((err) => {
                throwToast({type:'error',value:err})
            })
            .finally(()=>setLoading(false))
    }
    return(
        <button className="button flex items-center bg-lime-600" onClick={submitHandler}>
            دریافت بازاریاب TBS
            {loading && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
        </button>
    )
}