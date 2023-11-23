import { toast } from "react-toastify";

export const throwToast = ({ type = 'error', value = '' }: { type: string, value: any }) => {
    switch (type) {
        case 'success':
            toast.success(`${value}`)
            break;
        case 'error':
            if (value.code === 401) {
                toast.error('توکن شما معتبر نمی باشد')
            } else if (value.code === 'ERR_NETWORK') {
                toast.error('مشکلی در برقراری ارتباط پیش آمده')
            } else {
                if (value?.response?.data?.error?.message) {
                    toast.error(`${value?.response?.data?.error?.message}`)
                } else {
                    toast.error('نا موفق')
                }
            }
            break;
        case 'customError':
            toast.error(`${value}`)
            break;
        case 'warning':
            toast.warning(`${value}`)
            break;
        case 'info':
            toast.info(`${value}`)
            break;
    }
}