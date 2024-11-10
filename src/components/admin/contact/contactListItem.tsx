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
    contact:any,
    router:AppRouterInstance,
    mutateContact?:KeyedMutator<any>
}

export default function ContactListItem({contact , router , mutateContact}:Props) {
    const [showDeleteModal,setShowDeleteModal] = useState(false)

    const deleteHndler = async () => {

        try {
            let res = await Delete({url:`/admin/contact/${contact?.id}`})

            if(mutateContact){
                await mutateContact()
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
                            title={`حذف ${contact?.name}`}
                            description="آیا از حذف این تماس   اطمینان کامل دارید؟"
                            handleCancel={()=>{setShowDeleteModal(false)}}
                            handleTrue={deleteHndler}
                        />
                    }
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{contact?.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{contact?.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{contact?.email}</td>
                <td className="whitespace-nowrap px-6 py-4">{contact?.is_reviewed ? 'بررسی شده' : 'در انتظار بررسی'}</td>
                <td className="whitespace-nowrap px-6 py-4">{contact?.created_at}</td>
                <td className="flex gap-3 whitespace-nowrap px-6 py-4">
                    <button onClick={()=>{setShowDeleteModal(true)}} className="text-sm text-red-600 hover:underline transition-all">Delete</button>

                    <Link
                        className="text-sm text-yellow-600 hover:underline transition-all"
                        href={`/admin/contact/${contact?.id}`}

                    >
                       بررسی
                    </Link>
                </td>
            </tr>
        </>
    )
}
