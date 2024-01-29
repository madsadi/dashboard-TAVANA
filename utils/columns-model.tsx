import { FindEnum, dateCell } from "./common-funcions";
// columnModel.js
export const columnModel: any = {
  checkbox: {
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    resizable: false,
    minWidth: 40,
    maxWidth: 40,
  },
  enum: {
    cellRenderer: "",
    valueFormatter: (rowData: any) => {
      const value = FindEnum(
        rowData.colDef.colId,
        [],
        rowData.colDef?.headerName
      ).find((item: any) => item.id === rowData?.value)?.title;

      return value;
    },
  },
  date: {
    // width: 120,
    valueFormatter: (rowData: any) => {
      return dateCell(rowData.value);
    },
  },
  "blank-detail-page": {
    flex: 0,
    maxWidth: 90,
    minWidth: 90,
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
