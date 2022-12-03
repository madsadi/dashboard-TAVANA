import type {NextPage} from 'next'
import {useAuth} from 'react-oidc-context';
import {NextRouter, useRouter} from "next/router";

const Home: NextPage = () => {
    const auth = useAuth();

    return (
        <div className="m-auto">
            <div className="p-4 rounded grow">
                <div className="text-center mb-5">
                    <img src="logo-2.png" alt="hyper" className="mb-3 h-40"/>
                </div>
                <button className="w-full bg-active text-white p-1 rounded-full" onClick={() => void auth.signinRedirect()}>ورود</button>
            </div>
        </div>

    )
}

export default Home
