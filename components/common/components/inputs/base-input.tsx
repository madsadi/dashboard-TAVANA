import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

interface BaseInputPropsType {
    item: any,
    value: any,
    onChange: any
}
export const BaseInput = (props: BaseInputPropsType) => {
    const { item, value, onChange } = props;
    const { name, title, valueType, readOnly, isRequired, placeholder, dir } = item

    return (
        <div>
            <label className={'flex items-center text-sm'} htmlFor={title}>
                {name}
                {isRequired ? <span className={'min-w-5 mr-2'}>
                    <ExclamationCircleIcon
                        className={'h-4 w-4 text-red-500'} />
                </span> : null}
                {value || value === false ?
                    <XCircleIcon className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => {
                        onChange(title, '')
                    }} /> : null}
            </label>
            <input className={'w-full h-[36px]'}
                type={valueType || 'text'}
                readOnly={readOnly}
                dir={dir || valueType === 'number' ? 'ltr' : 'rtl'}
                id={title}
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    if (valueType === 'number') {
                        onChange(title, Number(e.target.value))
                    } else {
                        onChange(title, e.target.value)
                    }
                }} />
        </div>
    )
}