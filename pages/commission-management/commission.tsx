import React from 'react';
import CommissionSearch from "../../components/commission/index/CommissionSearch";
import CommissionResult from "../../components/commission/index/CommissionResult";

export default function Commission() {


    return (
        <div className="flex flex-col h-full grow">
            <CommissionSearch/>
            <CommissionResult/>
        </div>
    )
}