import SearchSection from "./searchSection";
import React from "react";
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";
import RemoveComponent from "./RemoveComponent";

export default function ToolBar({ gridRef }: { gridRef: any }) {
    return (
        <div className={'flex p-2'}>
            <SearchSection />
            <div className={'flex space-x-2 space-x-reverse mr-auto'}>
                <AddComponent gridRef={gridRef} />
                <EditComponent gridRef={gridRef} />
                <RemoveComponent gridRef={gridRef} />
            </div>
        </div>
    )
}