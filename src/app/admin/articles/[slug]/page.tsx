'use client'

import { Article } from "@/app/models/article";
import { CategoryArticle } from "@/app/models/category-article";
import CategoryListItem from "@/components/admin/articleCat/categoryListItem";
import ArticleListItem from "@/components/admin/articles/articleListItem";
import CreateArticleForm from "@/components/forms/article/createArticleForm";
import EditArticleForm from "@/components/forms/article/editArticleForm";
import CreateArticleCatForm from "@/components/forms/articleCat/createArticleCatForm";
import EmptyList from "@/components/shared/emptyList";
import LoadingBox from "@/components/shared/loadingBox";
import Modal from "@/components/shared/modal";
import ReactCustomPaginate from "@/components/shared/reactCustomPaginate";
import { Get, GetSingle } from "@/services/apiServices"
import { Formik } from "formik";
import { useQueryState } from "next-usequerystate";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr"

interface Props {

}

export default function EditArticle() {
    const router = useRouter()

    const articleSlug = useParams()


    const {data : articleEdit , error , mutate: mutateArticleEdit} = useSWR({url:`/admin/article/${articleSlug?.slug}`} , GetSingle)
    const {data : articlesCat} = useSWR({url:'/admin/list/article-categories'} , Get)

    const isLoading = !articleEdit && !error;






    return (
        <>

            <div className="bg-gray-200 rounded p-5">

                {
                    isLoading
                    ? <LoadingBox />
                    : <EditArticleForm router={router} article={articleEdit} articlesCat={articlesCat} mutateArticleEdit={mutateArticleEdit} />
                }
            </div>
        </>
    )
}
