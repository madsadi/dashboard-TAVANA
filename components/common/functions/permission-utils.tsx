export const isAllowed = ({ userPermissions, whoIsAllowed }: { userPermissions: string[], whoIsAllowed: string[] | undefined }) => {
    if (whoIsAllowed !== undefined) {
        let isAllowed = whoIsAllowed?.some((p: string) => userPermissions.indexOf(p) >= 0)
        return true
    }
    return true
}