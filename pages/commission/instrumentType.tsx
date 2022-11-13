import Layout from "../../components/common/Layout";
import SearchSection from "../../components/commission/instrumentType/SearchSection";
import ResultTable from "../../components/commission/instrumentType/ResultTable";
import Link from "next/link";

export default function InstrumentType(){
    return(
        <Layout>
            <SearchSection/>
            <ResultTable/>
        </Layout>
    )
}