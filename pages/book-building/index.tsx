import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const ToolBar = dynamic(() => import("../../components/book-building/toolbar"));
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../../utils/notification";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

export const BookBuildingContext = createContext({});
function BookBuilding() {
  const { fetchAsyncData, query } = useQuery({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const submitHandler = (query: any) => {
    setLoading(true);
    fetchAsyncData({}, `${ADMIN_GATEWAY}/api/request/` + query?.api)
      .then((res) => setData(res?.data?.result))
      .catch(() => throwToast({ type: "customError", value: "نا موفق" }))
      .finally(() => setLoading(false));
  };

  return (
    <BookBuildingContext.Provider
      value={{ selectedRows, query, submitHandler }}
    >
      <div className="flex flex-col h-full grow">
        <AccordionComponent>
          <SearchComponent
            onSubmit={submitHandler}
            loading={loading}
            module={ModuleIdentifier.BOOK_BUILDING}
          />
        </AccordionComponent>
        <ToolBar />
        <TableComponent
          data={data}
          module={ModuleIdentifier.BOOK_BUILDING}
          loading={loading}
          rowId={["instrumentId", "createDateTime"]}
          rowSelection={"single"}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </BookBuildingContext.Provider>
  );
}

export default withPermission(BookBuilding, ModuleIdentifier.BOOK_BUILDING);
