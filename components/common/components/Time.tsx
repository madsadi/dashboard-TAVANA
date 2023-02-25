import {useEffect, useState} from "react";

export default function Time(){
    const [value, setValue] = useState<string>(new Date().toLocaleTimeString("IR"));

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date().toLocaleTimeString("IR", {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        })), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return(
        <div className={'px-3'} suppressHydrationWarning={true}>
            {value}
        </div>
    )
}