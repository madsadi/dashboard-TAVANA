import { ColDef } from "ag-grid-community";
import columnModel from "./columns-model";
import { ModuleIdentifier } from "./Module-Identifier";
import ToggleButton from "components/marketer-app/marketer-contract/toggle-button";
import RoleToggleButton from "components/users-management/roles/role-toggle-button";
import ToggleButtonUsers from "components/users-management/users/toggle-button";
import ToogleCustomerPAM from "components/customer-management/customer/edit-customer-PAM";
import { StatusTypeEnum } from "constants/Enums";
import StatusToggle from "components/credit/contract/status-toggle";
import columnsName from "./columns-name.json";
import Link from "next/link";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import {
  chunk,
  formatDecimals,
  formatNumber,
  formatNumberSecond,
} from "./common-funcions";
import { CopyButton } from "components/common/components/copy-button";
import ToggleButtonMarketer from "components/customer-management/toggle-button";

const Modules = Object.values(ModuleIdentifier);
export type ModulesType = (typeof Modules)[number];

interface ColDefType extends ColDef {
  type?:
    | "date"
    | "checkbox"
    | "default"
    | "enum"
    | "blank-detail-page"
    | "detail-opener";
  colId: keyof typeof columnsName;
  dataType?: "number" | "string";
  children?: ColDefType[];
}
export type ModularColsDefType = {
  [key in ModulesType]?: ColDefType[];
};

export const modularColsDef: ModularColsDefType = {
  //user-management
  "user-management_logs": [
    { colId: "userId" },
    { colId: "name" },
    { colId: "typeTitle" },
    { colId: "date" },
    { colId: "clientId" },
    { colId: "succeed" },
    { colId: "ip" },
    { colId: "userAgent" },
    { colId: "browser" },
    { colId: "os" },
    { colId: "isMobile", type: "enum" },
    { colId: "errorMessage" },
  ],
  "user-management_roles": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "id", cellRenderer: "agGroupCellRenderer" },
    { colId: "name", headerName: "نقش" },
    {
      colId: "isActive",
      cellRendererSelector: () => {
        return { component: RoleToggleButton };
      },
    },
  ],
  "user-management_roles_detail": [
    { colId: "id" },
    { colId: "serviceTitle" },
    { colId: "moduleTitle" },
    { colId: "actionTitle" },
  ],
  "user-management_users": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "username", cellRenderer: "agGroupCellRenderer" },
    { colId: "phoneNumber" },
    { colId: "firstName" },
    { colId: "lastName" },
    { colId: "nationalId" },
    {
      colId: "isActive",
      width: 100,
      flex: 0,
      cellRendererSelector: () => {
        return { component: ToggleButtonUsers };
      },
    },
    { colId: "twoFactorEnabled", type: "enum", flex: 0, width: 120 },
    { colId: "lockOutEnd", type: "date" },
  ],
  "user-management_users_detail": [
    { colId: "id" },
    { colId: "name" },
    {
      colId: "isActive",
      type: "enum",
    },
  ],

  //online-registration
  "online-registration": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "uniqueId", cellRenderer: "agGroupCellRenderer" },
    { colId: "mobileNumber" },
    { colId: "personTypeTitle" },
    { colId: "marketerRefCode" },
    { colId: "marketerTitle" },
    { colId: "marketerSubordinateTitle" },
    { colId: "reagentTitle" },
    { colId: "agentUniqueId" },
    { colId: "isSejami", type: "enum" },
    { colId: "sejamStatusCodeTitle" },
    { colId: "registrationStateCodeTitle" },
    { colId: "isTbsInserted", type: "enum" },
    { colId: "isTBSDocsInserted", type: "enum" },
    {
      colId: "online-registration-detail",
      type: "blank-detail-page",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <Link
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={{
                  pathname: `/online-registration/registration-report/detail`,
                  query: { userId: rowData?.data?.userId },
                }}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </Link>
            );
          },
        };
      },
    },
  ],
  "online-registration_detail": [
    { colId: "email" },
    { colId: "branchTitle" },
    { colId: "countryName" },
    { colId: "foreignCSDCode" },
    { colId: "personOriginTitle" },
    { colId: "riskLevelTitle" },
    { colId: "sejamToken" },
    { colId: "changeReasonDescription" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],

  //credit
  credit_bank: [
    { colId: "checkbox", type: "checkbox" },
    { colId: "bankName" },
    { colId: "branchName" },
    { colId: "branchCode" },
    { colId: "facilityAmount", dataType: "number" },
    { colId: "interestRate", dataType: "number" },
    { colId: "accountCode" },
    { colId: "shebaNumber" },
    { colId: "description" },
    { colId: "registerDate", type: "date" },
    { colId: "expireDate", type: "date" },
    { colId: "createdDate", type: "date" },
    { colId: "modifiedDate", type: "date" },
  ],
  credit_category: [
    { colId: "creditCategoryCode" },
    { colId: "creditCategoryTitle" },
    { colId: "creditCategoryEnTitle" },
    { colId: "createdDate", type: "date" },
    { colId: "modifiedDate", type: "date" },
  ],
  credit_category_assignment: [
    { colId: "checkbox", type: "checkbox" },
    { colId: "creditCategoryTitle" },
    { colId: "assignmentType", type: "enum" },
    {
      colId: "creditPercentage",
      cellStyle: { direction: "ltr" },
      dataType: "number",
      valueFormatter: (rowData: any) => {
        return "%" + " " + rowData.value.toFixed(2);
      },
    },
    { colId: "creditAmount", dataType: "number" },
    { colId: "startDate", type: "date" },
    { colId: "endDate", type: "date" },
    { colId: "createdDate", type: "date" },
  ],
  credit_contract: [
    { colId: "checkbox", type: "checkbox" },
    { colId: "creditContractCode" },
    {
      colId: "tradeCode",
      valueFormatter: (rowData: any) => {
        return `${rowData?.value}`;
      },
    },
    { colId: "guaranteeType", type: "enum" },
    {
      colId: "status",
      headerName: "وضعیت اعتبار",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => (
            <StatusToggle
              data={{
                creditContractCode: rowData?.data?.creditContractCode,
                isActive: rowData?.data?.status === "1",
                id: rowData?.data?.contractId,
              }}
            />
          ),
        };
      },
      valueFormatter: (rowData: any) => {
        return (
          StatusTypeEnum.find((item: any) => item.id === rowData?.value)
            ?.title || rowData?.value
        );
      },
    },
    { colId: "chequeAmount", dataType: "number" },
    { colId: "chequeSerial" },
    { colId: "promissoryAmount", dataType: "number" },
    { colId: "promissorySerial" },
    { colId: "comment" },
    { colId: "registerDate", type: "date" },
    { colId: "expireDate", type: "date" },
    { colId: "createdDateTime", type: "date" },
    { colId: "modifiedDateTime", type: "date" },
  ],
  credit_portfolio_status: [
    {
      colId: "tradeCode",
      cellRenderer: "agGroupCellRenderer",
      valueFormatter: (rowData: any) => {
        return `${rowData?.value}`;
      },
    },
    { colId: "customerTitle" },
    { colId: "balance", cellStyle: { direction: "ltr" }, dataType: "number" },
    {
      colId: "totalMomentaryFactorValue",
      cellStyle: { direction: "ltr" },
      dataType: "number",
    },
    {
      colId: "customerTotalCreditAmount",
      cellStyle: { direction: "ltr" },
      dataType: "number",
    },
    {
      colId: "customerBalanceT0",
      cellStyle: { direction: "ltr" },
      dataType: "number",
    },
    {
      colId: "customerBalanceT3",
      cellStyle: { direction: "ltr" },
      dataType: "number",
    },
    { colId: "customerBlock", dataType: "number" },
    { colId: "cashFlowBlock", dataType: "number" },
    { colId: "customerGroupTitle" },
    { colId: "customerMarketerTitle" },
    { colId: "customerRefererTitle" },
    { colId: "portfolioMomentaryValue", dataType: "number" },
    {
      colId: "netBalance",
      cellStyle: { direction: "ltr" },
      dataType: "number",
    },
    {
      colId: "portfolioValue",
      cellStyle: { direction: "ltr" },
      dataType: "number",
    },
    { colId: "createDate", type: "date" },
    { colId: "modifiedDate", type: "date" },
    {
      colId: "portfolioDetailPage",
      type: "blank-detail-page",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <Link
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={{
                  pathname: `/credit/portfolio-status/detail`,
                  query: {
                    tradeCode: rowData?.data?.tradeCode,
                    startDate: rowData?.data?.creditRiskStatus[0]?.createdDate,
                  },
                }}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </Link>
            );
          },
        };
      },
    },
  ],
  credit_portfolio_status_detail: [
    {
      colId: "marketInstrumentSymbol",
    },
    {
      colId: "marketInstrumentTitle",
    },
    { colId: "momentaryFactorValue", aggFunc: "sum", dataType: "number" },
    { colId: "percentage", aggFunc: "sum", dataType: "number" },
  ],
  credit_portfolio_status_detail_page: [
    { colId: "creditRiskStatus", cellRenderer: "agGroupCellRenderer", flex: 1 },
    { colId: "createdDate", type: "date", flex: 1 },
  ],
  credit_turnover_portfolio: [
    {
      colId: "tradeCode",
      valueFormatter: (rowData: any) => {
        return `${rowData?.value}`;
      },
    },
    { colId: "period", type: "enum" },
    {
      colId: "totalNetTradeValue",
      valueGetter: "data.turnover.totalNetTradeValue",
      dataType: "number",
    },
    {
      colId: "dailyAverageNetTradeValue",
      valueGetter: "data.turnover.dailyAverageNetTradeValue",
      dataType: "number",
    },
    {
      colId: "weeklyAverageNetTradeValue",
      valueGetter: "data.turnover.weeklyAverageNetTradeValue",
      dataType: "number",
    },
    {
      colId: "monthlyAverageNetTradeValue",
      valueGetter: "data.turnover.monthlyAverageNetTradeValue",
      dataType: "number",
    },
    { colId: "totalMomentaryFactorValue", dataType: "number" },
    { colId: "lastMomentaryFactorValue", dataType: "number" },
    { colId: "diffMonthPortfolio", dataType: "number" },
    { colId: "startDate", field: "tradeCrawlStartDate", type: "date" },
  ],
  credit_customer_request: [
    { colId: "checkbox", type: "checkbox" },
    {
      colId: "tradeCode",
      cellRenderer: "agGroupCellRenderer",
      valueFormatter: (rowData: any) => {
        return `${rowData?.value}`;
      },
    },
    { colId: "creditRequestAmount", dataType: "number" },
    { colId: "clubRequestId" },
    { colId: "creditDuration" },
    { colId: "requestStatus", type: "enum" },
    { colId: "assignmentAmount", dataType: "number" },
    { colId: "assignmentDuration" },
    { colId: "comment" },
    {
      colId: "startDate",
      headerName: "تاریخ اختصاص اعتبار",
      field: "assignmentDate",
      type: "date",
    },
    {
      colId: "expirationDate",
      headerName: "تاریخ انقضای اعتبار",
      type: "date",
    },
    { colId: "createdDate", type: "date" },
    { colId: "modifiedDate", type: "date" },
  ],
  credit_broker: [
    { colId: "creditCategoryTitle" },
    { colId: "creditCategoryAmount", dataType: "number" },
    { colId: "creditCategoryFreeAmount", dataType: "number" },
    { colId: "creditCategoryUsedAmount", dataType: "number" },
    { colId: "creditCategoryRequestedAmount", dataType: "number" },
    { colId: "creditCategoryActivatedAmount", dataType: "number" },
  ],
  credit_customer_kpi: [
    {
      colId: "tradeCode",
      valueFormatter: (rowData: any) => {
        return `${rowData?.value}`;
      },
    },
    { colId: "totalCommission", dataType: "number" },
    { colId: "totalAssignedCredits", dataType: "number" },
    {
      colId: "kPIValue",
      valueFormatter: (rowData: any) => {
        const { value } = rowData;
        if (value) {
          const digit = `${value}`.split(".");
          if (digit?.[1]?.length > 2) {
            return formatNumberSecond(+digit[0]) + "." + digit[1]?.slice(0, 2);
          } else {
            return formatNumberSecond(+digit[0]) + "." + (digit[1] || "0");
          }
        } else {
          return value;
        }
      },
      dataType: "number",
    },
    { colId: "startDate", type: "date" },
    { colId: "endDate", type: "date" },
  ],

  //customer-management
  "customer-management_customer": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "detail-opener", type: "detail-opener" },
    { colId: "uniqueId" },
    { colId: "title" },
    { colId: "personTypeTitle" },
    { colId: "personOriginTitle" },
    { colId: "countryName" },
    { colId: "foreignCSDCode" },
    { colId: "branchTitle" },
    { colId: "regentTitle" },
    { colId: "marketerTitle" },
    { colId: "marketerSubordinateTitle" },
    { colId: "isActive", type: "enum" },
    { colId: "isDeleted", type: "enum" },
    { colId: "createDateTime", type: "date" },
    {
      colId: "customer-detail",
      type: "blank-detail-page",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <Link
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={{
                  pathname: `/customer-management/customer/detail`,
                  query: { id: rowData?.data?.id },
                }}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </Link>
            );
          },
        };
      },
    },
  ],
  "customer-management_customer_detail": [
    { colId: "genderTitle" },
    { colId: "isProfessional", type: "enum" },
    {
      colId: "isPAM",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => (
            <ToogleCustomerPAM
              data={{
                isActive: rowData?.data?.isPAMTrader,
                id: rowData?.data?.id,
              }}
            />
          ),
        };
      },
    },
    { colId: "sejamStatusTitle" },
    { colId: "isDeceased", type: "enum" },
    { colId: "isDissolved", type: "enum" },
    { colId: "adminNote" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_private_person": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "uniqueId" },
    { colId: "firstName" },
    { colId: "lastName" },
    { colId: "fatherName" },
    { colId: "genderTitle" },
    { colId: "seriShChar" },
    { colId: "seriSh" },
    { colId: "shSerial" },
    { colId: "shNumber" },
    { colId: "birthDate" },
    { colId: "birthPlace" },
    { colId: "issuePlace" },
    { colId: "isDeceased", type: "enum" },
    { colId: "deceasedDate", type: "date" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_legal_person": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "uniqueId", headerName: "شناسه ملی" },
    { colId: "companyName" },
    { colId: "registerNumber" },
    { colId: "registerPlace" },
    { colId: "registerDate", type: "date" },
    { colId: "evidenceReleaseCompany" },
    { colId: "evidenceReleaseDate", type: "date" },
    { colId: "economicCode" },
    { colId: "evidenceExpirationDate", type: "date" },
    { colId: "legalPersonTypeCategoryTitle" },
    { colId: "legalPersonTypeSubCategoryTitle" },
    { colId: "isDissolved", type: "enum" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_private_portfolio": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "privatePortfolioTitle" },
    { colId: "bourseCode" },
    { colId: "relatedCustomerTitle" },
    { colId: "relatedCustomerUniqueId" },
    { colId: "assetManagerTitle" },
    { colId: "assetManagerUniqueId" },
    { colId: "managementTypeTitle" },
    { colId: "managementStartDate", type: "date" },
    { colId: "managementEndDate", type: "date" },
    { colId: "isExpired", type: "enum" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_bank_account": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "customerTitle" },
    { colId: "customerUniqueId" },
    { colId: "customerPhoneNumber" },
    { colId: "sheba" },
    { colId: "accountNumber" },
    { colId: "typeTitle" },
    { colId: "bankTitle" },
    { colId: "branchCode" },
    { colId: "branchTitle" },
    { colId: "cityTitle" },
    { colId: "isDefault", type: "enum" },
    { colId: "isFromSejam", type: "enum" },
    { colId: "isConfirmed", type: "enum" },
    { colId: "description" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_agent": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "uniqueId" },
    { colId: "firstName" },
    { colId: "lastName" },
    { colId: "description" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_businessUnit": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "title", headerName: "عنوان واحد کاری" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
    {
      colId: "customer-detail",
      type: "blank-detail-page",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <Link
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={{
                  pathname: `/customer-management/business-unit/detail`,
                  query: { id: rowData?.data?.id },
                }}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </Link>
            );
          },
        };
      },
    },
  ],
  "customer-management_businessUnit_owner_detail": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "entityTitle" },
    { colId: "partyTitle" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_businessUnit_related_detail": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "entityTitle", headerName: "ماهیت دسترسی" },
    { colId: "partyTitle", headerName: " دسترسی" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_businessUnit_detail": [
    { colId: "title", cellRenderer: "agGroupCellRenderer" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_subsidiary": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "id" },
    { colId: "onlineRegistrationProfileId" },
    { colId: "title", headerName: "عنوان شرکت" },
    { colId: "subsidiaryTypeTitle" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_branch": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "id", cellRenderer: "agGroupCellRenderer" },
    { colId: "subsidiaryTitle" },
    { colId: "subsidiaryId" },
    { colId: "code", headerName: "کد شعبه" },
    { colId: "type", headerName: "نوع شعبه", type: "enum" },
    { colId: "title", headerName: "عنوان شعبه" },
    { colId: "isDeleted", type: "enum" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_employee": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "firstName" },
    { colId: "lastName" },
    { colId: "nationalId" },
    { colId: "mobile" },
    { colId: "workPhone" },
    { colId: "email" },
    { colId: "idpAccountId" },
    { colId: "branchId" },
    { colId: "email" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_station": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "brokerCode" },
    { colId: "brokerTitle" },
    { colId: "code", headerName: "کد ایستگاه معاملاتی" },
    { colId: "title", headerName: "عنوان ایستگاه معاملاتی" },
    { colId: "type", headerName: "نوع ایستگاه معاملاتی", type: "enum" },
    { colId: "branchId" },
    { colId: "branchTitle" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_trader": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "stationId" },
    { colId: "employeeId" },
    { colId: "title", headerName: "عنوان معامله گر" },
    { colId: "isActive", type: "enum" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_marketer": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "detail-opener" },
    { colId: "uniqueId" },
    { colId: "title", headerName: "بازاریاب" },
    { colId: "typeTitle" },
    { colId: "mobile" },
    { colId: "branchTitle" },
    { colId: "subsidiaryTitle" },
    { colId: "tbsReagentName" },
    {
      colId: "reagentRefLink",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => (
            <CopyButton
              condition={rowData?.data?.reagentRefCode}
              id={rowData?.data?.id}
              entity={"reagentUrl"}
            />
          ),
        };
      },
    },
    { colId: "tbsMarketerName" },
    {
      colId: "marketerRefLink",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => (
            <CopyButton
              condition={rowData?.data?.marketerRefCode}
              id={rowData?.data?.id}
              entity={"marketerUrl"}
            />
          ),
        };
      },
    },
    {
      colId: "isActive",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => (
            <ToggleButtonMarketer
              data={{ isActive: rowData.data.isActive, id: rowData.data.id }}
            />
          ),
        };
      },
    },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_agreement": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "subsidiaryId" },
    { colId: "bourseCodeType" },
    { colId: "name" },
    { colId: "description" },
    { colId: "context" },
    { colId: "defaultFileId" },
    { colId: "isBourseCodeRequired" },
    { colId: "isRequired", type: "enum" },
    {
      colId: "isActive",
      type: "enum",
    },
    { colId: "isDeleted" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],

  "customer-management_agent_relation": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "customerUniqueId" },
    { colId: "customerTitle" },
    { colId: "agentUniqueId" },
    { colId: "agentTitle" },
    { colId: "agentTypeTitle" },
    { colId: "isConfirmed", type: "enum" },
    { colId: "startDate", type: "date" },
    { colId: "expirationDate", type: "date" },
    { colId: "description" },
    { colId: "createDateTime", type: "date" },
  ],
  "customer-management_branch_history": [
    { colId: "customerTitle" },
    { colId: "customerUniqueId" },
    { colId: "branchTitle" },
    { colId: "branchTypeTitle" },
    { colId: "tbsBranchId" },
    { colId: "tbsBranchTitle" },
    { colId: "subsidiaryTitle" },
    { colId: "changeDateTime", type: "date" },
  ],
  "customer-management_marketer_history": [
    { colId: "customerTitle" },
    { colId: "customerUniqueId" },
    { colId: "marketerTypeTitle" },
    { colId: "marketerTitle" },
    { colId: "tbsMarketerId" },
    { colId: "tbsMarketerTitle" },
    { colId: "changeDateTime", type: "date" },
  ],
  "customer-management_agreements_management": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "code" },
    { colId: "name" },
    { colId: "subsidiaryTitle" },
    { colId: "personNationalityTitle" },
    { colId: "personTypeTitle" },
    { colId: "applicationTitle" },
    { colId: "description" },
    { colId: "context" },
    { colId: "isBourseCodeRequired", type: "enum" },
    { colId: "bourseCodeTypeTitle" },
    { colId: "isRequired", type: "enum" },
    { colId: "isActive", type: "enum" },
    { colId: "isDeleted", type: "enum" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_customerAgreement": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "customerTitle" },
    { colId: "customerUniqueId" },
    { colId: "agreementName" },
    { colId: "agreementCode" },
    { colId: "subsidiaryTitle" },
    { colId: "personNationalityTitle" },
    { colId: "personTypeTitle" },
    { colId: "applicationTitle" },
    { colId: "bourseCodeTypeTitle" },
    { colId: "isBourseCodeRequired", type: "enum" },
    { colId: "isRequired", type: "enum" },
    { colId: "isActive", type: "enum" },
    {
      colId: "isDeleted",
      type: "enum",
    },
    { colId: "description" },
    { colId: "stateTitle" },
    { colId: "customerStateDateTime", type: "date" },
    { colId: "adminStateDateTime", type: "date" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_bourse_code": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "customerTitle" },
    { colId: "customerUniqueId" },
    { colId: "typeTitle" },
    { colId: "bourseCode" },
    { colId: "tradingCode" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_accouting_code": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "customerTitle" },
    { colId: "customerUniqueId" },
    { colId: "personTypeTitle" },
    { colId: "bourseCodeTypeTitle" },
    { colId: "accountTypeTitle" },
    { colId: "accountingCode" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_legal_person_shareholders": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "customerTitle" },
    { colId: "customerUniqueId" },
    { colId: "firstName" },
    { colId: "lastName" },
    { colId: "uniqueId", headerName: "کدملی سهامدار" },
    { colId: "postalCode" },
    { colId: "address" },
    { colId: "positionTypeTitle" },
    { colId: "percentageVotingRight" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "customer-management_legal_person_stakeholders": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "customerTitle" },
    { colId: "customerUniqueId" },
    { colId: "uniqueId", headerName: "کدملی ذینفع" },
    { colId: "firstName" },
    { colId: "lastName" },
    { colId: "typeTitle" },
    { colId: "positionTypeTitle" },
    { colId: "positionStartDate", type: "date" },
    { colId: "positionEndDate", type: "date" },
    { colId: "hasSignatureRight", type: "enum" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],

  //online
  "online-orders": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "customerTitle", cellRenderer: "agGroupCellRenderer" },
    { colId: "faInsCode" },
    { colId: "orderSideTitle" },
    { colId: "price", dataType: "number" },
    { colId: "quantity", dataType: "number" },
    { colId: "exequtedQuantity", dataType: "number" },
    { colId: "remainingQuantity", dataType: "number" },
    { colId: "orderStatusTitle" },
    { colId: "orderTypeTitle" },
    { colId: "validityTypeTitle" },
    { colId: "userRequestDateTime", type: "date" },
    { colId: "receiveResponseFromCapServerDateTime", type: "date" },
  ],
  "online-trades": [
    { colId: "customerTitle", cellRenderer: "agGroupCellRenderer" },
    { colId: "userTitle" },
    { colId: "traderId" },
    { colId: "faInsCode" },
    { colId: "isCanceled" },
    { colId: "orderSideTitle" },
    { colId: "tradePrice", dataType: "number" },
    { colId: "tradeQuantity", dataType: "number" },
    { colId: "tradeDate", type: "date" },
    {
      colId: "tradeTime",
      valueFormatter: (rowData: any) => {
        return chunk(rowData?.data?.tradeTime, 2).join(":");
      },
    },
    { colId: "applicationSourceName" },
  ],
  "online-trades_detail": [
    { colId: "userId" },
    { colId: "customerNationalId" },
    { colId: "customerId" },
    { colId: "tradeId" },
    { colId: "instrumentId" },
    { colId: "orderId" },
  ],

  "online-cancel": [
    { colId: "detail-opener", type: "detail-opener" },
    { colId: "instrumentId" },
    { colId: "instrumentGroupIdentification" },
    { colId: "faInsCode" },
    { colId: "orderSideTitle" },
    { colId: "idOfTheBrokersOrderEntryServer" },
    { colId: "orderOriginTitle" },
    { colId: "orderTechnicalOriginTitle" },
    { colId: "userRequestDateTime", type: "date" },
    { colId: "errorText" },
  ],
  "online-cancel_detail": [
    { colId: "id" },
    { colId: "idOfBrokerIssuingTheOrder" },
    { colId: "userId" },
    { colId: "userIP" },
    { colId: "sourceOfRequestTitle" },
    { colId: "tradingDateTime", type: "date" },
    { colId: "errorCode" },
  ],

  //marketer
  "marketer-app_marketers": [
    { colId: "UniqueId", headerName: "کد ملی بازاریاب" },
    { colId: "Title", headerName: "عنوان بازاریاب" },
    { colId: "TbsReagentName" },
    { colId: "TypeTitle" },
    { colId: "Mobile" },
    { colId: "SubsidiaryTitle" },
    { colId: "BranchTitle" },
    { colId: "ReagentRefLink" },
    { colId: "MarketerRefLink" },
    {
      colId: "IsActive",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => (
            <ToggleButton
              data={{
                isActive: rowData?.data?.IsActive,
                id: rowData?.data?.id,
              }}
            />
          ),
        };
      },
    },
  ],
  "marketer-app_reconcilation": [
    { colId: "MarketerFirstName", cellRenderer: "agGroupCellRenderer" },
    { colId: "MarketerLastNAme" },
    { colId: "TradeSide" },
    { colId: "TradeCount" },
    { colId: "TradeDate", type: "date" },
  ],
  "marketer-app_reconcilation_detail": [
    { colId: "FollowerMarketerId" },
    { colId: "CommissionCoefficient" },
    { colId: "StartDate", type: "date" },
    { colId: "EndDate", type: "date" },
    { colId: "GCreateDate", type: "date" },
    { colId: "GUpdateDate", type: "date" },
  ],
  "marketer-app_relations": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "LeaderMarketerId", cellRenderer: "agGroupCellRenderer" },
    { colId: "FollowerMarketerName" },
    { colId: "LeaderMarketerName" },
  ],
  "marketer-app_relations_detail": [
    { colId: "FollowerMarketerId" },
    { colId: "CommissionCoefficient" },
    { colId: "StartDate", type: "date" },
    { colId: "EndDate", type: "date" },
    { colId: "CreateDate", type: "date" },
    { colId: "UpdateDate", type: "date" },
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
    { colId: "RegisterDate", type: "date" },
  ],
  "marketer-app_marketerContract": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "ContractId" },
    { colId: "MarketerId" },
    { colId: "Title", headerName: "عنوان بازاریاب" },
    { colId: "CalculationBaseType" },
    { colId: "CoefficientBaseType" },
    { colId: "ContractType" },
    { colId: "Description" },
    { colId: "StartDate", type: "date" },
    { colId: "EndDate", type: "date" },
    {
      colId: "marketerContract-detail",
      type: "blank-detail-page",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <a
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={`/marketer-app/marketer-contract/${rowData?.data?.ContractId}`}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </a>
            );
          },
        };
      },
    },
  ],
  "marketer-app_recite": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "Title" },
    { colId: "Period", type: "enum" },
    { colId: "Plan" },
    {
      colId: "status",
      field: "Status",
      headerName: "وضعیت فاکتور",
      type: "enum",
    },
    {
      colId: "marketer-recite-detail",
      type: "blank-detail-page",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <Link
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={{
                  pathname: `/marketer-app/recite/detail`,
                  query: { FactorID: rowData.data?.FactorId },
                }}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </Link>
            );
          },
        };
      },
    },
  ],
  "marketer-app_marketerContract_detail_deduction": [
    { colId: "ContractId" },
    { colId: "MarketerId" },
    { colId: "Title", headerName: "عنوان بازاریاب" },
    { colId: "CollateralCoefficient" },
    { colId: "TaxCoefficient" },
    { colId: "InsuranceCoefficient" },
    { colId: "ReturnDuration" },
  ],
  "marketer-app_marketerContract_detail_coefficient": [
    { colId: "ContractId" },
    { colId: "MarketerId" },
    { colId: "Title", headerName: "عنوان بازاریاب" },
    { colId: "CoefficientPercentage" },
    { colId: "HighThreshold" },
    { colId: "LowThreshold" },
    { colId: "StepNumber" },
    { colId: "IsCmdConcluded", type: "enum" },
  ],

  //portfo
  intraday: [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "bourseCode" },
    { colId: "customerTitle" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "currentShareCount", dataType: "number" },
    { colId: "openBuyOrder", dataType: "number" },
    { colId: "openSellOrder", dataType: "number" },
    { colId: "intradayBuy", dataType: "number" },
    { colId: "intradaySell", dataType: "number" },
    { colId: "sellableShareCount", dataType: "number" },
    { colId: "remainAssetCount", dataType: "number" },
    { colId: "effectiveDate", type: "date" },
    {
      colId: "intraday-detail",
      type: "blank-detail-page",
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <Link
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={{
                  pathname: `/portfo/intraday/detail`,
                  query: {
                    customerId: rowData?.data?.customerId,
                    instrumentId: rowData?.data?.instrumentId,
                    effectiveDate: rowData?.data?.effectiveDate,
                  },
                }}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </Link>
            );
          },
        };
      },
    },
  ],
  portfo_detail: [
    { colId: "id" },
    { colId: "transactionId" },
    { colId: "transactionTitle" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "currentShareCount", dataType: "number" },
    { colId: "sellableShareCount", dataType: "number" },
    { colId: "changeQuantity", dataType: "number" },
    { colId: "openBuyOrder", dataType: "number" },
    { colId: "openSellOrder", dataType: "number" },
    { colId: "intradayBuy", dataType: "number" },
    { colId: "intradaySell", dataType: "number" },
    { colId: "remainAssetCount", dataType: "number" },
    { colId: "transactionDateTime", type: "date" },
    { colId: "effectiveDate", type: "date" },
  ],
  "portfo-asset_switch_request": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "tradingCode" },
    { colId: "uniqueId", cellRenderer: "agGroupCellRenderer" },
    { colId: "title" },
    { colId: "bourseCode" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "status", headerName: "وضعیت تغییر کارگزاری", type: "enum" },
    { colId: "description" },
    { colId: "username" },
    { colId: "createDateTime", type: "date" },
    { colId: "updateDateTime", type: "date" },
  ],
  "portfo-asset_switch_request_detail": [
    { colId: "userFirstName" },
    { colId: "userLastName" },
    { colId: "userUniqueId" },
  ],
  "portfo-customer_to_broker": [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "bourseCode" },
    { colId: "customerTitle" },
    { colId: "portfolioValueByClosingPrice", dataType: "number" },
    { colId: "portfolioValueByLastPrice", hide: true, dataType: "number" },
    { colId: "portfolioWeightByClosingPrice", dataType: "number" },
    { colId: "portfolioWeightByLastPrice", hide: true, dataType: "number" },
  ],

  //csdi
  "csdi-portfo_asset_switch_report": [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "customerTitle" },
    { colId: "bourseCode" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "customerType", type: "enum" },
    { colId: "shareChange", dataType: "number" },
    { colId: "shareCount", dataType: "number" },
    {
      colId: "changeType",
      type: "enum",
      cellClassRules: {
        // out of range style
        "text-emerald-500": (rowData: any) =>
          rowData?.data?.changeType === 3 || rowData.data?.changeType === 1,
        "text-red-500": (rowData: any) =>
          rowData?.data?.changeType === 4 || rowData.data?.changeType === 2,
      },
    },
    { colId: "effectiveDate", type: "date" },
  ],
  "csdi-portfo_freezed_asset": [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "customerTitle" },
    { colId: "bourseCode" },
    {
      colId: "personTypeSecondVersionEnums",
      field: "personType",
      type: "enum",
    },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "isFreezed", type: "enum" },
    { colId: "effectiveDate", type: "date" },
  ],
  "csdi-portfo": [
    { colId: "tradingCode" },
    { colId: "nationalId" },
    { colId: "customerTitle" },
    { colId: "bourseCode" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "customerType", type: "enum" },
    { colId: "shareCount", dataType: "number" },
    { colId: "lastPrice", hide: true, dataType: "number" },
    { colId: "closingPrice", dataType: "number" },
    { colId: "netValueByClosingPrice", dataType: "number" },
    { colId: "netValueByLastPrice", hide: true, dataType: "number" },
    { colId: "shareChange", dataType: "number" },
    {
      colId: "changeType",
      type: "enum",
      cellClassRules: {
        // out of range style
        "text-emerald-500": (rowData: any) =>
          rowData?.data?.changeType === 3 || rowData.data?.changeType === 1,
        "text-red-500": (rowData: any) =>
          rowData?.data?.changeType === 4 || rowData.data?.changeType === 2,
      },
    },
    { colId: "isFreezed", type: "enum" },
    { colId: "effectiveDate", type: "date" },
  ],
  "csdi-portfo_comparison": [
    { colId: "faInsCode" },
    {
      colId: "first-date",
      children: [
        { colId: "firstshareCount", dataType: "number" },
        { colId: "firstlastPrice", dataType: "number" },
        { colId: "firstclosingPrice", hide: true, dataType: "number" },
        {
          colId: "firstnetValuebyClosingPrice",
          hide: true,
          aggFunc: "sum",
          dataType: "number",
        },
        {
          colId: "firstnetValuebyLastPrice",
          aggFunc: "sum",
          dataType: "number",
        },
        {
          colId: "firstClosingPricePercentage",
          hide: true,
          dataType: "number",
        },
        { colId: "firstLastPricePercentage", dataType: "number" },
      ],
    },
    {
      colId: "second-date",
      children: [
        { colId: "secondshareCount", dataType: "number" },
        { colId: "secondlastPrice", dataType: "number" },
        { colId: "secondclosingPrice", hide: true, dataType: "number" },
        {
          colId: "secondnetValuebyClosingPrice",
          hide: true,
          aggFunc: "sum",
          dataType: "number",
        },
        {
          colId: "secondnetValuebyLastPrice",
          aggFunc: "sum",
          dataType: "number",
        },
        {
          colId: "secondClosingPricePercentage",
          hide: true,
          dataType: "number",
        },
        { colId: "secondLastPricePercentage", dataType: "number" },
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
    { colId: "customerType", type: "enum" },
    { colId: "shareChange", dataType: "number" },
    { colId: "shareCount", dataType: "number" },
    {
      colId: "changeType",
      type: "enum",
      cellClassRules: {
        // out of range style
        "text-emerald-500": (rowData: any) =>
          rowData?.data?.changeType === 3 || rowData.data?.changeType === 1,
        "text-red-500": (rowData: any) =>
          rowData?.data?.changeType === 4 || rowData.data?.changeType === 2,
      },
    },
    { colId: "effectiveDate", type: "date" },
  ],

  //oms
  "oms-timetable": [
    { colId: "instrumentGroupId" },
    { colId: "tradingSessionDate", type: "date" },
    { colId: "tradingDayInsGroupTitle" },
    { colId: "eventTriggerTime", type: "date" },
    { colId: "afterOpeningInsGroupTitle" },
    { colId: "eventDate", type: "date" },
    { colId: "dateReceived", type: "date" },
  ],
  "oms-session": [
    { colId: "sessionStatusCode" },
    { colId: "sessionStatusTitle" },
    { colId: "startDate", type: "date" },
    { colId: "endDate", type: "date" },
  ],

  //market-rules
  "market-rules-management": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "id", cellRenderer: "agGroupCellRenderer" },
    { colId: "name", headerName: "نام قانون" },
    { colId: "errorMessage" },
    { colId: "sequenceNumber" },
    { colId: "createDateTime", type: "date" },
    { colId: "createBy" },
    { colId: "updatedDateTime", type: "date" },
    { colId: "updatedBy" },
    { colId: "userIP" },
  ],

  //book-building
  "book-building": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "faInsName" },
    { colId: "maxQuantity" },
    { colId: "minPrice" },
    { colId: "maxPrice" },
    { colId: "fromActiveDateTime", type: "date" },
    { colId: "toActiveDateTime", type: "date" },
    { colId: "createdBy" },
    { colId: "createDateTime", type: "date" },
    { colId: "updatedBy" },
    { colId: "updatedDateTime", type: "date" },
  ],

  //commmission
  "commission-management_category": [
    { colId: "id" },
    { colId: "marketCode" },
    { colId: "marketTitle" },
    { colId: "offerTypeTitle" },
    { colId: "sideCode", type: "enum" },
    { colId: "sideTitle" },
    { colId: "settlementDelayCode", type: "enum" },
    { colId: "settlementDelayTitle" },
    { colId: "customerTypeCode", type: "enum" },
    { colId: "customerTypeTitle" },
    { colId: "customerCounterSideCode", type: "enum" },
    { colId: "customerCounterSideTitle" },
  ],
  "commission-management_detail": [
    { colId: "checkbox", type: "checkbox" },
    {
      colId: "brokerCommission",
      children: [
        { colId: "brokerCommissionCoeff", flex: 0, width: 90 },
        { colId: "minBrokerCommissionValue", flex: 0, width: 110 },
        { colId: "maxBrokerCommissionValue", flex: 0, width: 110 },
      ],
    },
    {
      colId: "brokerCmdCommission",
      children: [
        { colId: "brokerCmdFundCoeff", flex: 0, width: 110 },
        { colId: "maxBrokerCmdFundValue", flex: 0, width: 110 },
      ],
    },
    {
      colId: "seoControlCommission",
      children: [
        { colId: "seoControlCommissionCoeff", flex: 0, width: 110 },
        { colId: "maxSeoControlCommissionValue", flex: 0, width: 110 },
      ],
    },
    {
      colId: "csdCommission",
      children: [
        { colId: "csdCommissionCoeff", flex: 0, width: 110 },
        { colId: "maxCsdCommissionValue", flex: 0, width: 110 },
      ],
    },
    {
      colId: "tmcCommission",
      children: [
        { colId: "tmcCommissionCoeff", flex: 0, width: 110 },
        { colId: "maxTmcCommissionValue", flex: 0, width: 110 },
      ],
    },
    {
      colId: "bourseCommission",
      children: [
        { colId: "bourseCommissionCoeff", flex: 0, width: 110 },
        { colId: "maxBourseCommissionValue", flex: 0, width: 110 },
      ],
    },
    {
      colId: "rayanCommission",
      children: [
        { colId: "rayanCommissionCoeff", flex: 0, width: 110 },
        { colId: "maxRayanCommissionValue", flex: 0, width: 110 },
      ],
    },
    {
      colId: "accessCommission",
      children: [
        { colId: "accessCommissionCoeff", flex: 0, width: 110 },
        { colId: "totalCommissionCoeff", flex: 0, width: 110 },
        { colId: "maxAccessCommissionValue", flex: 0, width: 110 },
      ],
    },
    {
      colId: "taxCommission",
      children: [
        { colId: "addedValueTax", flex: 0, width: 110 },
        { colId: "maxTaxValue", flex: 0, width: 110 },
      ],
    },
    { colId: "taxCoeff", flex: 0, width: 110 },
    { colId: "charge", flex: 0, width: 110 },
    { colId: "netTradeValueCoeff", flex: 0, width: 110 },
    { colId: "beginningEffectingDate", type: "date", flex: 0, width: 110 },
    { colId: "endEffectingDate", type: "date", flex: 0, width: 110 },
    { colId: "deleted", type: "enum", flex: 0, width: 110 },
    { colId: "lastUpdaterUserId", flex: 0, width: 110 },
    { colId: "lastUpdateDateTime", type: "date", flex: 0, width: 110 },
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
    { colId: "inventoryStatus", type: "enum" },
    { colId: "instrumentTypeDescription" },
  ],
  "commission-management_instrument": [
    { colId: "checkbox", type: "checkbox" },
    { colId: "id" },
    { colId: "bourseTitle" },
    { colId: "instrumentTypeCode" },
    { colId: "instrumentTypeTitle" },
    { colId: "sectorCode" },
    { colId: "sectorTitle" },
    { colId: "subSectorCode" },
    { colId: "subSectorTitle" },
    { colId: "deleted", type: "enum" },
    { colId: "instrumentTypeDescription" },
  ],
  "commission-management_abstract_symbols": [
    { colId: "instrumentId" },
    { colId: "faInsCode" },
    { colId: "offerTypeCode", type: "enum" },
    { colId: "sideCode", type: "enum" },
    { colId: "customerTypeCode", type: "enum" },
    { colId: "customerCounterSideCode", type: "enum" },
    { colId: "totalCommissionCoeff" },
    { colId: "netTradeCoeff" },
    { colId: "breakEvenPriceCoeff" },
    { colId: "beginningEffectingDate", type: "date" },
    { colId: "endEffectingDate", type: "date" },
    { colId: "valid", type: "enum" },
    { colId: "deleted", type: "enum" },
  ],
  "commission-management_full_symbols": [
    { colId: "instrumentId", cellRenderer: "agGroupCellRenderer" },
    { colId: "faInsCode" },
    { colId: "offerTypeCode", type: "enum" },
    { colId: "sideCode", type: "enum" },
    { colId: "settlementDelayCode", type: "enum" },
    { colId: "customerTypeCode", type: "enum" },
    { colId: "customerCounterSideCode", type: "enum" },
    { colId: "netBrokerCommissionCoeff" },
    { colId: "totalCommissionCoeff" },
    { colId: "netTradeCoeff" },
    { colId: "breakEvenPriceCoeff" },
    { colId: "beginningEffectingDate", type: "date" },
    { colId: "endEffectingDate", type: "date" },
    { colId: "valid", type: "enum" },
    { colId: "deleted", type: "enum" },
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

  //netflow
  netflow_cleared_trade: [
    { colId: "ticket", cellRenderer: "agGroupCellRenderer" },
    { colId: "date", type: "date" },
    { colId: "symbol" },
    { colId: "instrumentId" },
    { colId: "price" },
    { colId: "shares" },
    { colId: "settlementValue" },
  ],
  netflow_cleared_trade_detail: [
    { colId: "brokerCommission" },
    { colId: "brfCommission" },
    { colId: "bourseCommission" },
    { colId: "seoCommission" },
    { colId: "tmcCommission" },
    { colId: "accessCommission" },
    { colId: "csdCommission" },
    { colId: "rayanBourseCommission" },
    { colId: "inventoryCommission" },
    { colId: "tax" },
    { colId: "vatCommission" },
    { colId: "vtsCommission" },
    { colId: "farCommission" },
  ],
  netflow_clearing_Range: [
    { colId: "georgianTradeDate" },
    { colId: "enTierName" },
    { colId: "brokerCode" },
    { colId: "brokerName", cellRenderer: "agGroupCellRenderer" },
    { colId: "settlementDelay" },
    { colId: "buy" },
    { colId: "sell" },
    { colId: "sellerInterest" },
    { colId: "buyerInterest" },
    { colId: "credit" },
    { colId: "debit" },
    { colId: "sellerBalance" },
    { colId: "buyerBalance" },
  ],
  netflow_clearing_Range_detail: [
    { colId: "type" },
    { colId: "brokerCommission" },
    { colId: "brfCommission" },
    { colId: "accessCommission" },
    { colId: "seoCommission" },
    { colId: "tmcCommission" },
    { colId: "csdCommission" },
    { colId: "rayanBourseCommission" },
    { colId: "bourseCommission" },
    { colId: "inventoryCommission" },
    { colId: "farCommission" },
    { colId: "tax" },
    { colId: "vatCommission" },
    { colId: "vtsCommission" },
  ],
  netflow_rules: [
    { colId: "name", cellRenderer: "agGroupCellRenderer" },
    { colId: "startDate" },
    { colId: "endDate" },
    { colId: "symbol" },
    { colId: "buyerCode" },
    { colId: "sellerCode" },
    { colId: "settlementDelay", type: "enum" },
  ],
  netflow_rules_detail: [
    {
      colId: "netflow-rules-detail-type",
      rowSpan: (params: any) => (params.data?.side === 1 ? 2 : 1),
      cellClassRules: {
        "cell-span": (params: any) => params.data?.side === 1,
      },
      valueFormatter: (rowData: any) => {
        return rowData.node.rowIndex > 1 ? "ضریب کارمزد" : "سقف کارمزد";
      },
    },
    { colId: "accountCommission" },
    { colId: "seoCommission" },
    { colId: "tmcCommission" },
    { colId: "csdCommission" },
    { colId: "rayanBourseCommission" },
    { colId: "bourseCommission" },
    { colId: "brokerCommission" },
    { colId: "tax" },
    { colId: "vatCommission" },
    { colId: "vtsCommission" },
    { colId: "side", type: "enum" },
  ],
  netflow_trades_report: [
    { colId: "fullName", cellRenderer: "agGroupCellRenderer" },
    { colId: "sideTitle" },
    { colId: "symbol" },
    { colId: "settlementValue" },
    { colId: "price" },
    { colId: "shares" },
    { colId: "bourseCode" },
    { colId: "tradeCode" },
    { colId: "settlementDelay" },
    { colId: "stationName" },
    { colId: "stationCode", type: "date" },
    { colId: "tradeDate", type: "date" },
    {
      colId: "bourseCommission",
      valueGetter: "data.feeDetail.bourseCommission",
      hide: true,
    },
    {
      colId: "seoCommission",
      valueGetter: "data.feeDetail.seoCommission",
      hide: true,
    },
    {
      colId: "tmcCommission",
      valueGetter: "data.feeDetail.tmcCommission",
      hide: true,
    },
    {
      colId: "accessCommission",
      valueGetter: "data.feeDetail.accessCommission",
      hide: true,
    },
    {
      colId: "csdCommission",
      valueGetter: "data.feeDetail.csdCommission",
      hide: true,
    },
    {
      colId: "vatCommission",
      valueGetter: "data.feeDetail.vatCommission",
      hide: true,
    },
    {
      colId: "brokerCommission",
      valueGetter: "data.feeDetail.brokerCommission",
      hide: true,
    },
    {
      colId: "rayanBourseCommission",
      valueGetter: "data.feeDetail.rayanBourseCommission",
      hide: true,
    },
    {
      colId: "brfCommission",
      valueGetter: "data.feeDetail.brfCommission",
      hide: true,
    },
    {
      colId: "inventoryCommission",
      valueGetter: "data.feeDetail.inventoryCommission",
      hide: true,
    },
    { colId: "tax", valueGetter: "data.feeDetail.tax", hide: true },
    {
      colId: "vtsCommission",
      valueGetter: "data.feeDetail.vtsCommission",
      hide: true,
    },
    {
      colId: "farCommission",
      valueGetter: "data.feeDetail.farCommission",
      hide: true,
    },
  ],
  netflow_trades_report_detail: [
    { colId: "bourseCommission" },
    { colId: "seoCommission" },
    { colId: "tmcCommission" },
    { colId: "csdCommission" },
    { colId: "vatCommission" },
    { colId: "brokerCommission" },
    { colId: "accessCommission" },
    { colId: "brfCommission" },
    { colId: "rayanBourseCommission" },
    { colId: "inventoryCommission" },
    { colId: "tax" },
    { colId: "vtsCommission" },
    { colId: "farCommission" },
  ],
};

export const generateDynamicColumnDefs = (module: ModulesType) => {
  const dynamicColumnDefs = modularColsDef[module]?.map((col: ColDefType) => {
    const { children, ...rest } = col;
    if (children) {
      return {
        headerName: columnsName[col.colId],
        field: col.colId,
        ...columnModel[col.type || "default"],
        ...rest,
        children: children.map((childCol: ColDefType) => {
          return {
            headerName: columnsName[childCol.colId],
            field: childCol.colId,
            ...columnModel[childCol.type || "default"],
            ...childCol,
          };
        }),
      };
    } else {
      return {
        headerName: columnsName[col.colId],
        field: col.colId,
        ...columnModel[col.type || "default"],
        filter: col.dataType === "number" ? "agNumberColumnFilter" : false,
        ...col,
      };
    }
  });

  return dynamicColumnDefs || [];
};
