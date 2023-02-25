import React, {useState} from 'react';
import AccordionComponent from "../../common/components/AccordionComponent";
import TableComponent from "../../common/table/table-component";
import InputComponent from "../../common/components/InputComponent";
import {commissionCategorySearch} from "../../../api/commission.api";
import {toast} from "react-toastify";

type initialType = { CommissionCategoryId: string, MarketTitle: string, OfferTypeTitle: string, SideTitle: string, SettlementDelayTitle: string, CustomerTypeTitle: string, CustomerCounterSideTitle: string }
const initialValue = {
    CommissionCategoryId: '',
    MarketTitle: '',
    OfferTypeTitle: '',
    SideTitle: '',
    SettlementDelayTitle: '',
    CustomerTypeTitle: '',
    CustomerCounterSideTitle: '',
}
const listOfFilters = [
    {title: 'CommissionCategoryId', name: 'شناسه', type: 'input'},
    {title: 'MarketTitle', name: 'بازار', type: 'input'},
    {title: 'OfferTypeTitle', name: 'نوع عرضه', type: 'input'},
    {title: 'SideTitle', name: 'سمت سفارش', type: 'input'},
    {title: 'SettlementDelayTitle', name: 'تاخیر در تسویه', type: 'input'},
    {title: 'CustomerTypeTitle', name: 'نوع مشتری', type: 'input'},
    {title: 'CustomerCounterSideTitle', name: 'نوع طرف مقابل', type: 'input'},
]

export default function CategoryResultTableSection() {
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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])

    const onSubmit = async (e: any, query: any) => {
        e?.preventDefault()
        await commissionCategorySearch(query)
            .then(res => setData(res?.result))
            .catch(() => toast.error('نا موفق'))
    };

    return (
        <div className={'relative flex flex-col grow overflow-hidden'}>
            <AccordionComponent>
                <form onSubmit={(e) => onSubmit(e, query)}>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            listOfFilters?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       setQuery={setQuery}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
                                />
                            })
                        }
                    </div>
                    <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                        <button className={'button bg-red-600'} onClick={(e) => {
                            e.preventDefault()
                            setQuery(initialValue)
                            onSubmit(e, initialValue)
                        }}>
                            لغو فیلتر ها
                        </button>
                        <button className={'button bg-lime-600'} type={'submit'}>
                            جستجو
                        </button>
                    </div>
                </form>
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['instrumentId']}
            />
        </div>
    );
}
