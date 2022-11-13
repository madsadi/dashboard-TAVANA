import ClearedTradesSearchSection from "../../components/newFlow/clearedTradesReport/clearedTradesSearchSection";
import ClearedTradesResultTableSection from "../../components/newFlow/clearedTradesReport/ClearedTradesResultTableSection";

export default function ClearedTradesReport(){
    return(
        <div className="flex flex-col h-full grow">
            <ClearedTradesSearchSection/>
            <ClearedTradesResultTableSection/>
        </div>
    )
}