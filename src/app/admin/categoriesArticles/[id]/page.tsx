'use client'

import { CategoryArticle } from "@/app/models/category-article";
import CategoryListItem from "@/components/admin/articleCat/categoryListItem";
import CreateArticleCatForm from "@/components/forms/articleCat/createArticleCatForm";
import EditArticleCatForm from "@/components/forms/articleCat/editArticleCatForm";
import EmptyList from "@/components/shared/emptyList";
import LoadingBox from "@/components/shared/loadingBox";
import Modal from "@/components/shared/modal";
import { Get, GetSingle } from "@/services/apiServices"
import { Formik } from "formik";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr"

interface Props{

}

export default function editCategoryArticle({} : Props) {
    const catId = useParams()

    const router = useRouter()

    const {data : articleCat , error , mutate: mutateCat} = useSWR({url:`/admin/article-category/${catId?.id}`} , GetSingle)

    if(error){
        router.push('/admin/categoriesArticles')
        return <></>
    }

    const loadingData = !articleCat && !error

    return (
        <>

            <div className="flex justify-between items-end border-b-2 border-gray-200 pb-5 mb-5">
                <h2 className="text-2xl text-gray-900 font-bold ">صفحه ویرایش دسته بندی مقالات :</h2>

                <Link
                    href={`/admin/categoriesArticles?createCat`}
                    className="text-sm text-white font-semibold bg-blue-600 rounded py-2 px-4 hover:bg-blue-800 transition-all">اضافه کردن دسته بندی</Link>
            </div>


            <div className="bg-gray-200 rounded p-5">
                {/* form Categories Articles */}
                <div className="flex flex-col bg-white rounded overflow-hidden">
                {
                    loadingData
                    ? <LoadingBox />
                    : (
                        <EditArticleCatForm articelCat={articleCat} router={router} />
                    )
                }
                </div>

            </div>
        </>
    )
}
