export const branchesListOfForm = [
    { title: 'subsidiaryId', name: 'شناسه شرکت', type: 'input' },
    { title: 'code', name: 'کد شعبه', type: 'input', valueType: 'number' },
    { title: 'title', name: 'نام شعبه', type: 'input' },
    { title: 'countryId', name: 'شناسه کشور (برای آدرس شعبه)', type: 'input' },
    { title: 'provinceId', name: 'شناسه استان (برای آدرس شعبه)', type: 'input' },
    { title: 'cityId', name: 'شناسه شهر (برای آدرس شعبه)', type: 'input' },
    { title: 'sectionId', name: 'شناسه بخش (برای آدرس شعبه)', type: 'input' },
    { title: 'tel', name: 'شماره تلفن', type: 'input' },
    { title: 'mobile', name: 'شماره موبایل', type: 'input' },
    { title: 'fax', name: 'فکس', type: 'input' },
    { title: 'address', name: 'آدرس خیابان', type: 'input' },
    { title: 'alley', name: 'نام کوچه', type: 'input' },
    { title: 'plaque', name: 'پلاک', type: 'input' },
    { title: 'postalCode', name: 'کد پستی', type: 'input' },
    { title: 'type', name: 'نوع شعبه', type: 'selectInput' },
]
export const subsidiaryListOfForm = [
    { title: 'sejamProfileId', name: 'شناسه ثبت نام شرکت', type: 'input' },
    { title: 'title', name: 'عنوان شرکت', type: 'input' },
    { title: 'subsidiaryTypeCode', name: 'کد نوع شرکت', type: 'input', valueType: 'number' },
]
export const employeeListOfForm = [
    { title: 'firstName', name: 'نام', type: 'input' },
    { title: 'lastName', name: ' نام خانوادگی', type: 'input' },
    { title: 'nationalId', name: 'کد ملی', type: 'input' },
    { title: 'mobile', name: 'موبایل', type: 'input' },
    { title: 'workPhone', name: 'تلفن', type: 'input' },
    { title: 'email', name: 'ایمیل', type: 'input' },
    { title: 'idpAccountId', name: 'شناسه حساب کاربری', type: 'input' },
    { title: 'branchId', name: 'شناسه شعبه', type: 'input' },
]
export const businessUnitListOfForm = [
    { title: 'code', name: 'کد واحد کاری', type: 'input', valueType: 'number' },
    { title: 'title', name: 'عنوان واحد کاری', type: 'input' },
    { title: 'businessUnitOrder', name: 'اولویت واحد کاری', type: 'input', valueType: 'number' },
]
export const stationListOfForm = [
    { title: 'brokerCode', name: 'کد کارگزاری', type: 'input', valueType: 'number' },
    { title: 'code', name: 'کد ایستگاه معاملاتی', type: 'input', valueType: 'number' },
    { title: 'title', name: 'عنوان ایستگاه معاملاتی', type: 'input' },
    { title: 'type', name: 'نوع ایستگاه معاملاتی', type: 'input', valueType: 'number' },
    { title: 'branchId', name: 'شناسه شعبه کارگزاری', type: 'input' },
]
export const traderListOfForm = [
    { title: 'stationId', name: 'شناسه ایستگاه معاملاتی', type: 'input' },
    { title: 'employeeId', name: 'شناسه کارمند', type: 'input' },
    { title: 'title', name: 'عنوان معامله گر', type: 'input' },
    { title: 'isActive', name: 'فعال/غیرفعال', type: 'input' },
]
export const marketerListOfForm = [
    { title: 'type', name: 'نوع بازاریاب', type: 'input' },
    { title: 'customerId', name: 'شناسه مشتری', type: 'input' },
    { title: 'branchId', name: 'شناسه شعبه', type: 'input' },
]
export const agreementListOfForm = [
    { title: 'subsidiaryId', name: 'شناسه شرکت', type: 'input' },
    { title: 'bourseCodeType', name: 'نوع کدبورسی', type: 'input' },
    { title: 'name', name: 'عنوان توافقنامه', type: 'input' },
    { title: 'description', name: 'توضیحات', type: 'input' },
    { title: 'context', name: 'متن توافقنامه', type: 'input' },
    { title: 'defaultFileId', name: 'شناسه فایل پیش فرض توافقنامه', type: 'input' },
    { title: 'isBourseCodeRequired', name: 'کد بورسی نیاز دارد؟', type: 'input' },
    { title: 'isRequired', name: 'توافقنامه اجباری است؟', type: 'input' },
]
export const customerAgreementListOfForm = [
    { title: 'customerId', name: 'شناسه مشتری', type: 'input' },
    { title: 'agreementId', name: 'شناسه توافقنامه', type: 'input' },
    { title: 'bourseCode', name: 'کدبورسی مشتری', type: 'input', valueType: 'number' },
    { title: 'tradeCode', name: 'کدمعاملاتی', type: 'input', valueType: 'number' },
    { title: 'state', name: 'وضعیت', type: 'input' },
    { title: 'description', name: 'توضیحات', type: 'input' },
    { title: 'customerApprovalDateTime', name: 'زمان تائید مشتری', type: 'date' },
    { title: 'adminApprovalDateTime', name: 'زمان تائید امین', type: 'date' },
    { title: 'startDateTime', name: 'تاریخ شروع', type: 'date' },
    { title: 'endDateTime', name: 'تاریخ پایان', type: 'date' },
]
