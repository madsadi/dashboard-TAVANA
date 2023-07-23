import filters from '../constants/filters'

export function useSearchFilters(module: string, feature?: string) {
    const dictionary: any = filters;
    let permissions = Object.keys(dictionary[module]?.module)?.map((m: string) => dictionary[module]?.module[m].permissions.map((p: string) => [dictionary[module]?.service, dictionary[module]?.module[m].name, p].join('.')))

    return {
        filters: dictionary[module]?.search?.filters,
        initialValue: dictionary[module]?.search?.initialValue,
        toolbar: feature ? dictionary[module]?.toolbar?.[feature] : null,
        service: dictionary[module]?.service,
        module: dictionary[module]?.module?.primary?.name,
        module_secondary: dictionary[module]?.module?.secondary?.name,
        restriction: permissions.flat(1).length > 0
    }
}