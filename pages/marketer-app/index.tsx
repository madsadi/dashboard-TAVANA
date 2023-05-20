import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
import { jalali} from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import {MARKETER_ADMIN} from "../../api/constants";
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";

export default function Users() {
    const columnDefStructure: any = [
        {
            field: 'userId',
            headerName: 'شناسه کاربر',
        },
        {
            field: 'name',
            headerName: 'نام کاربر',
        },
        {
            field: 'typeTitle',
            headerName: 'نوع',
        },
        {
            field: 'date',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{jalali(rowData.data.date).date}</span>
                            <span className={'ml-2'}>{jalali(rowData.data.date).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'clientId',
            headerName: 'نرم افزار'
        },
        {
            field: 'succeed',
            headerName: 'وضعیت'
        },
        {
            field: 'ip',
        },
        {
            field: 'userAgent',
        },
        {
            field: 'browser',
            headerName: 'مرورگر'
        },
        {
            field: 'os',
            headerName: 'سیستم عامل'
        },
        {
            field: 'isMobile',
            headerName: 'از طریق موبایل',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span>{rowData.data.isMobile ? 'بله' : 'خیر'}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'errorMessage',
            headerName: 'خطا'
        }
    ]
    const {data,query,fetchData}:any = useQuery({url:`${MARKETER_ADMIN}/api/users/SearchUserActivityLogs`})

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent onSubmit={fetchData} module={ModuleIdentifier.MARKETER_APP}/>
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}
                            pagination={true}
                            totalCount={data?.result?.totalCount}
                            fetcher={fetchData}
                            query={query}
            />
        </div>
    )
}