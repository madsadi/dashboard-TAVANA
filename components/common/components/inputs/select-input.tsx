import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { classNames, FindEnum } from "../../../../utils/common-funcions";
import React, { Fragment } from "react";
import { FilterItemType } from "types/constant-filters.types";
import { EnumType } from "types/types";

interface BaseInputPropsType {
  item: FilterItemType;
  value: any;
  onChange: (key: string, value: any) => void;
  dynamicsOption?: EnumType[];
}
export const SelectInput = (props: BaseInputPropsType) => {
  const { item, value, onChange, dynamicsOption } = props;
  const { name, title, valueType, isRequired } = item;

  return (
    <div>
      <label className={"mt-auto flex items-center text-sm"} htmlFor={title}>
        {name}
        {isRequired ? (
          <span className={"min-w-5 mr-2"}>
            <ExclamationCircleIcon className={"h-4 w-4 text-red-500"} />
          </span>
        ) : null}
        {value || value === false ? (
          <XCircleIcon
            className="h-5 w-5 text-gray-400 mr-2 cursor-pointer"
            onClick={() => {
              onChange(title, "");
            }}
          />
        ) : null}
      </label>
      <div className="relative rounded">
        <Listbox
          name={title}
          value={value}
          onChange={(e) => {
            if (valueType === "number") {
              onChange(title, Number(e));
            } else {
              onChange(title, e);
            }
          }}
        >
          {({ open }) => (
            <div className="relative">
              <Listbox.Button
                aria-label="select"
                className="relative flex min-w-full h-[36px] cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none"
              >
                <span className="flex items-center">
                  <span className="ml-2 block truncate text-sm">
                    {
                      FindEnum(title, dynamicsOption, name).find(
                        (item: any) => item.id === value
                      )?.title
                    }
                  </span>
                </span>
                <span className="pointer-events-none flex items-center mr-auto">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="false"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                  {FindEnum(title, dynamicsOption, name).map((item: any) => (
                    <Listbox.Option
                      key={item.id}
                      disabled={item?.isDisabled}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-border" : "",
                          "relative select-none py-1 pl-3 pr-3 aria-disabled:cursor-not-allowed cursor-pointer"
                        )
                      }
                      value={item.id}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span>{item.title}</span>
                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "" : "",
                                  "flex items-center mr-auto"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
    </div>
  );
};
