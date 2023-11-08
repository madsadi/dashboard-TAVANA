import React, { Dispatch } from "react";
import SymbolSearchSection from "./symbol-search-secion";
import RoleSearchSection from "./role-search-section";
import { BaseInput } from "./inputs/base-input";
import { PasswordInput } from "./inputs/password-input";
import { SelectInput } from "./inputs/select-input";
import { DynamicSelect } from "./inputs/dynamic-select";
import { SingleDateInput } from "./inputs/single-date-input";
import { SecondDynamicSelect } from "./inputs/second-dynamic-select";
import { RangeDateInput } from "./inputs/range-date-input";
import { TimeValueInput } from "./inputs/time-value-input";
import DynamicSearch from "./inputs/dynamic-search";
import { FilterItemType } from "types/constant-filters.types";
import { EnumType, QueryType } from "types/types";

type PropsType = {
  query: QueryType;
  onChange: (key: string, value: any) => void;
  setQuery?: Dispatch<any>;
  item: FilterItemType;
  dynamicsOption?: EnumType[];
  dataHelper?: any;
};
const InputComponent = (props: PropsType) => {
  const {
    onChange,
    setQuery,
    query,
    item,
    dynamicsOption = [],
    dataHelper,
  } = props;

  const { title, type } = item;

  const componentRender = () => {
    switch (type) {
      case "singleDate":
        return (
          <SingleDateInput query={query} onChange={onChange} item={item} />
        );
      case "date":
        return <RangeDateInput item={item} query={query} setQuery={setQuery} />;
      case "input":
        return (
          <BaseInput item={item} value={query?.[title]} onChange={onChange} />
        );
      case "password":
        return (
          <PasswordInput
            item={item}
            onChange={onChange}
            value={query?.[title]}
          />
        );
      case "selectInput":
        return (
          <SelectInput
            item={item}
            value={query?.[title]}
            onChange={onChange}
            dynamicsOption={dynamicsOption}
          />
        );
      case "selectInputTime":
        return (
          <TimeValueInput
            query={query}
            item={item}
            onChange={onChange}
            dynamicsOption={dynamicsOption}
          />
        );
      case "dynamicSelectInput":
        return (
          <SecondDynamicSelect
            item={item}
            value={query?.[title]}
            onChange={onChange}
            dynamicsOption={dynamicsOption}
          />
        );
      case "dynamic":
        return (
          <DynamicSelect
            item={item}
            onChange={onChange}
            value={query?.[title]}
          />
        );
      case "dynamicSearch":
        return (
          <DynamicSearch
            queryUpdate={onChange}
            setQuery={setQuery}
            query={query}
            item={item}
            dataHelper={dataHelper}
          />
        );
      case "search":
        return (
          <div>
            <SymbolSearchSection
              item={item}
              query={query}
              queryUpdate={onChange}
            />
          </div>
        );
      case "searchRoles":
        return (
          <div>
            <RoleSearchSection query={query} queryUpdate={onChange} />
          </div>
        );
      default:
        return null;
    }
  };

  return componentRender();
};

export default InputComponent;
