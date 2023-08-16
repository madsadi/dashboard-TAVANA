import React from "react";
import OrdersCancel from "./orders-cancel";

export default function OrdersToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <OrdersCancel />
            </div>
        </div>
    )
}