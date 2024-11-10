'use client'

import { Article } from "@/app/models/article";
import { CategoryArticle } from "@/app/models/category-article";
import CategoryListItem from "@/components/admin/articleCat/categoryListItem";
import ArticleListItem from "@/components/admin/articles/articleListItem";
import CreateArticleForm from "@/components/forms/article/createArticleForm";
import CreateArticleCatForm from "@/components/forms/articleCat/createArticleCatForm";
import EmptyList from "@/components/shared/emptyList";
import LoadingBox from "@/components/shared/loadingBox";
import Modal from "@/components/shared/modal";
import ReactCustomPaginate from "@/components/shared/reactCustomPaginate";
import { Get } from "@/services/apiServices"
import { Formik } from "formik";
import { useQueryState } from "next-usequerystate";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr"


export default function CreateArticle() {
    const router = useRouter()

    const {data : articlesCat , error , mutate: mutateArticle} = useSWR({url:'/admin/list/article-categories'} , Get)


    const isLoading = !articlesCat?.data && !error;

    return (
        <>

            <div className="bg-gray-200 rounded p-5">
                <div className="flex flex-col justify-start py-5">
                    <h2 className="text-3xl text-gray-800 font-bold pb-2">ایجاد مقاله جدید : </h2>
                    <div className="bg-gradient-to-r from-cyan-300 to-cyan-600 rounded-t-full w-64 h-1"></div>
                </div>
                <CreateArticleForm router={router} articlesCat={articlesCat} />
            </div>
        </>
    )
}
