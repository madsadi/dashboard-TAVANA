import React from 'react';
import RulesList from "../../components/market-rules-management/rules-list";

export default function Index() {
    return (
        <div className="flex flex-col h-full grow">
            <RulesList />
        </div>
    )
}