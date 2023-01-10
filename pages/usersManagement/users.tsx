import React, {useCallback, useMemo, useRef, useState} from "react";
import {getUsers} from "../../api/users";
import {AgGridReact} from "ag-grid-react";
import CustomDetailComponent from "../../components/onlineOrders/customDetailComponent";
import {formatNumber, jalali} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import {Accordion} from "flowbite-react";
import moment from "jalali-moment";

type initialType = { Skip: number, PageSize: number, firstName: string, lastName: string, userName: string, phoneNumber: string, roleId: string}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
}
const listOfFilters = [
    {title:'PageNumber',name:'شماره صفحه',type:null},
    {title:'PageSize',name:'تعداد',type:null},
    {title:'date',name:'تاریخ',type:'date'},
]

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

    type initialType = { Skip: number, PageSize: number, firstName: string, lastName: string, userName: string, phoneNumber: string, roleId: string}
    const initialValue = {
        Skip: 1,
        PageSize: 20,
        firstName: '',
        lastName: '',
        userName: '',
        phoneNumber: '',
        roleId: '',
    }
    const [query, setQuery] = useState<initialType>(initialValue)
    const [totalCount, setTotal] = useState<any>(null);

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

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

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
                            onGridReady(query);
                        }}>
                            <div className={'grid grid-cols-5 gap-4'}>
                                <div>
                                    <label className={'block'} htmlFor="firstName">نام</label>
                                    <input id="firstName" value={query.firstName} name={'firstName'}
                                           onChange={(e)=>queryUpdate('firstName',e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="lastName">نام خانوادگی</label>
                                    <input id="lastName" value={query.lastName} name={'lastName'}
                                           onChange={(e)=>queryUpdate('lastName',e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="userName">نام کاربری</label>
                                    <input id="userName" value={query.userName} name={'userName'}
                                           onChange={(e)=>queryUpdate('userName',e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="phoneNumber">تلفن همراه</label>
                                    <input id="phoneNumber" value={query.phoneNumber} name={'phoneNumber'}
                                           onChange={(e)=>queryUpdate('phoneNumber',e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="roleId">آیدی نقش کاربر</label>
                                    <input id="roleId" value={query.roleId} name={'roleId'}
                                           onChange={(e)=>queryUpdate('roleId',e.target.value)}/>

                                </div>
                            </div>
                            <div className={'flex mt-4 space-x-2 space-x-reverse mr-auto'}>
                                <button
                                    className={'justify-center rounded-full bg-red-500 border-red-500 px-5 p-1 ml-2 w-fit h-fit mt-auto'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setQuery(initialValue)
                                        onGridReady(initialValue);
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
        </div>
    )
}