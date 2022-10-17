import React, {useState, useEffect, useRef} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import moment from 'jalali-moment'
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {rulesList} from "../../api/marketRulesManagement";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {shouldEditObject} from "../../store/marketRulesConfig";
import {useDispatch} from "react-redux";
import {Dropdown} from "primereact/dropdown";
import {validate as uuidValidate} from 'uuid';

export default function RulesList() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [status, setStatus] = useState({name: '', isActive: false})
    const [expandedRows, setExpandedRows] = useState<any>(null);
    const [name, setName] = useState<any>('');
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const states = [
        {name: 'فعال', isActive: true},
        {name: 'غیر فعال', isActive: false},
        {name: 'همه', isActive: null}
    ];

    const dispatch = useDispatch()
    const toast: any = useRef(null);
    const dt: any = useRef(null);

    const dateEntityHandler = (dayRangePoint: any) => {
        if (dayRangePoint?.day < 10 && dayRangePoint?.month < 10) {
            return `${dayRangePoint?.year}-0${dayRangePoint?.month}-0${dayRangePoint?.day}`
        } else if (dayRangePoint?.day < 10) {
            return `${dayRangePoint?.year}-${dayRangePoint?.month}-0${dayRangePoint?.day}`
        } else if (dayRangePoint?.month < 10) {
            return `${dayRangePoint?.year}-0${dayRangePoint?.month}-${dayRangePoint?.day}`
        }
    }
    const getTheList = async () => {
        await rulesList([{name: name}, {isActive: status.isActive}, {createDateTimeTo: dateEntityHandler(selectedDayRange.to)}, {createDateTimeTo: dateEntityHandler(selectedDayRange.from)}])
            .then(res => setProducts(res?.result))
            .catch(err => toast.current?.show({
                severity: 'error',
                summary: 'مشکلی رخ داده',
                detail: `${err?.response?.data?.title}`,
                life: 6000
            }))
    }

    useEffect(() => {
        getTheList()
    }, []);

    const leftToolbarTemplate = () => {
        const openUpdate = () => {
            if (selectedProducts.length === 1) {
                dispatch(shouldEditObject(selectedProducts[0]))
                if (typeof window !== undefined) {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    });
                }
            } else {
                toast.current?.show({
                    severity: 'error',
                    summary: 'لطفا یک گزینه برای تغییر انتخاب کنید',
                    life: 6000
                });
            }
        }

        return (
            <React.Fragment>
                <Button label="تغییر" icon="pi pi-pencil" className="p-button-success mr-auto" onClick={openUpdate}/>
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
                <Button type="button" icon="pi pi-file-excel" label={'خروجی'} onClick={exportExcel}
                        className="p-button-success mr-2" data-pr-tooltip="XLS"/>
        )
    }

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="orders-subtable">
                {data.expression}
            </div>
        );
    }

    const header = () => {
        const dateRangeHandler = (selectedDayRange: any) => {
            if (selectedDayRange.from && selectedDayRange.to) {
                return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`
            } else if (!selectedDayRange.from && !selectedDayRange.to) {
                return ''
            } else if (!selectedDayRange.from) {
                return ''
            } else if (!selectedDayRange.to) {
                return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا اطلاع ثانویه`
            }
        }

        const renderCustomInput = ({ref}: { ref: any }) => (
            <div className={'col-12 p-float-label '}>
                <InputText readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
                <label htmlFor="rangeDate">تاریخ شروع و پایان</label>
            </div>
        )

        return (
            <div className={'flex align-items-center'}>
                <div className="p-float-label py-2 ml-5">
                    <Dropdown value={status} options={states} className={'w-full'}
                              onChange={(e) => setStatus(e.target.value)} optionLabel={'name'}/>
                    <label htmlFor="CustomerTypeTitle">وضیعت</label>
                </div>
                <div>
                    <DatePicker
                        value={selectedDayRange}
                        onChange={setSelectedDayRange}
                        shouldHighlightWeekends
                        renderInput={renderCustomInput}
                        locale={'fa'}
                        calendarPopperPosition={'bottom'}
                        renderFooter={() => (
                            <div style={{display: 'flex', justifyContent: 'center', padding: '1rem 2rem'}}>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setSelectedDayRange({from: null, to: null})
                                    }}
                                >
                                    لغو
                                </Button>
                            </div>
                        )}
                    />
                </div>
                <div className="p-float-label py-2 h-fit mr-5">
                    <InputText id="name" className={'w-full'} value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="name">عنوان قانون</label>
                </div>
                {leftToolbarTemplate()}
                {rightToolbarTemplate()}
                <Button label="جتسجو" icon="pi pi-search" className="h-fit mr-2" onClick={getTheList}/>
            </div>
        )
    }

    return (
        <Card className="datatable-scroll-demo mt-2">
            <Toast ref={toast} position="top-center"/>

            <div className="card">
                <DataTable ref={dt} value={products} selection={selectedProducts} removableSort
                           sortField="createDateTime" sortOrder={-1} header={header}
                           expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                           rowExpansionTemplate={rowExpansionTemplate}
                           onSelectionChange={(e) => setSelectedProducts(e.value)}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} stripedRows scrollable
                           scrollHeight="500px"
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           globalFilter={globalFilter} responsiveLayout="scroll">
                    <Column expander style={{width: '3rem'}}/>
                    <Column selectionMode="multiple" headerStyle={{width: '3rem'}} exportable={false}/>
                    <Column field="id" header="شناسه" sortable style={{minWidth: '6rem'}}/>
                    <Column field="name" header="نام قانون" sortable style={{minWidth: '10rem'}}/>
                    <Column field="errorMessage" header="پیام خطا" style={{minWidth: '16rem'}}/>
                    <Column field="sequenceNumber" header="مرتبه/اولویت" sortable style={{minWidth: '10rem'}}/>
                    <Column field="createDateTime" header="زمان ایجاد" sortable body={(rowData) =>
                        <div>
                            <div>
                                {rowData.createDateTime ? moment(rowData.createDateTime).locale('fa')?.format("YYYY/MM/DD") : '-'}
                            </div>
                            {rowData.createDateTime ? moment(rowData.createDateTime).locale('fa').format("HH:mm") : '-'}
                        </div>
                    } style={{minWidth: '14rem'}}/>
                    <Column field="createBy" header="کاربر ایجاد کننده" sortable style={{minWidth: '12rem'}}/>
                    <Column field="updatedDateTime" header="زمان تغییر" sortable body={(rowData) =>
                        <div>
                            <div>
                                {rowData.updatedDateTime ? moment(rowData.updatedDateTime).locale('fa')?.format("YYYY/MM/DD") : '-'}
                            </div>
                            {rowData.updatedDateTime ? moment(rowData.updatedDateTime).locale('fa').format("HH:mm") : '-'}
                        </div>
                    } style={{minWidth: '12rem'}}/>
                    <Column field="updatedBy" header="کاربر تغییر دهنده"
                            body={(rowData) => uuidValidate(rowData.updatedBy) ? '-' : rowData.updatedBy} sortable
                            style={{minWidth: '12rem'}}/>
                    <Column field="userIP" header="آی پی کاربر" sortable style={{minWidth: '12rem'}}/>
                </DataTable>
            </div>
        </Card>
    );
}
