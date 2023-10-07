import React, { memo } from 'react';
import { AgChartsReact } from "ag-charts-react"
import { ADMIN_GATEWAY } from "api/constants"
import useQuery from "hooks/useQuery"
import moment from "jalali-moment"

const CSDCPSStatusChart = () => {
    const { data, fetchData } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/GetCSDCPSStatus`, revalidateOnMount: true, params: { EndDate: moment().locale('en').format('YYYY-MM-DD'), StartDate: moment().locale('en').format('YYYY-MM-DD') } })

    const option1: any = {
        data: data?.result?.pagedData || [],
        title: {
            fontFamily: "Yekan Bakh"
        },
        legend: {
            position: "right" // 'bottom', 'left', 'top'
        },
        series: [
            {
                type: 'pie',
                angleKey: 'firstnetValuebyClosingPrice',
                calloutLabelKey: 'faInsCode',
                sectorLabelKey: 'firstnetValuebyClosingPrice',
                sectorLabel: {
                    color: 'white',
                    fontWeight: 'bold',
                },
            },
        ]
    }

    console.log(data);

    return (
        <AgChartsReact options={option1} />
    )
}

export default memo(CSDCPSStatusChart);