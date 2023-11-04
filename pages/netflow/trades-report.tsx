import React, { useMemo } from 'react';
import dynamic from "next/dynamic";
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const SearchComponent = dynamic(() => import('../../components/common/components/search'))
import { formatNumber } from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import { NETFLOW } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { throwToast } from "../../components/common/functions/notification";
import { withPermission } from 'components/common/layout/with-permission';

function TradesReport() {
    const columnDefStructure = [
        {
            field: 'name',
            headerName: 'نام',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            width: 260,
        },
        {
            field: 'startDate',
            headerName: 'تاریخ شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{props.data.startDate}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 180,
        },
        {
            field: 'endDate',
            headerName: 'تاریخ شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{props.data.endDate}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 180,
        },
        {
            field: 'symbol',
            headerName: 'نماد',
            flex: 0,
            width: 180,
        },
        {
            field: 'buyerCode',
            headerName: 'شناسه خریدار',
            flex: 0,
            width: 180,
        },
        {
            field: 'sellerCode',
            headerName: 'شناسه فروشنده',
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر',
        }
    ]
    const { fetchData, loading, data, query } = useQuery({ url: `${NETFLOW}/Report/rules` })

    const getRowStyle = (params: any) => {
        if (params?.node?.data?.side === 1) {
            return { backgroundColor: 'rgba(5,122,85,0.18)' };
        } else {
            return { backgroundColor: 'rgba(225,29,72,0.18)' };
        }
    };
    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                rowStyle: {},
                getRowStyle: getRowStyle,
                suppressRowTransform: true,
                columnDefs: [
                    {
                        field: 'type', headerName: 'دسته', rowSpan: (params: any) => params.data.side === 1 ? 2 : 1,
                        cellClassRules: {
                            'cell-span': (params: any) => params.data.side === 1,
                        },
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span
                                        className={`my-auto`}>{props.node.rowIndex > 1 ? 'ضریب کارمزد' : 'سقف کارمزد'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                    { field: 'accountCommission', headerName: 'هزینه دسترسی' },
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    { field: 'tmcCommission', headerName: 'کارمزد فناوری' },
                    { field: 'csdCommission', headerName: 'کارمزد سپرده گزاری' },
                    { field: 'rayanBourseCommission', headerName: 'کارمزد رایان' },
                    { field: 'bourseCommission', headerName: 'بورس مربوطه' },
                    { field: 'brokerCommission', headerName: 'کارگزار' },
                    { field: 'tax', headerName: 'مالیات' },
                    { field: 'vatCommission', headerName: 'مالیات ارزش افزوده' },
                    { field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری' },
                    {
                        field: 'side', headerName: 'سمت',
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span>{props.data.side === 1 ? 'خرید' : 'فروش'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: (params: any) => {
                console.log(params);

                params.successCallback([...params.data?.feeBound, ...params.data?.feeValue])
            },
        };
    }, []);

    const submitHandler = (query: any) => {
        if (query?.StartDate && query?.EndDate) {
            fetchData(query)
        } else {
            throwToast({ type: 'warning', value: 'ورودی تاریخ الزامی می باشد' })
        }
    }

    return (
        <div className={'relative flex flex-col grow overflow-hidden'}>
            <AccordionComponent>
                <SearchComponent module={ModuleIdentifier.NETFLOW_trades_report}
                    onSubmit={fetchData} loading={loading}
                />
            </AccordionComponent>
            <TableComponent data={data?.result}
                loading={loading}
                columnDefStructure={columnDefStructure}
                rowId={['name']}
                masterDetail={true}
                detailCellRendererParams={detailCellRendererParams}
                pagination={true}
                totalCount={data?.totalRecord}
                fetcher={fetchData}
                query={query}
            />
        </div>

    )
}

export default withPermission(TradesReport, ModuleIdentifier.NETFLOW_trades_report)