import React, {useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import {useSelector} from "react-redux";
import {Card} from "primereact/card";
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {Toast} from "primereact/toast";
import {Paginator} from "primereact/paginator";

export default function CategoryResultTableSection() {
    const {categorySearchResult}=useSelector((state:any)=>state.commissionConfig)

    const [products, setProducts] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [basicFirst, setBasicFirst] = useState(0);
    const [basicRows, setBasicRows] = useState(10);
    const [loading, setLoading] = useState(false);

    const toast:any = useRef(null);

    const search=async (body:any)=>{
        await commissionSearch('/CommissionCategory/Search?', body
        ).then(res => {
            setProducts(res?.result?.pagedData)
            if (totalRecords!==res?.result?.totalCount){
                setTotalRecords(res?.result?.totalCount)
            }
        })
            .catch(err =>
                toast.current?.show({
                    severity: 'error',
                    summary: 'مشکلی رخ داده',
                    detail: `${err?.response?.data?.title}`,
                    life: 6000
                }))
    }

    useEffect(() => {
        let body=[...categorySearchResult,{PageNumber:(Number(basicFirst)/Number(basicRows))+1},{PageSize:basicRows}]
        search(body)
    }, [basicFirst,basicRows]);

    const onBasicPageChange = (event:any) => {
        setBasicFirst(event.first);
        setBasicRows(event.rows);
    }

    const rightToolbarTemplate = () => {
        let body=[...categorySearchResult,{PageSize:totalRecords}]
        const search=async (body:any)=>{
            setLoading(true)
            await commissionSearch('/CommissionCategory/Search?', body)
                .then(res => {
                    exportExcel(res?.result?.pagedData);
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    toast.current?.show({
                        severity: 'error',
                        summary: 'مشکلی رخ داده',
                        detail: `${err?.response?.data?.title}`,
                        life: 6000
                    })
                })
        }

        const exportExcel = (records:any) => {
            import('xlsx').then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(records);
                const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
                saveAsExcelFile(excelBuffer, 'گروه بندی ضرایب');
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
            <>
                <Button type="button" icon="pi pi-file-excel" label={'خروجی'} onClick={()=>search(body)} className="p-button-success mr-auto" data-pr-tooltip="XLS" />
                {loading && <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}/>}
            </>
        )
    }

    const header=()=>{
        return <div className={'flex'}>{rightToolbarTemplate()}</div>
    }
    return (
        <Card className="datatable-scroll-demo">
            <Toast ref={toast} position="top-center"/>
            <div className="card">
                <DataTable value={products} sortMode="multiple" removableSort header={header}
                           stripedRows scrollable scrollHeight="500px"
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
                <Paginator className={'ltr'} first={basicFirst} rows={basicRows} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 30]} onPageChange={onBasicPageChange}/>
            </div>
        </Card>
    );
}
