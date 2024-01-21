import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import useQuery from "../../../../hooks/useQuery";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import {
  FilterItemDynamicType,
  FilterItemType,
} from "types/constant-filters.types";
import { QueryType } from "types/types";

interface DynamicSearchProps {
  item: FilterItemDynamicType;
  queryUpdate: (key: string, value: any, item?: FilterItemType) => void;
  setQuery: any;
  query: QueryType;
  dataHelper: any;
}

export default function DynamicSearch(props: DynamicSearchProps) {
  const { item, queryUpdate, setQuery, query, dataHelper } = props;
  const {
    title,
    name,
    endpoint,
    revalidateOnMount,
    valueField = [],
    placeholder,
    isMultiple,
    hasPlaceholder = true,
    queryField,
    recordField,
    alternative,
    isRequired,
    inputAble,
    readOnly,
    alternativeRelatedRecordField,
    isDisabled,
    resultField = "pagedData",
  } = item;
  const [page, setPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [findings, setFindings] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data, fetchAsyncData, fetchData } = useQuery({
    url: endpoint,
  });
  const searchHandler = (item: string, page: number) => {
    setSearchItem(item);
    if (inputAble) {
      queryUpdate(title, item);
    }
    if (item.length > 0) {
      let _query: any = { PageNumber: page, PageSize: 20 };
      _query[queryField] = item;
      setIsLoading(true);
      fetchAsyncData(_query)
        .then((res: any) => {
          if (searchItem === item) {
            setPage(page + 1);
            setFindings([...findings, ...res?.data.result?.[resultField]]);
          } else {
            setPage(page);
            setFindings(res?.data.result?.[resultField]);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (data) {
      setFindings([...findings, ...data?.result?.[resultField]]);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!query?.[title]) {
      setSearchItem("");
    }
  }, [query?.[title]]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
          if (revalidateOnMount) setIsOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const selectHandler = (record: any) => {
    if (!isMultiple) {
      setOpen(false);
    }
    if (revalidateOnMount) setIsOpen(false);

    if (alternative && alternativeRelatedRecordField) {
      let _query: any = {};
      _query[alternative] = record[alternativeRelatedRecordField];
      _query[title] = record[recordField];
      setQuery({ ...query, ..._query });
    } else {
      if (isMultiple) {
        let _query: any = {};
        if (!query[title].includes(record[recordField])) {
          _query[title] = [...query[title], record[recordField]];
          queryUpdate(title, _query[title], item);
        }
      } else {
        queryUpdate(title, record[recordField], item);
      }
    }
    if (!isMultiple) {
      setSearchItem(
        valueField
          ?.map((F: any) => {
            if (F === "isActive") {
              return record[F] ? "فعال" : "غیر فعال";
            } else {
              return record[F];
            }
          })
          .join(" ")
      );
    }
  };

  const removeHandler = (item: any) => {
    let _query: any = query[title];

    const index = _query.findIndex((r: any) => r === item);
    _query.splice(index, 1);
    queryUpdate(title, _query, item);
  };

  useEffect(() => {
    if (revalidateOnMount) {
      setIsOpen(true);
      fetchData({}, () => setOpen(true));
    }
  }, [revalidateOnMount]);

  return (
    <div className={`relative`} ref={wrapperRef}>
      <div className={"relative"}>
        <label className={"flex items-center text-sm"} htmlFor="InstrumentId">
          {name}
          {isRequired ? (
            <span className={"min-w-5 mr-2"}>
              <ExclamationCircleIcon className={"h-4 w-4 text-red-500"} />
            </span>
          ) : null}
          {(query?.[title] || query?.[title] === false || searchItem) &&
          !isDisabled ? (
            <XCircleIcon
              className="h-5 w-5 text-gray-400 mr-2 cursor-pointer"
              onClick={() => {
                let _query: QueryType = {};
                _query[alternative || "default"] = "";
                if (isMultiple) {
                  _query[title] = [];
                } else {
                  _query[title] = "";
                }
                setQuery({ ...query, ..._query });
                setSearchItem("");
              }}
            />
          ) : null}
        </label>
        <input
          id={title}
          className={
            "w-full h-[36px] focus:outline-none focus:!border-gray-300"
          }
          disabled={isDisabled}
          autoFocus={false}
          value={searchItem}
          readOnly={readOnly}
          onFocus={() => {
            setOpen(true);
            if (revalidateOnMount) setIsOpen(true);
          }}
          placeholder={
            hasPlaceholder
              ? dataHelper?.[placeholder || "default"] || query?.[title]
              : null
          }
          onChange={(e) => {
            searchHandler(e.target.value, 1);
            if (!open) setOpen(true);
          }}
        />
        {isMultiple ? (
          <div className="absolute flex w-full right-2 left-6 overflow-x-auto bottom-2 break-inside-avoid custom-scrollbar space-x-2 space-x-reverse">
            {query?.[title]?.map((item: any) => {
              return (
                <div
                  className="min-w-fit rounded-full border border-border text-sm px-1 cursor-pointer"
                  onClick={() => removeHandler(item)}
                  key={item}
                >
                  {item}
                </div>
              );
            })}
          </div>
        ) : null}
        <div
          className={
            "absolute left-1 bottom-0 -translate-y-1/3 flex z-10 cursor-pointer"
          }
          onClick={() => {
            setOpen(true);
            if (revalidateOnMount) setIsOpen(true);
          }}
        >
          {isLoading && searchItem && (
            <div className={"animate-spin h-5 w-5"}>
              <Image
                alt={"search"}
                height={32}
                width={32}
                src={"/icons/spinner.svg"}
              />
            </div>
          )}
          <MagnifyingGlassIcon className={"h-5 w-5"} />
        </div>
      </div>
      {((searchItem && !isDisabled && open) || isOpen) && (
        <div
          className={
            "absolute w-full p-2 opacity-95 backdrop-blur-lg bg-white shadow-md rounded-lg top-full mt-3 z-10"
          }
        >
          <InfiniteScroll
            dataLength={findings.length}
            next={() => searchHandler(searchItem, page)}
            hasMore={findings.length < data?.result?.totalCount}
            loader={<h4>در حال بارگزاری...</h4>}
            height={150}
            className={"custom-scrollbar overflow-y-auto"}
            endMessage={
              <p className={"text-center max-w-full text-wrap"}>
                <b>تمام نتایج برای {searchItem}</b>
              </p>
            }
          >
            {findings.length > 0 ? (
              findings.map((item: any) => {
                return (
                  <li
                    className={
                      "odd:bg-gray-200 text-wrap rounded-md px-2 py-1 overflow-x-auto custom-scrollbar mb-0.5 flex items-center hover:bg-gray-400 cursor-pointer"
                    }
                    key={item?.id}
                    onClick={() => selectHandler(item)}
                  >
                    <div>
                      {valueField
                        ?.map((F: string) => {
                          if (F === "isActive") {
                            return item[F] ? "فعال" : "غیر فعال";
                          } else if (item[F]) {
                            return item[F];
                          }
                        })
                        .join(" - ")}
                    </div>
                  </li>
                );
              })
            ) : (
              <div>نتیجه ای یافت نشد</div>
            )}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
