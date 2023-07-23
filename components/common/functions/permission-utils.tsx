export const isAllowed = ({ userPermissions, whoIsAllowed }: { userPermissions: string[], whoIsAllowed: string[] | undefined }) => {
    if (whoIsAllowed !== undefined && whoIsAllowed.length > 0) {
        let isAllowed = whoIsAllowed?.some((p: string) => userPermissions.indexOf(p) >= 0)
        return isAllowed
    }
    return true
}