
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {useDispatch, useSelector} from "react-redux";
import {getCommission} from "../../api/useCommission";
import {Chip} from "primereact/chip";

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
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState<any>(null);
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


    const editProduct = (product:any) => {
        setProduct({...product});
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product:any) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }


    const exportCSV = () => {
        dt.current?.exportCSV();
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
                <Button label="خروجی" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
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
    const sectorCodeBodyTemplate = (rowData: any) => {
        return rowData.sectorCode
    }
    // const descriptionBodyTemplate = (rowData: any) => {
    //     return rowData.instrumentTypeDescription
    // }

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

    const actionBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                           globalFilter={globalFilter} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}/>
                    <Column field="code" header="شماره" sortable body={idBodyTemplate} style={{ minWidth: '6rem' }}/>
                    <Column field="name" header="عنوان بورس" sortable body={nameBodyTemplate} style={{ minWidth: '12rem' }}/>
                    <Column field="image" header="کد نوع ابزار مالی" body={imageBodyTemplate} style={{ minWidth: '8rem' }}/>
                    <Column field="price" header="عنوان نوع ابزار مالی" body={priceBodyTemplate} sortable style={{ minWidth: '14rem' }}/>
                    <Column field="category" header="توضیحات" sortable body={descriptionBodyTemplate} style={{ minWidth: '10rem' }}/>
                    <Column field="rating" header="کد گروه صنعت" body={ratingBodyTemplate} sortable style={{ minWidth: '10rem' }}/>
                    <Column field="rating" header=" گروه صنعت" body={catBodyTemplate} sortable style={{ minWidth: '12rem' }}/>
                    <Column field="rating" header="کد زیرگروه صنعت" body={codeSubCodeBodyTemplate} sortable style={{ minWidth: '12rem' }}/>
                    <Column field="rating" header="زیرگروه صنعت" body={subCatBodyTemplate} sortable style={{ minWidth: '12rem' }}/>
                    <Column field="inventoryStatus" header="حذف شده" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}/>
                    {/*<Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}/>*/}
                </DataTable>
            </div>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
