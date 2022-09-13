import React, {useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import {useSelector} from "react-redux";
import {Card} from "primereact/card";
import {Ripple} from "primereact/ripple";
import {classNames} from "primereact/utils";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {Toast} from "primereact/toast";

export default function CategoryResultTableSection() {
    const {categorySearchResult}=useSelector((state:any)=>state.commissionConfig)

    const [products, setProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);

    const toast:any = useRef(null);

    const search=async (body:any)=>{
        await commissionSearch('/CommissionCategory/Search?', body
        ).then(res => {
            setProducts(res?.result?.pagedData)
            toast.current?.show({
                severity: 'success',
                summary: 'با موفقیت انجام شد',
                detail: 'نتایج جستجو لیست شد',
                life: 6000
            })
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
        if (categorySearchResult){
            search(categorySearchResult)
        }
    }, [categorySearchResult]);

    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');

    const onPageInputKeyDown = (event:any, options:any) => {
        if (event.key === 'Enter') {
            const page = currentPage
            if (page < 1 || page > options.totalPages) {
                setPageInputTooltip(`مقداری بین 1 تا  ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                setPageInputTooltip('لطفا دکمه ENTER را بزنید');
            }
        }
    }

    const template2:any = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        'NextPageLink':(options:any)=>{
          return <span className={'pi pi-angle-right'}/>
        },
        'PrevPageLink':(options:any)=>{
          return <span className={'pi pi-angle-left'}/>
        },
        'RowsPerPageDropdown': (options:any) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 }
            ];

            return (
                <React.Fragment>
                    <Dropdown className={'rtl'} value={options.value} options={dropdownOptions} onChange={options.onChange} />
                    <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>:تعداد هر صفحه </span>
                </React.Fragment>
            );
        },
        'CurrentPageReport': (options:any) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.last} - {options.first}
                </span>
            )
        }
    };

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

    const onCustomPage1 = (event:any) => {
        console.log(event)
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
    }

    return (
        <Card className="datatable-scroll-demo">
            <Toast ref={toast} position="top-center"/>

            <div className="card">
                <Toolbar className="mb-4" right={rightToolbarTemplate}/>
                <DataTable value={products} sortMode="multiple" removableSort paginatorTemplate={template2} first={first1} rows={rows1} onPage={onCustomPage1}
                           paginator rowsPerPageOptions={[5, 10, 25]} stripedRows scrollable scrollHeight="500px"
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
