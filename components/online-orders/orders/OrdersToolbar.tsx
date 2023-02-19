import React from "react";
import OrdersCancel from "./OrdersCancel";

export default function OrdersToolbar(){
    return(
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                <OrdersCancel />
            </div>
        </div>
    )
}