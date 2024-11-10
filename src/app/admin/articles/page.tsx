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


export default function Articles() {
    const router = useRouter()

    const [page , setPage] = useQueryState('page')

    const {data : articles , error , mutate: mutateArticle} = useSWR({url:'/admin/article',page:page ?? 1} , Get)


    const isLoading = !articles?.data && !error;

    const searchParams = useSearchParams()

    //change page
    const onChangePageHandler = ({selected}:{selected:number}) => {
        router.push(`/admin/articles?page=${selected + 1}`)
    }

    return (
        <>

            <div className="flex justify-between items-end border-b-2 border-gray-200 pb-5 mb-5">
                <h2 className="text-2xl text-gray-900 font-bold ">صفحه مدیریت مقالات :</h2>

                <Link
                    href={`/admin/articles/create`}
                    className="text-sm text-white font-semibold bg-blue-600 rounded py-2 px-4 hover:bg-blue-800 transition-all">اضافه کردن دسته بندی</Link>
            </div>


            <div className="bg-gray-200 rounded p-5">
                {
                    isLoading
                    ? (
                        <div>
                            <LoadingBox />
                        </div>
                    )
                    :   articles?.data.length > 0
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
                                                        <th scope="col" className="px-6 py-4">عنوان</th>
                                                        <th scope="col" className="px-6 py-4">slug</th>
                                                        <th scope="col" className="px-6 py-4">دسته بندی</th>
                                                        {/* <th scope="col" className="px-6 py-4">وضعیت انتشار</th> */}
                                                        <th scope="col" className="px-6 py-4">تاریخ انتشار</th>
                                                        <th scope="col" className="px-6 py-4">عملیات</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        articles?.data?.map((article : Article) => <ArticleListItem key={article?.id} article={article} router={router} mutateArticle={mutateArticle} /> )
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

                {
                    articles?.last_page > 1 && (
                        <>
                            {/* pagination */}
                            <div>
                                <ReactCustomPaginate
                                    page={page}
                                    pageCount={articles?.last_page}
                                    onPageChangeHandler={onChangePageHandler}
                                />
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}
