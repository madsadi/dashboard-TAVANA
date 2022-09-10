import Appbar from "./Appbar";
import BreadCrumbComponent from "./BreadCrumb";

const LayoutHOC = ({children}:{children:any}) => {
    return (
        <>
            <Appbar/>
            <div className={'page-content '}>
                <div className={'container flex-grow-1 py-3 md:px-3'}>
                    {/*<BreadCrumbComponent/>*/}
                    {children}
                </div>
            </div>
        </>
    )
};

export default LayoutHOC;