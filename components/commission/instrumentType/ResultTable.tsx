import React, {useState, useEffect, useRef} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {useSelector} from "react-redux";
import {
    addNewCommission,
    deleteCommission,
    getCommission,
    updateCommission
} from "../../../api/commissionInstrumentType";
import {Chip} from "primereact/chip";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";

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
    const {instrumentSearchResult} = useSelector((state: any) => state.commissionConfig)

    const [products, setProducts] = useState<any[]>([]);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const [globalFilter, setGlobalFilter] = useState<any>(null);
    const [updateSectorCode, setUpdateSectorCode] = useState<string>('');
    const [updateSubSectorCode, setUpdateSubSectorCode] = useState<string>('');
    const [productDialog, setProductDialog] = useState(false);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [bourseCode, setBourseCode] = useState<string>('');
    const [instrumentTypeCode, setInstrumentTypeCode] = useState<string>('');
    const [sectorCode, setSectorCode] = useState<string>('');
    const [subSectorCode, setSubSectorCode] = useState<string>('');
    const [indexOfDeletings, setIndexOfDeletings] = useState(0)
    const [fault, setFaulty] = useState<boolean>(false)

    const toast: any = useRef(null);
    const dt: any = useRef(null);

    useEffect(() => {
        if (instrumentSearchResult) {
            setProducts(instrumentSearchResult)
        }
    }, [instrumentSearchResult]);

    const deleteHandler = async (index: number) => {
        await deleteCommission({id: selectedProducts[index]?.id})
            .then(res => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'با موفقیت انجام شد',
                    detail: 'کارمزد حذف شد',
                    life: 6000
                });
                setIndexOfDeletings(index + 1)
            })
            .catch(err => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'مشکلی رخ داده است',
                    detail: err?.response?.data?.title,
                    life: 6000
                });
                setIndexOfDeletings(index + 1)
            })
    }

    useEffect(() => {
        if (selectedProducts?.[indexOfDeletings]?.id) {
            deleteHandler(indexOfDeletings)
        } else {
            setSelectedProducts([]);
        }
    }, [indexOfDeletings])


    const hideDialog = () => {
        setProductDialog(false);
        setUpdateDialog(false);
        setDeleteProductsDialog(false);
        setBourseCode('')
        setInstrumentTypeCode('')
        setSubSectorCode('')
        setSectorCode('')
        setFaulty(false)
    }


    const leftToolbarTemplate = () => {
        const openNew = () => {
            setProduct(emptyProduct);
            setProductDialog(true);
        }

        const openUpdate = () => {
            if (selectedProducts.length === 1) {
                setUpdateDialog(true);
            } else {
                toast.current?.show({
                    severity: 'error',
                    summary: 'لطفا یک گزینه برای تغییر انتخاب کنید',
                    life: 6000
                });
            }
        }

        const confirmDeleteSelected = () => {
            setDeleteProductsDialog(true);
        }

        return (
            <React.Fragment>
                <Button label="حذف" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}
                        disabled={!selectedProducts || !selectedProducts.length}/>
                <Button label="جدید" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                <Button label="تغییر" icon="pi pi-pencil" className="p-button-success mr-2" onClick={openUpdate}/>
            </React.Fragment>
        )
    }
    const rightToolbarTemplate = () => {
        const exportExcel = () => {
            import('xlsx').then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(products);
                const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
                const excelBuffer = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
                saveAsExcelFile(excelBuffer, 'products');
            });
        }

        const saveAsExcelFile = (buffer: any, fileName: any) => {
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
                <Button type="button" icon="pi pi-file-excel" label={'خروجی'} onClick={exportExcel}
                        className="p-button-success mr-2" data-pr-tooltip="XLS"/>
            </React.Fragment>
        )
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter((val: any) => !selectedProducts?.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        deleteHandler(0)
    }
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="خیر" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="بله" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts}/>
        </React.Fragment>
    );

    const addNewHandler = async () => {
        if (instrumentTypeCode && bourseCode) {
            await addNewCommission({
                bourseCode: bourseCode,
                instrumentTypeCode: instrumentTypeCode,
                sectorCode: sectorCode,
                subSectorCode: subSectorCode
            }).then(res => {
                setProductDialog(false);
                toast.current?.show({
                    severity: 'success',
                    summary: 'با موفقیت انجام شد',
                    detail: 'کارمزد جدید اضافه شد',
                    life: 6000
                });
                setProducts([{
                    id: bourseCode,
                    instrumentTypeCode: instrumentTypeCode,
                    sectorCode: sectorCode,
                    subSectorCode: subSectorCode
                }, ...products])
                setBourseCode('')
                setInstrumentTypeCode('')
                setSectorCode('')
                setSubSectorCode('')
            })
                .catch(err => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'مشکلی رخ داده است',
                        detail: err?.response?.data?.title,
                        life: 6000
                    });
                })
        } else {
            setFaulty(true)
            if (!bourseCode) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'اطلاعات اجباری',
                    detail: 'کد بورس را لطفا وارد کنید',
                    life: 6000
                });
            } else if (!instrumentTypeCode) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'اطلاعات اجباری',
                    detail: 'کد نوع ابزار را لطفا وارد کنید',
                    life: 6000
                });
            }
        }
    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="لغو" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="تایید" icon="pi pi-check" className="p-button-text" onClick={addNewHandler}/>
        </React.Fragment>
    );

    const updateHandler = async () => {
        await updateCommission({
            id: selectedProducts[0]?.id,
            sectorCode: updateSectorCode,
            subSectorCode: updateSubSectorCode
        })
            .then(res => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'با موفقیت انجام شد',
                    life: 6000
                });
                setUpdateDialog(false)
                setUpdateSectorCode('')
                setUpdateSubSectorCode('')
            })
            .catch(err => toast.current?.show({
                severity: 'error',
                summary: err?.response?.data?.title,
                life: 6000
            }))
    }
    const updateDialogFooter = (
        <React.Fragment>
            <Button label="لغو" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="تایید" icon="pi pi-check" className="p-button-text" onClick={updateHandler}/>
        </React.Fragment>
    );

    return (
        <Card className="datatable-scroll-demo">
            <Toast ref={toast} position="top-center"/>

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}/>
                <DataTable ref={dt} value={products} selection={selectedProducts} removableSort
                           onSelectionChange={(e) => setSelectedProducts(e.value)}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} stripedRows scrollable
                           scrollHeight="500px"
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           globalFilter={globalFilter} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{width: '3rem'}} exportable={false}/>
                    <Column field="id" header="شماره" sortable style={{minWidth: '6rem'}}/>
                    <Column field="bourseTitle" header="عنوان بورس" sortable style={{minWidth: '12rem'}}/>
                    <Column field="instrumentTypeCode" header="کد نوع ابزار مالی" style={{minWidth: '8rem'}}/>
                    <Column field="instrumentTypeTitle" header="عنوان نوع ابزار مالی" sortable
                            style={{minWidth: '14rem'}}/>
                    <Column field="sectorCode" header="کد گروه صنعت" sortable style={{minWidth: '10rem'}}/>
                    <Column field="sectorTitle" header=" گروه صنعت" sortable style={{minWidth: '12rem'}}/>
                    <Column field="subSectorCode" header="کد زیرگروه صنعت" sortable style={{minWidth: '12rem'}}/>
                    <Column field="subSectorTitle" header="زیرگروه صنعت" sortable style={{minWidth: '12rem'}}/>
                    <Column field="inventoryStatus" header="حذف شده"
                            body={(rowData) => <Chip label={`${rowData.deleted ? 'حذف شده' : 'حذف نشده'}`}
                                                     className={`${rowData.deleted ? 'bg-red-400' : 'bg-green-400'} text-white text-xs`}/>}
                            sortable style={{minWidth: '12rem'}}/>
                    <Column field="instrumentTypeDescription" header="توضیحات" sortable style={{minWidth: '10rem'}}/>
                </DataTable>
            </div>

            <Dialog visible={deleteProductsDialog} style={{width: '450px'}} header="تایید حذف" modal
                    footer={deleteProductsDialogFooter} onHide={hideDialog}>
                <div className="confirmation-content align-content-center flex">
                    <i className="pi pi-exclamation-triangle ml-3" style={{fontSize: '1.4rem'}}/>
                    {product && <span>آیا از حذف ردیف مورد نظر اطمینان دارید؟</span>}
                </div>
            </Dialog>
            <Dialog visible={productDialog} style={{width: '450px'}} header="جزییات کارمزد جدید" modal
                    className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field mt-4">
                    <form className={'grid'}>
                        <div className="p-float-label col-12">
                            <InputText id="bourseCode" className={fault && !bourseCode ? 'attention':''} value={bourseCode}
                                       onChange={(e) => {
                                           setBourseCode(e.target.value);
                                           setFaulty(false)
                                       }}/>
                            <label htmlFor="bourseCode">کد بورس</label>
                        </div>
                        <div className="p-float-label col-12 mt-3">
                            <InputText id="instrumentTypeCode" className={fault && !instrumentTypeCode ? 'attention':''} value={instrumentTypeCode}
                                       onChange={(e) => {
                                           setInstrumentTypeCode(e.target.value);
                                           setFaulty(false)
                                       }}/>
                            <label htmlFor="instrumentTypeCode">کد نوع ابزار مالی</label>
                        </div>
                        <div className="p-float-label col-12 mt-3">
                            <InputText id="sectorCode" value={sectorCode}
                                       onChange={(e) => setSectorCode(e.target.value)}/>
                            <label htmlFor="sectorCode">کد گروه صنعت</label>
                        </div>
                        <div className="p-float-label col-12 mt-3">
                            <InputText id="subSectorCode" value={subSectorCode}
                                       onChange={(e) => setSubSectorCode(e.target.value)}/>
                            <label htmlFor="subSectorCode">کد زیرگروه صنعت</label>
                        </div>
                    </form>
                </div>
            </Dialog>
            <Dialog visible={updateDialog} style={{width: '450px'}} header="ایجاد تغییرات" modal className="p-fluid"
                    footer={updateDialogFooter} onHide={hideDialog}>
                <div className="field mt-4">
                    <form className={'grid'}>
                        <div className="p-float-label col-12 mt-3">
                            <InputText id="instrumentTypeCode" value={updateSectorCode}
                                       onChange={(e) => setUpdateSectorCode(e.target.value)}/>
                            <label htmlFor="instrumentTypeCode">کد گروه صنعت</label>
                        </div>
                        <div className="p-float-label col-12 mt-3">
                            <InputText id="sectorCode" value={updateSubSectorCode}
                                       onChange={(e) => setUpdateSectorCode(e.target.value)}/>
                            <label htmlFor="sectorCode">کد زیرگروه صنعت</label>
                        </div>
                    </form>
                </div>
            </Dialog>
        </Card>
    );
}
