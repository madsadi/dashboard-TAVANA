import React from 'react';
import RulesList from "../../components/market-rules-management/RulesList";

export default function Index(){
    return(
        <div className="flex flex-col h-full grow">
            <RulesList/>
        </div>
    )
}