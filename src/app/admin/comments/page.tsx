'use client'

import { Article } from "@/app/models/article"
import CommentListItem from "@/components/admin/comments/commentListItem"
import EmptyList from "@/components/shared/emptyList"
import LoadingBox from "@/components/shared/loadingBox"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Get } from "@/services/apiServices"
import { useQueryState } from "next-usequerystate"
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime"
import { useParams, useRouter } from "next/navigation"
import { EventHandler, FormEvent } from "react"
import { toast } from "react-toastify"
import useSWR from "swr"


interface Props{

}

export default function Comments() {
    const router = useRouter()

    const {data} = useSWR({url:`/admin/article`},Get)

    const [articleId , setArticleId] = useQueryState('articleId')

    const {data:comments , error , mutate:mutateComments} = useSWR({url:`/admin/article/${articleId}/comments`} , Get)

    const isLoading = !comments?.data && !error;


    const submitArticleIdHandler = async (e:FormEvent<EventTarget>) => {
        try {
            e.preventDefault()
            const articleId = e.target[0].value
            if(articleId){
                router.push(`/admin/comments?articleId=${articleId}`)
            }


        } catch (error) {
            if(error instanceof ValidateMessageError){
                toast.error(error.message)
            }else if(error instanceof Error){
                toast.error(error.message)
            }
        }
    }


    return (
        <>
            <div className="flex justify-between items-end border-b-2 border-gray-200 pb-5 mb-5">
                <h2 className="text-2xl text-gray-900 font-bold ">صفحه مدیریت پیام ها :</h2>
            </div>

            {/* Form articles submit to view comments Related to messages */}
            <div className="bg-gray-200 rounded p-5 mb-5">
                <form onSubmit={submitArticleIdHandler} className="flex gap-3 items-center">
                    <div className="flex items-center gap-3">
                        <label htmlFor="article" className="text-sm font-semibold">مقالات : </label>

                        <select name="articleId" className="flex text-md text-gray-600 w-[150px] rounded-full px-2 py-2">
                            <option>انتخاب کنید</option>
                            {
                                data?.data?.map((article:Article) => (
                                    <option key={article?.id} defaultValue={article?.id} value={article?.id}>{article?.title}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <button type="submit" className="text-sm font-bold text-white bg-blue-700 rounded py-2 px-4">نمایش</button>
                    </div>
                </form>
            </div>

            {
                isLoading
                ? (
                    <div>
                        <LoadingBox />
                    </div>
                )
                :   comments?.data.length >  0
                    ? (
                        <>
                            {/* Table Categories Articles */}
                            <div className="flex flex-col bg-white rounded overflow-hidden">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table
                                                className="min-w-full text-right text-sm font-light text-surface dark:text-white">
                                            <thead
                                                className="border-b border-neutral-200 font-medium bg-gray-600 text-white dark:border-white/10">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4">#</th>
                                                    <th scope="col" className="px-6 py-4">نام</th>
                                                    {/* <th scope="col" className="px-6 py-4">محتوا</th> */}
                                                    <th scope="col" className="px-6 py-4">درحال انتظار/تایید/رد</th>
                                                    <th scope="col" className="px-6 py-4">تاریخ ثبت</th>
                                                    <th scope="col" className="px-6 py-4">عملیات</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                     comments?.data?.map((comment : Article) => <CommentListItem key={comment?.id} comment={comment} router={router} mutateComments={mutateComments} /> )
                                                }
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    : (
                            <EmptyList
                                title="در حال حاضر هیج داده ای موجود نمی باشد."
                                description="اطلاعات موجودنمی باشد می توانید با اضافه کردن اطلاعات جدید نمایش دهید>"
                            />
                    )
            }

        </>
    )
}
