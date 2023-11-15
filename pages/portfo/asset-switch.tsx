import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import DateCell from "components/common/table/date-cell";
import { formatNumber } from "components/common/functions/common-funcions";
import AssetSwitchToolbar from "components/asset-switch/asset-switch-toolbar";
import { withPermission } from "components/common/layout/with-permission";
import { AssetStatusEnums } from "constants/Enums";

export const AssetSwitchContext = createContext({});
function AssetSwitch() {
  const [selectedRows, setSelectedRows] = useState([]);
  const columnDefStructure = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      headerCheckboxSelectionFilteredOnly: true,
      resizable: false,
      minWidth: 40,
      maxWidth: 40,
    },
    {
      field: "tradingCode",
      headerName: "کد معاملاتی",
    },
    {
      field: "uniqueId",
      headerName: "کد ملی",
      cellRenderer: "agGroupCellRenderer",
    },
    {
      field: "title",
      headerName: "عنوان مشتری",
    },
    {
      field: "bourseCode",
      headerName: "کد بورسی",
    },
    {
      field: "instrumentId",
      headerName: "شناسه نماد",
    },
    {
      field: "faInsCode",
      headerName: "نماد ",
    },
    {
      field: "faInsName",
      headerName: "شرکت ",
    },
    {
      field: "status",
      headerName: "وضعیت ",
      valueFormatter: (rowData: any) => {
        return AssetStatusEnums.find(
          (item: any) => item.id === rowData?.data?.status
        )?.title;
      },
    },
    {
      field: "description",
      headerName: "توضیحات ",
    },
    {
      field: "username",
      headerName: "حساب کاربری",
    },
    {
      field: "createDateTime",
      headerName: "تاریخ و زمان ایجاد",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return <DateCell date={rowData?.data?.createDateTime} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
    {
      field: "updateDateTime",
      headerName: "تاریخ و زمان تغییر",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return <DateCell date={rowData?.data?.updateDateTime} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
  ];
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchAssetSwitch`,
  });
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        // getRowId:(params:any)=>params.data.orderId,
        columnDefs: [
          {
            field: "userFirstName",
            headerName: "نام کاربر",
          },
          {
            field: "userLastName",
            headerName: "نام خانوادگی کاربر",
          },
          {
            field: "userUniqueId",
            headerName: "کد ملی کاربر",
          },
        ],
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([params.data]);
      },
    };
  }, []);

  return (
    <AssetSwitchContext.Provider value={{ selectedRows, fetchData, query }}>
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.PORTFO_asset_switch_request}
          />
        </AccordionComponent>
        <AssetSwitchToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.PORTFO_asset_switch_request}
          loading={loading}
          columnDefStructure={columnDefStructure}
          detailCellRendererParams={detailCellRendererParams}
          rowId={["id"]}
          pagination={true}
          rowSelection={"single"}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          masterDetail={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </AssetSwitchContext.Provider>
  );
}

export default withPermission(
  AssetSwitch,
  ModuleIdentifier.PORTFO_asset_switch_request
);
