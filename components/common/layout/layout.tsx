import Appbar from "./appbar";
import { useRouter } from "next/router";

const LayoutHOC = ({ children }: { children: any }) => {
    const route = useRouter()

    return (
        <>
            {route.pathname === '/' || route.pathname.startsWith('/authentication/callback') ?
                <div className={'min-h-screen max-h-screen flex flex-column'}>{children}</div> :
                <>
                    <Appbar />
                    <div className={'flex grow gap-2 mt-[51px]'}>
                        <div className={'container grow py-3 flex flex-column'}>
                            {children}
                        </div>
                    </div>
                </>}
        </>
    )
};

export default LayoutHOC;