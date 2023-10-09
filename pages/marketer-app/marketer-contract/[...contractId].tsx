import React, { createContext, useEffect } from "react";
import dynamic from "next/dynamic";
const TableComponent = dynamic(() => import('../../../components/common/table/table-component'));
import useQuery from "../../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../../api/constants";
import { useRouter } from "next/router";
import MarketerContractDeductionDetailToolbar from "components/marketer-app/marketer-contract/detail/deduction/marketer-contract-deduction-detail-toolbar";
import MarketerContractCoefficientDetailToolbar from "components/marketer-app/marketer-contract/detail/coeff/marketer-contract-coefficient-detail-toolbar";

export const MarketerContractDetailContext = createContext({})
function MarketerContractDetail() {
    const router = useRouter()
    const columnDefDeductionStructure: any = [
        {
            field: 'ContractID',
            headerName: 'شناسه قرارداد',
        },
        {
            field: 'MarketerID',
            headerName: 'شناسه بازاریاب',
        },
        {
            field: 'Title',
            headerName: 'عنوان بازاریاب',
        },
        {
            field: 'CollateralCoefficient',
            headerName: 'ضریب حسن انجام کار',
            fixed: 2
        },
        {
            field: 'TaxCoefficient',
            headerName: 'ضریب مالیات',
            fixed: 2
        },
        {
            field: 'InsuranceCoefficient',
            headerName: 'ضریب بیمه',
            fixed: 2
        },
        {
            field: 'ReturnDuration',
            headerName: 'دوره برگشت کسورات',
        }
    ]
    const columnDefCoefficientStructure: any = [
        {
            field: 'ContractID',
            headerName: 'شناسه قرارداد',
        },
        {
            field: 'MarketerID',
            headerName: 'شناسه بازاریاب',
        },
        {
            field: 'Title',
            headerName: 'عنوان بازاریاب',
        },
        {
            field: 'CoefficientPercentage',
            headerName: 'درصد ضریب',
            fixed: 2
        },
        {
            field: 'HighThreshold',
            headerName: 'حد بالای پله',
        },
        {
            field: 'LowThreshold',
            headerName: 'حد بالای پایین',
        },
        {
            field: 'StepNumber',
            headerName: 'شماره پله',
        },
        {
            field: 'IsCmdConcluded',
            headerName: 'سهم صندوق توسعه اضافه میشود؟',
            valueFormatter: (rowData: any) => {
                return (
                    rowData.data.IsCmdConcluded ? 'بله' : 'خیر'
                )
            }
        }
    ]

    let contractId = router.query.contractId?.[0]

    const {
        data: deductionData, fetchData: deductionFetch, query: deductionSearchQuery
    }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer-contract-deduction/search` })
    const {
        data: coefficientData, fetchData: coefficientFetch, query: coefficientSearchQuery
    }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer-contract-coefficient/search` })

    useEffect(() => {
        if (contractId) {
            deductionFetch({ ContractID: router.query.contractId?.[0] })
            coefficientFetch({ ContractID: router.query.contractId?.[0] })
        }
    }, [contractId])

    return (
        <MarketerContractDetailContext.Provider value={{ contractId, deductionFetch, deductionSearchQuery, deductionData: deductionData?.result?.pagedData, coefficientData: coefficientData?.result?.pagedData, coefficientFetch, coefficientSearchQuery }}>
            <div className={'flex flex-col h-full flex-1'}>
                <MarketerContractDeductionDetailToolbar />
                <TableComponent data={deductionData?.result?.pagedData}
                    columnDefStructure={columnDefDeductionStructure}
                    rowId={['ContractID']}
                />
                <div className="mt-5" />
                <MarketerContractCoefficientDetailToolbar />
                <TableComponent data={coefficientData?.result?.pagedData}
                    columnDefStructure={columnDefCoefficientStructure}
                    rowId={['ContractID']}
                />
            </div>
        </MarketerContractDetailContext.Provider>
    )
}

export default MarketerContractDetail