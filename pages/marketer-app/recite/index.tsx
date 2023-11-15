import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const SearchComponent = dynamic(
  () => import("../../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);
const AccordionComponent = dynamic(
  () => import("../../../components/common/components/accordion")
);
const ReciteToolbar = dynamic(
  () => import("../../../components/marketer-app/recite/toolbar/recite-toolbar")
);

import useQuery from "../../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../../api/constants";
import { ModuleIdentifier } from "../../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { FactorStatusEnums } from "constants/Enums";

export const ReciteContext = createContext({});
function Recite() {
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const columnDefStructure: any = [
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
      field: "MarketerID",
      headerName: "شناسه بازاریاب",
    },
    {
      field: "Period",
      headerName: "دوره زمانی",
      valueFormatter: (rowData: any) => {
        const months = [
          "فروردین",
          "اردیبهشت",
          "خرداد",
          "تیر",
          "مرداد",
          "شهریور",
          "مهر",
          "آبان",
          "آذر",
          "دی",
          "بهمن",
          "اسفند",
        ];
        return (
          months[Number(rowData.data?.Period?.slice(4, 6)) - 1] +
          "-" +
          rowData.data?.Period?.slice(0, 4)
        );
      },
    },
    {
      field: "Plan",
      headerName: "پلکان",
    },
    {
      field: "Status",
      headerName: "وضعیت فاکتور",
      valueFormatter: (rowData: any) => {
        return FactorStatusEnums.find(
          (item: any) => item.id === rowData?.data?.Status
        )?.title;
      },
    },
    {
      field: "detail",
      headerName: "جزییات",
      flex: 0,
      width: 90,
      cellStyle: {
        cursor: "pointer",
        display: "flex",
      },
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <a
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={`/marketer-app/recite/detail/${rowData.data?.FactorID}`}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </a>
            );
          },
        };
      },
    },
  ];
  const {
    data,
    fetchData,
    query: searchQuery,
    loading,
  }: any = useQuery({ url: `${MARKETER_ADMIN}/factor/get-all` });

  const fetchHandler = (query: any) => {
    const { Month, Year, ...rest } = query;

    fetchData({ ...rest, Period: Year && Month ? Year + Month : null });
  };

  return (
    <ReciteContext.Provider
      value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchHandler}
            loading={loading}
            module={ModuleIdentifier.MARKETER_APP_recite}
          />
        </AccordionComponent>
        <ReciteToolbar />
        <TableComponent
          data={data?.result.pagedData}
          columnDefStructure={columnDefStructure}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection={"single"}
          rowId={["FactorID"]}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={searchQuery}
        />
      </div>
    </ReciteContext.Provider>
  );
}

export default withPermission(Recite, ModuleIdentifier.MARKETER_APP_recite);
