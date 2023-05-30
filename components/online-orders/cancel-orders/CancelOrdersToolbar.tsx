import GpOrderCancel from "./GpOrderCancel";
import InsOrderCancel from "./InsOrderCancel";

export default function CancelOrdersToolbar(){
    return(
        <div className={'toolbar border-x border-border p-2'}>
            <GpOrderCancel/>
            <InsOrderCancel/>
        </div>
    )
}