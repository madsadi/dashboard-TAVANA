import React from "react";
import TableComponent from "../common/table/table-component";
import DateCell from "../common/table/DateCell";

export default function ContractDetail({data}:{data:any}){
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

    console.log(data)
    return(
        <TableComponent data={data}
                        columnDefStructure={columnDefStructure}
                        rowId={['id']}
        />
    )
}