import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import {useSelector} from "react-redux";
import {Card} from "primereact/card";

export default function CommissionResult() {

    const {commission}=useSelector((state:any)=>state.commissionConfig)

    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        if (commission){
            setProducts(commission)
        }
    }, [commission]);

    const rightToolbarTemplate = () => {
        const exportExcel = () => {
            import('xlsx').then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(products);
                const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
                saveAsExcelFile(excelBuffer, 'products');
            });
        }

        const saveAsExcelFile = (buffer:any, fileName:any) => {
            import('file-saver').then(module => {
                if (module && module.default) {
                    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                    let EXCEL_EXTENSION = '.xlsx';
                    const data = new Blob([buffer], {
                        type: EXCEL_TYPE
                    });

                    module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
                }
            });
        }

        return (
            <React.Fragment>
                <Button type="button" icon="pi pi-file-excel" label={'خروجی'} onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
            </React.Fragment>
        )
    }

    return (
        <Card className="datatable-scroll-demo">
            <div className="card">
                <Toolbar className="mb-4" right={rightToolbarTemplate}/>
                <DataTable value={products} sortMode="multiple" removableSort
                           paginator rows={10} rowsPerPageOptions={[5, 10, 25]} stripedRows scrollable scrollHeight="500px"
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           responsiveLayout="scroll">
                    <Column field="id" header="شناسه" sortable style={{ minWidth: '6rem'}}/>
                    <Column field="marketCode" header="کد بازار" sortable  style={{ minWidth: '12rem'}}/>
                    <Column field="marketTitle" header="بازار" style={{ minWidth: '8rem'}}/>
                    <Column field="offerTypeCode" header="کد نوع عرضه" sortable style={{ minWidth: '14rem'}}/>
                    <Column field="offerTypeTitle" header="نوع عرضه" sortable style={{ minWidth: '10rem'}}/>
                    <Column field="sideCode" header="کد سمت سفارش" sortable style={{ minWidth: '10rem'}}/>
                    <Column field="sideTitle" header="سمت سفارش" sortable style={{ minWidth: '12rem'}}/>
                    <Column field="settlementDelayCode" header="کد تاخیر در تسویه" sortable style={{ minWidth: '12rem'}}/>
                    <Column field="settlementDelayTitle" header="تاخیر در تسویه" sortable style={{ minWidth: '12rem'}}/>
                    <Column field="customerTypeCode" header="کد نوع مشتری"  sortable style={{ minWidth: '12rem'}}/>
                    <Column field="customerTypeTitle" header="نوع مشتری"  sortable style={{ minWidth: '12rem'}}/>
                    <Column field="customerCounterSideCode" header="کد نوع طرف مقابل" sortable style={{ minWidth: '12rem'}}/>
                    <Column field="customerCounterSideTitle" header="نوع طرف مقابل" sortable style={{ minWidth: '12rem'}}/>
                </DataTable>
            </div>
        </Card>
    );
}
