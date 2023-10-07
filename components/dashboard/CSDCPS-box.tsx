import React, { useState } from 'react';
import { RangeDateInput } from "components/common/components/inputs/range-date-input"
import CSDCPSStatusChart from "./CSDCPSStatus-chart"

export const CSDCPSStatusBox = () => {
    const [query, setQuery] = useState({ StartDate: "", EndDate: "" });

    return (
        <div className="border border-border rounded-lg shadow p-4">
            <RangeDateInput query={query} setQuery={setQuery} item={{ name: 'تاریخ بازه' }} />
            {/* <CSDCPSStatusChart /> */}
        </div>
    )
}