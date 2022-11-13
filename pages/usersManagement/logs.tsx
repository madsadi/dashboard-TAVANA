import React, {useCallback, useMemo, useRef, useState} from "react";
import {getUsers, getUsersLogs} from "../../api/users";
import {AgGridReact} from "ag-grid-react";
import CustomDetailComponent from "../../components/onlineOrders/customDetailComponent";
import {dateRangeHandler, formatNumber, jalali} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import useSearchUserForm from "../../hooks/useSearchUserForm";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import {Accordion} from "flowbite-react";
import {ChevronRightIcon,ChevronLeftIcon} from "@heroicons/react/20/solid";

export default function Users() {
    const columnDefStructure: any = [
        {
            field: 'userId',
            headerName: 'شناسه کاربر',
        },
        {
            field: 'name',
            headerName: 'نام کاربر',
        },
        {
            field: 'typeTitle',
            headerName: 'نوع',
        },
        {
            field: 'date',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{jalali(rowData.data.date).date}</span>
                            <span className={'ml-2'}>{jalali(rowData.data.date).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'clientId',
            headerName: 'نرم افزار'
        },
        {
            field: 'succeed',
            headerName: 'وضعیت'
        },
        {
            field: 'ip',
        },
        {
            field: 'userAgent',
        },
        {
            field: 'browser',
            headerName: 'مرورگر'
        },
        {
            field: 'os',
            headerName: 'سیستم عامل'
        },
        {
            field: 'isMobile',
            headerName: 'از طریق موبایل',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span>{rowData.data.isMobile ? 'بله' : 'خیر'}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'errorMessage',
            headerName: 'خطا'
        }
    ]

    const pageSize = 15;
    const {inputs, handleChange, reset} = useSearchUserForm()
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState<any>({pageSize: pageSize, pageNumber: 1})
    const [totalCount, setTotal] = useState<any>(null);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

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
        await getUsersLogs(query)
            .then((res: any) => {
                gridRef.current.api.setRowData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
            .catch(() =>
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

    const renderCustomInput = ({ref}: { ref: any }) => (
        <div className={'col-12 py-0'}>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                <Accordion.Panel>
                    <Accordion.Title style={{padding:'0.5rem'}}>
                        جستجو
                    </Accordion.Title>
                    <Accordion.Content style={{transition:'all'}}>
                        <form className={'flex'} onSubmit={(e) => {
                            e.preventDefault();
                            onGridReady({...inputs, ...query});
                        }}>
                            <div className={'grid grid-cols-4 gap-4'}>
                                <div>
                                    <label className={'block'} htmlFor="userId">شناسه کاربر</label>
                                    <input id="userId" value={inputs.userId} name={'userId'}
                                           onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="nationalId">کد ملی کاربر</label>
                                    <input id="nationalId" value={inputs.nationalId} name={'nationalId'}
                                           onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="phoneNumber">تلفن همراه</label>
                                    <input id="phoneNumber" value={inputs.phoneNumber} name={'phoneNumber'}
                                           onChange={handleChange}/>
                                </div>
                                <div>
                                    <DatePicker
                                        value={selectedDayRange}
                                        onChange={(e) => {
                                            setSelectedDayRange(e);
                                            if (e.from) {
                                                setQuery({
                                                    ...query,
                                                    StartDate: `${moment.from(`${e.from?.year}/${e.from?.month}/${e.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-M-D')}`
                                                })
                                            }
                                            if (e.to) {
                                                setQuery({
                                                    ...query,
                                                    EndDate: `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-M-D')}`
                                                })
                                            }
                                        }}
                                        shouldHighlightWeekends
                                        renderInput={renderCustomInput}
                                        locale={'fa'}
                                        calendarPopperPosition={'bottom'}
                                    />
                                </div>
                            </div>
                            <div className={'flex mt-4 space-x-2 space-x-reverse mr-auto'}>
                                <button
                                    className={'justify-center rounded bg-red-500 border-red-500 px-5 p-1 mr-auto w-fit h-fit mt-auto'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        reset();
                                        setSelectedDayRange({from:null,to:null})
                                        onGridReady({pageSize: pageSize, pageNumber: 1});
                                    }}>
                                    لغو فیلتر ها
                                </button>
                                <button className={'justify-center bg-lime-600 rounded px-5 p-1 w-fit h-fit mt-auto'}
                                        type={'submit'}>
                                    جستجو
                                </button>
                            </div>
                        </form>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <div className={'relative grow overflow-x-hidden border border-border'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        onGridReady={() => onGridReady(query)}
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
            <div className={'flex items-center mx-auto py-3'}>
                {/*<ChevronDoubleRightIcon className={'h-4 w-4'}/>*/}
                <button onClick={() => {
                    setPage(page - 1)
                    setQuery({...query, pageNumber: page - 1})
                    onGridReady({...inputs, ...query, pageNumber: page - 1})
                }}
                        className={`${page <= 1 ? 'text-gray-300' : 'hover:bg-gray-300'} rounded-full bg-border transition-all p-1`}
                        disabled={page <= 1}>
                    <ChevronRightIcon className={'h-4 w-4'}/>
                </button>
                <div className={'mx-3'}>صفحه {page}
                    <span className={'mx-4'}>از</span>{Math.ceil(totalCount / pageSize)}
                </div>
                <button onClick={() => {
                    setPage(page + 1)
                    setQuery({...query, pageNumber: page + 1})
                    onGridReady({...inputs, ...query, pageNumber: page + 1})
                }}
                        className={`${page >= Math.ceil(totalCount / pageSize) ? 'text-gray-300' : 'hover:bg-gray-300'} rounded-full bg-border transition-all p-1`}
                        disabled={page >= Math.ceil(totalCount / pageSize)}>
                    <ChevronLeftIcon className={'h-4 w-4'}/>
                </button>
                {/*<ChevronDoubleLeftIcon className={'h-4 w-4'}/>*/}
            </div>
        </div>
    )
}