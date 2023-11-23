import Modal from "../../common/layout/modal";
import React, { useContext, useMemo, useRef } from "react";
import { CategoryResultModalTypes } from "../../../types/types";
import { CommissionContext } from "../../../pages/commission-management/commission";
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { AgGridReact } from "ag-grid-react";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

const CategoryResultModal = (props: CategoryResultModalTypes) => {
  const { setOpen, open, queryHandler, data } = props;
  const { categoryQuery } = useContext<any>(CommissionContext);
  const { fetchAsyncData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/CommissionCategory/Search`,
  });
  const colDef = generateDynamicColumnDefs(
    ModuleIdentifier.COMMISSION_MANAGEMENT_category
  );
  const gridRef: any = useRef();
  const onGridReady = (params: any) => {
    const dataSource = {
      rowCount: undefined,
      getRows: (params: any) => {
        if (params.startRow < data.totalCount) {
          fetchAsyncData({
            ...categoryQuery,
            PageNumber: params.endRow / 10,
          }).then((res: any) => {
            params.successCallback([...res?.data?.result.pagedData], -1);
          });
        }
      },
    };
    params.api.setDatasource(dataSource);
  };
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      minWidth: 100,
    };
  }, []);

  const onSelectionChanged = (rowData: any) => {
    const selectedRows = rowData.data;
    let fields = [
      "marketTitle",
      "marketCode",
      "offerTypeTitle",
      "sideTitle",
      "settlementDelayTitle",
      "customerTypeTitle",
      "customerCounterSideTitle",
    ];
    queryHandler({
      CommissionCategoryId: selectedRows.id,
      CommissionCategoryTitle: fields
        .map((item: string) => {
          if (selectedRows[`${item}`]) {
            return selectedRows[`${item}`];
          }
        })
        .join("-"),
    });
    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      open={open}
      title={"نتایج جستجو گروه بندی ضرایب"}
      ModalWidth={"max-w-5xl"}
    >
      <div
        className={
          "relative grow overflow-hidden border border-border rounded-b-xl min-h-[350px]"
        }
      >
        <div style={gridStyle} className="ag-theme-alpine absolute">
          <AgGridReact
            ref={gridRef}
            enableRtl={true}
            columnDefs={colDef}
            defaultColDef={defaultColDef}
            rowBuffer={0}
            rowSelection={"single"}
            rowModelType={"infinite"}
            cacheBlockSize={10}
            cacheOverflowSize={2}
            onRowClicked={onSelectionChanged}
            infiniteInitialRowCount={10}
            maxBlocksInCache={100}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CategoryResultModal;
