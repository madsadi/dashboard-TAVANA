import { ADMIN_GATEWAY, IDP, MARKETER_ADMIN, SEJAM_GATEWAY } from "../api/constants";
import moment from "jalali-moment";
import { splittedDate } from "components/common/functions/common-funcions";

const filters: any = {
  "dashboard": {
    services: {},
  },
  "user-management_users": {
    services: {
      'IdentityServerApi': [
        {
          module: 'UserManagment',
          permissions: ['Read', 'Create', 'Edit', 'ChangeUserPassword', 'ChangeUserActiveStatus', 'SetLockoutEndDate', 'RollAndPermissionManagment', 'RollAndPermissionManagment', 'RollAndPermissionManagment']
        }
      ],
    },
    search: {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "UserName", "name": "نام کاربری", "type": "input" },
        { "title": "FirstName", "name": "نام", "type": "input" },
        { "title": "LastName", "name": "نام خانوادگی", "type": "input" },
        { "title": "NationalId", "name": "کد ملی", "type": "input" },
        { "title": "PhoneNumber", "name": "تلفن همراه", "type": "input" },
        { "title": "Email", "name": "ایمیل", "type": "input" },
        { "title": "RoleId", "name": "عنوان نقش کاربر", "type": "searchRoles" },
        { "title": "IsActive", "name": "وضعیت", "type": "selectInput" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "UserName": "",
        "UserId": "",
        "FirstName": "",
        "LastName": "",
        "NationalId": "",
        "PhoneNumber": "",
        "Email": "",
        "RoleId": "",
        "IsActive": null,
        "StartDate": "",
        "EndDate": ""
      }
    },
    toolbar: {
      "add": [
        { "title": "userName", "name": "نام کاریری", "type": "input" },
        { "title": "phoneNumber", "name": "موبایل", "type": "input" },
        { "title": "firstName", "name": "نام", "type": "input" },
        { "title": "lastName", "name": "نام خانوادگی", "type": "input" },
        { "title": "email", "name": "ایمیل", "type": "input" },
        { "title": "nationalId", "name": "کدملی", "type": "input" },
        { "title": "password", "name": "رمز عبور", "type": "input" }
      ],
      "edit": [
        { "title": "username", "name": "نام کاربری", "type": "input" },
        { "title": "phoneNumber", "name": "موبایل", "type": "input" },
        { "title": "firstName", "name": "نام", "type": "input" },
        { "title": "lastName", "name": "نام خانوادگی", "type": "input" },
        { "title": "email", "name": "ایمیل", "type": "input" },
        { "title": "nationalId", "name": "کدملی", "type": "input" }
      ],
      "password": [
        { "title": "newPassword", "name": "رمز عبور جدید", "type": "password" }
      ],
      "lock-out": [
        { "title": "lockoutEndDateTime", "name": "تاریخ", "type": "singleDate", "minimumDate": splittedDate(moment().locale('fa').format('YYYY-MM-DD')) }
      ]
    }
  },
  "user-management_roles": {
    services: {
      'IdentityServerApi': [
        {
          module: 'RoleManagment',
          permissions: ['Create', 'Edit', 'Active', 'DeActive', 'Read', 'RollAndPermissionManagment', 'RollAndPermissionManagment'],
        }
      ],
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "Name", "name": "عنوان", "type": "input" },
        { "title": "IsActive", "name": "وضعیت", "type": "selectInput" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "IsActive": null,
        "Name": ""
      }
    },
    "toolbar": {
      "add": [
        { "title": "name", "name": "عنوان", "type": "input" }
      ],
      "edit": [
        { "title": "name", "name": "عنوان", "type": "input" }
      ]
    }
  },
  "user-management_logs": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "UserId", "name": "شناسه کاربر", "type": "input" },
        { "title": "NationalId", "name": "کد ملی کاربر", "type": "input" },
        { "title": "Name", "name": "نام کاربر", "type": "input" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": "",
        "UserId": "",
        "NationalId": "",
        "Name": ""
      }
    }
  },
  "online-registration": {
    services: {
      'CustomerManagement': [
        {
          module: 'OnlineRegistrationProfile',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        },
        {
          module: 'TbsServices',
          permissions: ['Create']
        }
      ],
      'FileManagerSystem': [
        {
          module: 'FileMananger',
          permissions: ['Read']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "UniqueId", "name": "کد ملی کاربر", "type": "input" },
        { "title": "MobileNumber", "name": "تلفن همراه", "type": "input" },
        { "title": "personType", "name": "حقیقی / حقوقی", "type": "selectInput" },
        { "title": "marketerId", "name": "شناسه بازاریاب", "type": "input" },
        { "title": "reagentId", "name": "شناسه معرف", "type": "input" },
        { "title": "personOrigin", "name": "نوع کاربر", "type": "selectInput" },
        { "title": "AgentUniqueId", "name": "کد ملی نماینده", "type": "input" },
        { "title": "isSejami", "name": "سجامی هست؟", "type": "selectInput" },
        { "title": "sejamStatus", "name": "وضعیت سجامی", "type": "selectInput" },
        { "title": "registrationState", "name": "وضعیت ثبت نام", "type": "selectInput" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": "",
        "UniqueId": "",
        "MobileNumber": "",
        "personType": null,
        "AgentUniqueId": '',
        "marketerId": "",
        "reagentId": "",
        "personOrigin": null,
        "isSejami": null,
        "sejamStatus": null,
        "registrationState": null
      }
    },
    "toolbar": {
      "edit": [
        { "title": "registrationState", "name": "وضعیت ثبت نام", "type": "selectInput" },
        { "title": "changeReasonDescription", "name": "توضیحات", "type": "input" }
      ],
      "refCode": [
        { "title": "refCode", "name": "کد معرف", "type": "input" }
      ],
      "bourseCode": [
        { "title": "code", "name": " کد بورسی", "type": "input" },
        { "title": "type", "name": "نوع کد بورسی", "type": "selectInput" },
      ],
      "agentInfo": [
        { "title": "FirstName", "name": "نام(وکیل) ", "type": "input", "isRequired": true },
        { "title": "LastName", "name": " (وکیل)نام خانوادگی", "type": "input", "isRequired": true },
        { "title": "FatherName", "name": " نام پدر(وکیل)", "type": "input", "isRequired": true },
        { "title": "UniqueId", "name": "کد ملی(وکیل)", "type": "input", "isRequired": true },
        { "title": "BirthCertificateNumber", "name": "شماره شناسنامه (وکیل)", "type": "input", "isRequired": true },
        { "title": "SerialNumber", "name": "شماره سریال شناسنامه", "type": "input", "isRequired": true },
        { "title": "SerialLetter", "name": "حرف سریال شناسنامه", "type": "input", "isRequired": true },
        { "title": "SerialSeri", "name": "سری سریال شناسنامه", "type": "input", "isRequired": true },
        { "title": "IsReplica", "name": "	المثنی است؟", "type": "selectInput", "isRequired": true },
        {
          "title": "BirthCertificateCity",
          "name": "شهر محل صدور",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${SEJAM_GATEWAY}/api/request/SearchCity`,
          "valueField": ["cityName"],
          "queryField": "CityName",
          "recordField": "cityName",
          "resultField": "response",
          "isRequired": true
        },
        { "title": "Address", "name": "	آدرس (وکیل)", "type": "input", "isRequired": true },
      ]
    }
  },
  "customer-management_subsidiary": {
    services: {
      "CustomerManagement": [
        {
          module: 'Subsidiary',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "Title", "name": "نام شرکت", "type": "input" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "Title": ""
      }
    },
    "toolbar": {
      "modal": [
        { "title": "onlineRegistrationProfileId", "name": "شناسه ثبت نام شرکت", "type": "input", "initialValue": "" },
        { "title": "title", "name": "عنوان شرکت", "type": "input", "initialValue": "" },
        { "title": "subsidiaryTypeCode", "name": " نوع شرکت", "type": "selectInput", "initialValue": null }
      ]
    }
  },
  "customer-management_branch": {
    services: {
      'CustomerManagement': [
        {
          module: 'Branch',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        },
        {
          module: 'TbsServices',
          permissions: ['Read']
        }
      ],
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "Title", "name": " عنوان شعبه", "type": "input" },
        { "title": "Code", "name": " کد شعبه", "type": "input", "valueType": "number" },
        { "title": "type", "name": " نوع شعبه", "type": "selectInput" },
        { "title": "SubsidiaryTitle", "name": " عنوان شرکت ", "type": "input" },
        { "title": "IsDeleted", "name": " وضعیت ", "type": "selectInput" },
        { "title": "date", "name": " تاریخ شروع و پایان ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "Title": "",
        "Code": "",
        "type": "",
        "SubsidiaryTitle": "",
        "IsDeleted": "",
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "modal": [
        { "title": "subsidiaryId", "name": "شناسه شرکت", "type": "input", "initialValue": "" },
        { "title": "code", "name": "کد شعبه", "type": "input", "valueType": "number", "initialValue": null },
        { "title": "title", "name": "نام شعبه", "type": "input", "initialValue": "" },
        { "title": "countryId", "name": "شناسه کشور (برای آدرس شعبه)", "type": "input", "initialValue": "" },
        { "title": "provinceId", "name": "شناسه استان (برای آدرس شعبه)", "type": "input", "initialValue": "" },
        { "title": "cityId", "name": "شناسه شهر (برای آدرس شعبه)", "type": "input", "initialValue": "" },
        { "title": "sectionId", "name": "شناسه بخش (برای آدرس شعبه)", "type": "input", "initialValue": "" },
        { "title": "tel", "name": "شماره تلفن", "type": "input", "initialValue": "" },
        { "title": "mobile", "name": "شماره موبایل", "type": "input", "initialValue": "" },
        { "title": "fax", "name": "فکس", "type": "input", "initialValue": "" },
        { "title": "address", "name": "آدرس خیابان", "type": "input", "initialValue": "" },
        { "title": "alley", "name": "نام کوچه", "type": "input", "initialValue": "" },
        { "title": "plaque", "name": "پلاک", "type": "input", "initialValue": "" },
        { "title": "postalCode", "name": "کد پستی", "type": "input", "initialValue": "" },
        { "title": "type", "name": "نوع شعبه", "type": "selectInput", "initialValue": null }
      ]
    }
  },
  "customer-management_employee": {
    services: {
      "CustomerManagement": [
        {
          module: "Employee",
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "toolbar": {
      "modal": [
        { "title": "firstName", "name": "نام", "type": "input", "initialValue": "" },
        { "title": "lastName", "name": " نام خانوادگی", "type": "input", "initialValue": "" },
        { "title": "nationalId", "name": "کد ملی", "type": "input", "initialValue": "" },
        { "title": "mobile", "name": "موبایل", "type": "input", "initialValue": "" },
        { "title": "workPhone", "name": "لفن", "type": "input", "initialValue": "" },
        { "title": "email", "name": "ایمیل", "type": "input", "initialValue": "" },
        { "title": "idpAccountId", "name": "شناسه حساب کاربری", "type": "input", "initialValue": "" },
        { "title": "branchId", "name": "شناسه شعبه", "type": "input", "initialValue": "" }
      ]
    }
  },
  "customer-management_businessUnit": {
    services: {
      "CustomerManagement": [
        {
          module: 'BusinessUnit',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "Title", "name": "عنوان واحد کاری", "type": "input" },
        { "title": "Code", "name": "کد واحد کاری", "type": "input", "valueType": "number" },
        { "title": "date", "name": " تاریخ شروع و پایان ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "Title": "",
        "Code": "",
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "modal": [
        { "title": "code", "name": "کد واحد کاری", "type": "input", "valueType": "number", "initialValue": null },
        { "title": "title", "name": "عنوان واحد کاری", "type": "input", "initialValue": "" },
        { "title": "businessUnitOrder", "name": "اولویت واحد کاری", "type": "input", "valueType": "number", "initialValue": null }
      ]
    }
  },
  "customer-management_station": {
    services: {
      "CustomerManagement": [
        {
          module: 'Station',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "Title", "name": "عنوان ایستگاه", "type": "input" },
        { "title": "Code", "name": "کد ایستگاه", "type": "input", "valueType": "number" },
        { "title": "BrokerTitle", "name": "عنوان کارگزاری", "type": "input" },
        { "title": "BranchTitle", "name": "عنوان شعبه", "type": "input" },
        { "title": "Type", "name": "نوع ایستگاه معاملاتی", "type": "selectInput" },
        { "title": "date", "name": " تاریخ شروع و پایان ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "Title": "",
        "Code": "",
        "BrokerTitle": "",
        "BranchTitle": "",
        "Type": null,
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "modal": [
        { "title": "brokerCode", "name": "کد کارگزاری", "type": "input", "valueType": "number", "initialValue": null },
        { "title": "code", "name": "کد ایستگاه معاملاتی", "type": "input", "valueType": "number", "initialValue": null },
        { "title": "title", "name": "عنوان ایستگاه معاملاتی", "type": "input", "initialValue": "" },
        { "title": "type", "name": "نوع ایستگاه معاملاتی", "type": "selectInput", "initialValue": null },
        { "title": "branchId", "name": "شناسه شعبه کارگزاری", "type": "input", "initialValue": "" }
      ]
    }
  },
  "customer-management_trader": {
    services: {
      "CustomerManagement": [
        {
          module: "Trader",
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "toolbar": {
      "modal": [
        { "title": "stationId", "name": "شناسه ایستگاه معاملاتی", "type": "input", "initialValue": "" },
        { "title": "employeeId", "name": "شناسه کارمند", "type": "input", "initialValue": "" },
        { "title": "title", "name": "عنوان معامله گر", "type": "input", "initialValue": "" },
        { "title": "isActiveWithNoNull", "name": "فعال/غیرفعال", "type": "selectInput", "initialValue": false }
      ]
    }
  },
  "customer-management_marketer": {
    services: {
      'CustomerManagement': [
        {
          module: 'Marketer',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        },
        {
          module: 'TbsServices',
          permissions: ['Read']
        }
      ],
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "UniqueId", "name": " کد ملی بازاریاب/معرف ", "type": "input" },
        { "title": "Mobile", "name": "شماره موبایل", "type": "input" },
        { "title": "Type", "name": "نوع بازاریاب", "type": "selectInput" },
        { "title": "Title", "name": "عنوان بازاریاب", "type": "input" },
        { "title": "RefCode", "name": "RefCode", "type": "input" },
        { "title": "TBSName", "name": "نام بازاریاب/معرف در TBS", "type": "input" },
        {
          "title": "userId",
          "name": "حساب کاربری (کد ملی کاربر)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id"
        },
        {
          "title": "branchId",
          "name": "عنوان شعبه",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${ADMIN_GATEWAY}/api/request/branch/Search`,
          "valueField": ["title", "subsidiaryTitle", "typeTitle"],
          "queryField": "Title",
          "recordField": "id"
        },
        {
          "title": "SubsidiaryId",
          "name": "عنوان شرکت",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${ADMIN_GATEWAY}/api/request/subsidiary/Search`,
          "valueField": ["title", "subsidiaryTypeTitle"],
          "queryField": "Title",
          "recordField": "id"
        },
        { "title": "IsActive", "name": "وضعیت", "type": "selectInput" },
        { "title": "date", "name": " تاریخ شروع و پایان", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "Title": "",
        "userId": "",
        "Mobile": "",
        "Type": null,
        "SubsidiaryId": "",
        "BranchId": "",
        "IsActive": "",
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "modal": [
        {
          "title": "type", "name": "نوع بازاریاب", "type": "selectInput", "initialValue": "",
          "isRequired": true
        },
        {
          "title": "uniqueId",
          "name": "کد/شناسه ملی بازاریاب",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${ADMIN_GATEWAY}/api/request/customer/Search`,
          "valueField": ["customerTitle", "uniqueId"],
          "queryField": "UniqueId",
          "recordField": "uniqueId",
          "alternative": "customerId",
          "alternativeRelatedRecordField": "id",
          "inputAble": true,
          "isRequired": true
        },
        {
          "title": "branchId",
          "name": "عنوان شعبه",
          "type": "dynamicSearch",
          "placeholder": "branchTitle",
          "initialValue": "",
          "endpoint": `${ADMIN_GATEWAY}/api/request/branch/Search`,
          "valueField": ["title", "subsidiaryTitle", "typeTitle"],
          "queryField": "Title",
          "recordField": "id"
        },
        { "title": "title", "name": "عنوان بازاریاب", "type": "input", "initialValue": "", "isRequired": true },
        { "title": "mobile", "name": "شماره تلفن", "type": "input", "initialValue": "" },
        {
          "title": "userId",
          "name": "کد ملی کاربر",
          "type": "dynamicSearch",
          "placeholder": "uniqueId",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id"
        },
        { "title": "tbsMarketerId", "name": "شناسه بازاریاب در TBS", "initialValue": "" },
        { "title": "tbsReagentId", "name": "شناسه معرف در TBS", "initialValue": "" }
      ]
    }
  },
  "customer-management_agreement": {
    services: {
      "CustomerManagement": [
        {
          module: 'Agreement',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "toolbar": {
      "modal": [
        { "title": "subsidiaryId", "name": "شناسه شرکت", "type": "input", "initialValue": "" },
        { "title": "bourseCodeType", "name": "نوع کدبورسی", "type": "input", "valueType": "number", "initialValue": null },
        { "title": "name", "name": "عنوان توافقنامه", "type": "input", "initialValue": "" },
        { "title": "description", "name": "توضیحات", "type": "input", "initialValue": "" },
        { "title": "context", "name": "متن توافقنامه", "type": "input", "initialValue": "" },
        { "title": "defaultFileId", "name": "شناسه فایل پیش فرض توافقنامه", "type": "input", "initialValue": "" },
        { "title": "isBourseCodeRequired", "name": "کد بورسی نیاز دارد؟", "type": "selectInput", "initialValue": false },
        { "title": "isRequired", "name": "توافقنامه اجباری است؟", "type": "selectInput", "initialValue": false }
      ]
    }
  },
  "customer-management_customerAgreement": {
    services: {
      "CustomerManagement": [
        {
          module: "CustomerAgreement",
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "AgreementTitle", "name": "عنوان توافقنامه", "type": "input" },
        { "title": "CustomerUniqueId", "name": "شناسه مشتری", "type": "input" },
        { "title": "SubsidiaryTitle", "name": "عنوان شرکت", "type": "input" },
        { "title": "BranchTitle", "name": "عنوان شعبه", "type": "input" },
        { "title": "RelatedBourseCodeTitle", "name": "عنوان کد بورسی مرتبط", "type": "input" },
        { "title": "State", "name": "وضعیت قرارداد", "type": "selectInput" },
        { "title": "IsRequired", "name": "ضروری", "type": "selectInput" },
        { "title": "IsActive", "name": "فعال / غیرفعال", "type": "selectInput" },
        { "title": "IsDeleted", "name": "وضعیت", "type": "selectInput" },
        { "title": "date", "name": " تاریخ شروع و پایان ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "AgreementTitle": "",
        "CustomerUniqueId": "",
        "SubsidiaryTitle": "",
        "BranchTitle": "",
        "RelatedBourseCodeTitle": "",
        "State": "",
        "IsRequired": "",
        "IsActive": "",
        "IsDeleted": "",
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "modal": [
        { "title": "customerId", "name": "شناسه مشتری", "type": "input", "initialValue": "" },
        { "title": "agreementId", "name": "شناسه توافقنامه", "type": "input", "initialValue": "" },
        { "title": "bourseCode", "name": "کدبورسی مشتری", "type": "input", "valueType": "number", "initialValue": null },
        { "title": "tradeCode", "name": "کدمعاملاتی", "type": "input", "valueType": "number", "initialValue": null },
        { "title": "state", "name": "وضعیت قرارداد", "type": "selectInput", "initialValue": null },
        { "title": "description", "name": "توضیحات", "type": "input", "initialValue": "" },
        { "title": "customerApprovalDateTime", "name": "زمان تائید مشتری", "type": "dateTimeInput", "initialValue": null },
        { "title": "adminApprovalDateTime", "name": "زمان تائید امین", "type": "dateTimeInput", "initialValue": null },
        { "title": "startDateTime", "name": "تاریخ شروع", "type": "dateTimeInput", "initialValue": null },
        { "title": "endDateTime", "name": "تاریخ پایان", "type": "dateTimeInput", "initialValue": null }
      ]
    }
  },
  "customer-management_contract": {
    services: {
      "CustomerManagement": [
        {
          module: "Contract",
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "Title", "name": "عنوان قرارداد بازاریابی", "type": "input" },
        { "title": "Type", "name": "نوع قرارداد بازاریابی", "type": "selectInput" },
        { "title": "CalculationBase", "name": "روش محاسبه کارمزد", "type": "selectInput" },
        { "title": "CommissionCoefficientType", "name": "نوع ضریب کارمزد", "type": "input" },
        { "title": "IsActive", "name": "وضعیت فعالیت", "type": "selectInput" },
        { "title": "IsDeleted", "name": "حذف شده؟", "type": "selectInput" },
        { "title": "date", "name": " تاریخ شروع و پایان ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "Title": "",
        "Type": "",
        "CalculationBase": "",
        "CommissionCoefficientType": "",
        "IsActive": "",
        "IsDeleted": "",
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "modal": [
        { "title": "title", "name": "عنوان", "type": "input", "initialValue": "" },
        { "title": "type", "name": "نوع قرارداد بازاریابی", "type": "selectInput", "initialValue": null },
        { "title": "calculationBase", "name": "روش محاسبه کارمزد", "type": "selectInput", "initialValue": null },
        { "title": "commissionCoefficientType", "name": "نوع ضریب کارمزد", "type": "input", "initialValue": "" }
      ]
    }
  },
  "customer-management_marketerContract": {
    services: {
      "CustomerManagement": [
        {
          module: "MarketerContract",
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "MarketerTypeTitle", "name": "عنوان نوع بازاریاب ", "type": "input" },
        { "title": "ContractTitle", "name": "عنوان قرارداد", "type": "input" },
        { "title": "ContractNumber", "name": "شماره قرارداد", "type": "input" },
        { "title": "MarketerUniqueId", "name": "شناسه بازاریاب", "type": "input" },
        { "title": "MarketerUniqueId", "name": "شناسه بازاریاب", "type": "input" },
        { "title": "SubsidiaryTitle", "name": "عنوان شرکت", "type": "input" },
        { "title": "BranchTitle", "name": "عنوان شعبه", "type": "input" },
        { "title": "IsActive", "name": "وضعیت فعالیت", "type": "selectInput" },
        { "title": "IsDeleted", "name": "حذف شده؟", "type": "selectInput" },
        { "title": "IsValid", "name": "اعتبار دارد؟", "type": "selectInput" },
        { "title": "date", "name": " تاریخ شروع و پایان ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "MarketerTypeTitle": "",
        "ContractTitle": "",
        "ContractNumber": "",
        "MarketerUniqueId": "",
        "SubsidiaryTitle": "",
        "BranchTitle": "",
        "IsActive": "",
        "IsDeleted": "",
        "IsValid": "",
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "modal": [
        { "title": "contractId", "name": "شناسه قرارداد پیش فرض", "type": "input" },
        { "title": "marketerId", "name": "شناسه بازاریاب", "type": "input" },
        { "title": "contractNo", "name": "شماره قرارداد", "type": "input" },
        { "title": "description", "name": "توضیحات قرارداد", "type": "input" },
        { "title": "date", "name": " تاریخ شروع و پایان ", "type": "date" }
      ]
    }
  },
  "online-orders": {
    services: {
      'OrderStore': [
        {
          module: 'Order',
          permissions: ['Read']
        }
      ],
      'OrderMediator': [
        {
          module: 'Order',
          permissions: ['CancelUserOrder']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "OrderId", "name": "شناسه سفارش", "type": "input" },
        { "title": "InstrumentId", "name": "شناسه نماد", "type": "search", "display": "faInsCode" },
        { "title": "OrderType", "name": "نوع سفارش", "type": "selectInput", "valueType": "number" },
        { "title": "OrderSide", "name": "سمت", "type": "selectInput", "valueType": "number" },
        { "title": "ValidityType", "name": "اعتبار", "type": "selectInput", "valueType": "number" },
        { "title": "OrderStatus", "name": "وضعیت سفارش", "type": "selectInput", "valueType": "number" },
        { "title": "UserId", "name": "شناسه کاربر", "type": "input" },
        { "title": "CustomerId", "name": "شناسه مشتری", "type": "input" },
        { "title": "TraderId", "name": "شناسه معامله گر", "type": "input" },
        { "title": "ApplicationSource", "name": "مبدا سفارش", "type": "selectInput", "valueType": "number" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": "",
        "OrderId": "",
        "InstrumentId": "",
        "OrderType": "",
        "OrderSide": "",
        "ValidityType": "",
        "OrderStatus": "",
        "UserId": "",
        "CustomerId": "",
        "TraderId": "",
        "ApplicationSource": ""
      }
    }
  },
  "online-trades": {
    services: {
      'OrderStore': [
        {
          module: 'Trade',
          permissions: ['Read']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "OrderId", "name": "شناسه سفارش", "type": "input" },
        { "title": "InstrumentId", "name": "شناسه نماد", "type": "search", "display": "faInsCode" },
        { "title": "OrderSide", "name": "سمت", "type": "selectInput", "valueType": "number" },
        { "title": "TradeId", "name": "شناسه معامله", "type": "input" },
        { "title": "TradeCancelationFlag", "name": "وضعیت لغو معامله", "type": "input" },
        { "title": "UserId", "name": "شناسه کاربر", "type": "input" },
        { "title": "CustomerId", "name": "شناسه مشتری", "type": "input" },
        { "title": "TraderId", "name": "شناسه معامله گر", "type": "input" },
        { "title": "ApplicationSource", "name": "مبدا سفارش", "type": "selectInput", "valueType": "number" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": "",
        "OrderId": "",
        "InstrumentId": "",
        "OrderSide": "",
        "TradeId": "",
        "TradeCancelationFlag": "",
        "UserId": "",
        "CustomerId": "",
        "TraderId": "",
        "ApplicationSource": ""
      }
    }
  },
  "online-cancel": {
    services: {
      'OrderStore': [
        {
          module: 'GlobalCancelOrder',
          permissions: ['Read']
        }
      ],
      'OrderMediator': [
        {
          module: 'Order',
          permissions: ['CancelUserOrder', 'GlobalCancelOrderRequest']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "date", "name": "تاریخ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "gpOrder": [
        { "title": "instrumentGroupIdentification", "name": "کد گروه نمادها", "type": "input" },
        { "title": "orderSide", "name": "سمت سفارش", "type": "selectInput", "valueType": "number" },
        { "title": "orderOrigin", "name": "نوع کاربر", "type": "selectInput", "valueType": "number" },
        { "title": "orderTechnicalOrigin", "name": "مرجع تکنیکال سفارش", "type": "selectInput", "valueType": "number" }
      ],
      "instrumentOrder": [
        { "title": "InstrumentId", "name": "نماد", "type": "search", "display": "faInsCode" },
        { "title": "orderSide", "name": "سمت سفارش", "type": "selectInput", "valueType": "number" },
        { "title": "orderOrigin", "name": "نوع کاربر", "type": "selectInput", "valueType": "number" },
        { "title": "orderTechnicalOrigin", "name": "مرجع تکنیکال سفارش", "type": "selectInput", "valueType": "number" }
      ]
    }
  },
  "portfo_live": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "customerId", "name": "شناسه مشتری", "type": "input" },
        { "title": "InstrumentId", "name": "شناسه نماد", "type": "search", "display": "faInsCode" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "InstrumentId": "",
        "customerId": ""
      }
    }
  },
  "oms-session": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "date", "name": "تاریخ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": ""
      }
    }
  },
  "oms-timetable": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "InstrumentGroupId", "name": "کد گروه نماد", "type": "input" },
        { "title": "date", "name": "تاریخ", "type": "date" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "InstrumentGroupId": "",
        "StartDate": "",
        "EndDate": ""
      }
    }
  },
  "market-rules-management": {
    services: {
      'MarketRuleStore': [
        {
          module: 'MarketRule',
          permissions: ['Read', 'Create', 'Edit', 'Read']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "isActive", "name": "وضعیت", "type": "selectInput" },
        { "title": "name", "name": "عنوان قانون", "type": "input" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "initialValue": {
        "name": "",
        "isActive": null,
        "StartDate": "",
        "EndDate": ""
      }
    },
    "toolbar": {
      "add": [
        { "title": "name", "name": "عنوان قانون", "type": "input" },
        { "title": "sequenceNumber", "name": "مرتبه/اولویت", "type": "input", "valueType": "number" },
        { "title": "isActive", "name": "وضیعت", "type": "selectInput" },
        { "title": "errorMessage", "name": "پیام خطا", "type": "input" }
      ],
      "extraAdd": [
        { "title": "variable", "name": "متغیر", "type": "dynamicSelectInput" },
        { "title": "operator", "name": "عملگر", "type": "selectInput" }
      ]
    }
  },
  "book-building": {
    services: {
      "BookBuildingStore": [
        {
          module: "BookBuilding",
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "api", "name": "دسته بندی", "type": "selectInput" }
      ],
      "initialValue": { "api": "GetAll" }
    },
    "toolbar": {
      "add": [
        { "title": "InstrumentId", "name": "شناسه نماد", "type": "search", "display": "faInsCode" },
        { "title": "maxQuantity", "name": "بیشینه حجم سفارش", "type": "input", "valueType": "number" },
        { "title": "minPrice", "name": "حداقل قیمت سفارش", "type": "input", "valueType": "number" },
        { "title": "maxPrice", "name": "حداکثر قیمت سفارش", "type": "input", "valueType": "number" },
        { "title": "startHour", "name": "زمان شروع", "type": "selectInputTime" },
        { "title": "startMinute", "name": "زمان شروع" },
        { "title": "endHour", "name": "زمان پایان", "type": "selectInputTime" },
        { "title": "endMinute", "name": "زمان پایان" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "edit": [
        { "title": "instrumentId", "name": "شناسه نماد", "type": "search", "display": "faInsCode" },
        { "title": "maxQuantity", "name": "بیشینه حجم سفارش", "type": "input", "valueType": "number" },
        { "title": "minPrice", "name": "حداقل قیمت سفارش", "type": "input", "valueType": "number" },
        { "title": "maxPrice", "name": "حداکثر قیمت سفارش", "type": "input", "valueType": "number" },
        { "title": "startHour", "name": "زمان شروع", "type": "selectInputTime" },
        { "title": "startMinute", "name": "زمان شروع" },
        { "title": "endHour", "name": "زمان پایان", "type": "selectInputTime" },
        { "title": "endMinute", "name": "زمان پایان" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ]
    }
  },
  "commission-management_instrument": {
    services: {
      "CommissionStore": [
        {
          module: "CommissionInstrumentType",
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "CommissionInstrumentTypeId", "name": "شناسه نوع ابزار مالی کارمزد", "type": "input" },
        { "title": "BourseCode", "name": "عنوان بورس", "type": "dynamic" },
        { "title": "InstrumentTypeCode", "name": "عنوان نوع ابزار مالی", "type": "dynamic" },
        { "title": "InstrumentTypeDescription", "name": "توضیحات نوع ابزار", "type": "input" },
        { "title": "SectorCode", "name": "گروه صنعت", "type": "dynamic" },
        { "title": "SubSectorCode", "name": "زیرگروه صنعت", "type": "dynamic" },
        { "title": "Deleted", "name": "حذف شده؟", "type": "selectInput" }
      ],
      "initialValue": {
        "CommissionInstrumentTypeId": "",
        "BourseTitle": "",
        "InstrumentTypeTitle": "",
        "InstrumentTypeDescription": "",
        "SectorTitle": "",
        "SubSectorTitle": "",
        "Deleted": ""
      }
    },
    "toolbar": {
      "add": [
        { "title": "bourseCode", "name": "کد بورس", "type": "input" },
        { "title": "instrumentTypeCode", "name": "کد نوع ابزار مالی", "type": "input" },
        { "title": "sectorCode", "name": "کد گروه صنعت", "type": "input" },
        { "title": "subSectorCode", "name": "کد زیرگروه صنعت", "type": "input" }
      ]
    }
  },
  "commission-management_category": {
    services: {
      "CommissionStore": [
        {
          module: 'CommissionCategory',
          permissions: ['Read', 'Create']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "CommissionCategoryId", "name": "شناسه", "type": "input" },
        { "title": "MarketCode", "name": "بازار", "type": "dynamic" },
        { "title": "OfferTypeCode", "name": "نوع عرضه", "type": "dynamic" },
        { "title": "SideCode", "name": "سمت سفارش", "type": "dynamic" },
        { "title": "SettlementDelayCode", "name": "تاخیر در تسویه", "type": "dynamic" },
        { "title": "CustomerTypeCode", "name": "نوع مشتری", "type": "dynamic" },
        { "title": "CustomerCounterSideCode", "name": "نوع طرف مقابل", "type": "dynamic" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 10,
        "CommissionCategoryId": "",
        "MarketTitle": "",
        "OfferTypeTitle": "",
        "SideTitle": "",
        "SettlementDelayTitle": "",
        "CustomerTypeTitle": "",
        "CustomerCounterSideTitle": ""
      }
    }
  },
  "commission-management_detail": {
    services: {
      "CommissionStore": [
        {
          module: 'CommissionDetail',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        },
        {
          module: 'CommissionInstrumentType',
          permissions: ['Read', 'Create', 'Edit', 'Delete']
        },
        {
          module: 'CommissionCategory',
          permissions: ['Read', 'Create']
        }
      ]
    },
    "search": {
      "filters": [
        { "title": "CommissionInstrumentTypeTitle", "name": "ابزار مالی کارمزد", "type": "input" },
        { "title": "CommissionCategoryTitle", "name": "گروه بندی کارمزد", "type": "input" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" },
        { "title": "Deleted", "name": "حذف شده؟", "type": "selectInput" }
      ],
      "initialValue": {
        "CommissionInstrumentTypeTitle": "",
        "CommissionCategoryTitle": "",
        "StartDate": "",
        "EndDate": "",
        "Deleted": null
      }
    },
    "toolbar": {
      "add": [
        {
          "title": "commissionInstrumentTypeTitle", "name": "عنوان ابزار مالی کارمزد", "type": "input",
          "readOnly": true
        },
        {
          "title": "commissionCategoryTitle", "name": "عنوان گروه بندی کارمزد", "type": "input",
          "readOnly": true
        },
        {
          "name": "کارمزد کارگزار",
          "children": [
            { "title": "brokerCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "minBrokerCommissionValue", "placeholder": " کمینه مقدار", "name": " کمینه مقدار", "type": "input" },
            { "title": "maxBrokerCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد صندوق توسعه",
          "children": [
            { "title": "brokerCmdFundCoeff", "placeholder": "ضریب ", "name": "ضریب ", "type": "input" },
            { "title": "maxBrokerCmdFundValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد حق نظارت سازمان",
          "children": [
            { "title": "seoControlCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxSeoControlCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد سپرده گذاری",
          "children": [
            { "title": "csdCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxCsdCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد فناوری",
          "children": [
            { "title": "tmcCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxTmcCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد بورس مربوطه",
          "children": [
            { "title": "bourseCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxBourseCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد رایان بورس",
          "children": [
            { "title": "rayanCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxRayanCommissionValue", "placeholder": "بیشینه", "name": "بیشینه", "type": "input" }
          ]
        },
        {
          "name": "کارمزد حق دسترسی",
          "children": [
            { "title": "accessCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxAccessCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد انبارداری",
          "children": [
            { "title": "inventoryCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxInventoryValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": " مالیات بر ارزش افزوده",
          "children": [
            { "title": "inventoryAddedValueTaxCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxInventoryAddedValueTax", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },

        {
          "name": "مالیات",
          "children": [
            { "title": "taxCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxTaxValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "مالیات ارزش افزوده",
          "children": [
            { "title": "addedValueTax", "placeholder": "مقدار", "name": "مقدار", "type": "input" },
            { "title": "maxAddedVlueTax", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        { "title": "charge", "name": "ضریب کارمزد عوارض", "type": "input" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "edit": [
        {
          "title": "commissionInstrumentTypeId", "name": "شناسه ابزار مالی کارمزد", "type": "input",
          "readOnly": true
        },
        {
          "title": "commissionCategoryId", "name": "شناسه گروه بندی کارمزد", "type": "input",
          "readOnly": true
        },
        {
          "name": "کارمزد کارگزار",
          "children": [
            { "title": "brokerCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "minBrokerCommissionValue", "placeholder": " کمینه مقدار", "name": " کمینه مقدار", "type": "input" },
            { "title": "maxBrokerCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد صندوق توسعه",
          "children": [
            { "title": "brokerCmdFundCoeff", "placeholder": "ضریب ", "name": "ضریب ", "type": "input" },
            { "title": "maxBrokerCmdFundValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد حق نظارت سازمان",
          "children": [
            { "title": "seoControlCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxSeoControlCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد سپرده گذاری",
          "children": [
            { "title": "csdCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxCsdCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد فناوری",
          "children": [
            { "title": "tmcCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxTmcCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد بورس مربوطه",
          "children": [
            { "title": "bourseCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxBourseCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد رایان بورس",
          "children": [
            { "title": "rayanCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxRayanCommissionValue", "placeholder": "بیشینه", "name": "بیشینه", "type": "input" }
          ]
        },
        {
          "name": "کارمزد حق دسترسی",
          "children": [
            { "title": "accessCommissionCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxAccessCommissionValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "کارمزد انبارداری",
          "children": [
            { "title": "inventoryCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxInventoryValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": " مالیات بر ارزش افزوده",
          "children": [
            { "title": "inventoryAddedValueTaxCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxInventoryAddedValueTax", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },

        {
          "name": "مالیات",
          "children": [
            { "title": "taxCoeff", "placeholder": "ضریب", "name": "ضریب", "type": "input" },
            { "title": "maxTaxValue", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        {
          "name": "مالیات ارزش افزوده",
          "children": [
            { "title": "addedValueTax", "placeholder": "مقدار", "name": "مقدار", "type": "input" },
            { "title": "maxAddedVlueTax", "placeholder": "بیشینه مقدار", "name": "بیشینه مقدار", "type": "input" }
          ]
        },
        { "title": "charge", "name": "ضریب کارمزد عوارض", "type": "input" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "delete": [
        { "title": "endDate", "name": "تاریخ  پایان", "type": "singleDate" }
      ]
    }
  },
  "commission-management_symbols": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "InstrumentIds", "name": "شناسه نماد", "type": "search", "isRequired": true, "isMultiple": true },
        { "title": "OfferTypeCode", "name": "نوع عرضه", "type": "selectInput" },
        { "title": "SideCode", "name": "سمت سفارش", "type": "selectInput" },
        { "title": "CustomerTypeCode", "name": "نوع مشتری", "type": "selectInput" },
        { "title": "CustomerCounterSideCode", "name": "مشتری طرف مقابل", "type": "selectInput" },
      ],
      "initialValue": {
        "InstrumentIds": [],
        "OfferTypeCode": "",
        "SideCode": "",
        "CustomerTypeCode": '',
        "CustomerCounterSideCode": '',
        "PageSize": 20,
        "PageNumber": 1
      }
    }
  },
  "netflow_trades_report": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "date", "name": "تاریخ", "type": "date" },
        { "title": "Ticket", "name": "شماره تیکت", "type": "input" },
        { "title": "Symbol", "name": "نماد", "type": "input" },
        { "title": "InstrumentId", "name": "شناسه نماد", "type": "input", "display": "faInsCode" },
        { "title": "FirstName", "name": "نام", "type": "input" },
        { "title": "LastName", "name": "نام خانوادگی", "type": "input" },
        { "title": "NationalCode", "name": "کد ملی", "type": "input" },
        { "title": "StationCode", "name": "کد ایستگاه معاملاتی", "type": "input" },
        { "title": "Side", "name": "سمت", "type": "selectInput" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": "",
        "Side": "",
        "InstrumentId": "",
        "Ticket": "",
        "StationCode": "",
        "BourseCode": "",
        "NationalCode": "",
        "LastName": "",
        "FirstName": "",
        "Symbol": ""
      }
    }
  },
  "netflow_rules": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "date", "name": "تاریخ", "type": "date" },
        { "title": "Name", "name": "نام", "type": "input" },
        { "title": "BuyerCode", "name": "شناسه خریدار", "type": "input" },
        { "title": "SellerCode", "name": "شناسه فروشنده", "type": "input" },
        { "title": "Symbol", "name": "نماد", "type": "input" },
        { "title": "SettlementDelay", "name": "تاخیر", "type": "input" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": "",
        "Name": "",
        "BuyerCode": "",
        "SellerCode": "",
        "Symbol": "",
        "SettlementDelay": ""
      }
    }
  },
  "netflow_cleared_trade": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "date", "name": "تاریخ", "type": "date" },
        { "title": "Ticket", "name": "شماره تیکت", "type": "input" },
        { "title": "Symbol", "name": "نماد", "type": "input" },
        { "title": "InstrumentId", "name": "شناسه نماد", "type": "input", "display": "faInsCode" },
        { "title": "Side", "name": "سمت", "type": "selectInput" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": "",
        "Side": "",
        "InstrumentId": "",
        "Ticket": "",
        "Symbol": ""
      }
    }
  },
  "netflow_clearing_Range": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "date", "name": "تاریخ", "type": "date" },
        { "title": "EnTierName", "name": "نام انگلیسی گروه", "type": "input" },
        { "title": "SettlementDelay", "name": "تاخیر", "type": "input" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": "",
        "EndDate": "",
        "EnTierName": "",
        "SettlementDelay": ""
      }
    }
  },
  "netflow_information": {
    services: {},
  },
  "marketer-app_relations": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "date", "name": "تاریخ", "type": "date" },
        { "title": "LeaderMarketerName", "name": "نام بازاریاب", "type": "input" },
        {
          "title": "LeaderMarketerID",
          "name": " شناسه بازارایاب زیرگروه (کد ملی) ",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id",
        },
        { "title": "FollowerMarketerName", "name": "نام زیرمجموعه بازاریاب", "type": "input" },
        {
          "title": "FollowerMarketerID",
          "name": " شناسه بازارایاب زیرگروه (کد ملی)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id",
        },
      ],
      "initialValue": {
        "StartDate": "",
        "EndDate": "",
        "FollowerMarketerID": "",
        "FollowerMarketerName": "",
        "LeaderMarketerName": "",
        "LeaderMarketerID": ""
      }
    },
    "toolbar": {
      "add": [
        {
          "title": "LeaderMarketerID",
          "name": " شناسه بازارایاب سرگروه (کد ملی)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id",
          "isRequired": true
        },
        {
          "title": "FollowerMarketerID",
          "name": " شناسه بازارایاب زیرگروه (کد ملی)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id",
          "isRequired": true
        },
        { "title": "CommissionCoefficient", "name": "ضریب کارمزد معرفی بازاریاب", "type": "input", "dir": 'ltr' },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ],
      "edit": [
        { "title": "CommissionCoefficient", "name": "ضریب کارمزد معرفی بازاریاب", "type": "input", "dir": "ltr" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" }
      ]
    }

  },
  "marketer-app_recite": {
    services: {},
    "search": {
      "filters": [
        {
          "title": "MarketerID",
          "name": "حساب کاربری (کد ملی کاربر)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id"
        },
        { "title": "FactorID", "name": "شناسه فاکتور", "type": "input" },
        { "title": "Month", "name": "ماه", "type": "selectInput" },
        { "title": "Year", "name": "سال", "type": "selectInput" }
      ],
      "initialValue": {
        "MarketerID": "",
        "Period": ""
      }
    },
    "toolbar": {
      "calculate": [
        {
          "title": "MarketerID",
          "name": "حساب کاربری (کد ملی کاربر)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id"
        },
        { "title": "Month", "name": "ماه", "type": "selectInput" },
        { "title": "Year", "name": "سال", "type": "selectInput" }
      ],
      "edit-base": [
        { "title": "TotalTurnOver", "name": "مجموع گردش", "type": "input", "valueType": "number" },
        { "title": "TotalBrokerCommission", "name": "مجموع کارمزد کارگزاری", "type": "input", "valueType": "number" },
        { "title": "TotalNetBrokerCommission", "name": "مجموع خالص کارمزد کارگزار", "type": "input", "valueType": "number" },
        { "title": "MarketerCommissionIncome", "name": "حق بازاریابی از خالص کارمزد در دوره", "type": "input", "valueType": "number" },
        { "title": "TotalFeeOfFollowers", "name": "گردش خالص زیر مجموعه ها ", "type": "input", "valueType": "number" },
        { "title": "Status", "name": "وضعیت فاکتور", "type": "selectInput" },
        { "title": "IsCmdConcluded", "name": "سهم صندوق توسعه لحاظ میشود؟", "type": "selectInput" },
        { "title": "TotalCMD", "name": "مجموع سهم صندوق توسعه", "type": "input", "valueType": "number" },
      ],
      "edit-accounting": [
        { "title": "Plan", "name": "پلکان", "type": "input" },
        { "title": "TaxDeduction", "name": "مالیات", "type": "input", "valueType": "number" },
        { "title": "TaxCoefficient", "name": "ضریب مالیات", "type": "input", "valueType": "number" },
        { "title": "CollateralDeduction", "name": "کسورات حسن انجام کار", "type": "input", "valueType": "number" },
        { "title": "CollateralCoefficient", "name": "ضریب کسورات حسن انجام کار", "type": "input", "valueType": "number" },
        { "title": "InsuranceDeduction", "name": "کسورات بیمه ", "type": "input" },
        { "title": "InsuranceCoefficient", "name": "ضریب کسورات بیمه", "type": "input", "valueType": "number" },
        { "title": "MarketerTotalIncome", "name": "مجموع حق بازاریابی", "type": "input", "valueType": "number" },
        { "title": "Payment", "name": "پرداختی ", "type": "input", "valueType": "number" },
        { "title": "Status", "name": "وضعیت فاکتور", "type": "selectInput" },
        { "title": "CalculationCoefficient", "name": "ضریب محاسبه حق بازاریابی", "type": "input", "valueType": "number" },
        { "title": "TotalCMD", "name": "مجموع سهم صندوق توسعه", "type": "input", "valueType": "number" },
        { "title": "IsCmdConcluded", "name": "سهم صندوق توسعه لحاظ میشود؟", "type": "selectInput" },
        { "title": "MaketerCMDIncome", "name": "حق بازاریابی از سهم صندوق توسعه", "type": "input", "valueType": "number" },
        { "title": "ReturnDuration", "name": "دوره برگشت سپرده ها", "type": "input", "valueType": "number" },
        { "title": "InterimAmountDeduction", "name": "کسورات علی الحساب", "type": "input", "valueType": "number" },
        { "title": "EmployeeSalaryDeduction", "name": "کسورات حقوق پرسنل", "type": "input", "valueType": "number" },
        { "title": "EmployerInsuranceDeduction", "name": "کسورات بیمه سهم کارفرما", "type": "input", "valueType": "number" },
        { "title": "RedemptionDeduction", "name": "کسورات بازخرید", "type": "input", "valueType": "number" },
        { "title": "OtherDeduction", "name": "	سایر کسورات", "type": "input", "valueType": "number" },
        { "title": "OtherDeductionDescription", "name": "توضیحات (سایر کسورات)", "type": "input" },
        { "title": "CmdPayment", "name": "	پرداختی سهم صندوق توسعه", "type": "input", "valueType": "number" },
        { "title": "CollateralReturnPayment", "name": "پرداختی برگشت حسن انجام کار", "type": "input", "valueType": "number" },
        { "title": "InsuranceReturnPayment", "name": "پرداختی برگشت بیمه	", "type": "input", "valueType": "number" },
        { "title": "OtherPayment", "name": "	سایر پرداختی ها", "type": "input", "valueType": "number" },
        { "title": "OtherPaymentDescription", "name": "توضیحات (سایر پرداختی ها)", "type": "input" },
      ]
    }

  },
  "marketer-app_subusers": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        {
          "title": "MarketerID",
          "name": "حساب کاربری (کد ملی کاربر)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id",
          "isRequired": true
        },
        { "title": "Name", "name": "نام کاربر", "type": "input" },
        { "title": "UserType", "name": "نوع کاربر", "type": "selectInput" },
        { "title": "date", "name": "تاریخ", "type": "date" },
        { "title": "SortBy", "name": "دسته بندی بر اساس", "type": "selectInput" },
        { "title": "SortOrder", "name": "ترتیب", "type": "selectInput" },
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": moment.from(moment().locale('fa').format('YYYY-MM') + "-01", 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
        "EndDate": moment().locale('en').format('YYYY-MM-DD'),
        "UserType": 'active',
        "Name": '',
        "SortBy": "RegisterDate",
        "SortOrder": 1,
      }
    },
  },
  "marketer-app_marketerContract": {
    services: {},
    "search": {
      "filters": [
        {
          "title": "MarketerID",
          "name": "حساب کاربری (کد ملی کاربر)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id"
        },
        { "title": "ID", "name": "شناسه قرارداد", "type": "input" },
        { "title": "CalculationBaseType", "name": "نوع محاسبات", "type": "selectInput" },
        { "title": "CoefficientBaseType", "name": "نوع ضرائب", "type": "selectInput" },
        { "title": "ContractNumber", "name": "شماره قرارداد", "type": "input" },
        { "title": "ContractType", "name": "نوع قرارداد", "type": "selectInput" },
        { "title": "Title", "name": "عنوان", "type": "input" },
        { "title": "Description", "name": "توضیحات", "type": "input" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" },
      ],
      "initialValue": {
        "MarketerID": '',
        "ID": '',
        "StartDate": null,
        "EndDate": null,
        "CalculationBaseType": '',
        "CoefficientBaseType": '',
        "ContractNumber": "",
        "ContractType": '',
        "Title": '',
        "Description": '',
      }
    },
    "toolbar": {
      "modal": [
        {
          "title": "MarketerID",
          "name": "حساب کاربری (کد ملی کاربر)",
          "type": "dynamicSearch",
          "placeholder": "Title",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id"
        },
        { "title": "CalculationBaseType", "name": "نوع پایه محاسبه", "type": "selectInput" },
        { "title": "CoefficientBaseType", "name": "نوع ضریب پایه ", "type": "selectInput" },
        { "title": "ContractNumber", "name": "شماره قرارداد", "type": "input" },
        { "title": "ContractType", "name": "نوع قرارداد", "type": "selectInput" },
        { "title": "Title", "name": "عنوان", "type": "input" },
        { "title": "Description", "name": "توضیحات", "type": "input" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date" },
      ]
    }
  },
  "marketer-app_marketers": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "TbsReagentName", "name": "TBS عنوان معرف", "type": "input" },
        { "title": "UniqueId", "name": "کدملی", "type": "input" },
        { "title": "Mobile", "name": "موبایل", "type": "input" }
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "Title": '',
        "UniqueId": null,
        "Mobile": null
      }
    },
  },
  "marketer-app_marketerContract_detail": {
    services: {},
    "toolbar": {
      "coeff-add": [
        { "title": "CoefficientPercentage", "name": "درصد ضریب", "type": "input" },
        { "title": "HighThreshold", "name": "حد بالای پله", "type": "input" },
        { "title": "LowThreshold", "name": "حد پائین پله", "type": "input" },
        { "title": "StepNumber", "name": "شماره پله", "type": "input" },
      ],
      "add": [
        { "title": "CollateralCoefficient", "name": "ضریب کسورات حسن انجام کار", "type": "input" },
        { "title": "TaxCoefficient", "name": "ضریب مالیات", "type": "input" },
        { "title": "InsuranceCoefficient", "name": "ضریب کسورات بیمه", "type": "input" },
        { "title": "ReturnDuration", "name": "دوره برگشت کسورات", "type": "input" },
      ],
      "edit": [
        { "title": "CollateralCoefficient", "name": "ضریب کسورات حسن انجام کار", "type": "input" },
        { "title": "TaxCoefficient", "name": "ضریب مالیات", "type": "input" },
        { "title": "InsuranceCoefficient", "name": "ضریب کسورات بیمه", "type": "input" },
        { "title": "ReturnDuration", "name": "دوره برگشت کسورات", "type": "input" },
      ],
    },
  },
  "marketer-app_reconcilation": {
    services: {},
    "search": {
      "filters": [
        {
          "title": "MarketerID",
          "name": "حساب کاربری (کد ملی کاربر)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id"
        },
        { "title": "date", "name": "تاریخ معامله", "type": "date" },
      ],
      "initialValue": {
        "MarketerID": '',
        "StartDate": null,
        "EndDate": null,
      }
    },
  },
  "portfo-asset-switch-request": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "CustomerId", "name": "شناسه مشتری", "type": "input" },
        { "title": "UnqiueId", "name": "کد ملی مشتری", "type": "input" },
        { "title": "InstrumentId", "name": "تاریخ", "type": "search", "display": "faInsCode" },
        { "title": "Status", "name": "وضعیت تغییر کارگزاری", "type": "selectInput" },
        {
          "title": "UserId",
          "name": "حساب کاربری (کد ملی کاربر)",
          "type": "dynamicSearch",
          "initialValue": "",
          "endpoint": `${IDP}/api/users/SearchUserAccount`,
          "valueField": ["firstName", "lastName", "UniqueId", "Mobile"],
          "queryField": "NationalId",
          "recordField": "id"
        },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date", "isRequired": true },
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": '',
        "EndDate": '',
        "CustomerId": '',
        "Status": null,
        "UserId": "",
      }
    },
    "toolbar": {
      "add": [
        {
          "title": "customerId", "name": "شناسه مشتری", "type": "input", "initialValue": "",
          "isRequired": true
        },
        { "title": "InstrumentId", "name": "شناسه نماد", "type": "search", "isRequired": true, "display": "faInsCode" },
      ],
      "edit": [
        { "title": "status", "name": "وضعیت", "type": "selectInput", "initialValue": null },
        { "title": "description", "name": "توضیحات", "type": "input" },
      ]
    }

  },
  "csdi-portfo_asset_switch_report": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "TradingCode", "name": "کد معاملاتی", "type": "input" },
        { "title": "BourseCode", "name": "کد بورسی", "type": "input" },
        { "title": "InstrumentId", "name": "نام نماد", "type": "search", "display": "faInsCode" },
        { "title": "CustomerType", "name": "حقیقی/حقوقی", "type": "selectInput" },
        { "title": "ChangeType", "name": "نوع تغییر", "type": "selectInput" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date", "isRequired": true },
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": '',
        "EndDate": '',
        "TradingCode": '',
        "BourseCode": null,
        "InstrumentId": "",
        "PersonType": "",
        "ChangeType": "",
      }
    }
  },
  "csdi-portfo_switch_report": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "TradingCode", "name": "کد معاملاتی", "type": "input" },
        { "title": "BourseCode", "name": "کد بورسی", "type": "input" },
        { "title": "InstrumentId", "name": "نام نماد", "type": "search", "display": "faInsCode" },
        { "title": "CustomerType", "name": "حقیقی/حقوقی", "type": "selectInput" },
        { "title": "ChangeType", "name": "نوع تغییر", "type": "selectInput" },
        { "title": "date", "name": "تاریخ شروع و پایان", "type": "date", "isRequired": true },
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": '',
        "EndDate": '',
        "TradingCode": '',
        "BourseCode": null,
        "InstrumentId": "",
        "PersonType": "",
        "ChangeType": "",
      }
    }
  },
  "csdi-portfo": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "TradingCode", "name": "کد معاملاتی", "type": "input" },
        { "title": "BourseCode", "name": "کد بورسی", "type": "input" },
        { "title": "InstrumentId", "name": "نام نماد", "type": "search", "display": "faInsCode" },
        { "title": "CustomerType", "name": "حقیقی/حقوقی", "type": "selectInput" },
        { "title": "Date", "name": "تاریخ", "type": "singleDate", "isRequired": true },
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": '',
        "EndDate": '',
        "TradingCode": '',
        "BourseCode": null,
        "InstrumentId": "",
        "PersonType": "",
        "ChangeType": "",
      }
    }
  },
  "csdi-portfo_comparison": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "TradingCode", "name": "کد معاملاتی", "type": "input", "isRequired": true },
        { "title": "BourseCode", "name": "کد بورسی", "type": "input" },
        { "title": "DateFirst", "name": " تاریخ اول", "type": "singleDate", "isRequired": true },
        { "title": "DateSecond", "name": "تاریخ دوم", "type": "singleDate", "isRequired": true },
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 100,
        "StartDate": '',
        "EndDate": '',
        "TradingCode": '',
        "BourseCode": null,
      }
    }
  },
  "csdi-portfo_freezed_asset": {
    services: {},
    "search": {
      "filters": [
        { "title": "PageNumber", "name": "شماره صفحه", "type": null },
        { "title": "PageSize", "name": "تعداد", "type": null },
        { "title": "CustomerId", "name": "شناسه مشتری", "type": "input" },
        { "title": "TradingCode", "name": "کد معاملاتی", "type": "input" },
        { "title": "InstrumentId", "name": "شناسه نماد", "type": "search", "display": "faInsCode" },
        { "title": "BourseCode", "name": "کد بورسی", "type": "input" },
        { "title": "CustomerType", "name": " نوع مشتری", "type": "selectInput" },
        { "title": "IsFreezed", "name": "آیا منجمد است؟", "type": "selectInput" },
        { "title": "Date", "name": "تاریخ شروع و پایان", "type": "date", "isRequired": true },
      ],
      "initialValue": {
        "PageNumber": 1,
        "PageSize": 20,
        "StartDate": '',
        "EndDate": '',
        "TradingCode": '',
        "BourseCode": null,
      }
    }
  }
}

export default filters;