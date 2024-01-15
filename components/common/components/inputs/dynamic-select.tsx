import {
  CheckIcon,
  ChevronDownIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { classNames } from "../../../../utils/common-funcions";
import { ADMIN_GATEWAY, ONLINE_TRADING } from "../../../../api/constants";
import useQuery from "../../../../hooks/useQuery";
import { EnumType } from "types/types";
import { FilterItemType } from "types/constant-filters.types";
import { useDispatch, useSelector } from "react-redux";
import { enums } from "store/enums.config";
import useSWR from "swr";

interface BaseInputPropsType {
  item: FilterItemType;
  value: any;
  onChange: (key: string, value: any, item?: FilterItemType) => void;
  dynamicsOption?: EnumType[];
}

const DynamicSelect = (props: BaseInputPropsType) => {
  const { item, value, onChange } = props;
  const { name, title, type, result = "" } = item;
  const [dynamicOptions, setDynamicOptions] = useState<any[]>([]);
  const { data, mutate } = useSWR(
    { url: `${ADMIN_GATEWAY}/api/request/businessEntity/Search` },
    { revalidateOnMount: false }
  );
  // const { enums: cachedEnums } = useSelector((state: any) => state.enumsConfig);
  // console.log({ cachedEnums });

  const { fetchAsyncData } = useQuery({ url: "" });
  const getTheOptions = async (endpoint: string) => {
    await fetchAsyncData({}, endpoint).then((res) => {
      setDynamicOptions(
        result ? res?.data?.result?.[result] : res?.data?.result
      );
    });
  };

  useEffect(() => {
    if (data?.result?.[result].length) {
      setDynamicOptions(data?.result?.[result]);
    }
  }, [data?.result]);

  useEffect(() => {
    if (type === "dynamic" && title) {
      switch (title) {
        case "MarketCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetAllMarkets`);
          break;
        case "OfferTypeCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetOfferTypes`);
          break;
        case "SideCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetAllOrderSides`);
          break;
        case "SettlementDelayCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetSettlementDelays`);
          break;
        case "CustomerTypeCode":
        case "CustomerCounterSideCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetCustomerTypes`);
          break;
        case "BourseCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetAllBourse`);
          break;
        case "InstrumentTypeCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetAllInstrumentType`);
          break;
        case "SectorCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetAllSectors`);
          break;
        case "SubSectorCode":
          getTheOptions(`${ONLINE_TRADING}/api/request/GetAllSubSectors`);
          break;
        case "ownerEntityCode":
        case "relatedEntityCode":
          mutate();
          break;
      }
    }
  }, [type]);

  return (
    <div>
      <label className={"mt-auto flex items-center text-sm"} htmlFor={title}>
        {name}
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
            onChange(title, e.code, item);
          }}
        >
          {({ open }) => (
            <div className="relative">
              <Listbox.Button className="relative h-[36px] flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                <span className="flex items-center">
                  <span className="ml-2 block truncate text-sm">
                    {
                      dynamicOptions.find((i: EnumType) => i.code === value)
                        ?.title
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
                  {dynamicOptions?.map((item: EnumType) => (
                    <Listbox.Option
                      key={item.title}
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

export default DynamicSelect;
