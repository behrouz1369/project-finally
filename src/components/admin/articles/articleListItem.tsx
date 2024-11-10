'use client'

import { Article } from "@/app/models/article"
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

import * as shamsi from 'shamsi-date-converter';

interface Props{
    article:Article,
    router:AppRouterInstance,
    mutateArticle?:KeyedMutator<any>
}

export default function ArticleListItem({article , router , mutateArticle}:Props) {
    const [showDeleteModal,setShowDeleteModal] = useState(false)

    const deleteHndler = async () => {

        try {
            console.log(article?.slug)
            let res = await Delete({url:`/admin/article/${article?.slug}`})

            if(mutateArticle){
                await mutateArticle()
            }

            setShowDeleteModal(false)

            toast.success(' مقاله مورد نظر با موفقیت حذف گردید.')
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
                            title={`حذف ${article?.title}`}
                            description="آیا از حذف این   مقاله اطمینان کامل دارید؟"
                            handleCancel={()=>{setShowDeleteModal(false)}}
                            handleTrue={deleteHndler}
                        />
                    }
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{article?.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{article?.title}</td>
                <td className="whitespace-nowrap px-6 py-4">{article?.slug}</td>
                <td className="whitespace-nowrap px-6 py-4">{article?.category_title}</td>
                <td className="whitespace-nowrap px-6 py-4">{article?.published_at ?? '0'}</td>
                <td className="flex gap-3 whitespace-nowrap px-6 py-4">
                    <button onClick={()=>{setShowDeleteModal(true)}} className="text-sm text-red-600 hover:underline transition-all">Delete</button>
                    <Link
                        className="text-sm text-yellow-600 hover:underline transition-all"
                        href={`/admin/articles/${article?.slug}`}
                    >
                        edit
                    </Link>
                </td>
            </tr>
        </>
    )
}
