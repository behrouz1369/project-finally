'use client'

import { Btn } from "@/components/shared/btns";
import TableComponent from "@/components/shared/table"
import { Get, GetSingle } from "@/services/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "@/components/shared/modal";
import CreateCategoryArticleForm from "@/components/forms/category-article/createCategoryArticleForm";
import useSWR from "swr";
import { CategoryArticle } from "@/models/categoryArticle";
import CategoryListItem from "@/components/admin/category-article/categoryListItem";
import ReactCustomPaginate from "@/components/reactCutsomPaginate";
import { useQueryState } from "next-usequerystate";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect } from "react";
import { selectTitleCat, updatePage, updateTitleCat } from "@/store/auth";
import SearchCategoryArticleForm from "@/components/forms/category-article/searchCategoryArticleForm";
import SearchArticle from "@/components/admin/category-article/searchTitleCat";






const CategoryArticles = () => {
    const [page , setPage]= useQueryState('page')
    const [perPage , setPerPage]= useQueryState('per_page')
    const searchParams = useSearchParams()
    // const page = searchParams?.get('page') ?? '2'

    const router = useRouter()

    const dispatch = useAppDispatch()

      const columns = ['id', 'title'];

      const {data : articles , error , mutate} = useSWR({url:'/admin/article-category', page:page ?? 1 , perPage:perPage ?? 2},Get)

      const articlesData = articles?.data?.data?.map((article:CategoryArticle) => article)

      const titleCat = useAppSelector(selectTitleCat);

      const setTitleCat = (title:string) => {
        dispatch(updateTitleCat(title))
      }

      const loadingCategoryArticle = !articles && !error

      const articleFilterTitleCat =  articlesData?.filter((article:CategoryArticle) => article.title === titleCat?.trim())

      useEffect(()=>{
        dispatch(updatePage(page ?? '1'))
      },[page])

    //   Show Modal
      const setIsOpen = (show = true) => {
        router.push(`/admin/article-category ${show ? '?create-category':''}`)
      }

    //   onChange Pagination
      const pageChangeHandler = ({selected}:{selected : any}) => {
        router.push(`/admin/article-category?page=${selected + 1}`)
      }

    return (

        <div className="bg-gray-200 p-5 rounded w-full">
            {
                searchParams.has('create-category') && <Modal setIsOpen={setIsOpen}>
                                <div className="inline-block w-full max-w-3xl mt-8 mb-20 p-5 overflow-hidden text-right align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">

                                    <h2 className="text-xl font-bold leading-tight text-gray-800 py-5 px-7 mb-3 border-b-2 border-gray-500"> ایجاد دسته بندی مقاله</h2>

                                    <CreateCategoryArticleForm router={router} mutateCat={mutate} />

                                </div>
                            </Modal>
            }
            <div className="flex justify-between items-center mb-5 pb-5 border-b-2 border-gray-600 w-full">
                <h2 className="text-xl font-semibold capitalize">صفحه دسته بندی مقالات</h2>
                <Link
                        href={`/admin/article-category?create-category`}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        اضافه کردن محصول
                </Link>
            </div>

            <div className="space-y-5">
                {
                    loadingCategoryArticle
                        ? <span>Loading</span>
                        : (
                            <>
                                {/* Search Title Category Article */}
                                <div className="flex gap-5">
                                    <SearchCategoryArticleForm setTitle={setTitleCat} router={router} />
                                </div>

                                {/* List Category Article */}
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table dir="rtl" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    ردیف
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    عنوان
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    عملیات
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                loadingCategoryArticle
                                                ? <span>Loading</span>
                                                : (
                                                    articleFilterTitleCat.length > 0
                                                        ? (
                                                            articleFilterTitleCat?.map((article:CategoryArticle)=>(
                                                                <CategoryListItem key={article?.id} article={article} mutateCat={mutate} />
                                                                ))
                                                        )
                                                        : (
                                                            articlesData?.map((article:CategoryArticle)=>(
                                                                <CategoryListItem key={article?.id} article={article} mutateCat={mutate} />
                                                                ))
                                                        )

                                                    )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                }
            </div>

            <div className="flex justify-start py-5">
                <ReactCustomPaginate
                    page={page}
                    pageCount={articles?.data?.last_page}
                    onPageChangeHandler={pageChangeHandler}
                />
            </div>
        </div>
    )
}

export default CategoryArticles
