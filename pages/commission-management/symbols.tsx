import React, { useMemo, useState } from "react";
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
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { throwToast } from "utils/notification";
import { formatNumber } from "utils/common-funcions";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

function SymbolsCommission() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<string>("Abstract");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ pagedData: any[]; totalCount: number }>({
    pagedData: [],
    totalCount: 0,
  });
  const abstractColumnDefStructure = generateDynamicColumnDefs(
    ModuleIdentifier.COMMISSION_MANAGEMENT_abstract_symbols
  );
  const fullColumnDefStructure = generateDynamicColumnDefs(
    ModuleIdentifier.COMMISSION_MANAGEMENT_full_symbols
  );

  const tabItems: any = {
    Abstract: abstractColumnDefStructure,
    Full: fullColumnDefStructure,
  };
  const { fetchAsyncData, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/InstrumentCommissionDetail/${
      activeTab === "Abstract"
        ? "GetAbstractCommissionCoefficient"
        : "GetFullCommissionCoefficient"
    }`,
  });

  const fetchHandler = async (query: any) => {
    setLoading(true);
    await fetchAsyncData(query)
      .then((res: any) => setData(res?.data?.result))
      .catch((err: any) => throwToast({ type: "error", value: err }))
      .finally(() => setLoading(false));
  };

  const detailCellRendererParams = useMemo(() => {
    const colDef = generateDynamicColumnDefs(
      ModuleIdentifier.COMMISSION_MANAGEMENT_full_symbols_detail
    );
    return {
      detailGridOptions: {
        enableRtl: true,
        columnDefs: colDef,
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([
          {
            category: "ضریب کارمزد",
            broker: params?.data?.brokerCommissionCoeff,
            access: params?.data?.accessCommissionCoeff,
            brokerCmdFund: params?.data?.brokerCmdFundCoeff,
            bourse: params?.data?.bourseCommissionCoeff,
            seoControl: params?.data?.seoControlCommissionCoeff,
            csd: params?.data?.csdCommissionCoeff,
            tmc: params?.data?.tmcCommissionCoeff,
            rayan: params?.data?.rayanCommissionCoeff,
            tax: params?.data?.taxCoeff,
            addedValue: params?.data?.addedValueTax,
            charge: params?.data?.charge,
            inventory: params?.data?.inventoryCoeff,
            inventoryAddedValueTax: params?.data?.inventoryAddedValueTaxCoeff,
          },
          {
            category: "مقدار کمینه",
            broker: params?.data?.minBrokerCommissionValue,
          },
          {
            category: "مقدار بیشینه",
            broker: params?.data?.maxBrokerCommissionValue,
            access: params?.data?.maxAccessCommissionValue,
            brokerCmdFund: params?.data?.maxBrokerCmdFundValue,
            bourse: params?.data?.maxBourseCommissionValue,
            seoControl: params?.data?.maxSeoControlCommissionValue,
            csd: params?.data?.maxCsdCommissionValue,
            tmc: params?.data?.maxTmcCommissionValue,
            rayan: params?.data?.maxRayanCommissionValue,
            tax: params?.data?.maxTaxValue,
            addedValue: params?.data?.maxAddedVlueTax,
            inventory: params?.data?.maxInventoryValue,
            inventoryAddedValueTax: params?.data?.maxInventoryAddedValueTax,
          },
        ]);
      },
    };
  }, []);

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <div className="flex">
        <button
          onClick={() => {
            setActiveTab("Abstract");
            setData({ pagedData: [], totalCount: 0 });
          }}
          className={`px-10 py-2 rounded-t ${
            activeTab === "Abstract" ? "bg-border font-bold" : "text-gray-400"
          }`}
        >
          خلاصه کارمزد نماد
        </button>
        <button
          onClick={() => {
            setActiveTab("Full");
            setData({ pagedData: [], totalCount: 0 });
          }}
          className={`px-10 py-2 rounded-t ${
            activeTab === "Full" ? "bg-border font-bold" : "text-gray-400"
          }`}
        >
          جزیئات کارمزد
        </button>
      </div>
      <AccordionComponent className={"rounded-tr-none"}>
        <SearchComponent
          onSubmit={fetchHandler}
          loading={loading}
          module={ModuleIdentifier.COMMISSION_MANAGEMENT_symbols}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.pagedData}
        module={ModuleIdentifier.COMMISSION_MANAGEMENT_symbols}
        columnDefStructure={tabItems[activeTab]}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        rowId={["id"]}
        detailCellRendererParams={detailCellRendererParams}
        masterDetail={true}
        pagination={true}
        totalCount={data?.totalCount}
        fetcher={fetchHandler}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  SymbolsCommission,
  ModuleIdentifier.COMMISSION_MANAGEMENT_symbols
);
