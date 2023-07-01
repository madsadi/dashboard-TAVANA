import Modal from "../../common/layout/Modal";
import React, { useContext, useMemo, useRef, useState} from "react";
import {CategoryResultModalTypes} from "../../../types/types";
import {CommissionContext} from "../../../pages/commission-management/commission";
import useQuery from "../../../hooks/useQuery";
import {COMMISSION_BASE_URL} from "../../../api/constants";
import {AgGridReact} from "ag-grid-react";

export const InstrumentTypeResultModal = (props: CategoryResultModalTypes) => {
    const {setOpen, open, queryHandler,data} = props
    const {categoryQuery} = useContext<any>(CommissionContext)
    const {
        fetchAsyncData
    }: any = useQuery({url: `${COMMISSION_BASE_URL}/api/CommissionInstrumentType/Search`})
    const [rowData, setRowData] = useState<any>([])
    const columnDefStructure:any = [
        {
            field: 'id',
            headerName: 'شماره',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'bourseCode',
            headerName: 'کد بورس',
            flex: 0,
            sort: 'desc'
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
                        <div
                            className={`${props.data.deleted ? 'bg-red-400' : 'bg-green-400'} text-white text-center mt-3 text-xs`}>{props.data.deleted ? 'حذف شده' : 'حذف نشده'}</div>
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

    const gridRef: any = useRef()
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            resizable: true,
            minWidth: 100,
            sortable:true
        };
    }, []);

    const onSelectionChanged = () => {
        const selectedRows = gridRef.current?.api?.getSelectedRows();
        let fields = ['bourseTitle','instrumentTypeTitle','sectorTitle','sectorTitle','subSectorTitle']
        queryHandler({CommissionInstrumentTypeId:selectedRows[0].id,CommissionInstrumentTypeTitle:fields.map((item:string)=>{if (selectedRows[0][`${item}`]){return selectedRows[0][`${item}`]}}).join('-')})
        setOpen(false)
    }
    return (
        <Modal setOpen={setOpen} open={open} title={'نتایج جستجو گروه بندی ابزار مالی'}
               ModalWidth={'max-w-5xl'}>
            <div className={'relative grow overflow-hidden border border-border rounded-b-xl min-h-[350px]'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        rowData={data}
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        defaultColDef={defaultColDef}
                        rowSelection={'single'}
                        onSelectionChanged={onSelectionChanged}
                    ></AgGridReact>
                </div>
            </div>
        </Modal>
    )
}