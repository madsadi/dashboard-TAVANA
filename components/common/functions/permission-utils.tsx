export const isAllowed = ({ userPermissions, whoIsAllowed }: { userPermissions: string[], whoIsAllowed: string[] | any }) => {
    if (whoIsAllowed !== undefined && whoIsAllowed.length > 0) {
        let _whoIsAllowedServiceAll = whoIsAllowed?.map((a: string) => [a.split('.')[0], 'All'].join('.'))
        let _whoIsAllowedModuleAll = whoIsAllowed?.map((a: string) => [a.split('.')[0], a.split('.')[1], 'All'].join('.'))
        let _whoIsAllowedDuplications: string[] = [...whoIsAllowed, ..._whoIsAllowedServiceAll, ..._whoIsAllowedModuleAll]

        let _whoIsAllowedUnique = _whoIsAllowedDuplications.reduce((partial: string[], item: string) =>
            (partial.includes(item) ? partial : [...partial, item])
            , [])

        let isAllowed = _whoIsAllowedUnique?.some((p: string) => userPermissions.indexOf(p) >= 0)
        return isAllowed
    }
    return true
}


export const prepare = (obj: any) => {
    let services = []
    const multiple = (service: string, obj: any) => {
        let result = obj.map((m: any) => m.permissions.map((p: string) => [service, m.module, p].join('.')))
        return result
    }
    if (obj !== undefined) {
        services = Object.keys(obj).map((s: string) => multiple(s, obj[s]))
    }

    return services?.flat(2)
}

export const seperate_modules = (obj: any) => {
    const multiple = (obj: any) => {
        let result = obj.map((m: any) => m.module)
        return result
    }

    let modules = Object.keys(obj).map((s: string) => multiple(obj[s]))

    return modules
}