import Layout from "../../components/common/Layout";
import CommissionSearch from "../../components/commission/index/CommissionSearch";
import CommissionResult from "../../components/commission/index/CommissionResult";

export default function Commission(){
    return(
        <Layout>
            <CommissionSearch/>
            <CommissionResult/>
        </Layout>
    )
}