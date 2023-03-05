export const subsidiaryListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'Title', name: ` نام شرکت`, type: 'input' },
]
export const branchListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'Title', name: ` عنوان شعبه `, type: 'input' },
    { title: 'Code', name: ` کد شعبه`, type: 'input', valueType: 'number' },
    { title: 'type', name: ` نوع شعبه`, type: 'selectInput' },
    { title: 'SubsidiaryTitle', name: ` عنوان شرکت `, type: 'input' },
    { title: 'IsDeleted', name: ` وضعیت `, type: 'selectInput' },
    { title: 'date', name: ` تاریخ شروع و پایان `, type: 'date' },
]
export const employeeListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'Id', name: `شناسه کارمند`, type: 'input' },
]
export const businessUnitListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'Title', name: `عنوان واحد کاری`, type: 'input' },
    { title: 'Code', name: `کد واحد کاری`, type: 'input', valueType: 'number' },
    { title: 'date', name: ` تاریخ شروع و پایان `, type: 'date' },
]
export const stationListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'Title', name: `عنوان ایستگاه`, type: 'input' },
    { title: 'Code', name: `کد ایستگاه`, type: 'input', valueType: 'number' },
    { title: 'BrokerTitle', name: `عنوان کارگزاری`, type: 'input' },
    { title: 'BranchTitle', name: `عنوان شعبه`, type: 'input' },
    { title: 'Type', name: 'نوع ایستگاه معاملاتی', type: 'selectInput' },
    { title: 'date', name: ` تاریخ شروع و پایان `, type: 'date' },
]
export const traderListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'Title', name: `عنوان ایستگاه`, type: 'input' },
    { title: 'Code', name: `کد ایستگاه`, type: 'input', valueType: 'number' },
    { title: 'BrokerTitle', name: `عنوان کارگزاری`, type: 'input' },
    { title: 'BranchTitle', name: `عنوان شعبه`, type: 'input' },
    { title: 'Type', name: `نوع`, type: 'input' },
    { title: 'date', name: ` تاریخ شروع و پایان `, type: 'date' },
]
export const marketerListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'UniqueId', name: `شناسه`, type: 'input' },
    { title: 'FirstName', name: `نام`, type: 'input' },
    { title: 'LastName', name: `نام خانوادگی`, type: 'input' },
    { title: 'Mobile', name: `شماره موبایل`, type: 'input' },
    { title: 'Type', name: `نوع`, type: 'selectInput' },
    { title: 'SubsidiaryId', name: `شناسه شرکت`, type: 'input' },
    { title: 'BranchId', name: `شناسه شعبه`, type: 'input' },
    { title: 'IsActive', name: `وضعیت`, type: 'selectInput' },
    { title: 'date', name: ` تاریخ شروع و پایان `, type: 'date' },
]
export const customerAgreementListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'AgreementTitle', name: `عنوان توافقنامه`, type: 'input' },
    { title: 'CustomerUniqueId', name: `شناسه مشتری`, type: 'input' },
    { title: 'SubsidiaryTitle', name: `عنوان شرکت`, type: 'input' },
    { title: 'BranchTitle', name: `عنوان شعبه`, type: 'input' },
    { title: 'RelatedBourseCodeTitle', name: `عنوان کد بورسی مرتبط`, type: 'input' },
    { title: 'State', name: `وضعیت قرارداد`, type: 'selectInput' },
    { title: 'IsRequired', name: `ضروری`, type: 'selectInput' },
    { title: 'IsActive', name: `فعال / غیرفعال`, type: 'selectInput' },
    { title: 'IsDeleted', name: `وضعیت`, type: 'selectInput' },
    { title: 'date', name: ` تاریخ شروع و پایان `, type: 'date' },
]
export const marketerContractListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'Title', name: `عنوان قرارداد بازاریابی`, type: 'input' },
    { title: 'Type', name: `نوع قرارداد بازاریابی`, type: 'selectInput' },
    { title: 'CalculationBase', name: `روش محاسبه کارمزد`, type: 'selectInput' },
    { title: 'CommissionCoefficientType', name: `نوع ضریب کارمزد`, type: 'input' },
    { title: 'IsActive', name: `وضعیت فعالیت`, type: 'selectInput' },
    { title: 'IsDeleted', name: `حذف شده؟`, type: 'selectInput' },
    { title: 'date', name: ` تاریخ شروع و پایان `, type: 'date' },
]
