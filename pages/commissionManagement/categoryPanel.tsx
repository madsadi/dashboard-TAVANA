import Layout from "../../components/common/Layout";
import CategorySearchSection from "../../components/commission/categoryPanel/CategorySearchSection";
import CategoryResultTableSection from "../../components/commission/categoryPanel/CategoryResultTableSection";

export default function CategoryPanel(){
    return(
        <div className="flex flex-col h-full grow">
            <CategorySearchSection/>
            <CategoryResultTableSection/>
        </div>
    )
}