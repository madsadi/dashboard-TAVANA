import Layout from "../../components/common/Layout";
import SearchSection from "../../components/bookBuilding/searchSection";
import ResultTable from "../../components/bookBuilding/tableSection";
import Link from "next/link";

export default function bookBuilding(){
    return(
        <Layout>
            <SearchSection/>
            <ResultTable/>
        </Layout>
    )
}