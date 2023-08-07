import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
import useQuery from "../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import DateCell from "../../components/common/table/DateCell";

export default function SubUsers() {

    const columnDefStructure: any = [
        {
            field: 'FirstName',
            headerName: 'نام ',
        },
        {
            field: 'LastName',
            headerName: 'نام خانوادگی',
        },
        {
            field: 'FirmTitle',
            headerName: 'نام شرکت',
        },
        {
            field: 'TotalPureVolume',
            headerName: 'خالص گردش',
        },
        {
            field: 'TotalFee',
            headerName: 'کل کارمزد',
        },
        {
            field: 'Mobile',
            headerName: 'موبایل',
        },
        {
            field: 'BankAccountNumber',
            headerName: 'شماره حساب بانکی',
        },
        {
            field: 'Email',
            headerName: 'ایمیل',
        },
        {
            field: 'RegisterDate',
            headerName: 'تاریخ ثبت نام',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <DateCell date={rowData.data.RegisterDate} />
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const {
        data, fetchData, loading, query
    }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer/all-users-total` })

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.MARKETER_APP_subusers} />
            </AccordionComponent>
            <TableComponent data={data?.result.pagedData}
                module={ModuleIdentifier.MARKETER_APP_subusers}
                columnDefStructure={columnDefStructure}
                rowSelection={'single'}
                rowId={['Username']}
                pagination={true}
                totalCount={data?.result?.totalCount}
                fetcher={fetchData}
                query={query} />
        </div>
    )
}