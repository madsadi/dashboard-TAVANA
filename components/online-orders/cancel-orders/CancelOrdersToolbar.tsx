import GpOrderCancel from "./GpOrderCancel";
import InsOrderCancel from "./InsOrderCancel";

export default function CancelOrdersToolbar(){
    return(
        <div className={'flex space-x-reverse space-x-2 border-x border-border p-2'}>
            <GpOrderCancel/>
            <InsOrderCancel/>
        </div>
    )
}