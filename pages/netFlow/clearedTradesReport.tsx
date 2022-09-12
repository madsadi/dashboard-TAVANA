import Layout from "../../components/common/Layout";
import ClearedTradesSearchSection from "../../components/newFlow/clearedTradesReport/clearedTradesSearchSection";
import ClearedTradesResultTableSection from "../../components/newFlow/clearedTradesReport/ClearedTradesResultTableSection";

export default function ClearedTradesReport(){
    return(
        <Layout>
            <ClearedTradesSearchSection/>
            <ClearedTradesResultTableSection/>
        </Layout>
    )
}