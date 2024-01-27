import React from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import {
  classNames,
  dateRangeHandler,
  jalali,
} from "../../../../utils/common-funcions";
import { DayRange } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Button } from "../button/button";
import { FilterItemType } from "types/constant-filters.types";

interface BaseInputPropsType {
  item: FilterItemType;
  query: any;
  setQuery: any;
}
export const RangeDateInput = (props: BaseInputPropsType) => {
  const { item, query, setQuery } = props;
  const { name, isRequired, readOnly } = item;

  const renderCustomInput = ({ ref }: { ref: any }) => (
    <div>
      <label className={"flex items-center text-sm"} htmlFor="rangeDate">
        {name}
        {isRequired ? (
          <span className={"min-w-5 mr-2"}>
            <ExclamationCircleIcon
              className={classNames(
                "h-4 w-4 ",
                isRequired === "required" ? "text-red-500" : "text-orange-400"
              )}
            />
          </span>
        ) : null}
        {(query?.["startDate"] || query?.["endDate"]) && !readOnly ? (
          <XCircleIcon
            className="h-5 w-5 text-gray-400 mr-2 cursor-pointer"
            onClick={() => {
              if (setQuery) {
                setQuery({ ...query, startDate: null, endDate: null });
              }
            }}
          />
        ) : null}
      </label>
      <input
        className={"w-full h-[36px] focus:outline-none focus:!border-gray-300"}
        readOnly
        disabled={readOnly}
        ref={ref}
        id="rangeDate"
        value={dateRangeHandler(
          convertor({ startDate: query?.startDate, endDate: query?.endDate })
        )}
      />
    </div>
  );

  const selectTodayHandler = () => {
    let enToday = moment().locale("en").format("YYYY-MM-DD");
    if (query?.startDate) {
      setQuery({
        ...query,
        startDate: query?.startDate,
        endDate: enToday || null,
      });
    } else {
      setQuery({
        ...query,
        startDate: enToday || null,
        endDate: query?.endDate,
      });
    }
  };

  function convertor({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): DayRange {
    const jalaliStartDate = startDate ? jalali(startDate || "")?.date : null;
    const from = jalaliStartDate?.split("/") || null;

    const jalaliEndDate = endDate ? jalali(endDate || "")?.date : null;
    const to = jalaliEndDate?.split("/") || null;

    return {
      from: from
        ? {
            year: Number(from[0]),
            month: Number(from[1]),
            day: Number(from[2]),
          }
        : null,
      to: to
        ? { year: Number(to[0]), month: Number(to[1]), day: Number(to[2]) }
        : null,
    };
  }

  return (
    <div>
      <DatePicker
        value={convertor({
          startDate: query?.startDate || null,
          endDate: query?.endDate || null,
        })}
        onChange={(e) => {
          if (setQuery) {
            setQuery({
              ...query,
              startDate: e.from
                ? `${moment
                    .from(
                      `${e.from?.year}/${e.from?.month}/${e.from?.day}`,
                      "fa",
                      "YYYY/MM/DD"
                    )
                    .format("YYYY-MM-DD")}`
                : null,
              endDate: e.to
                ? `${moment
                    .from(
                      `${e.to?.year}/${e.to?.month}/${e.to?.day}`,
                      "fa",
                      "YYYY/MM/DD"
                    )
                    .format("YYYY-MM-DD")}`
                : null,
            });
          }
        }}
        renderFooter={() => {
          return (
            <div className="w-full flex !pb-5">
              <Button
                label="انتخاب تاریخ امروز"
                className="!mx-auto !px-2 !py-1 !text-current "
                onClick={selectTodayHandler}
              />
            </div>
          );
        }}
        shouldHighlightWeekends
        renderInput={renderCustomInput}
        locale={"fa"}
        calendarPopperPosition={"bottom"}
      />
    </div>
  );
};
