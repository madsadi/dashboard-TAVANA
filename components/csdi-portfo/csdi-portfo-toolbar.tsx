import { SwitchToggle } from "components/common/components/button/switch-toggle";
import React, { useState } from "react";

export default function CSDIPortfoToolbar(props: { toggleAction: (keyword: string, visible: boolean) => void }) {
    const { toggleAction } = props
    const [state, setState] = useState<'lastPrice' | 'closingPrice'>('closingPrice')

    const changeHandler = (e: any) => {
        toggleAction(e ? 'closingPrice' : 'lastPrice', e ? e : !e)
        toggleAction(e ? 'lastPrice' : 'closingPrice', e ? !e : e)
        setState(e ? 'lastPrice' : 'closingPrice')
    }

    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <SwitchToggle isChecked={state === 'lastPrice'} onChange={changeHandler} labelAfter={'قیمت پایانی'} labelBefore={'قیمت آخرین  معامله'} />
            </div>
        </div>
    )
}