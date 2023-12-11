import {
  ColDef,
  IsRowSelectable,
  RowClickedEvent,
  SideBarDef,
} from "ag-grid-community";
import { SetStateAction, ForwardedRef, Dispatch, CSSProperties } from "react";
import { QueryType } from "./types";
import { ModulesType } from "utils/generate-dynamic-col-defs";

export interface TableProps {
  data: any[];
  module: ModulesType;
  columnDefStructure?: any[];
  rowSelection?: "single" | "multiple";
  onGridReady?: () => void;
  rowId: string[];
  colDef?: ColDef;
  isRowSelectable?: IsRowSelectable;
  masterDetail?: boolean;
  pivoteMode?: boolean;
  sideBar?: SideBarDef | string | string[] | boolean | null;
  detailComponent?: any;
  enableRangeSelection?: boolean;
  enableCharts?: boolean;
  detailCellRendererParams?:
    | detailCellRendererParamsType
    | (() => detailCellRendererParamsType);
  setSelectedRows?: Dispatch<SetStateAction<never[]>>;
  selectedRows?: any[];
  onRowClicked?: ((event: RowClickedEvent<any>) => void) | undefined;
  selectionChanged?: (arg: any[]) => void;
  colGroupInnerRenderer?: any;
  suppressRowClickSelection?: boolean;
  groupIncludeTotalFooter?: boolean;
  groupIncludeFooter?: boolean;
  pagination?: boolean;
  totalCount?: number;
  fetcher?: (query: QueryType) => Promise<void> | void;
  query?: QueryType;
  loading?: boolean;
  indexOfOpenedDetail?: number;
}

export interface detailCellRendererParamsType {
  detailGridOptions: {
    enableRtl: boolean;
    getRowId?: (params: any) => string;
    rowStyle?: {};
    getRowStyle?: (params: any) => CSSProperties;
    suppressRowTransform?: boolean;
    columnDefs: any[];
    defaultColDef: {
      resizable?: boolean;
      sortable?: boolean;
      flex?: number;
      valueFormatter?: (params: number, fixed: number) => string;
    };
  };
  getDetailRowData: (params: any) => Promise<void> | void;
}

export interface SearchComponentTypes {
  onSubmit: Function;
  module: string;
  dynamicOptions?: any[];
  className?: string;
  loading?: boolean;
  extraClassName?: string;
  initialQuery?: {
    [key: string]: string | number | boolean | undefined | string[];
  };
  ref?: ForwardedRef<unknown>;
}
