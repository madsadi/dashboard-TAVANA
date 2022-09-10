import Layout from "../../components/common/Layout";
import CategorySearchSection from "../../components/commission/categoryPanel/CategorySearchSection";
import ResultTableSection from "../../components/commission/categoryPanel/ResultTableSection";

export default function CommissionCategoryPanel(){
    return(
        <Layout>
            <CategorySearchSection/>
            <ResultTableSection/>
        </Layout>
    )
}