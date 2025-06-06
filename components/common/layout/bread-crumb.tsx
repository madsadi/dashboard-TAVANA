import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HomeIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BreadCrumbComponent() {
  const [path, setPath] = useState<any>([]);

  const router = useRouter();

  const routesInPersian: any = {
    "commission-management": "مدیریت کارمزد",
    commission: "ضرایب کارمزد",
    "category-panel": "گروه بندی ضرایب",
    "instrument-type": "گروه بندی ابزار مالی",
    information: "دریافت  اطلاعات",
    "market-rules-management": "مدیریت قوانین بازار",
    "book-building": "عرضه اولیه",
    netflow: "نت فلو",
    "trades-report": "معاملات",
    "online-trades-orders": "سفارشات آنلاین",
    trades: "معاملات",
    orders: "سفارشات",
    dashboard: "داشبورد",
    "users-management": "مدیریت کاربران",
    users: "کاربران",
    logs: "ورود/خروج کاربران",
    "cancel-orders": "حذف گروهی سفارشها",
    oms: "وضعیت oms",
    "trading-day-timetable": "زمانبندی روز معاملاتی",
    "trading-session": "وضعیت جلسه معاملاتی",
    rules: "ضرایب کارمزد",
    "cleared-trade": "معاملات تسویه شده",
    "clearing-date-range": "تسویه و پایاپای",
    portfo: "پرتفو",
    intraday: "پرتفو لحظه ای",
    "[[...query]]": "تاریخچه",
    "[...detail]": "جزییات اطلاعات کاربر",
    "[...contractId]": "کسورات",
    access: "دسترسی ها",
    "customer-management": "مدیریت مشتریان",
    "holding-management": "مدیریت هلدینگ",
    customer: "مشتریان",
    subsidiary: "شرکت ها",
    branch: "شعب",
    employee: "کارمندان",
    "business-unit": "واحد کاری",
    station: "ایستگاه معاملاتی",
    trader: "معامله گران",
    marketer: "بازاریاب ها",
    agreement: "توافقنامه ها",
    subordinate: "بازاریاب های فرعی",
    "customer-agreement": "توافقنامه های مشتریان",
    roles: "نقش و دسترسی",
    coefficient: "ضرایب",
    "online-registration": "ثبت نام غیر حضوری",
    "registration-report": "گزارش ثبت نام",
    contract: "قرارداد",
    marketerContract: "قرارداد با بازاریاب",
    profile: "حساب کاربری",
    "marketer-app": "اپلیکیشن مارکتر",
    relations: "ارتباط بازاریاب ها",
    "employee-station-history": "تغییرات ایستگاه معاملاتی",
    recite: "گزارش صورتحسابهای بازاریاب",
    "sub-users": "زیر مجموعه ها",
    marketers: "بازارایاب ها",
    "marketer-contract": "قرارداد بازاریاب ",
    "asset-switch": "درخواست تغییر ناظر",
    reconcilation: "گزارش مغایرت بازاریاب",
    "csdi-portfo": "پرتفو سپرده گذاری",
    "asset-switch-report": "گزارش تغییر ناظر",
    "switch-report": "گزارش معاملات پورتفوی سپرده گذاری",
    "portfo-comparison": "مقایسه پورتفوی",
    "[...factorId]": "اصلاح مالی صورت حساب",
    "[...intradetail]": "تاریخچه پورتفوی لحظه ای",
    "[...userId]": "جزییات اطلاعات مشتری",
    detail: "جزییات",
    symbols: "نمادها",
    "freezed-asset": "گزارش دارایی منجمد",
    "customer-portfo": "روند پورتفوی مشتری",
    "customer-to-broker": "رتبه پورتفوی مشتریان",
    "private-person": "اشخاص حقیقی",
    "legal-person": "اشخاص حقوقی",
    "private-portfolio": "سبدهای اختصاصی",
    "bank-account": "حساب بانکی ",
    agent: "وکیل/نماینده",
    "agent-relation": "وکالت/نمایندگی مشتریان",
    "branch-history": "تغییرات شعبه بازاریاب",
    "customer-branch-history": "تغییرات شعبه مشتریان",
    "marketer-history": "تغییرات بازاریاب مشتریان ",
    credit: "اعتبارات",
    bank: "بانک",
    category: "گروه های اعتباری",
    "category-assignment": " اعتبار گروه های اعتباری",
    "portfolio-status": "وضعیت پورتفولیو",
    "turnover-portfolio": "پورتفولیو و گردش حساب",
    "customer-request": "درخواست مشتریان",
    broker: "اعتبار کارگزاری",
    "business-unit-detail": " جزییات واحد کاری",
    "customer-kpi": "عملکرد اعتبار کارگزاری",
    "agreements-management": "مدیریت توافقنامه ها",
    "bourse-code": "مدیریت کد بورسی",
    "accounting-code": "کدهای حسابداری مشتریان",
    "legal-person-shareholder": "سهام داران مشتریان حقوقی",
    "legal-person-stakeholder": "ذینفعان مشتریان حقوقی",
  };

  useEffect(() => {
    let _path: any = [];
    router.pathname.split("/").map((item: any) => {
      if (item === "[[...page]]" && router.query?.page?.[0]) {
        _path.push(routesInPersian?.[router.query?.page?.[0]]);
      } else {
        _path.push(routesInPersian?.[item]);
      }
    });
    _path.splice(0, 1);
    setPath(_path);
  }, [router.pathname, router.query?.page?.[0]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={"hidden md:flex items-center border border-border rounded-md"}
    >
      <Link
        href={"/dashboard"}
        aria-label="home"
        className={"hover:bg-border transition-all w-full px-3 p-1"}
      >
        <HomeIcon className={"h-6.5 w-6"} />
      </Link>
      {path.map((item: string, index: number) => {
        return (
          <span
            key={item + index}
            className={"flex items-center pl-3 min-w-fit"}
          >
            <ChevronLeftIcon className={"h-5 w-5"} />
            {item}
          </span>
        );
      })}
    </div>
  );
}
