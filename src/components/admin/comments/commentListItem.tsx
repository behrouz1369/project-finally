'use client'

import { Article } from "@/app/models/article"
import { CategoryArticle } from "@/app/models/category-article"
import DeleteConfirmation from "@/components/shared/deleteConfirmation"
import Modal from "@/components/shared/modal"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Delete, GetSingle } from "@/services/apiServices"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"

import * as shamsi from 'shamsi-date-converter';

interface Props{
    comment:any,
    router:AppRouterInstance,
    mutateComments?:KeyedMutator<any>
}

export default function CommentListItem({comment , router , mutateComments}:Props) {
    const [showDeleteModal,setShowDeleteModal] = useState(false)

    const deleteHndler = async () => {

        try {
            let res = await Delete({url:`/admin/comment/${comment?.id}`})

            if(mutateComments){
                await mutateComments()
            }

            setShowDeleteModal(false)

            toast.success(' پیام مورد نظر با موفقیت حذف گردید.')
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
                            title={`حذف ${comment?.name}`}
                            description="آیا از حذف این پیام   اطمینان کامل دارید؟"
                            handleCancel={()=>{setShowDeleteModal(false)}}
                            handleTrue={deleteHndler}
                        />
                    }
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{comment?.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{comment?.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{comment?.status_label}</td>
                <td className="whitespace-nowrap px-6 py-4">{comment?.created_at}</td>
                <td className="flex gap-3 whitespace-nowrap px-6 py-4">
                    <button onClick={()=>{setShowDeleteModal(true)}} className="text-sm text-red-600 hover:underline transition-all">Delete</button>

                    <Link
                        className="text-sm text-yellow-600 hover:underline transition-all"
                        href={`/admin/comments/${comment?.id}`}
                    >
                        تایید/رد
                    </Link>
                </td>
            </tr>
        </>
    )
}
