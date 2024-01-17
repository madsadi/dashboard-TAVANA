import { Day } from "react-modern-calendar-datepicker";

interface FilterItemBasicType {
  title: string;
  name: string;
  isRequired?: boolean;
  valueType?: "number";
  placeholder?: string;
  initialValue?: string | null | boolean;
  readOnly?: boolean;
  dir?: "ltr" | "rtl";
  alternative?: string;
  result?: "" | "pagedData";

  //for those inputs, that its value could effect other input
  dependancy?: string; //dependant input
  onChange?: (value: any) => any; //function that needs to execute when effecting input has changed
}

export interface FilterItemDynamicType extends FilterItemBasicType {
  type: "dynamicSearch";
  initialValue?: string;
  endpoint: string;
  valueField: string[];
  disabled?: boolean;
  queryField: string;
  placeholder?: string;
  hasPlaceholder?: boolean;
  recordField: string;
  isMultiple?: boolean;
  resultField?: string;
  alternative?: string;
  revalidateOnMount?: boolean;
  alternativeRelatedRecordField?: string;
  inputAble?: boolean;
}

export interface FilterItemSearchType extends FilterItemBasicType {
  type: "search";
  display: string;
  isMultiple?: boolean;
}

export interface FilterItemSingleDateType extends FilterItemBasicType {
  type: "singleDate";
  minimumDate?: Day;
}

interface FilterItemOtherTypes extends FilterItemBasicType {
  type:
    | "selectInput"
    | "input"
    | "date"
    | "searchRoles"
    | "password"
    | "selectInputTime"
    | "dynamicSelectInput"
    | "dateTimeInput"
    | "dynamic"
    | null;
}

export type FilterItemType =
  | FilterItemOtherTypes
  | FilterItemDynamicType
  | FilterItemSearchType
  | FilterItemSingleDateType;
