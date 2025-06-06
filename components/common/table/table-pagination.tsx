import React, { Fragment, useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { formatDecimals } from "../../../utils/common-funcions";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { isAllowed } from "../../../utils/permission-utils";
import { useSelector } from "react-redux";
import ExcelExport from "../components/button/excel-export";
import { QueryType } from "types/types";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function TablePagination({
  query,
  onSubmit,
  totalCount = 0,
  module,
  exportExcel,
}: {
  query: QueryType;
  onSubmit: Function;
  totalCount: number;
  module: string | undefined;
  exportExcel?: () => void;
}) {
  const { user_permissions: userPermissions } = useSelector(
    (state: any) => state.appConfig
  );
  const [pageQuery, setPageQuery] = useState<QueryType>({
    pageSize: query?.pageSize || 20,
    pageNumber: 1,
  });
  const [customPageSize, setCustomPageSize] = useState<number>();
  const { service, modules, restriction } = useSearchFilters(module || "");

  const sizes = [10, 20, 50, 100, 200, 300, 400, 500, 1000];
  const queryUpdate = (key: string, value: any) => {
    let _query: any = { ...pageQuery };
    _query[key] = value;
    setPageQuery(_query);
  };

  useEffect(() => {
    if (query?.pageNumber && query?.pageSize) {
      setPageQuery(query);
    }
  }, [query]);

  const onChangeHandler = (e: any) => {
    setCustomPageSize(e.target.value);
  };

  const onPageSizeChange = (value: number) => {
    queryUpdate("pageSize", value);
    onSubmit({ ...pageQuery, pageNumber: 1, pageSize: value });
  };

  return (
    <div className={"flex items-center mx-auto py-3 space-x-2 space-x-reverse"}>
      <div className="relative rounded min-w-[90px]">
        <Listbox
          disabled={
            restriction
              ? !isAllowed({
                  userPermissions,
                  whoIsAllowed: [
                    [service?.[0], modules?.[0]?.[0], "Read"].join("."),
                  ],
                })
              : false
          }
          name={"pageSize"}
          value={pageQuery?.pageSize}
          onChange={(e: number) => {
            onPageSizeChange(e);
            setCustomPageSize(undefined);
          }}
        >
          {({ open }: { open: boolean }) => (
            <div className="relative">
              <Listbox.Button className="relative flex min-w-full cursor-pointer rounded-md border border-border disabled:cursor-not-allowed bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                <span className="flex items-center">
                  <span className="ml-2 block truncate text-sm">
                    {pageQuery?.pageSize}
                  </span>
                </span>

                <span className="pointer-events-none flex items-center mr-auto">
                  <ChevronUpIcon
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
                <Listbox.Options className="absolute z-10 mb-1 bottom-full min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                  <div className="relative">
                    <input
                      className="w-full bg-sky-50"
                      placeholder="مقدار دلخواه"
                      value={customPageSize}
                      onChange={onChangeHandler}
                    />
                    {customPageSize ? (
                      <CheckCircleIcon
                        className="h-4 w-4 text-emerald-500 absolute left-3 z-10 top-1/2 -translate-y-1/2 cursor-pointer "
                        onClick={() => onPageSizeChange(customPageSize)}
                      />
                    ) : null}
                  </div>
                  {sizes.map((size: any) => (
                    <Listbox.Option
                      key={size}
                      className={({ active }: { active: boolean }) =>
                        classNames(
                          active ? "bg-border" : "",
                          "relative cursor-pointer select-none py-1 pl-3 pr-3"
                        )
                      }
                      value={size}
                    >
                      {({
                        selected,
                        active,
                      }: {
                        selected: boolean;
                        active: boolean;
                      }) => (
                        <>
                          <div className="flex items-center">
                            <span>{size}</span>
                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "" : "",
                                  "flex items-center mr-auto"
                                )}
                              >
                                <CheckCircleIcon
                                  className="h-4 w-4 text-emerald-500"
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
      <button
        onClick={(e) => {
          onSubmit({ ...pageQuery, pageNumber: 1 }, () =>
            queryUpdate("pageNumber", 1)
          );
        }}
        className={`${
          pageQuery?.pageNumber <= 1 ? "text-gray-400" : "hover:bg-gray-400"
        } rounded-full bg-border transition-all p-1`}
        disabled={pageQuery?.pageNumber <= 1}
        aria-label="first-page"
      >
        <ChevronDoubleRightIcon className={"h-4 w-4"} />
      </button>
      <button
        onClick={(e) => {
          onSubmit(
            { ...pageQuery, pageNumber: pageQuery?.pageNumber - 1 },
            () => queryUpdate("pageNumber", pageQuery?.pageNumber - 1)
          );
        }}
        className={`${
          pageQuery?.pageNumber <= 1 ? "text-gray-400" : "hover:bg-gray-400"
        } rounded-full bg-border transition-all p-1`}
        disabled={pageQuery?.pageNumber <= 1}
        aria-label="previous-page"
      >
        <ChevronRightIcon className={"h-4 w-4"} />
      </button>
      <div className={"text-center"}>
        <div className={"h-fit"}>
          صفحه{" "}
          {pageQuery?.pageNumber > Math.ceil(totalCount / pageQuery?.pageSize)
            ? 0
            : pageQuery?.pageNumber}
          <span className={"mx-4"}>از</span>
          {Math.ceil(totalCount / pageQuery?.pageSize)}{" "}
        </div>
        <div className={"text-xs text-mute"}>
          {formatDecimals(totalCount)} نتیجه یافت شد
        </div>
      </div>
      <button
        onClick={(e) => {
          onSubmit(
            { ...pageQuery, pageNumber: pageQuery?.pageNumber + 1 },
            () => queryUpdate("pageNumber", pageQuery?.pageNumber + 1)
          );
        }}
        className={`${
          pageQuery?.pageNumber >= Math.ceil(totalCount / pageQuery?.pageSize)
            ? "text-gray-400"
            : "hover:bg-gray-400"
        } rounded-full bg-border transition-all p-1`}
        disabled={
          pageQuery?.pageNumber >= Math.ceil(totalCount / pageQuery?.pageSize)
        }
        aria-label="next-page"
      >
        <ChevronLeftIcon className={"h-4 w-4"} />
      </button>
      <button
        onClick={(e) => {
          onSubmit(
            {
              ...pageQuery,
              pageNumber: Math.ceil(totalCount / pageQuery?.pageSize),
            },
            () =>
              queryUpdate(
                "pageNumber",
                Math.ceil(totalCount / pageQuery?.pageSize)
              )
          );
        }}
        className={`${
          pageQuery?.pageNumber >= Math.ceil(totalCount / pageQuery?.pageSize)
            ? "text-gray-400"
            : "hover:bg-gray-400"
        } rounded-full bg-border transition-all p-1`}
        disabled={
          pageQuery?.pageNumber >= Math.ceil(totalCount / pageQuery?.pageSize)
        }
        aria-label="last-page"
      >
        <ChevronDoubleLeftIcon className={"h-4 w-4"} />
      </button>
      {exportExcel ? (
        <ExcelExport ExportAction={exportExcel} disabled={totalCount > 0} />
      ) : null}
    </div>
  );
}
