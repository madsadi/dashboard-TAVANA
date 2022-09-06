import {Sidebar} from "primereact/sidebar";
import React, {useState} from "react";
import {Button} from "primereact/button";
import Link from "next/link";

export default function SideBar(){
    const [visibleRight, setVisibleRight] = useState(false);

    return(
        <>
            <Button className={'g-button-text'} icon="pi pi-align-justify" onClick={() => setVisibleRight(true)} />
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
               <Link href={'/hi'}>
                   hi
               </Link>
            </Sidebar>
        </>
    )
}