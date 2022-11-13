import React, {useCallback, useMemo, useRef, useState} from "react";
import {getUsers} from "../../api/users";
import {AgGridReact} from "ag-grid-react";
import CustomDetailComponent from "../../components/onlineOrders/customDetailComponent";
import {formatNumber, jalali} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import useSearchUserForm from "../../hooks/useSearchUserForm";
import {Accordion} from "flowbite-react";

export default function Users() {
    const columnDefStructure: any = [
        {
            field: 'id',
            headerName: 'شناسه حساب کاربری',
        },
        {
            field: 'firstName',
            headerName: 'نام',
        },
        {
            field: 'lastName',
            headerName: 'نام خانوادگی',
        },
        {
            field: 'phoneNumber',
            headerName: 'موبایل',
        },
        {
            field: 'email',
            headerName: 'ایمیل',
        },
        {
            field: 'birthdate',
            headerName: 'تاریخ تولد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span>{jalali(rowData.data.birthdate).date}</span>
                    )
                    const moodDetails = {
                        component: ColourCellRenderer,
                    }
                    return moodDetails;
                }
            }
        },
        {
            field: 'nationalId',
            headerName: 'کدملی',
        },
        {
            field: 'fatherName',
            headerName: 'نام پدر',
        },
        {
            field: 'userRoles',
            headerName: 'نقش کاربر',
        }
    ]

    const {inputs, handleChange, reset} = useSearchUserForm()
    const [page, setPage] = useState(0)
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
    const onGridReady = async (query: any) => {
        await getUsers(query)
            .then((res: any) => {
                gridRef.current.api.setRowData(res?.result);
            })
            .catch((err) =>
                gridRef.current.api.setRowData([]))
    };
    const getRowId = useCallback((params: any) => {
        return params.data.id
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
            noRowsMessageFunc: () => 'کاربری پیدا نشد.',
        };
    }, []);
    //Grid

    return (
        <div className={'flex flex-col h-full grow'}>
            <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                <Accordion.Panel>
                    <Accordion.Title style={{padding: '0.5rem'}}>
                        جستجو
                    </Accordion.Title>
                    <Accordion.Content style={{transition: 'all'}}>
                        <form className={'flex'} onSubmit={(e) => {
                            e.preventDefault();
                            onGridReady({...inputs, skip: page});
                        }}>
                            <div className={'grid grid-cols-5 gap-4'}>
                                <div>
                                    <label className={'block'} htmlFor="firstName">نام</label>
                                    <input id="firstName" value={inputs.firstName} name={'firstName'}
                                           onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="lastName">نام خانوادگی</label>
                                    <input id="lastName" value={inputs.lastName} name={'lastName'}
                                           onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="userName">نام کاربری</label>
                                    <input id="userName" value={inputs.userName} name={'userName'}
                                           onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="phoneNumber">تلفن همراه</label>
                                    <input id="phoneNumber" value={inputs.phoneNumber} name={'phoneNumber'}
                                           onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="roleId">آیدی نقش کاربر</label>
                                    <input id="roleId" value={inputs.roleId} name={'roleId'} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className={'flex mt-4 space-x-2 space-x-reverse mr-auto'}>
                                <button
                                    className={'justify-center rounded-full bg-red-500 border-red-500 px-5 p-1 ml-2 w-fit h-fit mt-auto'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        reset();
                                        onGridReady({});
                                    }}>
                                    لغو فیلتر ها
                                </button>
                                <button className={'justify-center bg-lime-600 rounded-full px-5 p-1 w-fit h-fit mt-auto'}
                                        type={'submit'}>
                                    جستجو
                                </button>
                            </div>
                        </form>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <div className={'relative grow overflow-hidden border border-border'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        onGridReady={() => onGridReady({})}
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
                        detailCellRenderer={'myDetailCellRenderer'}
                        frameworkComponents={{myDetailCellRenderer: CustomDetailComponent}}
                        masterDetail={true}
                    />
                </div>
            </div>
            {/*<div className={'flex items-center mx-auto py-3'}>*/}
            {/*    /!*<ChevronDoubleRightIcon className={'h-4 w-4'}/>*!/*/}
            {/*    <Button onClick={() => {*/}
            {/*        setPage(page - 1)*/}
            {/*        onGridReady({...inputs,skip:page - 1})*/}
            {/*    }}*/}
            {/*            className={`${page <= 1 ? 'text-gray-400' : 'hover:bg-gray-400'} p-button-rounded p-button-secondary p-button-outlined transition-all p-1`}*/}
            {/*            disabled={page <= 1}>*/}
            {/*        <img src={'/icons/arrowRight.svg'} className={'h-1rem w-1rem'}/>*/}
            {/*    </Button>*/}
            {/*    <div className={'mx-3 h-1rem'}>صفحه {page}*/}
            {/*        /!*<span className={'mx-4'}>از</span>{Math.ceil(totalCount / page)} *!/*/}
            {/*    </div>*/}
            {/*    <Button onClick={() => {*/}
            {/*        setPage(page + 1)*/}
            {/*        onGridReady({...inputs,skip:page + 1})*/}
            {/*    }}*/}
            {/*            className={`hover:bg-gray-400'} p-button-rounded p-button-secondary p-button-outlined transition-all p-1`}*/}
            {/*            // disabled={page >= Math.ceil(totalCount / page)}*/}
            {/*    >*/}
            {/*        <img src={'/icons/arrowleft.svg'} className={'h-1rem w-1rem'}/>*/}
            {/*    </Button>*/}
            {/*    /!*<ChevronDoubleLeftIcon className={'h-4 w-4'}/>*!/*/}
            {/*</div>*/}
        </div>
    )
}