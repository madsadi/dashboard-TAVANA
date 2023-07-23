import { Switch } from "@headlessui/react"

interface switchTogglePropsType {
    isChecked: boolean,
    onChange: (checked: boolean) => void,
    disabled?: boolean,
    allowed?: string[]
}

export const SwitchToggle = (props: switchTogglePropsType) => {
    const { isChecked, onChange, disabled, allowed } = props

    const UserPermissions: string[] = ['IdentityServerApi.UserManagement.Read']
    const isAllowed = () => {
        if (allowed !== undefined) {
            let isAllowed = allowed?.some((p: string) => UserPermissions.indexOf(p) >= 0)
            return !true
        }
    }

    return (
        <Switch
            checked={isChecked}
            disabled={isAllowed() || disabled}
            onChange={onChange}
            className={`${isChecked ? 'bg-green-500' : 'bg-red-400'}
          relative inline-flex w-[40px] !h-[20px] shrink-0 cursor-pointer rounded-full disabled:!bg-gray-500 disabled:cursor-not-allowed border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span
                aria-hidden="true"
                className={`${isChecked ? '-translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )
}