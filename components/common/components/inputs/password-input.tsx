import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { FilterItemType } from "types/constant-filters.types";
import { classNames } from "utils/common-funcions";
interface BaseInputPropsType {
  item: FilterItemType;
  value: any;
  onChange: (key: string, value: any) => void;
}
export const PasswordInput = (props: BaseInputPropsType) => {
  const { item, value, onChange } = props;
  const [showPass, setShowPass] = useState<boolean>(false);
  const { name, title, isRequired, placeholder } = item;

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
      </label>
      <div className={"relative"}>
        <input
          className={"w-full"}
          type={showPass ? "text" : "password"}
          dir={"ltr"}
          id={title}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(title, e.target.value);
          }}
        />
        {showPass ? (
          <EyeSlashIcon
            className={
              "absolute h-5 w-5 right-3 top-1/2 -translate-y-1/2 text-black"
            }
            role={"button"}
            onClick={() => setShowPass(false)}
          />
        ) : (
          <EyeIcon
            className={
              "absolute h-5 w-5 right-3 top-1/2 -translate-y-1/2 text-black"
            }
            role={"button"}
            onClick={() => setShowPass(true)}
          />
        )}
      </div>
    </div>
  );
};
