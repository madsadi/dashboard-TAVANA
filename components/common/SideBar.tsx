import {Sidebar} from "primereact/sidebar";
import React, {useState} from "react";
import {Button} from "primereact/button";
import Image from "next/image";
import SideBarContent from "./SideBarContent";
import BreadCrumb from "./BreadCrumb";

export default function SideBar(){
    const [visibleRight, setVisibleRight] = useState(false);

    return(
        <div className={'flex align-items-center'}>
            <Button className={'p-button-text text-900 text-xl border-round-md border-300'} icon="pi pi-bars" onClick={() => setVisibleRight(true)} />
            <BreadCrumb/>
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <div className="sideBarHead">
                    <h2>کارگزاری توانا</h2>
                    <Image src={'/logo-2.png'} height={'35px'} width={'35px'}/>
                </div>
                <SideBarContent/>
            </Sidebar>
        </div>
    )
}