export const branchesListOfForm = [
    { title: 'subsidiaryId', name: 'شناسه شرکت', type: 'input',initialValue:'' },
    { title: 'code', name: 'کد شعبه', type: 'input', valueType: 'number',initialValue:null },
    { title: 'title', name: 'نام شعبه', type: 'input',initialValue:'' },
    { title: 'countryId', name: 'شناسه کشور (برای آدرس شعبه)', type: 'input',initialValue:'' },
    { title: 'provinceId', name: 'شناسه استان (برای آدرس شعبه)', type: 'input',initialValue:'' },
    { title: 'cityId', name: 'شناسه شهر (برای آدرس شعبه)', type: 'input',initialValue:'' },
    { title: 'sectionId', name: 'شناسه بخش (برای آدرس شعبه)', type: 'input' ,initialValue:''},
    { title: 'tel', name: 'شماره تلفن', type: 'input',initialValue:'' },
    { title: 'mobile', name: 'شماره موبایل', type: 'input' ,initialValue:''},
    { title: 'fax', name: 'فکس', type: 'input',initialValue:'' },
    { title: 'address', name: 'آدرس خیابان', type: 'input',initialValue:'' },
    { title: 'alley', name: 'نام کوچه', type: 'input' ,initialValue:''},
    { title: 'plaque', name: 'پلاک', type: 'input',initialValue:'' },
    { title: 'postalCode', name: 'کد پستی', type: 'input' ,initialValue:''},
    { title: 'type', name: 'نوع شعبه', type: 'selectInput',initialValue:null },
]
export const subsidiaryListOfForm = [
    { title: 'sejamProfileId', name: 'شناسه ثبت نام شرکت', type: 'input' ,initialValue:''},
    { title: 'title', name: 'عنوان شرکت', type: 'input' ,initialValue:''},
    { title: 'subsidiaryTypeCode', name: 'کد نوع شرکت', type: 'input', valueType: 'number',initialValue:null },
]
export const employeeListOfForm = [
    { title: 'firstName', name: 'نام', type: 'input',initialValue:'' },
    { title: 'lastName', name: ' نام خانوادگی', type: 'input',initialValue:'' },
    { title: 'nationalId', name: 'کد ملی', type: 'input' ,initialValue:''},
    { title: 'mobile', name: 'موبایل', type: 'input',initialValue:'' },
    { title: 'workPhone', name: 'تلفن', type: 'input',initialValue:'' },
    { title: 'email', name: 'ایمیل', type: 'input' ,initialValue:''},
    { title: 'idpAccountId', name: 'شناسه حساب کاربری', type: 'input',initialValue:'' },
    { title: 'branchId', name: 'شناسه شعبه', type: 'input' ,initialValue:''},
]
export const businessUnitListOfForm = [
    { title: 'code', name: 'کد واحد کاری', type: 'input', valueType: 'number',initialValue:null },
    { title: 'title', name: 'عنوان واحد کاری', type: 'input',initialValue:'' },
    { title: 'businessUnitOrder', name: 'اولویت واحد کاری', type: 'input', valueType: 'number',initialValue:null },
]
export const stationListOfForm = [
    { title: 'brokerCode', name: 'کد کارگزاری', type: 'input', valueType: 'number',initialValue:null },
    { title: 'code', name: 'کد ایستگاه معاملاتی', type: 'input', valueType: 'number',initialValue:null },
    { title: 'title', name: 'عنوان ایستگاه معاملاتی', type: 'input',initialValue:'' },
    { title: 'type', name: 'نوع ایستگاه معاملاتی', type: 'selectInput',initialValue:null },
    { title: 'branchId', name: 'شناسه شعبه کارگزاری', type: 'input',initialValue:'' },
]
export const traderListOfForm = [
    { title: 'stationId', name: 'شناسه ایستگاه معاملاتی', type: 'input',initialValue:'' },
    { title: 'employeeId', name: 'شناسه کارمند', type: 'input',initialValue:'' },
    { title: 'title', name: 'عنوان معامله گر', type: 'input',initialValue:'' },
    { title: 'isActiveWithNoNull', name: 'فعال/غیرفعال', type: 'selectInput',initialValue:false },
]
export const marketerListOfForm = [
    { title: 'type', name: 'نوع بازاریاب', type: 'selectInput',initialValue:'' },
    { title: 'customerId', name: 'شناسه مشتری', type: 'input',initialValue:'' },
    { title: 'branchId', name: 'شناسه شعبه', type: 'input' ,initialValue:''},
]
export const agreementListOfForm = [
    { title: 'subsidiaryId', name: 'شناسه شرکت', type: 'input',initialValue:'' },
    { title: 'bourseCodeType', name: 'نوع کدبورسی', type: 'input', valueType: 'number',initialValue:null },
    { title: 'name', name: 'عنوان توافقنامه', type: 'input' ,initialValue:''},
    { title: 'description', name: 'توضیحات', type: 'input',initialValue:'' },
    { title: 'context', name: 'متن توافقنامه', type: 'input',initialValue:'' },
    { title: 'defaultFileId', name: 'شناسه فایل پیش فرض توافقنامه', type: 'input',initialValue:'' },
    { title: 'isBourseCodeRequired', name: 'کد بورسی نیاز دارد؟', type: 'selectInput',initialValue:false },
    { title: 'isRequired', name: 'توافقنامه اجباری است؟', type: 'selectInput',initialValue:false },
]
export const customerAgreementListOfForm = [
    { title: 'customerId', name: 'شناسه مشتری', type: 'input',initialValue:'' },
    { title: 'agreementId', name: 'شناسه توافقنامه', type: 'input',initialValue:'' },
    { title: 'bourseCode', name: 'کدبورسی مشتری', type: 'input', valueType: 'number',initialValue:null },
    { title: 'tradeCode', name: 'کدمعاملاتی', type: 'input', valueType: 'number',initialValue:null },
    { title: 'state', name: 'وضعیت قرارداد', type: 'selectInput',initialValue:null },
    { title: 'description', name: 'توضیحات', type: 'input',initialValue:'' },
    { title: 'customerApprovalDateTime', name: 'زمان تائید مشتری', type: 'dateTimeInput',initialValue: null},
    { title: 'adminApprovalDateTime', name: 'زمان تائید امین', type: 'dateTimeInput',initialValue:null },
    { title: 'startDateTime', name: 'تاریخ شروع', type: 'dateTimeInput',initialValue:null },
    { title: 'endDateTime', name: 'تاریخ پایان', type: 'dateTimeInput',initialValue:null },
]
export const marketerContractListOfForm = [
    { title: 'title', name: 'عنوان', type: 'input',initialValue:'' },
    { title: 'type', name: 'نوع قرارداد بازاریابی', type: 'selectInput',initialValue:null },
    { title: 'calculationBase', name: 'روش محاسبه کارمزد', type: 'selectInput',initialValue:null },
    { title: 'commissionCoefficientType', name: 'نوع ضریب کارمزد', type: 'input',initialValue:'' },
]
