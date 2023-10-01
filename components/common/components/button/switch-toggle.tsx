import { Switch } from "@headlessui/react"
import { useSelector } from "react-redux"
import { isAllowed } from "../../functions/permission-utils"

interface switchTogglePropsType {
    isChecked: boolean,
    onChange: (checked: boolean) => void,
    disabled?: boolean,
    allowed?: string[],
    labelBefore?: string,
    labelAfter?: string
}

export const SwitchToggle = (props: switchTogglePropsType) => {
    const { isChecked, onChange, disabled, allowed, labelBefore, labelAfter } = props
    const { user_permissions: userPermissions } = useSelector((state: any) => state.appConfig)

    return (
        <div className="flex items-center space-x-2 space-x-reverse">
            {labelBefore ? <span>{labelBefore}</span> : null}
            <Switch
                checked={isChecked}
                disabled={!isAllowed({ userPermissions, whoIsAllowed: allowed }) || disabled}
                onChange={onChange}
                className={`${isChecked ? 'bg-primary' : 'bg-error'}
          relative inline-flex w-[40px] !h-[20px] shrink-0 cursor-pointer rounded-full disabled:!bg-gray-500 disabled:cursor-not-allowed border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                    aria-hidden="true"
                    className={`${isChecked ? '-translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            {labelAfter ? <span>{labelAfter}</span> : null}
        </div>
    )
}