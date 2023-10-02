import React from "react";
import Image from "next/image";

interface excelExportProps {
    ExportAction: any,
    disabled: boolean
}
export default function ExcelExport(props: excelExportProps) {
    const { ExportAction, disabled } = props
    return (
        <button className={'tooltip tooltip-color h-[34px] focus:outline-none transition-all border border-border rounded-md p-1 px-2 shadow'} data-tip={'خروجی اکسل'} disabled={!disabled} onClick={ExportAction}>
            <Image src={'/icons/excel.svg'} height={20} width={20} alt={'excel'} />
        </button>
    )
}