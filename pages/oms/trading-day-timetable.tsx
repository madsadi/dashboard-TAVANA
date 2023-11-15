import React from "react";
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
import { jalali } from "../../components/common/functions/common-funcions";
import DateCell from "../../components/common/table/date-cell";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../../components/common/functions/notification";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

function TradingDayTimetable() {
  const columnDefStructure = [
    {
      field: "instrumentGroupId",
      headerName: "کد گروه نماد",
    },
    {
      field: "tradingSessionDate",
      headerName: "تاریخ جلسه معاملاتی",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return <DateCell date={rowData?.data?.tradingSessionDate} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
    {
      field: "tradingDayInsGroupTitle",
      headerName: "وضعیت معاملاتی گروه",
    },
    {
      field: "eventTriggerTime",
      headerName: "زمانبندی اجرای وضعیت",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return <DateCell date={rowData.data?.eventTriggerTime} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
    {
      field: "afterOpeningInsGroupTitle",
      headerName: "وضعیت بعد از گشایش",
    },
    {
      field: "eventDate",
      headerName: "تاریخ وزمان ارسال",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return <DateCell date={rowData.data?.eventDate} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
    {
      field: "dateReceived",
      headerName: "تاریخ و زمان دریافت",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return <DateCell date={rowData.data?.dateReceived} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
  ];
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetTradingDayTimetable`,
  });

  const fetchHandler = (query: any) => {
    if (query.StartDate && query?.EndDate) {
      fetchData(query);
    } else {
      throwToast({ type: "warning", value: "ورودی تاریخ الزامی می باشد" });
    }
  };

  return (
    <div className="flex flex-col h-full grow">
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchHandler}
          loading={loading}
          module={ModuleIdentifier.OMS_timetable}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        loading={loading}
        columnDefStructure={columnDefStructure}
        rowId={["id"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchHandler}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  TradingDayTimetable,
  ModuleIdentifier.OMS_timetable
);
