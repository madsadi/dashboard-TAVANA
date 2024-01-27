import { Listbox, Transition } from "@headlessui/react";
import { classNames, FindEnum } from "../../../../utils/common-funcions";
import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { FilterItemType } from "types/constant-filters.types";
import { EnumType, QueryType } from "types/types";

interface BaseInputPropsType {
  item: FilterItemType;
  query: QueryType;
  onChange: (key: string, value: any) => void;
  dynamicsOption?: EnumType[];
}

export const TimeValueInput = (props: BaseInputPropsType) => {
  const { item, query, onChange, dynamicsOption } = props;
  const { name, title, isRequired } = item;

  return (
    <div className={"flex items-center space-x-reverse space-x-2"}>
      <label className={"flex items-center mt-auto text-sm"} htmlFor={title}>
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
      <div className={"grow"}>
        <div className="relative rounded">
          <Listbox
            name={title === "startHour" ? "startMinute" : "endMinute"}
            value={query?.[title === "startHour" ? "startMinute" : "endMinute"]}
            onChange={(e) =>
              onChange(title === "startHour" ? "startMinute" : "endMinute", e)
            }
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                  <span className="flex items-center">
                    <span className="ml-2 block truncate text-sm">
                      {FindEnum(title, dynamicsOption).minutes.find(
                        (item: any) =>
                          item ===
                          query?.[
                            title === "startHour" ? "startMinute" : "endMinute"
                          ]
                      )}
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
                    {FindEnum(title, dynamicsOption).minutes.map(
                      (item: any) => (
                        <Listbox.Option
                          key={item}
                          className={({ active }) =>
                            classNames(
                              active ? "bg-border" : "",
                              "relative cursor-pointer select-none py-1 pl-3 pr-3"
                            )
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span>{item}</span>
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
                      )
                    )}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>
      </div>
      <div>:</div>
      <div className={"grow"}>
        <div className="relative rounded">
          <Listbox
            name={title}
            value={query?.[title]}
            onChange={(e) => onChange(title, e)}
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                  <span className="flex items-center">
                    <span className="ml-2 block truncate text-sm">
                      {FindEnum(title, dynamicsOption).hours.find(
                        (item: any) => item === query?.[title]
                      )}
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
                    {FindEnum(title, dynamicsOption).hours.map((item: any) => (
                      <Listbox.Option
                        key={item}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-border" : "",
                            "relative cursor-pointer select-none py-1 pl-3 pr-3"
                          )
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span>{item}</span>
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
    </div>
  );
};
