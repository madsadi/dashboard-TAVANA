import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import {useSelector} from "react-redux";
import {Card} from "primereact/card";

export default function ClearedTradesResultTableSection() {
    const {clearedTradesResult}=useSelector((state:any)=>state.netFlowConfig)

    const [products, setProducts] = useState<any[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const [globalFilter, setGlobalFilter] = useState<any>(null);
    const [expandedRows, setExpandedRows] = useState<any>(null);

    const toast:any = useRef(null);
    const dt:any = useRef(null);

    useEffect(() => {
        if (clearedTradesResult){
            setProducts(clearedTradesResult)
        }
    }, [clearedTradesResult]);

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

    const rowExpansionTemplate = (data:any) => {
        return (
            <div className="orders-subtable">
                <DataTable value={[data.feeDetail]} responsiveLayout="scroll">
                    <Column field="brokerCommission" header="کارمزد کارگزاری" sortable body={(rowData)=>rowData.brokerCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="brfCommission" header="سهم صندوق توسعه" sortable body={(rowData)=>rowData.brfCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="bourseCommisison" header="کارمزد بورس" sortable body={(rowData)=>rowData.bourseCommisison} style={{ minWidth: '7rem' }}/>
                    <Column field="seoCommission" header="کارمزد سازمان" sortable body={(rowData)=>rowData.seoCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="tmcCommission" header="کارمزد فناوری" sortable body={(rowData)=>rowData.tmcCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="accessCommission" header="حق دسترسی" sortable body={(rowData)=>rowData.accessCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="csdCommission" header="کارمزد سپرده گزاری" sortable body={(rowData)=>rowData.csdCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="rayanBourseCommission" header="کارمزد رایان" sortable body={(rowData)=>rowData.rayanBourseCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="inventoryCommission" header="هزینه انبارداری" sortable body={(rowData)=>rowData.inventoryCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="tax" header="مالیات" sortable body={(rowData)=>rowData.tax} style={{ minWidth: '7rem' }}/>
                    <Column field="vatCommission" header="مالیات ارزش افزوده" sortable body={(rowData)=>rowData.vatCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="vtsCommission" header="مالیات ارزض افزوده هزینه انبارداری" sortable body={(rowData)=>rowData.vtsCommission} style={{ minWidth: '7rem' }}/>
                    <Column field="farCommission" header="هزینه فرآوری" sortable body={(rowData)=>rowData.farCommission} style={{ minWidth: '7rem' }}/>
                </DataTable>
            </div>
        );
    }

    return (
        <Card className="datatable-scroll-demo">
            <Toast ref={toast} position="top-center"/>

            <div className="card">
                <Toolbar className="mb-4" right={rightToolbarTemplate}/>
                <DataTable ref={dt} value={products}  selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                           expandedRows={expandedRows} onRowToggle={(e) =>setExpandedRows(e.data)}
                           rowExpansionTemplate={rowExpansionTemplate}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} stripedRows scrollable scrollHeight="500px"
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           globalFilter={globalFilter} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}/>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="id" header="تاریخ" sortable body={(rowData)=>rowData.id} style={{ minWidth: '7rem' }}/>
                    <Column field="date" header="تاریخ" sortable body={(rowData)=>rowData.date} style={{ minWidth: '7rem' }}/>
                    <Column field="fullName" header="عنوان مشتری" sortable body={(rowData)=>rowData.fullName} style={{ minWidth: '7rem' }}/>
                    <Column field="nationalCode" header="کد ملی" sortable body={(rowData)=>rowData.nationalCode} style={{ minWidth: '7rem' }}/>
                    <Column field="stationName" header="ایستگاه معمالاتی" sortable body={(rowData)=>rowData.stationName} style={{ minWidth: '7rem' }}/>
                    <Column field="stationCode" header="کد ایستگاه" sortable body={(rowData)=>rowData.stationCode} style={{ minWidth: '7rem' }}/>
                    <Column field="ticket" header="تیکت" sortable body={(rowData)=>rowData.ticket} style={{ minWidth: '7rem' }}/>
                    <Column field="tradeDate" header="تاریخ معامله" sortable body={(rowData)=>rowData.tradeDate} style={{ minWidth: '7rem' }}/>
                    <Column field="instrumentId" header="شناسه نماد" sortable body={(rowData)=>rowData.instrumentId} style={{ minWidth: '7rem' }}/>
                    <Column field="symbolName" header="نام نماد" sortable body={(rowData)=>rowData.symbolName} style={{ minWidth: '7rem' }}/>
                    <Column field="symbol" header="نماد" sortable body={(rowData)=>rowData.symbol} style={{ minWidth: '7rem' }}/>
                    <Column field="settlementDelay" header="تاخیر در تسویه" sortable body={(rowData)=>rowData.settlementDelay} style={{ minWidth: '7rem' }}/>
                    <Column field="bourseCode" header="کد بورسی" sortable body={(rowData)=>rowData.bourseCode} style={{ minWidth: '7rem' }}/>
                    <Column field="price" header="قیمت" sortable body={(rowData)=>rowData.price} style={{ minWidth: '7rem' }}/>
                    <Column field="shares" header="حجم" sortable body={(rowData)=>rowData.shares} style={{ minWidth: '7rem' }}/>
                    <Column field="settlementValue" header="ارزش ناخالص" sortable body={(rowData)=>rowData.settlementValue} style={{ minWidth: '7rem' }}/>
                    <Column field="symbolMessage" header="متن پیام" sortable body={(rowData)=>rowData.symbolMessage} style={{ minWidth: '7rem' }}/>

                    {/*<Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}/>*/}
                </DataTable>
            </div>
        </Card>
    );
}
