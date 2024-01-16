import React, { createContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);
import useQuery from "../../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../../api/constants";
import { useRouter } from "next/router";
import MarketerContractDeductionDetailToolbar from "components/marketer-app/marketer-contract/detail/deduction/marketer-contract-deduction-detail-toolbar";
import MarketerContractCoefficientDetailToolbar from "components/marketer-app/marketer-contract/detail/coeff/marketer-contract-coefficient-detail-toolbar";
import { ModuleIdentifier } from "utils/Module-Identifier";

export const MarketerContractDetailContext = createContext({});
function MarketerContractDetail() {
  const [selectedDeduction, setSelectedDeduction] = useState([]);
  const [selectedCoeff, setSelectedCoeff] = useState([]);
  const router = useRouter();
  let contractId = router.query.contractId?.[0];

  const {
    data: deductionData,
    fetchData: deductionFetch,
    loading: deductionLoading,
    query: deductionSearchQuery,
  }: any = useQuery({
    url: `${MARKETER_ADMIN}/marketer-contract-deduction/search`,
  });
  const {
    data: coefficientData,
    fetchData: coefficientFetch,
    loading: coefficientLoading,
    query: coefficientSearchQuery,
  }: any = useQuery({
    url: `${MARKETER_ADMIN}/marketer-contract-coefficient/search`,
  });

  useEffect(() => {
    if (contractId) {
      deductionFetch({ contractId: router.query.contractId?.[0] });
      coefficientFetch({ contractId: router.query.contractId?.[0] });
    }
  }, [contractId]);

  return (
    <MarketerContractDetailContext.Provider
      value={{
        contractId,
        deductionFetch,
        deductionSearchQuery,
        deductionData: deductionData?.result?.pagedData,
        coefficientData: coefficientData?.result?.pagedData,
        coefficientFetch,
        coefficientSearchQuery,
      }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <MarketerContractDeductionDetailToolbar
          selectedDeduction={selectedDeduction}
        />
        <TableComponent
          loading={deductionLoading}
          data={deductionData?.result?.pagedData}
          module={ModuleIdentifier.MARKETER_APP_relations_detail_deduction}
          rowId={["ContractId"]}
          selectedRows={selectedDeduction}
          setSelectedRows={setSelectedDeduction}
        />
        <div className="mt-5" />
        <MarketerContractCoefficientDetailToolbar
          selectedCoeff={selectedCoeff}
        />
        <TableComponent
          loading={coefficientLoading}
          module={ModuleIdentifier.MARKETER_APP_relations_detail_coefficient}
          data={coefficientData?.result?.pagedData}
          rowId={["ContractId"]}
          selectedRows={selectedCoeff}
          setSelectedRows={setSelectedCoeff}
        />
      </div>
    </MarketerContractDetailContext.Provider>
  );
}

export default MarketerContractDetail;
