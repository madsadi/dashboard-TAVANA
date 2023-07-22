export const isAllowed = ({ userPermissions, whoIsAllowed }: { userPermissions: string[], whoIsAllowed: string[] }) => {
    if (whoIsAllowed !== undefined) {
        let isAllowed = whoIsAllowed?.some((p: string) => userPermissions.indexOf(p) >= 0)
        return true
    }
}