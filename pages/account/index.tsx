import Layout from "../../components/common/Layout";
import SearchSection from "../../components/account/SearchSection";
import ResultTable from "../../components/account/ResultTable";

export default function Account(){
    return(
        <Layout>
            <SearchSection/>
            <ResultTable/>
        </Layout>
    )
}