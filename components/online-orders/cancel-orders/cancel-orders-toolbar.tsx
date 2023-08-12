import GpOrderCancel from "./group-order-cancel";
import InsOrderCancel from "./instrument-order-cancel";

export default function CancelOrdersToolbar() {
    return (
        <div className={'toolbar border-x border-border p-2'}>
            <GpOrderCancel />
            <InsOrderCancel />
        </div>
    )
}