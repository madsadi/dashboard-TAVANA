import React, {useCallback, useMemo, useRef, useState} from "react";
import {getUsersLogs} from "../../api/users";
import {AgGridReact} from "ag-grid-react";
import CustomDetailComponent from "../../components/online-orders/customDetailComponent";
import {dateRangeHandler, formatNumber, jalali} from "../../components/common/functions/common-funcions";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/table/customOverlay";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import {Accordion} from "flowbite-react";
import TablePagination from "../../components/common/table/TablePagination";
import {USERS} from "../../api/constants";

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

    type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number, userId: string, nationalId: string, phoneNumber: string}
    const initialValue = {
        PageNumber: 1,
        PageSize: 20,
        StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
        EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
        userId: '',
        nationalId: '',
        phoneNumber: '',
    }
    const [query, setQuery] = useState<initialType>(initialValue)
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

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

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
                            onGridReady(query);
                        }}>
                            <div className={'grid grid-cols-4 gap-4'}>
                                <div>
                                    <label className={'block'} htmlFor="userId">شناسه کاربر</label>
                                    <input id="userId" value={query.userId} name={'userId'}
                                           onChange={(e)=>queryUpdate('userId', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="nationalId">کد ملی کاربر</label>
                                    <input id="nationalId" value={query.nationalId} name={'nationalId'}
                                           onChange={(e)=>queryUpdate('nationalId', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="phoneNumber">تلفن همراه</label>
                                    <input id="phoneNumber" value={query.phoneNumber} name={'phoneNumber'}
                                           onChange={(e)=>queryUpdate('phoneNumber', e.target.value)}/>
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
                                    className={'button bg-red-500 mr-auto mt-auto'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedDayRange({from:null,to:null})
                                        setQuery(initialValue)
                                        onGridReady(initialValue);
                                    }}>
                                    لغو فیلتر ها
                                </button>
                                <button className={'button bg-lime-600 mt-auto'}
                                        type={'submit'}>
                                    جستجو
                                </button>
                            </div>
                        </form>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <div className={'relative grow overflow-x-hidden border border-border rounded-b-xl'}>
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
            <TablePagination query={query} api={`${USERS}/users/SearchUserActivityLogs?`} setQuery={setQuery} gridRef={gridRef} totalCount={totalCount}/>
        </div>
    )
}