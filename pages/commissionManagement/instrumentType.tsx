import SearchSection from "../../components/commission/instrumentType/SearchSection";
import ResultTable from "../../components/commission/instrumentType/ResultTable";

export default function InstrumentType() {

    return (
        <div className="flex flex-col h-full grow">
            <SearchSection/>
            <ResultTable/>
        </div>
    )
}