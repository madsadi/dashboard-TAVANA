import { prepare, seperate_modules } from "../utils/permission-utils";
import filters from "../constants/filters";
import { lowerFirstLetter } from "utils/common-funcions";
import { FilterItemType } from "types/constant-filters.types";

export function useSearchFilters(module: string, feature?: string) {
  const dictionary: any = filters;
  let permissions: any = prepare(dictionary[module]?.services);
  let services =
    dictionary[module]?.services !== undefined
      ? Object.keys(dictionary[module]?.services)
      : [];

  if (module) {
    return {
      filters: dictionary[module]?.search?.filters.map(
        (item: FilterItemType) => ({
          ...item,
          title: lowerFirstLetter(item.title),
        })
      ),
      initialValue: dictionary[module]?.search?.initialValue,
      toolbar: feature ? dictionary[module]?.toolbar?.[feature] : null,
      service: services,
      modules: seperate_modules(dictionary[module]?.services),
      restriction: permissions.length > 0,
    };
  } else {
    return {
      filters: null,
      initialValue: null,
      toolbar: null,
      service: null,
      modules: null,
      restriction: null,
    };
  }
}
