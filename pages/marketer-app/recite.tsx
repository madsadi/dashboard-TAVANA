import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
const ReciteToolbar = dynamic(() => import("../../components/marketer-app/recite/toolbar/recite-toolbar"));

import { formatNumber } from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

export const ReciteContext = createContext({})
function Recite() {
    const [selectedRows, setSelectedRows] = useState<any>([])

    const columnDefStructure: any = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
        },
        {
            field: 'MarketerID',
            headerName: 'شناسه بازاریاب',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'Period',
            headerName: 'دوره زمانه',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
                    return (
                        <div>
                            {months[Number(rowData.data.Period.split('1402')[1]) - 1]}
                        </div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'FactorID',
            headerName: 'شناسه فاکتور',
        },
        {
            field: 'Plan',
            headerName: 'پلکان',
        },
        {
            field: 'Status',
            headerName: 'وضعیت فاکتور',
        }
    ]
    const {
        data, fetchData, query: searchQuery, loading
    }: any = useQuery({ url: `${MARKETER_ADMIN}/factor/get-all` })

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                // getRowId:(params:any)=>params.data.orderId,
                columnDefs: [
                    {
                        field: 'TotalTurnOver',
                        headerName: 'مجموع گردش',
                    },
                    {
                        field: 'TotalBrokerCommission',
                        headerName: 'مجموع کارمزد کارگزاری',
                    },
                    {
                        field: 'TotalNetBrokerCommission',
                        headerName: 'مجموع خالص کارمزد کارگزار',
                    }, {
                        field: 'MarketerCommissionIncome',
                        headerName: 'حق بازاریابی از خالص کارمزد در دوره',
                    }, {
                        field: 'TotalCMD',
                        headerName: 'مجموع سهم صندوق توسعه',
                    }, {
                        field: 'Tax',
                        headerName: 'مالیات',
                    }, {
                        field: 'CollateralOfThisMonth',
                        headerName: 'کسورات حسن انجام کار این ماه',
                    }, {
                        field: 'TotalFeeOfFollowers',
                        headerName: 'گردش خالض زیر مجموعه ها',
                    }, {
                        field: 'SumOfAdditions',
                        headerName: 'سایر پرداختی',
                    }, {
                        field: 'SumOfDeductions',
                        headerName: 'سایر کسورات',
                    }, {
                        field: 'Payment',
                        headerName: 'پرداختی',
                    }, {
                        field: 'IsCmdConcluded',
                        headerName: 'سهم صندوق توسعه اضافه میشود؟',
                    }, {
                        field: 'MaketerCMDIncome',
                        headerName: 'حق بازاریابی از سهم صندوق توسعه',
                    }, {
                        field: 'TaxDeduction',
                        headerName: 'مالیات',
                    }, {
                        field: 'TaxCoefficient',
                        headerName: 'ضریب مالیات',
                    }, {
                        field: 'CollateralDeduction',
                        headerName: 'کسورات حسن انجام کار',
                    }, {
                        field: 'CollateralCoefficient',
                        headerName: 'ضریب کسورات حسن انجام کار',
                    }, {
                        field: 'InsuranceDeduction',
                        headerName: 'کسورات بیمه',
                    }, {
                        field: 'InsuranceCoefficient',
                        headerName: 'ضریب کسورات بیمه',
                    }, {
                        field: 'MarketerTotalIncome',
                        headerName: 'مجموع حق بازاریابی',
                    }, {
                        field: 'CalculationCoefficient',
                        headerName: 'ضریب محاسبه حق بازاریابی',
                    }, {
                        field: 'ReturnDuration',
                        headerName: 'دوره برگشت سپرده ها',
                    }, {
                        field: 'InterimAmountDeduction',
                        headerName: 'کسورات علی الحساب',
                    }, {
                        field: 'EmployeeSalaryDeduction',
                        headerName: 'کسورات حقوق پرسنل',
                    }, {
                        field: 'EmployerInsuranceDeduction',
                        headerName: 'کسورات بیمه سهم کارفرما',
                    }, {
                        field: 'RedemptionDeduction',
                        headerName: 'کسورات بازخرید',
                    }, {
                        field: 'OtherDeduction',
                        headerName: 'سایر کسورات',
                    }, {
                        field: 'OtherDeductionDescription',
                        headerName: 'توضیحات (سایر کسورات)',
                    }, {
                        field: 'CmdPayment',
                        headerName: 'پرداختی سهم صندوق توسعه',
                    }, {
                        field: 'CollateralReturnPayment',
                        headerName: 'پرداختی برگشت حسن انجام کار',
                    }, {
                        field: 'InsuranceReturnPayment',
                        headerName: 'پرداختی برگشت بیمه',
                    }, {
                        field: 'OtherPayment',
                        headerName: 'سایر پرداختی ها',
                    }
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data]);
            },
        };
    }, []);

    return (
        <ReciteContext.Provider value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}>
            <div className={'flex flex-col h-full flex-1'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.MARKETER_APP_recite} />
                </AccordionComponent>
                <ReciteToolbar />
                <TableComponent data={data?.result.pagedData}
                    columnDefStructure={columnDefStructure}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    rowSelection={'single'}
                    rowId={['FactorID']}
                    detailCellRendererParams={detailCellRendererParams}
                    masterDetail={true}
                />
            </div>
        </ReciteContext.Provider>
    )
}

export default withPermission(Recite, ModuleIdentifier.MARKETER_APP_recite)