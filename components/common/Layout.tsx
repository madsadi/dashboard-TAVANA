import Appbar from "./Appbar";

const LayoutHOC = ({children}:{children:any}) => {
    return (
        <>
            <Appbar/>
            <div className={'page-content '}>
                <div className={'container flex-grow-1 py-3 md:px-3'}>
                    {children}
                </div>
            </div>
        </>
    )
};

export default LayoutHOC;