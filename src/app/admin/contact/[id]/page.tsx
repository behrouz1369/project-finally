'use client'

import EditContactForm from "@/components/forms/contact/editContactForm"
import { GetSingle } from "@/services/apiServices"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"
import useSWR from "swr"


interface Props {

}

export default function ContactSinglePage() {
    const router = useRouter()
    const params = useParams()

    const {data:singleData , error , mutate : mutateContact} = useSWR({url:`/admin/contact/${params?.id}`} , GetSingle)

    if(error){
        router.push('/admin')
        toast.error(error?.message)
        return<></>
    }

    const is_loading = !singleData && !error;

    return(
        <>
            <div className="flex flex-col gap-5 bg-gray-200 rounded w-full p-5">
                <div className="text-xl font-bold border-b-2 border-white pb-5">
                    <h2>مدیریت تماس آقای : <span className="text-yellow-600">{singleData?.name}</span></h2>
                </div>
                <div className="flex flex-col gap-2 text-[14px] bg-white rounded p-5">

                    <p>متن تماس :
                        <span className="text-sm text-gray-700 font-[500] mr-2">{singleData?.content}</span>
                    </p>
                    <p>تاریخ ثبت تماس : <span className="text-green-600 mr-2">{singleData?.created_at}</span></p>
                </div>

                <div className="flex w-full">
                    <EditContactForm contact={singleData} router={router} mutateContact={mutateContact} />
                    {/* <button onClick={approveHandler} className="text-[17px] text-white bg-green-600 rounded py-2 px-4 hover:bg-green-700 transition-all">تایید</button>
                    <button onClick={rejectHandler} className="text-[17px] text-white bg-yellow-600 rounded py-2 px-4 hover:bg-yellow-700 transition-all">رد پیام</button>
                    <button onClick={cancelHandler} className="text-[17px] text-white bg-red-600 rounded py-2 px-4 hover:bg-red-700 transition-all">انصراف</button> */}
                    {/* <button onClick={()=> {}} className="text-[17px] text-white bg-red-600 rounded py-2 px-4 hover:bg-red-700 transition-all">انصراف</button> */}
                </div>
            </div>
        </>
    )
}
