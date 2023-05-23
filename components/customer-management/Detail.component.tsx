import React, { useState} from "react";
import TableComponent from "../common/table/table-component";
import DateCell from "../common/table/DateCell";
import usePageStructure from "../../hooks/usePageStructure";

export default function DetailComponent({data}: { data: any }) {
    const [rowData, setRowData] = useState<any>([])
    const columnDefStructure: any = [
        {
            field: 'id',
            headerName: 'شناسه ',
        },
        {
            field: 'commissionCoefficient',
            headerName: 'ضرایب کارمزد',
        },
        {
            field: 'lowAmount',
            headerName: 'کف پله',
        },
        {
            field: 'highAmount',
            headerName: 'سقف پله',
        },
        {
            field: 'coefficientPercentage',
            headerName: 'ضریب کارمزد',
        },
        {
            field: 'deductionPercentage',
            headerName: 'ضریب کسورات',
        },
        {
            field: 'createDateTime',
            headerName: 'ضریب کسورات',
            cellRendererSelector: () => {
                return {
                    component: (rowData: any) => <DateCell date={rowData.data.createDateTime}/>,
                };
            },
        },
        {
            field: 'updateDateTime',
            headerName: 'زمان ویرایش',
            cellRendererSelector: () => {
                return {
                    component: (rowData: any) => <DateCell date={rowData.data.updateDateTime}/>,
                };
            },
        }
    ]
    const {page} = usePageStructure()

    const component: any = {
        'marketer': <div className={'flex flex-wrap p-5 gap-4'}>
            <div>

                شناسه مشتری:
                <span className={'mx-2'}>
                            {data?.customerId}
                        </span>
            </div>
            <div>
                شناسه شرکت:
                <span className={'mx-2'}>
                            {data?.subsidiaryId}
                        </span>
            </div>
            <div>
                شناسه شعبه:
                <span className={'mx-2'}>
                            {data?.branchId}
                        </span>
            </div>

        </div>,
        'branch': <div className={'p-5'}>
            شناسه آدرس:
            <span className={'mx-2'}>
                            {data?.address?.id}
                        </span>
        </div>,
        'contract': <TableComponent data={[data]}
                                    columnDefStructure={columnDefStructure}
                                    rowId={['id']}
        />

    }

    return (
        <div className="flex flex-col h-full grow m-5 bg-white pb-20">
            {component?.[page?.api]}
        </div>
    )
}