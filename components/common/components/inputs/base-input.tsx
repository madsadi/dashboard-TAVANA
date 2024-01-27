import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { FilterItemType } from "types/constant-filters.types";
import {
  classNames,
  numberInput,
  numberWithCommas,
  p2e,
} from "utils/common-funcions";

interface BaseInputPropsType {
  item: FilterItemType;
  value: any;
  onChange: (key: string, value: any) => void;
}
export const BaseInput = (props: BaseInputPropsType) => {
  const { item, onChange, value } = props;
  const { name, title, valueType, readOnly, isRequired, placeholder, dir } =
    item;
  const [inputValue, setInputValue] = useState<string>(value);

  const onChangeHandler = (e: any) => {
    if (valueType === "number") {
      onChange(title, +numberInput(e.target.value));
      setInputValue(numberWithCommas(numberInput(p2e(`${e.target.value}`))));
    } else {
      onChange(title, e.target.value);
      setInputValue(e.target.value);
    }
  };
  return (
    <div>
      <label className={"flex items-center text-sm"} htmlFor={title}>
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
        {inputValue && !readOnly ? (
          <XCircleIcon
            className="h-5 w-5 text-gray-400 mr-2 cursor-pointer"
            onClick={() => {
              onChange(title, "");
              setInputValue("");
            }}
          />
        ) : null}
      </label>
      <input
        className={"w-full h-[36px] focus:outline-none focus:!border-gray-300"}
        type={"text"}
        readOnly={readOnly}
        dir={dir || valueType === "number" ? "ltr" : "rtl"}
        id={title}
        value={inputValue}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};
