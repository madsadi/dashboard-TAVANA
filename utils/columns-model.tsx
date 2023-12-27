import { FindEnum, dateCell } from "./common-funcions";
// columnModel.js
export const columnModel: any = {
  checkbox: {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    headerCheckboxSelectionFilteredOnly: true,
    resizable: false,
    minWidth: 40,
    maxWidth: 40,
  },
  enum: {
    valueFormatter: (rowData: any) => {
      return FindEnum(
        rowData.colDef.colId,
        [],
        rowData.colDef?.headerName
      ).find((item: any) => item.id === rowData?.value)?.title;
    },
  },
  date: {
    width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  "blank-detail-page": {
    flex: 0,
    width: 90,
    cellStyle: {
      cursor: "pointer",
      display: "flex",
    },
  },
  "detail-opener": {
    colId: "detail-opener",
    headerName: "",
    field: "id",
    cellRenderer: "agGroupCellRenderer",
    flex: 0,
    minWidth: 50,
    maxWidth: 50,
  },
};

export default columnModel;
