import {Sidebar} from "primereact/sidebar";
import React, {useState} from "react";
import {Button} from "primereact/button";
import Image from "next/image";
import SideBarContent from "./SideBarContent";

export default function SideBar(){
    const [visibleRight, setVisibleRight] = useState(false);

    return(
        <>
            <Button className={'p-button-raised p-button-text'} icon="pi pi-bars" onClick={() => setVisibleRight(true)} />
            <Sidebar className="rtl" visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <div className="sideBarHead">
                    <h2>کارگزاری توانا</h2>
                    <Image src={'/logo-2.png'} height={'35px'} width={'35px'}/>
                </div>
                <SideBarContent/>
            </Sidebar>
        </>
    )
}