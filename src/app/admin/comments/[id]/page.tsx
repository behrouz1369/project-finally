'use client'

import ValidateMessageError from "@/exceptions/validateMessage"
import { GetSingle, Patch } from "@/services/apiServices"
import { useQueryState } from "next-usequerystate"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"
import useSWR from "swr"


interface Props{

}

export default function CommentSinglePage() {

    const router = useRouter()

    const params = useParams()


    const {data:comment , error , mutate:mutateComment} = useSWR({url:`/admin/comment/${params?.id}`} , GetSingle)

    const approveHandler = async () => {
        try {
            const res = await Patch({
                url:`/admin/comment/${params?.id}/approve`,
                values: params?.id
            })

            if(res){
                router.push(`/admin/comments?articleId=${params?.id}`)
                toast.success('پیام مورد نظر با موفقیت تایید گزدید.')
            }
        } catch (error) {
            if(error instanceof ValidateMessageError){
                toast.error(error.message)
            }
        }
    }

    const rejectHandler = async () => {
        try {
            const res = await Patch({
                url:`/admin/comment/${params?.id}/reject`,
                values: params?.id
            })

            if(res){
                router.push(`/admin/comments?articleId=${params?.id}`)
                toast.success('پیام مورد تایید قرار نگرفت!')
            }
        } catch (error) {
            if(error instanceof ValidateMessageError){
                toast.error(error.message)
            }
        }
    }

    const cancelHandler = () => {
        router.push(`/admin/comments?articleId=${params?.id}`)
    }

    return (
        <>
            <div className="flex flex-col gap-5 bg-gray-200 rounded w-full p-5">
                <div className="text-xl font-bold border-b-2 border-white pb-5">
                    <h2>صفحه تایید و رد پیام </h2>
                </div>
                <div className="flex flex-col gap-2 text-[14px] bg-white rounded p-5">
                    <h2>نام :<span className="text-lg font-semibold mr-2">{comment?.name}</span></h2>
                    <p>متن پیام :
                        <span className="text-sm text-gray-700 font-[500] mr-2">{comment?.content}</span>
                    </p>
                    <p>وضعیت : <span className="text-yellow-600 mr-2">{comment?.status_label}</span></p>
                    <p>تاریخ ثبت پیام : <span className="text-green-600 mr-2">{comment?.created_at}</span></p>
                </div>

                <div className="flex gap-2">
                    <button onClick={approveHandler} className="text-[17px] text-white bg-green-600 rounded py-2 px-4 hover:bg-green-700 transition-all">تایید</button>
                    <button onClick={rejectHandler} className="text-[17px] text-white bg-yellow-600 rounded py-2 px-4 hover:bg-yellow-700 transition-all">رد پیام</button>
                    <button onClick={cancelHandler} className="text-[17px] text-white bg-red-600 rounded py-2 px-4 hover:bg-red-700 transition-all">انصراف</button>
                </div>
            </div>
        </>
    )
}
