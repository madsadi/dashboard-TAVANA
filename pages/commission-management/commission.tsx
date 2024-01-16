import React, { createContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
import CategoryResultModal from "../../components/commission/index/category-result-modal";
const InstrumentTypeResultModal = dynamic(
  () => import("../../components/commission/index/instrument-type-result-modal")
);
const CommissionToolbar = dynamic(
  () => import("../../components/commission/index/commission-toolbar")
);
import useQuery from "../../hooks/useQuery";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { throwToast } from "../../utils/notification";
import { ADMIN_GATEWAY } from "../../api/constants";
import { withPermission } from "components/common/layout/with-permission";

export const CommissionContext = createContext({});
function Commission() {
  const {
    data: categoryData,
    query: categoryQuery,
    loading: categoryLoading,
    fetchData: categorySearch,
  }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/CommissionCategory/Search`,
  });
  const {
    data: instrumentData,
    fetchData: instrumentSearch,
    query: instrumentQuery,
    loading: instrumentLoading,
  }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/CommissionInstrumentType/Search`,
  });
  const { fetchAsyncData: detailSearch, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/CommissionDetail/Search`,
  });
  const [categoryModal, setCategoryModal] = useState(false);
  const [instrumentType, setInstrumentTypeModal] = useState(false);
  const [rowData, setRowData] = useState<any>([]);
  const [instrumentMessage, setInstrumentMessage] = useState<string>("");
  const [categoryMessage, setCategoryMessage] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [ids, setIds] = useState<any>({});
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const ref: any = useRef();
  useEffect(() => {
    if (categoryData?.result?.pagedData?.length) {
      setCategoryModal(true);
      setCategoryMessage("");
    } else if (categoryData !== null) {
      setCategoryMessage("نتیجه ای پیدا نشد");
    }
  }, [categoryData]);

  useEffect(() => {
    if (instrumentData?.result?.pagedData.length) {
      setInstrumentTypeModal(true);
      setInstrumentMessage("");
    } else if (instrumentData !== null) {
      setInstrumentMessage("نتیجه ای پیدا نشد");
    }
  }, [instrumentData]);

  const queryHandler = (newQuery: any) => {
    ref?.current?.changeQueries(newQuery);
    setIds({ ...ids, ...newQuery });
  };

  const detailSearchHandler = (query: any) => {
    const { CommissionCategoryTitle, CommissionInstrumentTypeTitle, ...rest } =
      query;
    setDetailLoading(true);
    detailSearch(rest)
      .then((res: any) => setRowData(res?.data?.result))
      .catch((err: any) => throwToast({ type: "err", value: err }))
      .finally(() => setDetailLoading(false));
  };

  return (
    <CommissionContext.Provider
      value={{ categoryQuery, instrumentQuery, selectedRows, ids }}
    >
      <div className={"flex flex-col h-full grow"}>
        <CategoryResultModal
          open={categoryModal}
          setOpen={setCategoryModal}
          queryHandler={queryHandler}
          data={categoryData?.result}
        />
        <InstrumentTypeResultModal
          open={instrumentType}
          setOpen={setInstrumentTypeModal}
          queryHandler={queryHandler}
          data={instrumentData?.result}
        />
        <AccordionComponent>
          <div
            className={"grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2"}
          >
            <div
              className={
                "flex flex-col border border-dashed border-border p-2 rounded"
              }
            >
              <div className={"font-bold text-lg mb-5 flex"}>
                ابزار مالی گروه بندی ضرایب
                <p className={"text-red-500 text-base mr-2"}>
                  {instrumentMessage}
                </p>
              </div>
              <SearchComponent
                className={
                  "!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 "
                }
                extraClassName={"sm:mt-auto"}
                loading={instrumentLoading}
                onSubmit={instrumentSearch}
                module={ModuleIdentifier.COMMISSION_MANAGEMENT_instrument}
              />
            </div>
            <div className={"border border-dashed border-border p-2 rounded"}>
              <div className={"font-bold text-lg mb-5 flex"}>
                گروه بندی ضرایب
                <p className={"text-red-500 text-base mr-2"}>
                  {categoryMessage}
                </p>
              </div>
              <SearchComponent
                className={
                  "!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 "
                }
                onSubmit={categorySearch}
                loading={categoryLoading}
                module={ModuleIdentifier.COMMISSION_MANAGEMENT_category}
              />
            </div>
            <div
              className={
                "flex flex-col border border-dashed border-border p-2 rounded"
              }
            >
              <div className={"font-bold text-lg mb-5"}>ضرایب کارمزد</div>
              <SearchComponent
                ref={ref}
                className={
                  "!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 "
                }
                extraClassName={"sm:mt-auto"}
                loading={detailLoading}
                onSubmit={detailSearchHandler}
                module={ModuleIdentifier.COMMISSION_MANAGEMENT_detail}
              />
            </div>
          </div>
        </AccordionComponent>
        <CommissionToolbar />
        <TableComponent
          data={rowData?.pagedData}
          module={ModuleIdentifier.COMMISSION_MANAGEMENT_detail}
          rowId={["id"]}
          loading={detailLoading}
          rowSelection={"single"}
          setSelectedRows={setSelectedRows}
          pagination={true}
          totalCount={rowData?.totalCount}
          fetcher={detailSearchHandler}
          query={query}
        />
      </div>
    </CommissionContext.Provider>
  );
}

export default withPermission(
  Commission,
  ModuleIdentifier.COMMISSION_MANAGEMENT_detail
);
