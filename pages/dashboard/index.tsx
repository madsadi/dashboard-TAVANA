import { CSDCPSStatusBox } from 'components/dashboard/CSDCPS-box';
import CSDCPSStatusChart from 'components/dashboard/CSDCPSStatus-chart';
import React from 'react';
import LastTradeDate from "../../components/dashboard/last-trade-date";

export default function Index() {
    return (
        <div className='grow gap-4 flex flex-col'>
            <LastTradeDate />
            <div className='grid grid-cols-4'>
                <CSDCPSStatusBox />
            </div>
        </div>
    )
}