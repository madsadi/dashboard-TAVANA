import Layout from "../../components/common/Layout";
import CategorySearchSection from "../../components/commission/categoryPanel/CategorySearchSection";
import CategoryResultTableSection from "../../components/commission/categoryPanel/CategoryResultTableSection";

export default function CategoryPanel(){
    return(
        <Layout>
            <CategorySearchSection/>
            <CategoryResultTableSection/>
        </Layout>
    )
}