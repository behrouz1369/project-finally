'use client'

import { CategoryArticle } from "@/app/models/category-article"
import DeleteConfirmation from "@/components/shared/deleteConfirmation"
import Modal from "@/components/shared/modal"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Delete } from "@/services/apiServices"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"

interface Props{
    articleCat:CategoryArticle,
    router:AppRouterInstance,
    mutateCat?:KeyedMutator<any>
}

export default function CategoryListItem({articleCat , router , mutateCat}:Props) {
    const [showDeleteModal,setShowDeleteModal] = useState(false)

    const deleteHndler = async () => {
        try {
            let res = await Delete({url:`/admin/article-category/${articleCat?.id}`})

            if(mutateCat){
                await mutateCat()
            }

            setShowDeleteModal(false)

            toast.success('دسته بندی مورد نظر با موفقیت حذف گردید.')
        } catch (error) {
            if(error instanceof ValidateMessageError){
                    toast.error(error.message)
            }
        }
    }

    return (
        <>
            <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="hidden">
                    {
                        showDeleteModal && <DeleteConfirmation
                            title={`حذف ${articleCat?.title}`}
                            description="آیا از حذف این دسته بندی مقاله اطمینان کامل دارید؟"
                            handleCancel={()=>{setShowDeleteModal(false)}}
                            handleTrue={deleteHndler}
                        />
                    }
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{articleCat?.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{articleCat?.title}</td>
                <td className="flex gap-3 whitespace-nowrap px-6 py-4">
                    <button onClick={()=>{setShowDeleteModal(true)}} className="text-sm text-red-600 hover:underline transition-all">Delete</button>
                    <Link
                        className="text-sm text-yellow-600 hover:underline transition-all"
                        href={`/admin/categoriesArticles/${articleCat?.id}`}
                    >
                        edit
                    </Link>
                </td>
            </tr>
        </>
    )
}
