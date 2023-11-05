import { IsRowSelectable, RowClickedEvent } from "ag-grid-community";
import { ReactElement, ForwardedRef } from "react";
import { QueryType } from "./types";

export interface TableProps {
    data: any[],
    module: string,
    columnDefStructure: any[],
    rowSelection?: 'single' | 'multiple',
    onGridReady?: () => void,
    rowId: string[],
    isRowSelectable?: IsRowSelectable,
    masterDetail?: boolean,
    detailComponent?: ReactElement,
    detailCellRendererParams?: detailCellRendererParamsType,
    setSelectedRows?: (entry: any[]) => void,
    selectedRows?: any[],
    onRowClicked?: ((event: RowClickedEvent<any>) => void) | undefined,
    selectionChanged?: (arg: any[]) => void,
    colGroupInnerRenderer?: any,
    suppressRowClickSelection?: boolean,
    groupIncludeTotalFooter?: boolean,
    groupIncludeFooter?: boolean,
    pagination?: boolean,
    totalCount?: number,
    fetcher?: () => void,
    query?: QueryType,
    loading?: boolean,
    indexOfOpenedDetail?: number,
}

export interface detailCellRendererParamsType {
    detailGridOptions: {
        enableRtl: boolean,
        getRowId?: (params: any) => string,
        columnDefs: any[],
        defaultColDef: {
            resizable?: boolean,
            sortable?: boolean,
            flex?: number,
            valueFormatter?: (params: number, fixed: number) => string
        },
    },
    getDetailRowData: (params: any) => Promise<void>,
}

export interface SearchComponentTypes {
    onSubmit: Function,
    module: string,
    dynamicOptions?: any[],
    className?: string,
    loading?: boolean,
    extraClassName?: string,
    initialQuery?: { [key: string]: string | number | boolean },
    ref?: ForwardedRef<unknown>
}