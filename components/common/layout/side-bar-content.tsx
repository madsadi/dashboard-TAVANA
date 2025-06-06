import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import SidebarCollapsibleComponent from "../components/Sidebar-collapsible.component";
import filters from "../../../constants/filters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { isAllowed, prepare } from "../../../utils/permission-utils";
import { useSelector } from "react-redux";

export default function SideBarContent() {
  const router = useRouter();
  const pagesList = [
    {
      label: "داشبورد",
      expanded: false,
      url: "/dashboard",
      as: "/dashboard",
      className: router.pathname === "/dashboard" ? "sideBarActive" : "",
      module: ModuleIdentifier.DASHBOARD,
    },
    {
      label: "مدیریت کاربران",
      expanded: router.pathname.startsWith("/users-management"),
      children: [
        {
          label: "کاربران",
          url: "/users-management/users",
          as: "/users-management/users",
          className:
            router.pathname === "/users-management/users"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.USER_MANAGEMENT_users,
        },
        {
          label: "نقش و دسترسی",
          url: "/users-management/roles",
          as: "/users-management/roles",
          className:
            router.pathname === "/users-management/roles"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.USER_MANAGEMENT_roles,
        },
        {
          label: "ورود/خروج کاربران",
          url: "/users-management/logs",
          as: "/users-management/logs",
          className:
            router.pathname === "/users-management/logs" ? "sideBarActive" : "",
          module: ModuleIdentifier.USER_MANAGEMENT_logs,
        },
      ],
    },
    {
      label: "ثبت نام غیرحضوری",
      expanded: router.pathname.startsWith("/online-registration"),
      children: [
        {
          label: "گزارش ثبت نام",
          url: "/online-registration/registration-report",
          as: "/online-registration/registration-report",
          className:
            router.pathname === "/online-registration/registration-report"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.ONLINE_REGISTRATION,
        },
      ],
    },
    {
      label: "اعتبارات",
      expanded: router.pathname.startsWith("/credit"),
      children: [
        {
          label: "بانک",
          url: "/credit/bank",
          as: "/credit/bank",
          className: router.pathname === "/credit/bank" ? "sideBarActive" : "",
          module: ModuleIdentifier.CREDIT_bank,
        },
        {
          label: "گروه های اعتباری",
          url: "/credit/category",
          as: "/credit/category",
          className:
            router.pathname === "/credit/category" ? "sideBarActive" : "",
          module: ModuleIdentifier.CREDIT_category,
        },
        {
          label: "اعتبار گروه های اعتباری",
          url: "/credit/category-assignment",
          as: "/credit/category-assignment",
          className:
            router.pathname === "/credit/category-assignment"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CREDIT_category_assignment,
        },
        {
          label: "قراردادها",
          url: "/credit/contract",
          as: "/credit/contract",
          className:
            router.pathname === "/credit/contract" ? "sideBarActive" : "",
          module: ModuleIdentifier.CREDIT_contract,
        },
        {
          label: "پورتفو",
          url: "/credit/portfolio-status",
          as: "/credit/portfolio-status",
          className:
            router.pathname === "/credit/portfolio-status"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CREDIT_portfolio_status,
        },
        {
          label: "پورتفولیو و گردش حساب",
          url: "/credit/turnover-portfolio",
          as: "/credit/turnover-portfolio",
          className:
            router.pathname === "/credit/turnover-portfolio"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CREDIT_turnover_portfolio,
        },
        {
          label: "درخواست مشتریان",
          url: "/credit/customer-request",
          as: "/credit/customer-request",
          className:
            router.pathname === "/credit/customer-request"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CREDIT_customer_request,
        },
        {
          label: "اعتبار کارگزاری",
          url: "/credit/broker",
          as: "/credit/broker",
          className:
            router.pathname === "/credit/broker" ? "sideBarActive" : "",
          module: ModuleIdentifier.CREDIT_broker,
        },
        {
          label: "عملکرد اعتباری کارگزاری",
          url: "/credit/customer-kpi",
          as: "/credit/customer-kpi",
          className:
            router.pathname === "/credit/customer-kpi" ? "sideBarActive" : "",
          module: ModuleIdentifier.CREDIT_customer_kpi,
        },
      ],
    },
    {
      label: "مدیریت هلدینگ",
      expanded: router.pathname.startsWith("/holding-management"),
      children: [
        {
          label: "شرکت ها",
          url: "/holding-management/subsidiary",
          as: "/holding-management/subsidiary",
          className:
            router.asPath === `/holding-management/subsidiary`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_subsidiary,
        },
        {
          label: "شعب",
          url: "/holding-management/branch",
          as: "/holding-management/branch",
          className:
            router.asPath === "/holding-management/branch"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_branch,
        },
        {
          label: "کارمندان",
          url: "/holding-management/employee",
          as: "/holding-management/employee",
          className:
            router.asPath === "/holding-management/employee"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_employee,
        },
        {
          label: "واحد کاری",
          url: "/holding-management/business-unit",
          as: "/holding-management/business-unit",
          className:
            router.asPath === "/holding-management/business-unit"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit,
        },
        {
          label: " جزیئات واحد کاری ",
          url: "/holding-management/business-unit-detail",
          as: "/holding-management/business-unit-detail",
          className:
            router.asPath === "/holding-management/business-unit-detail"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_detail,
        },
        {
          label: "ایستگاه معاملاتی",
          url: "/holding-management/station",
          as: "/holding-management/station",
          className:
            router.asPath === "/holding-management/station"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_station,
        },
        {
          label: "بازاریاب ها",
          url: "/holding-management/marketer",
          as: "/holding-management/marketer",
          className:
            router.asPath === "/holding-management/marketer"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer,
        },
        {
          label: "بازاریاب های فرعی ",
          url: "/holding-management/subordinate",
          as: "/holding-management/subordinate",
          className:
            router.asPath === "/holding-management/subordinate"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_subordinate,
        },
        {
          label: "مدیریت توافقنامه ها",
          url: "/holding-management/agreements-management",
          as: "/holding-management/agreements-management",
          className:
            router.asPath === `/holding-management/agreements-management`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management,
        },
      ],
    },
    {
      label: "مدیریت مشتریان",
      expanded: router.pathname.startsWith("/customer-management"),
      children: [
        {
          label: "مشتریان",
          url: "/customer-management/customer",
          as: "/customer-management/customer",
          className:
            router.asPath === `/customer-management/customer`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_customer,
        },
        {
          label: " اشخاص حقیقی",
          url: "/customer-management/private-person",
          as: "/customer-management/private-person",
          className:
            router.asPath === `/customer-management/private-person`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_private_person,
        },
        {
          label: " اشخاص حقوقی",
          url: "/customer-management/legal-person",
          as: "/customer-management/legal-person",
          className:
            router.asPath === `/customer-management/legal-person`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person,
        },
        {
          label: "سهام داران مشتریان حقوقی",
          url: "/customer-management/legal-person-shareholder",
          as: "/customer-management/legal-person-shareholder",
          className:
            router.asPath === `/customer-management/legal-person-shareholder`
              ? "sideBarActive"
              : "",
          module:
            ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person_shareholders,
        },
        {
          label: "ذینفعان مشتریان حقوقی",
          url: "/customer-management/legal-person-stakeholder",
          as: "/customer-management/legal-person-stakeholder",
          className:
            router.asPath === `/customer-management/legal-person-stakeholder`
              ? "sideBarActive"
              : "",
          module:
            ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person_stakeholders,
        },
        {
          label: "سبدهای اختصاصی",
          url: "/customer-management/private-portfolio",
          as: "/customer-management/private-portfolio",
          className:
            router.asPath === `/customer-management/private-portfolio`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_private_portfolio,
        },
        {
          label: "حساب بانکی",
          url: "/customer-management/bank-account",
          as: "/customer-management/bank-account",
          className:
            router.asPath === `/customer-management/bank-account`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_bank_account,
        },
        {
          label: "وکیل/نماینده",
          url: "/customer-management/agent",
          as: "/customer-management/agent",
          className:
            router.asPath === `/customer-management/agent`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_agent,
        },
        {
          label: "وکالت/نمایندگی مشتریان",
          url: "/customer-management/agent-relation",
          as: "/customer-management/agent-relation",
          className:
            router.asPath === `/customer-management/agent-relation`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_agent_relation,
        },
        {
          label: "مدیریت کد بورسی",
          url: "/customer-management/bourse-code",
          as: "/customer-management/bourse-code",
          className:
            router.asPath === `/customer-management/bourse-code`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code,
        },
        {
          label: "کدهای حسابداری مشتریان",
          url: "/customer-management/accounting-code",
          as: "/customer-management/accounting-code",
          className:
            router.asPath === `/customer-management/accounting-code`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_accounting_code,
        },
        {
          label: "توافقنامه های مشتریان",
          url: "/customer-management/customer-agreement",
          as: "/customer-management/customer-agreement",
          className:
            router.asPath === "/customer-management/customer-agreement"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_customerAgreement,
        },
        {
          label: " تغییرات شعبه مشتریان",
          url: "/customer-management/customer-branch-history",
          as: "/customer-management/customer-branch-history",
          className:
            router.asPath === `/customer-management/customer-branch-history`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_customer_branch_history,
        },
        {
          label: " تغییرات شعبه بازاریاب",
          url: "/customer-management/branch-history",
          as: "/customer-management/branch-history",
          className:
            router.asPath === `/customer-management/branch-history`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_branch_history,
        },
        {
          label: " تغییرات بازاریاب مشتریان",
          url: "/customer-management/marketer-history",
          as: "/customer-management/marketer-history",
          className:
            router.asPath === `/customer-management/marketer-history`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer_history,
        },
        {
          label: " تغییرات ایستگاه معاملاتی",
          url: "/customer-management/employee-station-history",
          as: "/customer-management/employee-station-history",
          className:
            router.asPath === `/customer-management/employee-station-history`
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CUSTOMER_MANAGEMENT_employee_station_history,
        },
      ],
    },

    {
      label: "سفارشات آنلاین",
      expanded: router.pathname.startsWith("/online-trades-orders"),
      children: [
        {
          label: "سفارشات",
          url: "/online-trades-orders/orders",
          as: "/online-trades-orders/orders",
          className:
            router.pathname === "/online-trades-orders/orders"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.ONLINE_ORDERS,
        },
        {
          label: "معاملات",
          url: "/online-trades-orders/trades",
          as: "/online-trades-orders/trades",
          className:
            router.pathname === "/online-trades-orders/trades"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.ONLINE_TRADES,
        },
        {
          label: "حذف گروهی سفارشها",
          url: "/online-trades-orders/cancel-orders",
          as: "/online-trades-orders/cancel-orders",
          className:
            router.pathname === "/online-trades-orders/cancel-orders"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.ONLINE_CANCEL,
        },
      ],
    },
    {
      label: "اپلیکیشن مارکتر",
      expanded: router.pathname.startsWith("/marketer-app"),
      children: [
        {
          label: "بازاریاب ها",
          url: "/marketer-app/marketers",
          as: "/marketer-app/marketers",
          className:
            router.pathname === "/marketer-app/marketers"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.MARKETER_APP_marketers,
        },
        {
          label: "ارتباط بازاریاب ها",
          url: "/marketer-app/relations",
          as: "/marketer-app/relations",
          className:
            router.pathname === "/marketer-app/relations"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.MARKETER_APP_relations,
        },
        {
          label: "گزارش صورتحسابهای بازاریاب",
          url: "/marketer-app/recite",
          as: "/marketer-app/recite",
          className:
            router.pathname === "/marketer-app/recite" ? "sideBarActive" : "",
          module: ModuleIdentifier.MARKETER_APP_recite,
        },
        {
          label: "زیر مجموعه های بازاریاب",
          url: "/marketer-app/sub-users",
          as: "/marketer-app/sub-users",
          className:
            router.pathname === "/marketer-app/sub-users"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.MARKETER_APP_subusers,
        },
        {
          label: "قرارداد بازاریاب",
          url: "/marketer-app/marketer-contract",
          as: "/marketer-app/marketer-contract",
          className:
            router.pathname === "/marketer-app/marketer-contract"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.MARKETER_APP_marketerContract,
        },
        {
          label: "ضرایب",
          url: "/marketer-app/coefficient",
          as: "/marketer-app/coefficient",
          className:
            router.pathname === "/marketer-app/coefficient"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.MARKETER_APP_relations_detail_coefficient,
        },
        {
          label: "گزارش مغایرت بازاریاب",
          url: "/marketer-app/reconcilation",
          as: "/marketer-app/reconcilation",
          className:
            router.pathname === "/marketer-app/reconcilation"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.MARKETER_APP_reconcilation,
        },
      ],
    },
    {
      label: "پرتفو",
      expanded: router.pathname.startsWith("/portfo"),
      children: [
        {
          label: "پرتفو لحظه ای",
          url: "/portfo/intraday",
          as: "/portfo/intraday",
          className:
            router.pathname === "/portfo/intraday" ? "sideBarActive" : "",
          module: ModuleIdentifier.PORTFO_intraday,
        },
        {
          label: "درخواست تغییر ناظر",
          url: "/portfo/asset-switch",
          as: "/portfo/asset-switch",
          className:
            router.pathname === "/portfo/asset-switch" ? "sideBarActive" : "",
          module: ModuleIdentifier.PORTFO_asset_switch_request,
        },
        {
          label: "روند پورتفوی مشتری",
          url: "/portfo/customer-portfo",
          as: "/portfo/customer-portfo",
          className:
            router.pathname === "/portfo/customer-portfo"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.PORTFO_customer_portfo,
        },
        {
          label: "رتبه پورتفوی مشتریان",
          url: "/portfo/customer-to-broker",
          as: "/portfo/customer-to-broker",
          className:
            router.pathname === "/portfo/customer-to-broker"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.PORTFO_customer_to_broker,
        },
      ],
    },
    {
      label: "پرتفو سپرده گذاری",
      expanded: router.pathname.startsWith("/csdi-portfo"),
      children: [
        {
          label: "پورتفوی سپرده گذاری",
          url: "/csdi-portfo",
          as: "/csdi-portfo",
          className: router.pathname === "/csdi-portfo" ? "sideBarActive" : "",
          module: ModuleIdentifier.CSDI_PORTFO,
        },
        {
          label: "گزارش تغییر ناظر",
          url: "/csdi-portfo/asset-switch-report",
          as: "/csdi-portfo/asset-switch-report",
          className:
            router.pathname === "/csdi-portfo/asset-switch-report"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CSDI_PORTFO_asset_switch_report,
        },
        {
          label: "گزارش معاملات پورتفوی سپرده گذاری",
          url: "/csdi-portfo/switch-report",
          as: "/csdi-portfo/switch-report",
          className:
            router.pathname === "/csdi-portfo/switch-report"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CSDI_PORTFO_switch_report,
        },
        {
          label: "مقایسه پورتفوی",
          url: "/csdi-portfo/portfo-comparison",
          as: "/csdi-portfo/portfo-comparison",
          className:
            router.pathname === "/csdi-portfo/portfo-comparison"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CSDI_PORTFO_comparison,
        },
        {
          label: "گزارش دارایی منجمد",
          url: "/csdi-portfo/freezed-asset",
          as: "/csdi-portfo/freezed-asset",
          className:
            router.pathname === "/csdi-portfo/freezed-asset"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.CSDI_PORTFO_freezed_asset,
        },
      ],
    },
    {
      label: "وضعیت OMS",
      expanded: router.pathname.startsWith("/oms"),
      children: [
        {
          label: "وضعیت جلسه معاملاتی",
          url: "/oms/trading-session",
          as: "/oms/trading-session",
          className:
            router.pathname === "/oms/trading-session" ? "sideBarActive" : "",
          module: ModuleIdentifier.OMS_session,
        },
        {
          label: "زمانبندی روز معاملاتی",
          url: "/oms/trading-day-timetable",
          as: "/oms/trading-day-timetable",
          className:
            router.pathname === "/oms/trading-day-timetable"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.OMS_timetable,
        },
      ],
    },
    {
      label: "مدیریت قوانین بازار",
      url: "/market-rules-management",
      as: "/market-rules-management",
      expanded: false,
      className:
        router.pathname === "/market-rules-management" ? "sideBarActive" : "",
      module: ModuleIdentifier.MARKET_RULES_MANAGEMENT,
    },
    {
      label: "عرضه اولیه",
      url: "/book-building",
      as: "/book-building",
      expanded: false,
      className: router.pathname === "/book-building" ? "sideBarActive" : "",
      module: ModuleIdentifier.BOOK_BUILDING,
    },
    {
      label: "مدیریت کارمزد ها",
      expanded: router.pathname.startsWith("/commission-management"),
      children: [
        {
          label: "کارمزد نمادها",
          url: "/commission-management/symbols",
          as: "/commission-management/symbols",
          className:
            router.pathname === "/commission-management/symbols"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.COMMISSION_MANAGEMENT_symbols,
        },
        {
          label: "ضرایب کارمزد",
          url: "/commission-management/commission",
          as: "/commission-management/commission",
          className:
            router.pathname === "/commission-management/commission"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.COMMISSION_MANAGEMENT_detail,
        },
        {
          label: "گروه بندی ابزار مالی",
          url: "/commission-management/instrument-type",
          as: "/commission-management/instrument-type",
          className:
            router.pathname === "/commission-management/instrument-type"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.COMMISSION_MANAGEMENT_instrument,
        },
        {
          label: "گروه بندی ضرایب کارمزد",
          url: "/commission-management/category-panel",
          as: "/commission-management/category-panel",
          className:
            router.pathname === "/commission-management/category-panel"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.COMMISSION_MANAGEMENT_category,
        },
      ],
    },
    {
      label: "نت فلو",
      expanded: router.pathname.startsWith("/netflow"),
      children: [
        {
          label: "معاملات",
          url: "/netflow/trades-report",
          as: "/netflow/trades-report",
          className:
            router.pathname === "/netflow/Trades-report" ? "sideBarActive" : "",
          module: ModuleIdentifier.NETFLOW_trades_report,
        },
        {
          label: "دریافت اطلاعات",
          className:
            router.pathname === "/netflow/information" ? "sideBarActive" : "",
          module: ModuleIdentifier.NETFLOW_information,
          url: "/netflow/information",
          as: "/netflow/information",
        },
        {
          label: "ضرایب کارمزد",
          className:
            router.pathname === "/netflow/rules" ? "sideBarActive" : "",
          module: ModuleIdentifier.NETFLOW_rules,
          url: "/netflow/rules",
          as: "/netflow/rules",
        },
        {
          label: "معاملات تسویه شده",
          className:
            router.pathname === "/netflow/cleared-trade" ? "sideBarActive" : "",
          module: ModuleIdentifier.NETFLOW_cleared_trade,
          url: "/netflow/cleared-trade",
          as: "/netflow/cleared-trade",
        },
        {
          label: "تسویه و پایاپای",
          className:
            router.pathname === "/netflow/clearing-date-range"
              ? "sideBarActive"
              : "",
          module: ModuleIdentifier.NETFLOW_clearing_Range,
          url: "/netflow/clearing-date-range",
          as: "/netflow/clearing-date-range",
        },
      ],
    },
  ];
  const { user_permissions: userPermissions } = useSelector(
    (state: any) => state.appConfig
  );

  const asd = () => {
    let servicessss: any = {};
    pagesList.map((item: any) => {
      if (item.children) {
        item.children.map((p: any) => {
          servicessss[p.label] = filters[p.module]?.services || null;
        });
      } else {
        servicessss[item.label] = filters[item.module]?.services || null;
      }
    });
    return servicessss;
  };

  return (
    <div className={"w-full"}>
      <div className={"h-full space-y-3 overflow-y-auto p-3"}>
        {pagesList.map((item) => {
          if (item.children) {
            return <CollapsibleComponent key={item.label} item={item} />;
          } else {
            return (
              <div
                className={
                  isAllowed({
                    userPermissions,
                    whoIsAllowed: prepare(filters[item.module].services),
                  })
                    ? "w-full"
                    : "hidden"
                }
                key={item.label}
              >
                <Link href={item.url} as={item?.as}>
                  <div
                    className={`border rounded-md p-2 border-border transition-all font-semibold hover:bg-gray-100 ${item.className}`}
                  >
                    {item.label}
                  </div>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

const CollapsibleComponent = ({ item }: any) => {
  const { user_permissions: userPermissions } = useSelector(
    (state: any) => state.appConfig
  );

  return (
    <SidebarCollapsibleComponent title={item.label} condition={item.expanded}>
      <ul className={"text-right list-disc pt-2 pr-3 font-light"}>
        {item.children.map((child: any) => {
          if (child.children) {
            return <CollapsibleComponent key={child.label} item={child} />;
          } else {
            return (
              <Link
                href={child.url}
                as={child?.as}
                key={child.label}
                className={
                  isAllowed({
                    userPermissions,
                    whoIsAllowed: prepare(filters[child.module].services),
                  })
                    ? ""
                    : "hidden"
                }
              >
                <li
                  className={`hover:bg-gray-200 w-full px-2 first:mt-1 rounded-md ${child.className}`}
                >
                  {child.label}
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </SidebarCollapsibleComponent>
  );
};
