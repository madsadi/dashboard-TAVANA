import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import {useRouter} from "next/router";

export default function BreadCrumbComponent() {
    const router=useRouter()

    const items = [
        {label: 'کارمزد'},
        {label: 'Notebook'},
        {label: 'Accessories'},
        {label: 'Backpacks'},
        {label: 'Item'}
    ];

    const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' }

    return (
        <div>
            <div className="card">
                <BreadCrumb model={items} home={home} />
            </div>
        </div>
    );
}