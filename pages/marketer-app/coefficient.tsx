import React, { createContext, useState } from "react";
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
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import MarketerContractCoefficientDetailToolbar from "components/marketer-app/marketer-contract/detail/coeff/marketer-contract-coefficient-detail-toolbar";

export const MarketerContext = createContext({});
function Coefficient() {
  const [selectedCoeff, setSelectedCoeff] = useState([]);
  const {
    data: coefficientData,
    fetchData: coefficientFetch,
    loading: coefficientLoading,
    query: coefficientSearchQuery,
  }: any = useQuery({
    url: `${MARKETER_ADMIN}/marketer-contract-coefficient/search`,
  });

  return (
    <MarketerContext.Provider
      value={{
        coefficientData: coefficientData?.result?.pagedData,
        coefficientFetch,
        coefficientSearchQuery,
      }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={coefficientFetch}
            loading={coefficientLoading}
            module={ModuleIdentifier.MARKETER_APP_relations_detail_coefficient}
          />
        </AccordionComponent>
        <MarketerContractCoefficientDetailToolbar
          selectedCoeff={selectedCoeff}
        />
        <TableComponent
          loading={coefficientLoading}
          module={ModuleIdentifier.MARKETER_APP_relations_detail_coefficient}
          data={coefficientData?.result?.pagedData}
          rowId={["Id"]}
          selectedRows={selectedCoeff}
          setSelectedRows={setSelectedCoeff}
        />
      </div>
    </MarketerContext.Provider>
  );
}

export default withPermission(
  Coefficient,
  ModuleIdentifier.MARKETER_APP_relations_detail_coefficient
);
