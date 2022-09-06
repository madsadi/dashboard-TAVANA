import {Sidebar} from "primereact/sidebar";
import React, {useState} from "react";
import {Button} from "primereact/button";

export default function SideBar(){
    const [visibleRight, setVisibleRight] = useState(false);

    return(
        <>
            <Button className={'g-button-text'} icon="pi pi-align-justify" onClick={() => setVisibleRight(true)} />
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <h3>Right Sidebar</h3>
            </Sidebar>
        </>
    )
}