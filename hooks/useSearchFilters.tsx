import { prepare, seperate_modules } from "../utils/permission-utils";
import filters from "../constants/filters";

export function useSearchFilters(module: string, feature?: string) {
  const dictionary: any = filters;
  let permissions: any = prepare(dictionary[module]?.services);
  let services =
    dictionary[module]?.services !== undefined
      ? Object.keys(dictionary[module]?.services)
      : [];

  if (module) {
    return {
      filters: dictionary[module]?.search?.filters,
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
