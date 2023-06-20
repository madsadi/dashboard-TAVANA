import React, {useContext, useState} from "react";
import Modal from "../../common/layout/Modal";
import {throwToast} from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import {ADMIN_GATEWAY} from "../../../api/constants";
import {RelationsContext} from "../../../pages/marketer-app/relations";

export default function DeleteMarketersRelations() {
    const {selectedRows,fetchData,searchQuery} = useContext<any>(RelationsContext)
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/marketer/delete-marketers-relations`,method:"DELETE"})
    const [modal, setModal] = useState(false)

    const openHandler = ()=>{
        if (selectedRows?.length===1){
            setModal(true)
        }else{
            throwToast({type:'warning',value:'لطفا یک گزینه برای حذف انتخاب کنید'})
        }
    }
    const submitHandler = async (e:any)=>{
        e.preventDefault()
        await mutate({LeaderMarketerID:selectedRows[0].LeaderMarketerID,FollowerMarketerID :selectedRows[0].FollowerMarketerID})
            .then((res)=> {
                throwToast({type:'success',value:`${res?.data?.result?.message}`})
                setModal(false)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({type:'error',value:err}))
    }

    return (
        <>
            <button className={'button bg-red-600'} onClick={openHandler}>
                حذف رابطه بین دو بازاریاب
            </button>
            <Modal title={'حذف رابطه بین دو بازاریاب'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                        <p className={'text-center'}>آیا از حذف کردن این ارتباط اطمینان دارید؟</p>
                        <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                            <button className="button bg-red-500"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setModal(false)
                                    }}>لغو
                            </button>
                            <button type={"submit"} onClick={submitHandler} className="button bg-lime-600" >تایید</button>
                        </div>
                </div>
            </Modal>
        </>
    )
}