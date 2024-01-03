import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import useQuery from "../../../../hooks/useQuery";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { FilterItemDynamicType } from "types/constant-filters.types";
import { QueryType } from "types/types";

interface DynamicSearchProps {
  item: FilterItemDynamicType;
  queryUpdate: (key: string, value: any) => void;
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
    valueField = [],
    placeholder,
    queryField,
    recordField,
    alternative,
    isRequired,
    inputAble,
    readOnly,
    alternativeRelatedRecordField,
    resultField = "pagedData",
  } = item;
  const [page, setPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [findings, setFindings] = useState<any>([]);
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { data, fetchAsyncData } = useQuery({ url: endpoint });

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

  const select = (record: any) => {
    setOpen(false);
    if (alternative && alternativeRelatedRecordField) {
      let _query: any = {};
      _query[alternative] = record[alternativeRelatedRecordField];
      _query[title] = record[recordField];
      setQuery({ ...query, ..._query });
    } else {
      queryUpdate(title, record[recordField]);
    }
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
  };

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
          !readOnly ? (
            <XCircleIcon
              className="h-5 w-5 text-gray-400 mr-2 cursor-pointer"
              onClick={() => {
                let _query: QueryType = {};
                _query[alternative || "default"] = "";
                _query[title] = "";
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
          value={searchItem}
          readOnly={readOnly}
          onFocus={() => setOpen(true)}
          placeholder={dataHelper?.[placeholder || "default"] || query?.[title]}
          onChange={(e) => {
            searchHandler(e.target.value, 1);
            setOpen(true);
          }}
        />
        <div className={"absolute left-1 bottom-0 -translate-y-1/3 flex"}>
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
      {searchItem && open && (
        <div
          className={
            "absolute w-full p-2 opacity-95 backdrop-blur-lg bg-white shadow-md rounded-lg top-full mt-3 z-10"
          }
        >
          <InfiniteScroll
            dataLength={findings.length}
            next={() => searchHandler(searchItem, page)}
            hasMore={findings.length < data?.result?.totalCount}
            loader={<h4>Loading...</h4>}
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
                    onClick={() => select(item)}
                  >
                    <div>
                      {valueField
                        ?.map((F: string) => {
                          if (F === "isActive") {
                            return item[F] ? "فعال" : "غیر فعال";
                          } else if (item[F]) {
                            console.log(item[F]);

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
