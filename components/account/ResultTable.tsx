import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import {useSelector} from "react-redux";
import {getCommission} from "../../api/useCommission";
import {Chip} from "primereact/chip";
import {Card} from "primereact/card";

export default function ResultTable() {

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const {searchResult}=useSelector((state:any)=>state.commissionConfig)

    const [products, setProducts] = useState<any[]>([]);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState<any>(null);
    const [expandedRows, setExpandedRows] = useState<any>(null);
    const [subTableData, setSubTableData] = useState<any[]>([]);

    const toast:any = useRef(null);
    const dt:any = useRef(null);

    useEffect(() => {
        if (searchResult){
            setProducts(searchResult)
        }
    }, [searchResult]);


    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

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
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter((val:any) => !selectedProducts?.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="حذف" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button type="button" icon="pi pi-file-excel" label={'خروجی'} onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
            </React.Fragment>
        )
    }

    const idBodyTemplate = (rowData:any) => {
        return rowData.id
    }
    const nameBodyTemplate = (rowData:any) => {
        return rowData.bourseTitle
    }
    const imageBodyTemplate = (rowData:any) => {
        return rowData.instrumentTypeCode
    }

    const priceBodyTemplate = (rowData:any) => {
        return rowData.instrumentTypeTitle
    }
    const descriptionBodyTemplate = (rowData: any) => {
        return rowData.instrumentTypeDescription
    }

    const ratingBodyTemplate = (rowData:any) => {
        return rowData.sectorCode;
    }
    const catBodyTemplate = (rowData:any) => {
        return rowData.sectorTitle;
    }
    const codeSubCodeBodyTemplate = (rowData:any) => {
        return rowData.subSectorCode;
    }
    const subCatBodyTemplate = (rowData:any) => {
        return rowData.subSectorTitle;
    }

    const statusBodyTemplate = (rowData:any) => {
        return <Chip label={`${rowData.deleted ? 'حذف شده':'حذف نشده'}`} className={`${rowData.deleted ? 'bg-red-400':'bg-green-400'} text-white text-xs`} />
    }

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="خیر" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="بله" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    // const amountBodyTemplate = (rowData:any) => {
    //     return rowData.instrumentTypeCode;
    // }
    //
    // const statusOrderBodyTemplate = (rowData:any) => {
    //     return <span className={`order-badge`}>{rowData.instrumentTypeTitle}</span>;
    // }
    //
    // const searchBodyTemplate = (rowData:any) => {
    //     return <span className={`order-badge`}>{rowData.bourseTitle}</span>;
    // }

    // const expandRowHandler=async (e:any)=>{
    //     setExpandedRows(e.data)
    //     const commissionForTheRow=async (id:string)=>{
    //         await getCommission(id)
    //             .then(res=>setSubTableData([...subTableData,res?.result]))
    //     }
    //     if (subTableData.filter((item:any)=>item.id==Object.keys(e.data)).length===0 && Object.keys(e.data)[0]){
    //         commissionForTheRow(Object.keys(e.data)[0])
    //     }
    // }
    //
    // const rowExpansionTemplate = (data:any) => {
    //     return (
    //         <div className="orders-subtable">
    //             <DataTable value={subTableData.filter((item:any)=>item.id===data.id)} responsiveLayout="scroll">
    //                 <Column field="id" header="Id" sortable/>
    //                 <Column field="customer" header="عنوان بورس" body={searchBodyTemplate} sortable/>
    //                 <Column field="amount" header="کد نوع ابزار مالی" body={amountBodyTemplate} sortable/>
    //                 <Column field="amount" header="کد نوع ابزار مالی" body={amountBodyTemplate} sortable/>
    //                 <Column field="status" header="عنوان نوع ابزار مالی" body={statusOrderBodyTemplate} sortable/>
    //             </DataTable>
    //         </div>
    //     );
    // }

    return (
        <Card className="datatable-scroll-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}/>
                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} stripedRows scrollable scrollHeight="500px"
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           globalFilter={globalFilter} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}/>
                    <Column field="code" header="شماره" sortable body={idBodyTemplate} style={{ minWidth: '6rem' }}/>
                    <Column field="name" header="عنوان بورس" sortable body={nameBodyTemplate} style={{ minWidth: '12rem' }}/>
                    <Column field="image" header="کد نوع ابزار مالی" body={imageBodyTemplate} style={{ minWidth: '8rem' }}/>
                    <Column field="price" header="عنوان نوع ابزار مالی" body={priceBodyTemplate} sortable style={{ minWidth: '14rem' }}/>
                    <Column field="category" header="توضیحات" sortable body={descriptionBodyTemplate} style={{ minWidth: '10rem' }}/>
                    <Column field="rating" header="کد گروه صنعت" body={ratingBodyTemplate} sortable style={{ minWidth: '10rem' }}/>
                    <Column field="industry" header=" گروه صنعت" body={catBodyTemplate} sortable style={{ minWidth: '12rem' }}/>
                    <Column field="subIndustryCode" header="کد زیرگروه صنعت" body={codeSubCodeBodyTemplate} sortable style={{ minWidth: '12rem' }}/>
                    <Column field="subIndustry" header="زیرگروه صنعت" body={subCatBodyTemplate} sortable style={{ minWidth: '12rem' }}/>
                    <Column field="inventoryStatus" header="حذف شده" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}/>
                    {/*<Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}/>*/}
                </DataTable>
            </div>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content align-content-center flex">
                    <i className="pi pi-exclamation-triangle ml-3" style={{ fontSize: '1.4rem'}} />
                    {product && <span>آیا از حذف ردیف مورد نظر اطمینان دارید؟</span>}
                </div>
            </Dialog>
        </Card>
    );
}
