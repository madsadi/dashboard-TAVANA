import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import React from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { jalali } from "utils/common-funcions";
import {
  FilterItemSingleDateType,
  FilterItemType,
} from "types/constant-filters.types";
import { QueryType } from "types/types";

interface SingleDateInputProps {
  item: FilterItemSingleDateType;
  query: QueryType;
  onChange: (key: string, value: any) => void;
}
export const SingleDateInput = (props: SingleDateInputProps) => {
  const { item, query, onChange } = props;
  const { title, name, isRequired, minimumDate } = item;

  const singleDateHandler = (selectedDay: DayValue) => {
    if (selectedDay) {
      return Object.values(selectedDay)
        .map((item: number) => item)
        .join("-");
    } else {
      return "";
    }
  };
  const renderSingleDateCustomInput = ({ ref }: { ref: any }) => (
    <div>
      <label className={"flex items-center text-sm"}>
        {name}
        {isRequired ? (
          <span className={"min-w-5 mr-2"}>
            <ExclamationCircleIcon className={"h-4 w-4 text-red-500"} />
          </span>
        ) : null}
        {query?.[title] || query?.[title] === false ? (
          <XCircleIcon
            className="h-5 w-5 text-gray-400 mr-2 cursor-pointer"
            onClick={() => {
              onChange(`${title}`, null);
            }}
          />
        ) : null}
      </label>
      <input
        className={"w-full"}
        readOnly
        ref={ref}
        value={singleDateHandler(convertor(query?.[title]))}
      />
    </div>
  );

  function convertor(date: string): DayValue {
    const jalaliDate = date ? jalali(date || "")?.date : null;
    const split = jalaliDate?.split("/") || null;

    return split
      ? {
          year: Number(split[0]),
          month: Number(split[1]),
          day: Number(split[2]),
        }
      : null;
  }

  return (
    <div>
      <DatePicker
        value={convertor(query?.[title])}
        locale={"fa"}
        minimumDate={minimumDate}
        calendarPopperPosition={"bottom"}
        onChange={(e: DayValue) => {
          onChange(
            `${title}`,
            `${moment
              .from(`${e?.year}/${e?.month}/${e?.day}`, "fa", "YYYY/MM/DD")
              .format("YYYY-MM-DD")}`
          );
        }}
        renderInput={renderSingleDateCustomInput}
        shouldHighlightWeekends
      />
    </div>
  );
};
