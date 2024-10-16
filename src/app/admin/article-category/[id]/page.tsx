'use client'

import EditCategoryArticleForm from "@/components/forms/category-article/editCategoryArticleForm"
import MessageError from "@/exceptions/messageError"
import ValidationError from "@/exceptions/validationError"
import { useAppSelector } from "@/hooks"
import { GetSingle } from "@/services/api"
import { selectPage } from "@/store/auth"
import { useQueryState } from "next-usequerystate"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import useSWR from "swr"




interface Props{
    params:any
}

export default function EditCategoryArticle({params} : Props) {
    const router = useRouter()

    const page = useAppSelector(selectPage)

    const {data , error ,mutate} = useSWR({url:`/admin/article-category/${params?.id}`} , GetSingle)

    if(error instanceof MessageError){
        router.push('/admin/products')
        toast.error('چنین دسته بندی مقاله ای وجود ندارد!')
        return <></>
    }

    const isLoadding = !data && !error
    // console.log(data?.data)

    return (
        <>
            <div className="bg-gray-200 rounded p-5 w-full">
                <div className="flex justify-between items-center mb-5 pb-5 border-b-2 border-gray-600 w-full">
                    <h2 className="text-xl font-semibold capitalize">صفحه ویرایش دسته بندی مقالات</h2>

                </div>

                <div className="space-y-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {
                            isLoadding
                            ? <span>Loading</span>
                            : (
                                <EditCategoryArticleForm router={router} articleCat={data?.data} mutateCat={mutate} page={page ?? '1'} />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
