import { CSDCPSStatusChart } from 'components/dashboard/CSDCPSStatus-chart';
import React from 'react';
import LastTradeDate from "../../components/dashboard/last-trade-date";

export default function Index() {
    return (
        <div className='grow gap-4 flex flex-col'>
            <LastTradeDate />
            <CSDCPSStatusChart />
        </div>
    )
}