import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    agreementColumnDefStructure,
    branchesColumnDefStructure,
    businessUnitColumnDefStructure, contractColumnDefStructure,
    customerAgreementColumnDefStructure,
    employeeColumnDefStructure,
    marketerColumnDefStructure, marketerContractColumnDefStructure,
    stationColumnDefStructure,
    subsidiaryColumnDefStructure,
    traderColumnDefStructure
} from "../components/customer-management/filters-and-structures/table-structures";

export default function usePageStructure() {
    const [page, setPage] = useState<any>({ api: '', columnDefStructure: [], searchFilter: '' });
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
                        }
                    )
                    break;
                case 'branch':
                    setPage(
                        {
                            api: 'branch',
                            columnsDefStructure: branchesColumnDefStructure,
                            searchFilter: 'شعبه',

                        }
                    )
                    break;
                case 'employee':
                    setPage(
                        {
                            api: 'employee',
                            columnsDefStructure: employeeColumnDefStructure,
                            searchFilter: 'کارمند',
                        }
                    )
                    break;
                case 'businessUnit':
                    setPage(
                        {
                            api: 'businessUnit',
                            columnsDefStructure: businessUnitColumnDefStructure,
                            searchFilter: 'واحد کاری'
                        }
                    )
                    break;
                case 'station':
                    setPage(
                        {
                            api: 'station',
                            columnsDefStructure: stationColumnDefStructure,
                            searchFilter: 'ایستگاه معاملاتی',
                        }
                    )
                    break;
                case 'trader':
                    setPage(
                        {
                            api: 'trader',
                            columnsDefStructure: traderColumnDefStructure,
                            searchFilter: 'معامله گران',
                        }
                    )
                    break;
                case 'marketer':
                    setPage(
                        {
                            api: 'marketer',
                            columnsDefStructure: marketerColumnDefStructure,
                            searchFilter: 'بازاریاب ها',
                        }
                    )
                    break;
                case 'agreement':
                    setPage(
                        {
                            api: 'agreement',
                            columnsDefStructure: agreementColumnDefStructure,
                            searchFilter: 'توافقنامه ها',
                        }
                    )
                    break;
                case 'customerAgreement':
                    setPage(
                        {
                            api: 'customerAgreement',
                            columnsDefStructure: customerAgreementColumnDefStructure,
                            searchFilter: 'توافقنامه های بین طرفین',
                        }
                    )
                    break;
                case 'contract':
                    setPage(
                        {
                            api: 'contract',
                            columnsDefStructure: contractColumnDefStructure,
                            searchFilter: 'قرارداد بازاریابی',
                        }
                    )
                    break;
                case 'marketerContract':
                    setPage(
                        {
                            api: 'marketerContract',
                            columnsDefStructure: marketerContractColumnDefStructure,
                            searchFilter: 'قرارداد با بازاریاب',
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