import { ColDef } from "ag-grid-community";
import columnModel from "./columns-model";
import { ModuleIdentifier } from "./Module-Identifier";

const Modules = Object.values(ModuleIdentifier);
export type ModulesType = (typeof Modules)[number];

interface ColDefType extends ColDef {
  colId: (typeof columnModel)[number]["colId"];
  children?: ColDefType[];
}
export type ModularColsDefType = {
  [key in ModulesType]?: ColDefType[];
};

export const modularColsDef: ModularColsDefType = {
  "book-building": [
    { colId: "checkbox" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "maxQuantity" },
    { colId: "minPrice" },
    { colId: "maxPrice" },
    { colId: "fromActiveDateTime" },
    { colId: "toActiveDateTime" },
    { colId: "createdBy" },
    { colId: "createDateTime" },
    { colId: "updatedBy" },
    { colId: "updatedDateTime" },
  ],
  "commission-management_category": [
    { colId: "id" },
    { colId: "marketCode" },
    { colId: "marketTitle" },
    { colId: "offerTypeTitle" },
    { colId: "sideCode" },
    { colId: "sideTitle" },
    { colId: "settlementDelayCode" },
    { colId: "settlementDelayTitle" },
    { colId: "customerTypeCode" },
    { colId: "customerTypeTitle" },
    { colId: "customerCounterSideCode" },
    { colId: "customerCounterSideTitle" },
  ],
  "commission-management_detail": [
    { colId: "checkbox" },
    {
      colId: "brokerCommission",
      children: [
        { colId: "brokerCommissionCoeff" },
        { colId: "minBrokerCommissionValue" },
        { colId: "maxBrokerCommissionValue" },
      ],
    },
    {
      colId: "brokerCmdCommission",
      children: [
        { colId: "brokerCmdFundCoeff" },
        { colId: "maxBrokerCmdFundValue" },
      ],
    },
    {
      colId: "seoControlCommission",
      children: [
        { colId: "seoControlCommissionCoeff" },
        { colId: "maxSeoControlCommissionValue" },
      ],
    },
    {
      colId: "csdCommission",
      children: [
        { colId: "csdCommissionCoeff" },
        { colId: "maxCsdCommissionValue" },
      ],
    },
    {
      colId: "tmcCommission",
      children: [
        { colId: "tmcCommissionCoeff" },
        { colId: "maxTmcCommissionValue" },
      ],
    },
    {
      colId: "bourseCommission",
      children: [
        { colId: "bourseCommissionCoeff" },
        { colId: "maxBourseCommissionValue" },
      ],
    },
    {
      colId: "rayanCommission",
      children: [
        { colId: "rayanCommissionCoeff" },
        { colId: "maxRayanCommissionValue" },
      ],
    },
    {
      colId: "accessCommission",
      children: [
        { colId: "accessCommissionCoeff" },
        { colId: "totalCommissionCoeff" },
        { colId: "maxAccessCommissionValue" },
      ],
    },
    {
      colId: "taxCommission",
      children: [{ colId: "addedValueTax" }, { colId: "maxTaxValue" }],
    },
    { colId: "taxCoeff" },
    { colId: "charge" },
    { colId: "netTradeValueCoeff" },
    { colId: "beginningEffectingDate" },
    { colId: "endEffectingDate" },
    { colId: "deleted" },
    { colId: "lastUpdaterUserId" },
    { colId: "lastUpdateDateTime" },
  ],
  "commission-management_instrument_result": [
    { colId: "id" },
    { colId: "bourseCode", sort: "desc" },
    { colId: "bourseTitle" },
    { colId: "instrumentTypeCode" },
    { colId: "instrumentTypeTitle" },
    { colId: "sectorCode" },
    { colId: "sectorTitle" },
    { colId: "subSectorCode" },
    { colId: "subSectorTitle" },
    { colId: "inventoryStatus" },
    { colId: "instrumentTypeDescription" },
  ],
  "commission-management_instrument": [
    { colId: "checkbox" },
    { colId: "id" },
    { colId: "bourseTitle" },
    { colId: "instrumentTypeCode" },
    { colId: "instrumentTypeTitle" },
    { colId: "sectorCode" },
    { colId: "sectorTitle" },
    { colId: "subSectorCode" },
    { colId: "subSectorTitle" },
    { colId: "deleted" },
    { colId: "instrumentTypeDescription" },
  ],
  "commission-management_abstract_symbols": [
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "offerTypeCode" },
    { colId: "sideCode" },
    { colId: "customerTypeCode" },
    { colId: "customerCounterSideCode" },
    { colId: "totalCommissionCoeff" },
    { colId: "netTradeCoeff" },
    { colId: "breakEvenPriceCoeff" },
    { colId: "beginningEffectingDate" },
    { colId: "endEffectingDate" },
    { colId: "valid" },
    { colId: "deleted" },
  ],
  "commission-management_full_symbols": [
    { colId: "instrumentId", cellRenderer: "agGroupCellRenderer" },
    { colId: "faInsCode" },
    { colId: "offerTypeCode" },
    { colId: "sideCode" },
    { colId: "settlementDelayCode" },
    { colId: "customerTypeCode" },
    { colId: "customerCounterSideCode" },
    { colId: "netBrokerCommissionCoeff" },
    { colId: "totalCommissionCoeff" },
    { colId: "netTradeCoeff" },
    { colId: "breakEvenPriceCoeff" },
    { colId: "beginningEffectingDate" },
    { colId: "endEffectingDate" },
    { colId: "valid" },
    { colId: "deleted" },
  ],
  "commission-management_full_symbols_detail": [
    { colId: "category" },
    { colId: "broker" },
    { colId: "access" },
    { colId: "brokerCmdFund" },
    { colId: "bourse" },
    { colId: "seoControl" },
    { colId: "csd" },
    { colId: "tmc" },
    { colId: "rayan" },
    { colId: "tax", cellStyle: { direction: "ltr" } },
    { colId: "addedValue" },
    { colId: "charge" },
    { colId: "inventory" },
    { colId: "inventoryAddedValueTax" },
  ],
  "csdi-portfo_asset_switch_report": [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "customerTitle" },
    { colId: "bourseCode" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "customerType" },
    { colId: "shareChange" },
    { colId: "shareCount" },
    { colId: "changeType" },
    { colId: "effectiveDate" },
  ],
  "csdi-portfo_freezed_asset": [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "customerTitle" },
    { colId: "bourseCode" },
    { colId: "personType" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "isFreezed" },
    { colId: "effectiveDate" },
  ],
  "csdi-portfo": [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "customerTitle" },
    { colId: "bourseCode" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "customerType" },
    { colId: "shareCount" },
    { colId: "lastPrice", hide: true },
    { colId: "closingPrice" },
    { colId: "netValueByClosingPrice" },
    { colId: "netValueByLastPrice", hide: true },
    { colId: "shareChange" },
    { colId: "changeType" },
    { colId: "isFreezed" },
    { colId: "effectiveDate" },
  ],
  "csdi-portfo_comparison": [
    { colId: "faInsCode" },
    {
      colId: "first-date",
      children: [
        { colId: "firstshareCount" },
        { colId: "firstlastPrice" },
        { colId: "firstclosingPrice", hide: true },
        { colId: "firstnetValuebyClosingPrice", hide: true, aggFunc: "sum" },
        { colId: "firstnetValuebyLastPrice", aggFunc: "sum" },
        { colId: "firstClosingPricePercentage", hide: true },
        { colId: "firstLastPricePercentage" },
        { colId: "firstClosingPricePercentage" },
      ],
    },
    {
      colId: "second-date",
      children: [
        { colId: "secondshareCount" },
        { colId: "secondlastPrice" },
        { colId: "secondclosingPrice", hide: true },
        { colId: "secondnetValuebyClosingPrice", hide: true, aggFunc: "sum" },
        { colId: "secondnetValuebyLastPrice", aggFunc: "sum" },
        { colId: "secondClosingPricePercentage", hide: true },
        { colId: "secondLastPricePercentage" },
        { colId: "secondClosingPricePercentage" },
      ],
    },
  ],
  "csdi-portfo_switch_report": [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "customerTitle" },
    { colId: "bourseCode" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "customerType" },
    { colId: "shareChange" },
    { colId: "shareCount" },
    { colId: "changeType" },
    { colId: "effectiveDate" },
  ],
  "market-rules-management": [
    { colId: "checkbox" },
    { colId: "id", cellRenderer: "agGroupCellRenderer" },
    { colId: "name", headerName: "نام قانون" },
    { colId: "errorMessage" },
    { colId: "sequenceNumber" },
    { colId: "createDateTime" },
    { colId: "createBy" },
    { colId: "updatedDateTime" },
    { colId: "updatedBy" },
    { colId: "userIP" },
  ],
  "marketer-app_marketers": [
    { colId: "checkbox" },
    { colId: "UniqueId" },
    { colId: "Title" },
    { colId: "TypeTitle" },
    { colId: "Mobile" },
    { colId: "SubsidiaryTitle" },
    { colId: "BranchTitle" },
    { colId: "ReagentRefLink" },
    { colId: "MarketerRefLink" },
    { colId: "IsActive" },
  ],
  "marketer-app_reconcilation": [
    { colId: "MarketerFirstName", cellRenderer: "agGroupCellRenderer" },
    { colId: "MarketerLastNAme" },
    { colId: "TradeSide" },
    { colId: "TradeCount" },
    { colId: "TradeDate" },
  ],
  "marketer-app_reconcilation_detail": [
    { colId: "FollowerMarketerID" },
    { colId: "CommissionCoefficient" },
    { colId: "StartDate" },
    { colId: "EndDate" },
    { colId: "GCreateDate" },
    { colId: "GUpdateDate" },
  ],
  "marketer-app_relations": [
    { colId: "checkbox" },
    { colId: "LeaderMarketerID", cellRenderer: "agGroupCellRenderer" },
    { colId: "FollowerMarketerName" },
    { colId: "LeaderMarketerName" },
  ],
  "marketer-app_relations_detail": [
    { colId: "FollowerMarketerID" },
    { colId: "CommissionCoefficient" },
    { colId: "StartDate" },
    { colId: "EndDate" },
    { colId: "CreateDate" },
    { colId: "UpdateDate" },
  ],
  "marketer-app_subusers": [
    { colId: "FirstName" },
    { colId: "LastName" },
    { colId: "FirmTitle" },
    { colId: "TotalPureVolume" },
    { colId: "TotalFee" },
    { colId: "Mobile" },
    { colId: "BankAccountNumber" },
    { colId: "Email" },
    { colId: "RegisterDate" },
  ],
  "marketer-app_marketerContract": [
    { colId: "checkbox" },
    { colId: "ContractID" },
    { colId: "MarketerID" },
    { colId: "Title" },
    { colId: "CalculationBaseType" },
    { colId: "CoefficientBaseType" },
    { colId: "ContractType" },
    { colId: "Description" },
    { colId: "StartDate" },
    { colId: "EndDate" },
    { colId: "marketerContract-detail" },
  ],
  "marketer-app_marketerContract_detail_deduction": [
    { colId: "ContractID" },
    { colId: "MarketerID" },
    { colId: "Title" },
    { colId: "CollateralCoefficient" },
    { colId: "TaxCoefficient" },
    { colId: "InsuranceCoefficient" },
    { colId: "ReturnDuration" },
  ],
  "marketer-app_marketerContract_detail_coefficient": [
    { colId: "ContractID" },
    { colId: "MarketerID" },
    { colId: "Title" },
    { colId: "CoefficientPercentage" },
    { colId: "HighThreshold" },
    { colId: "LowThreshold" },
    { colId: "StepNumber" },
    { colId: "IsCmdConcluded" },
  ],
};

export const generateDynamicColumnDefs = (module: ModulesType) => {
  const dynamicColumnDefs = modularColsDef[module]?.map((col: ColDefType) => {
    const { children, ...rest } = col;
    if (children) {
      return {
        ...columnModel.find((column: any) => column.colId === col.colId),
        ...rest,
        children: children.map((childCol: ColDefType) => {
          return {
            ...columnModel.find(
              (column: any) => column.colId === childCol.colId
            ),
            ...childCol,
          };
        }),
      };
    } else {
      return {
        ...columnModel.find((column: any) => column.colId === col.colId),
        ...col,
      };
    }
  });

  return dynamicColumnDefs || [];
};
