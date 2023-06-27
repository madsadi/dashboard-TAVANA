import Modal from "../../common/layout/Modal";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {CategoryResultModalTypes} from "../../../types/types";
import {CommissionContext} from "../../../pages/commission-management/commission";
import useQuery from "../../../hooks/useQuery";
import {COMMISSION_BASE_URL} from "../../../api/constants";
import {AgGridReact} from "ag-grid-react";

export const CategoryResultModal = (props: CategoryResultModalTypes) => {
    const {setOpen, open, queryHandler, data} = props
    const {categoryQuery} = useContext<any>(CommissionContext)
    const {
        fetchAsyncData
    }: any = useQuery({url: `${COMMISSION_BASE_URL}/api/CommissionCategory/Search`})
    const columnDefStructure = [

        {
            field: 'id',
            headerName: 'شناسه',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'marketCode',
            headerName: 'کد بازار',
        },
        {
            field: 'marketTitle',
            headerName: 'بازار',
        },
        {
            field: 'offerTypeCode',
            headerName: 'کد نوع عرضه',
            flex: 0,
        },
        {
            field: 'offerTypeTitle',
            headerName: 'نوع عرضه',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'sideCode',
            headerName: 'کد سمت سفارش',
            flex: 0,
        }, {
            field: 'sideTitle',
            headerName: 'سمت سفارش',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'settlementDelayCode',
            headerName: 'کد تاخیر در تسویه',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'settlementDelayTitle',
            headerName: 'تاخیر در تسویه',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerTypeCode',
            headerName: 'کد نوع مشتری',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'customerTypeTitle',
            headerName: 'نوع مشتری',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerCounterSideCode',
            headerName: 'کد نوع طرف مقابل',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerCounterSideTitle',
            headerName: 'نوع طرف مقابل',
            flex: 0,
            width: 120,
            minWidth: 120
        }
    ]

    const gridRef: any = useRef()
    const onGridReady = (params: any) => {
        const dataSource = {
            rowCount: undefined,
            getRows: (params: any) => {
                console.log(
                    'asking for ' + params.startRow + ' to ' + params.endRow
                );
                if (params.startRow < data.totalCount) {
                    fetchAsyncData({...categoryQuery, PageNumber: params.endRow / 10}).then((res: any) => {
                        params.successCallback([...res?.data?.result.pagedData],-1);
                    })
                }
            },
        };
        params.api.setDatasource(dataSource);
    }
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            resizable: true,
            minWidth: 100,
        };
    }, []);

    const onSelectionChanged = () => {
        const selectedRows = gridRef.current?.api?.getSelectedRows();
        let fields = ['marketTitle','marketCode','offerTypeTitle','sideTitle','settlementDelayTitle','customerTypeTitle','customerCounterSideTitle',]
        queryHandler({
            CommissionCategoryId: selectedRows[0].id,
            CommissionCategoryTitle: fields.map((item:string)=>{if (selectedRows[0][`${item}`]){return selectedRows[0][`${item}`]}}).join('-')
        })
        setOpen(false)
    }
    return (
        <Modal setOpen={setOpen} open={open} title={'نتایج جستجو گروه بندی ضرایب'}
               ModalWidth={'max-w-5xl'}>
            <div className={'relative grow overflow-hidden border border-border rounded-b-xl min-h-[200px]'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        defaultColDef={defaultColDef}
                        rowBuffer={0}
                        rowSelection={'single'}
                        rowModelType={'infinite'}
                        cacheBlockSize={10}
                        cacheOverflowSize={2}
                        onSelectionChanged={onSelectionChanged}
                        // maxConcurrentDatasourceRequests={1}
                        infiniteInitialRowCount={10}
                        maxBlocksInCache={100}
                        onGridReady={onGridReady}
                    ></AgGridReact>
                </div>
            </div>
        </Modal>
    )
}