import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    agreementColumnDefStructure,
    branchesColumnDefStructure,
    businessUnitColumnDefStructure,
    customerAgreementColumnDefStructure,
    employeeColumnDefStructure,
    marketerColumnDefStructure, marketerContractColumnDefStructure,
    stationColumnDefStructure,
    subsidiaryColumnDefStructure,
    traderColumnDefStructure
} from "../components/customer-management/filters-and-structures/table-structures";
import {
    agreementListOfForm,
    branchesListOfForm,
    businessUnitListOfForm,
    customerAgreementListOfForm,
    employeeListOfForm, marketerContractListOfForm,
    marketerListOfForm,
    stationListOfForm,
    subsidiaryListOfForm,
    traderListOfForm
} from "../components/customer-management/filters-and-structures/modal-forms";
import {
    branchListOfFilters,
    businessUnitListOfFilters,
    customerAgreementListOfFilters, marketerContractListOfFilters,
    marketerListOfFilters,
    stationListOfFilters,
    subsidiaryListOfFilters
} from "../components/customer-management/filters-and-structures/search-filters";

export default function usePageStructure() {
    const [page, setPage] = useState<any>({api:'',columnDefStructure: [],searchFilter:'',form:[],listOfFilters:[]});
    const router = useRouter()

    useEffect(() => {
        if (router.query?.page?.[0]) {
            switch (router.query?.page?.[0]) {
                case 'subsidiary':
                    setPage(
                        {
                            api: 'subsidiary',
                            columnsDefStructure: subsidiaryColumnDefStructure,
                            searchFilter: 'شرکت',
                            form: subsidiaryListOfForm,
                            listOfFilters: subsidiaryListOfFilters
                        }
                    )
                    break;
                case 'branch':
                    setPage(
                        {
                            api: 'branch',
                            columnsDefStructure: branchesColumnDefStructure,
                            searchFilter: 'شعبه',
                            form: branchesListOfForm,
                            listOfFilters: branchListOfFilters
                        }
                    )
                    break;
                case 'employee':
                    setPage(
                        {
                            api: 'employee',
                            columnsDefStructure: employeeColumnDefStructure,
                            searchFilter: 'کارمند',
                            form: employeeListOfForm,
                        }
                    )
                    break;
                case 'businessUnit':
                    setPage(
                        {
                            api: 'businessUnit',
                            columnsDefStructure: businessUnitColumnDefStructure,
                            searchFilter: 'واحد کاری',
                            form: businessUnitListOfForm,
                            listOfFilters: businessUnitListOfFilters
                        }
                    )
                    break;
                case 'station':
                    setPage(
                        {
                            api: 'station',
                            columnsDefStructure: stationColumnDefStructure,
                            searchFilter: 'ایستگاه معاملاتی',
                            form: stationListOfForm,
                            listOfFilters: stationListOfFilters
                        }
                    )
                    break;
                case 'trader':
                    setPage(
                        {
                            api: 'trader',
                            columnsDefStructure: traderColumnDefStructure,
                            searchFilter: 'معامله گران',
                            form: traderListOfForm,
                        }
                    )
                    break;
                case 'marketer':
                    setPage(
                        {
                            api: 'marketer',
                            columnsDefStructure: marketerColumnDefStructure,
                            searchFilter: 'بازاریاب ها',
                            form: marketerListOfForm,
                            listOfFilters: marketerListOfFilters
                        }
                    )
                    break;
                case 'agreement':
                    setPage(
                        {
                            api: 'agreement',
                            columnsDefStructure: agreementColumnDefStructure,
                            searchFilter: 'توافقنامه ها',
                            form: agreementListOfForm,
                            // listOfFilters: marketerListOfFilters
                        }
                    )
                    break;
                case 'customerAgreement':
                    setPage(
                        {
                            api: 'customerAgreement',
                            columnsDefStructure: customerAgreementColumnDefStructure,
                            searchFilter: 'توافقنامه های بین طرفین',
                            form: customerAgreementListOfForm,
                            listOfFilters: customerAgreementListOfFilters
                        }
                    )
                    break;
                case 'contract':
                    setPage(
                        {
                            api: 'contract',
                            columnsDefStructure: marketerContractColumnDefStructure,
                            searchFilter: 'قرارداد بازاریابی',
                            form: marketerContractListOfForm,
                            listOfFilters: marketerContractListOfFilters
                        }
                    )
                    break;
                default:
                    break;
            }
        }
    }, [router.query?.page?.[0]])


    return {
        page
    }
}