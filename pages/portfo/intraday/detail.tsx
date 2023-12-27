import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);
import { useRouter } from "next/router";
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { ModuleIdentifier } from "utils/Module-Identifier";
import moment from "jalali-moment";
import AccordionComponent from "components/common/components/accordion";
const SearchComponent = dynamic(
  () => import("../../../components/common/components/search")
);

type initialType = { PageNumber: number; Date: string; PageSize: number };
const initialValue = {
  Date: "",
  PageNumber: 1,
  PageSize: 20,
};

function PortfolioBook() {
  const router = useRouter();
  const [query, setQuery] = useState<initialType>(initialValue);
  const { data, loading, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchPortfolioTransaction`,
  });

  let userInfo = data?.result?.pagedData?.[0];
  let dep = router.query;

  const fetchHandler = (query: { [key: string]: any }) => {
    fetchData({ ...query, CustomerId: dep?.customerId });
  };

  useEffect(() => {
    if (dep?.instrumentId && dep?.customerId && dep?.effectiveDate) {
      let _query: any = { ...query };
      _query["InstrumentId"] = dep?.instrumentId;
      _query["CustomerId"] = dep?.customerId;
      _query["Date"] = moment(dep?.effectiveDate)
        .locale("en")
        .format("YYYY-MM-DD");
      const { InstrumentId, ...rest } = _query;
      setQuery(rest);
      fetchHandler({ ...query, ..._query });
    }
  }, [dep]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent isOpen={false}>
        <SearchComponent
          onSubmit={fetchHandler}
          initialQuery={query}
          loading={loading}
          module={ModuleIdentifier.PORTFO_detail}
        />
      </AccordionComponent>
      <div
        className={"border-x border-border flex space-x-4 justify-around p-3"}
      >
        <div>
          کدمعاملاتی:
          <span className={"mr-2 font-bold"}>{userInfo?.tradingCode}</span>
        </div>
        <div>
          کدملی:
          <span className={"mr-2 font-bold"}>{userInfo?.nationalId}</span>
        </div>
        <div>
          عنوان مشتری:
          <span className={"mr-2 font-bold"}>{userInfo?.customerTitle}</span>
        </div>
        <div>
          کدبورسی:
          <span className={"mr-2 font-bold"}>{userInfo?.bourseCode}</span>
        </div>
      </div>
      <TableComponent
        module={ModuleIdentifier.PORTFO_detail}
        data={data?.result?.pagedData}
        loading={loading}
        rowId={["id"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default PortfolioBook;
