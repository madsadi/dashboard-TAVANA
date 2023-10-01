import { SwitchToggle } from "components/common/components/button/switch-toggle";
import React, { useState } from "react";
import { AgChartsReact } from 'ag-charts-react';

export default function CSDIPortfoComparisonToolbar(props: { toggleAction: (keyword: string, visible: boolean) => void, data: any }) {
    const { toggleAction, data } = props
    const [state, setState] = useState<'lastPrice' | 'closingPrice'>('closingPrice')

    const option1: any = {
        data: data?.result?.pagedData || [],
        title: {
            text: 'تاریخ اول',
            fontFamily: "Yekan Bakh"
        },
        legend: {
            position: "right" // 'bottom', 'left', 'top'
        },
        series: [
            {
                type: 'pie',
                angleKey: state === 'lastPrice' ? 'firstnetValuebyLastPrice' : 'firstnetValuebyClosingPrice',
                calloutLabelKey: 'faInsCode',
                sectorLabelKey: state === 'lastPrice' ? 'firstnetValuebyLastPrice' : 'firstnetValuebyClosingPrice',
                sectorLabel: {
                    color: 'white',
                    fontWeight: 'bold',
                },
            },
        ],
    }
    const option2: any = {
        data: data?.result?.pagedData || [],
        title: {
            text: 'تاریخ دوم',
            fontFamily: "Yekan Bakh"
        },
        legend: {
            position: "right" // 'bottom', 'left', 'top'
        },
        series: [
            {
                type: 'pie',
                angleKey: state === 'lastPrice' ? 'secondnetValuebyLastPrice' : 'secondnetValuebyClosingPrice',
                calloutLabelKey: 'faInsCode',
                sectorLabelKey: state === 'lastPrice' ? 'secondnetValuebyLastPrice' : 'secondnetValuebyClosingPrice',
                sectorLabel: {
                    color: 'white',
                    fontWeight: 'bold',
                },
            },
        ],
    }

    const changeHandler = (e: any) => {
        toggleAction(e ? 'closingPrice' : 'lastPrice', e ? e : !e)
        toggleAction(e ? 'lastPrice' : 'closingPrice', e ? !e : e)
        setState(e ? 'lastPrice' : 'closingPrice')
    }

    return (
        <div className={'border-x border-border'}>
            <div className={'p-2'}>
                <div className="flex items-center justify-between">
                    <SwitchToggle isChecked={state === 'lastPrice'} onChange={changeHandler} labelAfter={'قیمت پایانی'} labelBefore={'قیمت آخرین  معامله'} />
                    <AgChartsReact options={option1} />
                    <AgChartsReact options={option2} />
                </div>
            </div>
        </div>
    )
}