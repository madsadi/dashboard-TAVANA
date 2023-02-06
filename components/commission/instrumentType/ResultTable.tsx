import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {useSelector} from "react-redux";
import {
    addNewCommission,
    deleteCommission,
    getCommission,
    updateCommission
} from "../../../api/commissionInstrumentType";
import {toast} from "react-toastify";
import {AgGridReact} from "ag-grid-react";
import {formatNumber, jalali} from "../../common/functions/common-funcions";
import {LoadingOverlay, NoRowOverlay} from "../../common/table/customOverlay";
import Modal from "../../common/layout/Modal";
import moment from "jalali-moment";
import AccordionComponent from "../../common/components/AccordionComponent";
import {COMMISSION_BASE_URL, NETFLOW_BASE_URL} from "../../../api/constants";

type initialType = {CommissionInstrumentTypeId:string,BourseTitle:string,InstrumentTypeTitle:string,InstrumentTypeDescription:string,SectorTitle:string,SubSectorTitle:string,Deleted:string}
const initialValue = {
    CommissionInstrumentTypeId:'',
    BourseTitle:'',
    InstrumentTypeTitle:'',
    InstrumentTypeDescription:'',
    SectorTitle:'',
    SubSectorTitle:'',
    Deleted:'',
}
const listOfFilters = [
    // {title:'PageNumber',name:'شماره صفحه',type:null},
    // {title:'PageSize',name:'تعداد',type:null},
    // {title:'CommissionInstrumentTypeId',name:'تاریخ',type:'date'},
    {title:'BourseTitle',name:'عنوان بورس',type:'input'},
    {title:'InstrumentTypeTitle',name:'عنوان نوع ابزار مالی',type:'input'},
    {title:'InstrumentTypeDescription',name:'توضیحات نوع ابزار',type:'input'},
    {title:'SectorTitle',name:'گروه صنعت',type:'input'},
    {title:'SubSectorTitle',name:'زیرگروه صنعت',type:'input'},
    {title:'Deleted',name:'دسته بندی',type:'selectInput'},
]
export default function ResultTable() {
    const columnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
        },
        {
            field: 'id',
            headerName: 'شماره',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'bourseTitle',
            headerName: 'عنوان بورس',
            flex: 0,
        },
        {
            field: 'instrumentTypeCode',
            headerName: 'کد نوع ابزار مالی',
            flex: 0,
        },
        {
            field: 'instrumentTypeTitle',
            headerName: 'عنوان نوع ابزار مالی',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'sectorCode',
            headerName: 'کد گروه صنعت',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'sectorTitle',
            headerName: ' گروه صنعت',
            flex: 0,
            width: 150,
            minWidth: 150
        }, {
            field: 'subSectorCode',
            headerName: 'کد زیرگروه صنعت',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'subSectorTitle',
            headerName: 'زیرگروه صنعت',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'inventoryStatus',
            headerName: 'حذف شده',
            flex: 0,
            width: 120,
            minWidth: 120,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <div className={`${props.data.deleted ? 'bg-red-400' : 'bg-green-400'} text-white text-xs`}>{`${props.data.deleted ? 'حذف شده' : 'حذف نشده'}`}</div>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'instrumentTypeDescription',
            headerName: 'توضیحات',
            width: 120,
            minWidth: 120,
        }
    ]

    const [products, setProducts] = useState<any[]>([]);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [updateSectorCode, setUpdateSectorCode] = useState<string>('');
    const [updateSubSectorCode, setUpdateSubSectorCode] = useState<string>('');
    const [productDialog, setProductDialog] = useState(false);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [bourseCode, setBourseCode] = useState<string>('');
    const [instrumentTypeCode, setInstrumentTypeCode] = useState<string>('');
    const [sectorCode, setSectorCode] = useState<string>('');
    const [subSectorCode, setSubSectorCode] = useState<string>('');
    const [fault, setFaulty] = useState<boolean>(false)
    const [totalCount, setTotalCount] = useState<number>(0);
    const [query, setQuery] = useState<initialType>(initialValue)

    //Grid
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            flex: 1,
            valueFormatter: formatNumber
        };
    }, []);
    const getRowId = useCallback((params: any) => {
        return params.data.instrumentId
    }, []);
    const loadingOverlayComponent = useMemo(() => {
        return LoadingOverlay;
    }, []);
    const loadingOverlayComponentParams = useMemo(() => {
        return {
            loadingMessage: 'در حال بارگزاری...',
        };
    }, []);
    const noRowsOverlayComponent = useMemo(() => {
        return NoRowOverlay;
    }, []);
    const noRowsOverlayComponentParams = useMemo(() => {
        return {
            noRowsMessageFunc: () => 'گزارشی ثبت نشده.',
        };
    }, []);
    //Grid

    const ToolbarTemplate = () => {
        const openUpdate = () => {
            if (gridRef.current?.api?.getSelectedRows().length ===1) {
                setUpdateDialog(true);
            } else {
                toast.error('لطفا یک گزینه را انتخاب کنید')
            }
        }

        const confirmDeleteSelected = () => {
            if (gridRef.current?.api?.getSelectedRows().length ===1) {
                setDeleteProductsDialog(true);
            } else {
                toast.error('لطفا یک گزینه را انتخاب کنید')
            }
        }
        const deleteHandler = async () => {
            await deleteCommission({id: gridRef.current?.api?.getSelectedRows()?.[0]?.id})
                .then(() => {
                    gridRef.current.api.applyTransaction({
                        remove: [gridRef.current?.api?.getSelectedRows()?.[0]]
                    })
                    toast.success('با موفقیت انجام شد')
                })
                .catch(() => toast.error('ناموفق'))
        }
        const addNewHandler = async () => {
            if (instrumentTypeCode && bourseCode) {
                await addNewCommission({
                    bourseCode: bourseCode,
                    instrumentTypeCode: instrumentTypeCode,
                    sectorCode: sectorCode,
                    subSectorCode: subSectorCode
                }).then(res => {
                    setProductDialog(false);
                    toast.error('با موفقیت انجام شد')
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
                    gridRef.current.api.applyTransaction({
                        add: [{
                            bourseCode: bourseCode,
                            instrumentTypeCode: instrumentTypeCode,
                            sectorCode: sectorCode,
                            subSectorCode: subSectorCode
                        }],
                        addIndex: 0
                    })
                })
                    .catch(err => {
                        toast.error('ناموفق')
                    })
            } else {
                setFaulty(true)
                if (!bourseCode) {
                    toast.error('کد بورس را لطفا وارد کنید')
                } else if (!instrumentTypeCode) {
                    toast.error('کد نوع ابزار را لطفا وارد کنید')
                }
            }
        }
        const updateHandler = async () => {
            await updateCommission({
                id: gridRef.current?.api?.getSelectedRows()[0]?.id,
                sectorCode: updateSectorCode,
                subSectorCode: updateSubSectorCode
            })
                .then(res => {
                    toast.success('با موفقیت انجام شد')
                    setUpdateDialog(false)
                    setUpdateSectorCode('')
                    setUpdateSubSectorCode('');
                    gridRef.current?.api?.applyTransaction({
                        update:[{
                            id: gridRef.current?.api?.getSelectedRows()[0]?.id,
                            sectorCode: updateSectorCode,
                            subSectorCode: updateSubSectorCode
                        }]
                    })
                })
                .catch(err => toast.error(`${err?.response?.data?.title}`))
        }

        return (
            <div className={'flex p-2'}>
                <Modal title={'تایید حذف'} open={deleteProductsDialog} setOpen={setDeleteProductsDialog}>
                    <div className="flex flex-col">
                        <div className={'mx-auto'}>آیا از حذف ردیف مورد نظر اطمینان دارید؟</div>
                        <div className={'mr-auto space-x-reverse space-x-2 mt-3'}>
                            <button className="p-1 px-4 rounded-full bg-red-500"
                                    onClick={() => setDeleteProductsDialog(false)}>خیر
                            </button>
                            <button className="p-1 px-4 rounded-full bg-lime-600" onClick={deleteHandler}>بله</button>
                        </div>
                    </div>
                </Modal>
                <Modal title={'جزییات کارمزد جدید'} ModalWidth={'max-w-3xl'} setOpen={setProductDialog}
                       open={productDialog}>
                    <div className="field mt-4">
                        <form className={'grid grid-cols-2 gap-4'}>
                            <div>
                                <label className={'block'} htmlFor="bourseCode">کد بورس</label>
                                <input id="bourseCode" className={fault && !bourseCode ? 'attention w-full' : 'w-full'}
                                       value={bourseCode}
                                       onChange={(e) => {
                                           setBourseCode(e.target.value);
                                           setFaulty(false)
                                       }}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="instrumentTypeCode">کد نوع ابزار مالی</label>
                                <input id="instrumentTypeCode"
                                       className={fault && !instrumentTypeCode ? 'attention w-full' : 'w-full'} value={instrumentTypeCode}
                                       onChange={(e) => {
                                           setInstrumentTypeCode(e.target.value);
                                           setFaulty(false)
                                       }}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="sectorCode">کد گروه صنعت</label>
                                <input id="sectorCode" value={sectorCode} className={'w-full'}
                                       onChange={(e) => setSectorCode(e.target.value)}/>
                            </div>
                            <div>
                                <label className={'block w-full'} htmlFor="subSectorCode">کد زیرگروه صنعت</label>
                                <input id="subSectorCode" value={subSectorCode} className={'w-full'}
                                       onChange={(e) => setSubSectorCode(e.target.value)}/>
                            </div>
                        </form>
                        <div className={'flex justify-end space-x-reverse space-x-2'}>
                            <button className="p-1 px-3 rounded-full bg-red-500"
                                    onClick={() => setProductDialog(false)}>لغو
                            </button>
                            <button className="p-1 px-3 rounded-full bg-lime-600" onClick={addNewHandler}>تایید</button>
                        </div>
                    </div>
                </Modal>
                <Modal title={'ایجاد تغییرات'} ModalWidth={'max-w-3xl'} open={updateDialog} setOpen={setUpdateDialog}>
                    <form className={'grid grid-cols-3 gap-4'}>
                        <div>
                            <label className={'block'} htmlFor="instrumentTypeCode">کد گروه صنعت</label>
                            <input id="instrumentTypeCode" className={fault && !updateSectorCode ? 'attention w-full' : 'w-full'}
                                   value={updateSectorCode || gridRef.current?.api?.getSelectedRows()[0]?.SectorCode}
                                   onChange={(e) => {
                                       setUpdateSectorCode(e.target.value);
                                       setFaulty(false)
                                   }}/>
                        </div>
                        <div>
                            <label className={'block'} htmlFor="sectorCode">کد زیرگروه صنعت</label>
                            <input id="sectorCode" value={updateSubSectorCode || gridRef.current?.api?.getSelectedRows()[0]?.SubSectorCode} className={'w-full'}
                                   onChange={(e) => setUpdateSubSectorCode(e.target.value)}/>
                        </div>
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2'}>
                        <button className="p-1 px-3 rounded-full bg-red-500" onClick={()=>setUpdateDialog(false)}>لغو</button>
                        <button className="p-1 px-3 rounded-full bg-lime-500" onClick={updateHandler}>تایید</button>
                    </div>
                </Modal>

                <button className="p-1 px-2 rounded-full bg-red-600" onClick={confirmDeleteSelected}>حذف</button>
                <button className="p-1 px-2 rounded-full bg-lime-600 mx-2" onClick={()=>setProductDialog(true)}>جدید</button>
                <button className="p-1 px-2 rounded-full bg-lime-600" onClick={openUpdate}>تغییر</button>
            </div>
        )
    }

    const header = () => {
        return (
            <div className={'flex'}>
                {ToolbarTemplate()}
            </div>
        )
    }

    return (
        <div className={'relative flex flex-col grow overflow-hidden'}>
            <AccordionComponent query={query} setQuery={setQuery} api={`${COMMISSION_BASE_URL}/CommissionInstrumentType/Search`} gridRef={gridRef} listOfFilters={listOfFilters} initialValue={initialValue} setTotalCount={setTotalCount}/>
            <div className={'border-x border-border'}>
                {header()}
            </div>
            <div className={'relative grow border border-border rounded-b-xl'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        defaultColDef={defaultColDef}
                        loadingOverlayComponent={loadingOverlayComponent}
                        loadingOverlayComponentParams={loadingOverlayComponentParams}
                        noRowsOverlayComponent={noRowsOverlayComponent}
                        noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                        rowHeight={35}
                        headerHeight={35}
                        animateRows={true}
                        getRowId={getRowId}
                        asyncTransactionWaitMillis={1000}
                        columnHoverHighlight={true}
                        detailRowHeight={100}
                        rowSelection={'single'}
                    />
                </div>
            </div>
        </div>
    );
}
