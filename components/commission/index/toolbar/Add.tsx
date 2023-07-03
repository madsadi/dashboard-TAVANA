import {useSearchFilters} from "../../../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../../../common/functions/Module-Identifier";
import {useContext, useState} from "react";
import {CommissionContext} from "../../../../pages/commission-management/commission";
import {COMMISSION_BASE_URL} from "../../../../api/constants";
import useMutation from "../../../../hooks/useMutation";
import {throwToast} from "../../../common/functions/notification";
import Modal from "../../../common/layout/Modal";
import InputComponent from "../../../common/components/InputComponent";

export default function AddCommission() {
    const {toolbar} = useSearchFilters(ModuleIdentifier.COMMISSION_MANAGEMENT_detail, 'add')
    const {fetchData, query: searchQuery} = useContext<any>(CommissionContext)
    const {mutate} = useMutation({url: `${COMMISSION_BASE_URL}/api/CommissionDetail/Add`})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await mutate(query)
            .then(() => {
                throwToast({type: 'success', value: 'با موفقیت انجام شد'})
                setModal(false)
                setQuery(null)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({type: 'error', value: err}))
    }

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>ایجاد کارمزد</button>
            <Modal title={'ایجاد کارمزد'} ModalWidth={'max-w-7xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid lg:grid-cols-4 grid-cols-2 gap-4'}>
                        {
                            toolbar.map((item: any) => {
                                if (item?.children) {
                                    return (<div className={'w-full'}>
                                        <label className={'mb-1'}>{item.name}</label>
                                        <div className={'flex'}>
                                            {
                                                item?.children.map((child: any) => {
                                                    return (
                                                        <InputComponent key={child.title}
                                                                        query={query}
                                                                        setQuery={setQuery}
                                                                        item={child}
                                                                        onChange={onChange}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>)
                                } else {
                                    return <InputComponent key={item.title}
                                                           query={query}
                                                           setQuery={setQuery}
                                                           item={item}
                                                           onChange={onChange}
                                    />
                                }
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}>لغو
                        </button>
                        <button type={"submit"} className="button bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}