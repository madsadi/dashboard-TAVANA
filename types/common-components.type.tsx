import { IsRowSelectable, RowClickedEvent } from "ag-grid-community";
import { ReactElement, ForwardedRef } from "react";

export interface TableProps<TData = any> {
    data: any[],
    module: string,
    columnDefStructure: any[],
    rowSelection?: 'single' | 'multiple',
    onGridReady?: () => void,
    rowId: string[],
    isRowSelectable?: IsRowSelectable<TData>,
    masterDetail?: boolean,
    detailComponent?: ReactElement,
    detailCellRendererParams?: ReactElement,
    setSelectedRows?: (entry: any[]) => void,
    selectedRows?: any[],
    onRowClicked?: RowClickedEvent,
    suppressRowClickSelection?: boolean,
    pagination?: boolean,
    totalCount?: number,
    fetcher?: () => void,
    query?: null,
    loading?: boolean,
    indexOfOpenedDetail?: number,
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