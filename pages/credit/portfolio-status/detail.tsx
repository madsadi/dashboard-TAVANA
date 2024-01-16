import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../../components/common/components/search")
);
const AccordionComponent = dynamic(
  () => import("../../../components/common/components/accordion")
);
import useQuery from "../../../hooks/useQuery";
import { CREDIT_MANAGEMENT } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { useRouter } from "next/router";
import TableComponent from "components/common/table/table-component";
import DetailPortfolio from "components/credit/portfolio/detail-portfolio";

function CreditPortfolioStatusDetail() {
  const router = useRouter();
  const [dataGrid, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchAsyncData }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/PortfolioStatus/Range`,
  });

  const fetchHandler = (query: any) => {
    setLoading(true);
    fetchAsyncData({
      tradeCode: query?.tradeCode,
      startDate: query?.startDate,
    })
      .then((res: any) => {
        setData(
          res?.data.result?.pagedData[0]?.creditRiskStatus.map((item: any) => {
            return {
              ...item,
              tradeCode: query?.tradeCode,
            };
          })
        );
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (router.query?.tradeCode && router.query?.startDate) {
      fetchHandler({
        tradeCode: router.query?.tradeCode,
        startDate: router.query?.startDate,
      });
    }
  }, [router.query]);

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchHandler}
          loading={loading}
          module={ModuleIdentifier.CREDIT_portfolio_status_detail}
          initialQuery={{
            tradeCode: router.query?.tradeCode,
            startDate: router.query?.startDate,
          }}
        />
      </AccordionComponent>
      <TableComponent
        data={dataGrid}
        loading={loading}
        module={ModuleIdentifier.CREDIT_portfolio_status_detail_page}
        rowId={["createdDate"]}
        masterDetail={true}
        detailComponent={(rowData: any) => (
          <DetailPortfolio
            data={{
              tradeCode: rowData?.data?.tradeCode,
              creditRiskStatus: [{ createdDate: rowData?.data.createdDate }],
            }}
          />
        )}
      />
    </div>
  );
}

export default withPermission(
  CreditPortfolioStatusDetail,
  ModuleIdentifier.CREDIT_portfolio_status_detail
);
