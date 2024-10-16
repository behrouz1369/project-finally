import DeleteConfirmation from "@/components/shared/deleteConfirmation"
import MessageError from "@/exceptions/messageError"
import ValidationError from "@/exceptions/validationError"
import { CategoryArticle } from "@/models/categoryArticle"
import { Delete } from "@/services/api"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"


interface Props{
    article:CategoryArticle,
    mutateCat:KeyedMutator<any>
}

export default function CategoryListItem({article , mutateCat} : Props) {
    const [showDeleteConfirmation , setShowDeleteConfirmation] = useState(false)

    const deleteHandler = async () => {
        try {
            const res = await Delete({
                url:`/admin/article-category/${article?.id}`
            })

            if(mutateCat){
                await mutateCat()
            }

            toast.success('دسته بندی مورد نظر با موفقیت حذف شد!')

            setShowDeleteConfirmation(false)


        } catch (error) {
            if(error instanceof ValidationError){
                Object.entries(error.messeges).forEach(([key,value])=> toast.error(value as string))
            }else if(error instanceof MessageError){
                toast.error(error.messege)
            }

            toast.error('مشکلی در حذف دسته بندی بوجود آمده است.')
        }
    }
    return (
        <>
            <tr key={article?.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                <td className="hidden">
                    {showDeleteConfirmation && <DeleteConfirmation
                        title={`حذف محصول ${article?.title}`}
                        description={`در صورت تایید محصول ${article?.title} قابل بازگشت نیست.`}
                        handleCancel={()=> setShowDeleteConfirmation(false)}
                        handleTrue={deleteHandler}
                    />}
                </td>


                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {article?.id}
                </th>
                <td className="px-6 py-4">
                    {article?.title}
                </td>
                <td className="flex gap-2 px-6 py-4">
                    <Link href={`/admin/article-category/${article?.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                    <button
                        onClick={() => setShowDeleteConfirmation(true)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >Delete</button>
                </td>
            </tr>
        </>
    )
}
