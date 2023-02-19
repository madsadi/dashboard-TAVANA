import moment from "jalali-moment";

export const formatNumber = (params: any) => {
    if (typeof params.value ==='number'){
        return Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }else{
        return params.value
    }
};

export const jalali = (date: string) => {
    const jalali = moment(date).locale('fa');
    return {date: jalali.format("YYYY/MM/DD"), time: jalali.format("HH:mm:ss")}
}

export const dateRangeHandler = (selectedDayRange: any) => {
    if (selectedDayRange.from && selectedDayRange.to) {
        return ` از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}   تا   ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day} `
    } else if (!selectedDayRange.from && !selectedDayRange.to) {
        return ''
    } else if (!selectedDayRange.from) {
        return ''
    } else if (!selectedDayRange.to) {
        return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا اطلاع ثانویه`
    }
}
