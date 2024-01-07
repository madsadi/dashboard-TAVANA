import DaisyAccordionComponent from "../../../common/components/daisy-accordion";
import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import useQuery from "hooks/useQuery";
import { ADMIN_GATEWAY } from "api/constants";
import { useRouter } from "next/router";
import PageHeaderFooter from "./page-header-footer";

export default function TestComponent() {
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<any>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });
  const { fetchAsyncData: getExamResult } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetUserExamResult`,
  });
  const componentRef = useRef(null);
  const router = useRouter();
  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = () => {
    return (
      <button
        className={
          "flex item-center button bg-red-600 w-fit text-white float-left m-5"
        }
      >
        چاپ
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <PrinterIcon className={"h-5 w-5 mr-2"} />
        )}
      </button>
    ); // eslint-disable-line max-len
  };

  const questions = [
    {
      title: "در نماد وبانک، حرف اول *و* چه چیز را نشان می دهد؟",
      options: ["صنعت", "نوع اوراق", "نام شرکت", "هیچکدام"],
      answer: "1",
    },
    {
      title: "اولوّیت انجام معاملات به چه صورتی می باشد؟",
      options: [
        "قیمت سفارش",
        "قیمت سپس زمان ورود سفارش",
        "زمان سپس قیمت ورود",
        "زمان سفارش",
      ],
      answer: "2",
    },
    {
      title: "کارگزار ناظر کیست؟",
      options: [
        "کارگزاری می باشد که سهامدار می تواند تعداد سهام های خود را در آن افزایش دهد",
        "کارگزاری می باشد که سهامدار از طریق آن شرکت اقدام به خرید سهام نموده است.",
        "کارگزاری است که سهامداران می توانند دارایی سهام خود تحت نظر آن کارگزار را صرفاً از طریق همان کارگزار به فروش برسانند",
        "همه موارد",
      ],
      answer: "3",
    },
    {
      title: "تسویه معاملات در چند روز بعد از انجام معامله صورت می گیرد؟",
      options: ["٢ روز", "٣ روز", "٣ روز کاری", "٢ روز کاری"],
      answer: "4",
    },
    {
      title: "کدام یک از وظایف مجمع عمومی فوق العاده است؟",
      options: [
        "تغییر اساسنامه",
        "انحلال شرکت",
        "تغییر سرمایه شرکت",
        "همه موارد",
      ],
      answer: "4",
    },
    {
      title: "نماد شپنا مربوط به کدامیک از شرکت های زیر می باشد؟",
      options: [
        "پالایش نفت تهران",
        "پالایش نفت تبریز",
        "پالایش نفت اصفهان",
        "پالایش نفت بندرعباس",
      ],
      answer: "3",
    },
    {
      title: "جامع ترین و بهترین گزینه کدام است؟",
      options: [
        "قیمت سهام در بازار توسط خریدار تعیین می شود",
        "قیمت سهام در بازار بر اساس عرضه و تقاضا تعیین می شود",
        "قیمت سهام در بازار توسط فروشنده تعیین می شود",
        "قیمت سهام در بازار توسط شرکت بورس تعیین می شود",
      ],
      answer: "2",
    },
    {
      title: ' کدام "دامنه نوسان قیمت مجاز" در بازار سرمایه صحیح است:',
      options: [
        "از -5 تا +5",
        "از -10 تا +10",
        "از -3 تا +3",
        "همه موارد (پاسخ صحیح)",
      ],
      answer: "4",
    },
    {
      title: " معاملات اوراق بهادار در بورس تهران در چه ساعاتی انجام می گیرد؟",
      options: [
        "09:00 تا 12:30",
        "08:30 تا 11:50",
        "08:50 تا 12:50",
        "08:30 تا 12:00",
      ],
      answer: "1",
    },
    {
      title: "ارزش اسمی هر سهم شرکت‌های سهامی عام معمولاً چند ریال است؟",
      options: ["100 ریال", "10000 ریال", "10 ریال", "1000 ریال"],
      answer: "4",
    },
  ];

  useEffect(() => {
    getExamResult({ userId: router.query.userId }).then((res) => {
      let result: any = {};
      res.data.result.examResult.map((item: number, index: number) => {
        result[index] = item.toString();
      });
      setAnswers(result);
    });
  }, []);

  return (
    <DaisyAccordionComponent title={"آزمون آنلاین"}>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="تعهد نامه ثبت نام غیر حضوری"
        removeAfterPrint={false}
        trigger={reactToPrintTrigger}
      />
      <div ref={componentRef} className={"mobileAgreement"}>
        <table className={"w-full"} dir={"rtl"}>
          <thead>
            <tr>
              <td>
                <div className="page-header-space">&nbsp;</div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={"w-full content"}>
                <div className={"relative leading-8 text-justify page"}>
                  <p>
                    آزمون ثبت نام آنلاین:
                    <span className="font-bold text-lg mr-2">
                      {
                        Object.values(answers).filter(
                          (item: any, index: number) =>
                            item === questions[index].answer
                        ).length
                      }
                      پاسخ درست
                    </span>
                  </p>
                  {questions.map((question: any, index: number) => {
                    return (
                      <div
                        key={question.title}
                        className="mb-3 border border-black bg-bankCard p-3 break-inside-avoid"
                      >
                        <span className="text-tavanaGreen text-lg">
                          {index + 1}-{question.title}
                        </span>
                        <div className="space-y-2 mt-3">
                          {question.options.map((option: string, i: number) => {
                            return (
                              <div className={"flex items-center"} key={option}>
                                <input
                                  className={`checkbox `}
                                  checked={Number(answers[index]) === i + 1}
                                  readOnly
                                  type="checkbox"
                                />
                                <label className="mr-2">{option}</label>
                                {questions[index].answer ===
                                (i + 1).toString() ? (
                                  <p className="text-emerald-500 mr-2">
                                    پاسخ درست
                                  </p>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="page-footer-space">&nbsp;</div>
              </td>
            </tr>
          </tfoot>
        </table>
        <PageHeaderFooter />
      </div>
    </DaisyAccordionComponent>
  );
}
