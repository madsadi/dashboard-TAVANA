import InputComponent from "./input-generator";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  memo,
  FormEvent,
} from "react";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { Button } from "./button/button";
import { FilterItemType } from "types/constant-filters.types";
import { throwToast } from "../../../utils/notification";
import { SearchComponentTypes } from "types/common-components.type";
import { QueryType } from "types/types";
import { lowerFirstLetter } from "utils/common-funcions";

const SearchComponent: React.FC<SearchComponentTypes> = forwardRef(
  (props, ref) => {
    const {
      onSubmit,
      module,
      loading,
      initialQuery,
      dynamicOptions = [],
      className,
      extraClassName,
    } = props;
    const {
      filters: initialFilters,
      initialValue,
      service,
      modules,
      restriction,
    } = useSearchFilters(module);
    const [filters, setFilters] = useState<any>(initialFilters);
    const [query, setQuery] = useState<any>(
      (initialQuery &&
        Object.fromEntries(
          Object.entries(initialQuery).map(([k, v]) => [lowerFirstLetter(k), v])
        )) ||
        Object.fromEntries(
          Object.entries(initialValue).map(([k, v]) => [lowerFirstLetter(k), v])
        )
    );

    const onChange = (key: string, value: any, item?: FilterItemType) => {
      if (item?.dependancy && item.onChange) {
        const _filters = filters;
        const newDependantInput = item.onChange(value);
        const oldDependantInput = _filters.findIndex(
          (f: any) => f.title === item?.dependancy
        );
        _filters.splice(oldDependantInput, 1, newDependantInput);
        setFilters(_filters);
      }
      let _query: QueryType = { ...query };
      _query[key] = value;
      setQuery(_query);
    };

    useImperativeHandle(ref, () => ({
      changeQueries(newQuery: any) {
        //define the type object
        let _query: QueryType = { ...query };
        setQuery({ ..._query, ...newQuery });
      },
    }));

    const queryValidationHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const requiredItems = filters?.filter(
        (item: FilterItemType) => item.isRequired
      );
      if (requiredItems?.length) {
        const emptyRequiredItems = requiredItems.filter(
          (item: FilterItemType) =>
            item.type === "date"
              ? !query.startDate || !query.endDate
              : query[item.title] === undefined || query[item.title] === null
        );
        if (emptyRequiredItems.length) {
          const warningItems = emptyRequiredItems
            .map((item: FilterItemType) => item.name)
            .join(", ");
          throwToast({
            type: "warning",
            value: `ورودی  ${warningItems} الزامی می باشد`,
          });
        } else {
          onSubmit(query);
        }
      } else {
        onSubmit(query);
      }
    };

    return (
      <form className={"flex flex-col grow"} onSubmit={queryValidationHandler}>
        <div
          className={
            "grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 " + className
          }
        >
          {filters?.map((item: FilterItemType) => {
            return (
              <InputComponent
                key={item.title}
                item={item}
                query={query}
                setQuery={setQuery}
                onChange={onChange}
                dynamicsOption={dynamicOptions}
              />
            );
          })}
        </div>
        <div
          className={
            "flex space-x-3 space-x-reverse mr-auto mt-10 h-fit " +
            extraClassName
          }
        >
          <Button
            label={"لغو فیلتر ها"}
            className=" bg-error h-fit "
            type="reset"
            onClick={(e) => {
              e.preventDefault();
              setQuery(initialValue);
            }}
          />
          <Button
            label={"جستجو"}
            className="bg-primary h-fit relative "
            type={"submit"}
            disabled={loading}
            loading={loading}
            allowed={
              restriction
                ? [[service?.[0], modules?.[0]?.[0], "Read"].join(".")]
                : []
            }
          />
        </div>
      </form>
    );
  }
);

export default memo(SearchComponent);
SearchComponent.displayName = "SearchComponent";
