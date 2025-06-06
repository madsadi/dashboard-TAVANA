import Appbar from "./appbar";
import { useRouter } from "next/router";
import ErrorBoundary from "./error-boundry";

const LayoutHOC = ({ children }: { children: any }) => {
    const route = useRouter()

    return (
        <>
            {route.pathname === '/' || route.pathname.startsWith('/authentication/callback') ?
                <div className={'min-h-screen max-h-screen flex flex-column'}>{children}</div> :
                <>
                    <Appbar />
                    <div className={'flex grow gap-2'}>
                        <div className={'container grow py-3 flex flex-column'}>
                            <ErrorBoundary>
                                {children}
                            </ErrorBoundary>
                        </div>
                    </div>
                </>}
        </>
    )
};

export default LayoutHOC;