import Layout from "../components/common/Layout";
import CreateNewRule from "../components/marketRulesManagement/CreateNewRule";
import RulesList from "../components/marketRulesManagement/RulesList";

export default function MarketRulesManagement(){
    return(
        <Layout>
            <CreateNewRule/>
            <RulesList/>
        </Layout>
    )
}