import type {NextPage} from 'next'
import {useAuth} from 'react-oidc-context';
import Image from "next/image";

const Home: NextPage = () => {
    const auth = useAuth();

    return (
        <div className="m-auto">
            <div className="p-4 rounded grow">
                <div className="text-center mb-10">
                    <Image width={150} height={150} src={"/logo-2.png"} alt="hyper"/>
                </div>
                <button className="w-full bg-active text-white p-1 rounded-full focus:bg-active/60 hover:bg-active/60 transition-all" onClick={() => void auth.signinRedirect()}>ورود</button>
            </div>
        </div>

    )
}

export default Home
