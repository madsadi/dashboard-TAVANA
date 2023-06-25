import React, {useEffect, useRef, useState} from 'react';
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import SearchComponent from "../../components/common/components/Search.component";
import TableComponent from "../../components/common/table/table-component";
import {jalali} from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import {COMMISSION_BASE_URL} from "../../api/constants";
import Modal from "../../components/common/layout/Modal";

export default function Commission() {
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
            field: 'instrumentId',
            headerName: 'شناسه نماد',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'faInsName',
            headerName: 'عنوان نماد',
        },
        {
            field: 'maxQuantity',
            headerName: 'بیشینه حجم سفارش',
            flex: 0,
        },
        {
            field: 'minPrice',
            headerName: 'حداقل قیمت سفارش',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'maxPrice',
            headerName: 'حداکثر قیمت سفارش',
            flex: 0,
        }, {
            field: 'fromActiveDateTime',
            headerName: 'زمان شروع',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.fromActiveDateTime).date}</span>
                            <span>{jalali(props.data.fromActiveDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'toActiveDateTime',
            headerName: 'زمان پایان',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.toActiveDateTime).date}</span>
                            <span>{jalali(props.data.toActiveDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'createdBy',
            headerName: 'کاربر ایجاد کننده',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'createDateTime',
            headerName: 'زمان ایجاد',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.createDateTime).date}</span>
                            <span>{jalali(props.data.createDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'updatedBy',
            headerName: 'کاربر تغییر دهنده',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'updatedDateTime',
            headerName: 'زمان تغییر',
            flex: 0,
            width: 120,
            minWidth: 120
        }
    ]
    const {data:categoryData,fetchData:categorySearch}:any = useQuery({url:`${COMMISSION_BASE_URL}/api/CommissionCategory/Search`})
    const {data:instrumentData,fetchData:instrumentSearch}:any = useQuery({url:`${COMMISSION_BASE_URL}/api/CommissionInstrumentType/Search`})
    const {data:detailData,fetchData:detailSearch}:any = useQuery({url:`${COMMISSION_BASE_URL}/api/CommissionDetail/Search`})
    const [categoryModal,setCategoryModal]=useState(false)
    const ref=useRef()

    useEffect(()=>{
        if (categoryData?.result?.pagedData.length) setCategoryModal(true)
    },[categoryData])

    return (
        <div className={'flex flex-col h-full grow'}>
            <Modal setOpen={setCategoryModal} open={categoryModal} title={'نتایج جستجو گروه بندی ضرایب'}>
                {categoryData?.result?.pagedData?.map((item:any)=>{
                    return(
                        <div>
                            {item.id}
                        </div>
                    )
                })}
            </Modal>
            <AccordionComponent>
                <div className={'grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2'}>
                    <div className={'flex flex-col border border-dashed border-border p-2 rounded'}>
                        <div className={'font-bold text-lg mb-5'}>
                            ابزار مالی گروه بندی ضرایب
                        </div>
                        <SearchComponent className={'!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 '} extraClassName={'sm:mt-auto'} onSubmit={instrumentSearch} module={ModuleIdentifier.COMMISSION_MANAGEMENT_instrument}/>
                    </div>
                    <div className={'border border-dashed border-border p-2 rounded'}>
                        <div className={'font-bold text-lg mb-5'}>
                            گروه بندی ضرایب
                        </div>
                        <SearchComponent className={'!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 '} onSubmit={categorySearch} module={ModuleIdentifier.COMMISSION_MANAGEMENT_category}/>
                    </div>
                    <div className={'flex flex-col border border-dashed border-border p-2 rounded'}>
                        <div className={'font-bold text-lg mb-5'}>
                            گروه بندی ضرایب
                        </div>
                        <SearchComponent ref={ref} className={'!xl:grid-cols-2 !lg:grid-cols-3 !md:grid-cols-3 !sm:grid-cols-3 !grid-cols-2 '} extraClassName={'sm:mt-auto'} onSubmit={detailSearch} module={ModuleIdentifier.COMMISSION_MANAGEMENT_detail}/>
                    </div>
                </div>
            </AccordionComponent>
            <TableComponent data={instrumentData?.result?.pagedData}
                            columnDefStructure={columnDefStructure}
                            rowId={['instrumentId']}
                            rowSelection={'single'}
            />
        </div>
        // <div className="flex flex-col h-full grow">
        //     <CommissionSearch/>
        //     <CommissionResult/>
        // </div>
    )
}