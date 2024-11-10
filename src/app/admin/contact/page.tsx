'use client'

import { Contact } from "@/app/models/contact"
import ContactListItem from "@/components/admin/contact/contactListItem"
import EmptyList from "@/components/shared/emptyList"
import LoadingBox from "@/components/shared/loadingBox"
import ReactCustomPaginate from "@/components/shared/reactCustomPaginate"
import { Get } from "@/services/apiServices"
import { useQueryState } from "next-usequerystate"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import useSWR from "swr"

interface Props{

}

export default function ContactPage() {

    const router = useRouter()

    const [page , setPage] = useQueryState('page')

    const {data : contactData , error , mutate : mutateContact} = useSWR({url:`/admin/contact` , page:page && 1} , Get)

    if(error){
        router.push('/admin')
        toast.error(error?.message)
        return<></>
    }

    const is_loading = !contactData && !error;

    //change page
    const onChangePageHandler = ({selected}:{selected:number}) => {
        router.push(`/admin/contact?page=${selected + 1}`)
    }

    return (
        <>
            <div className="flex justify-between items-end border-b-2 border-gray-200 pb-5 mb-5">
                <h2 className="text-2xl text-gray-900 font-bold "> مدیریت تماس ها :</h2>
            </div>

            {
                is_loading
                ? (
                    <div>
                        <LoadingBox />
                    </div>
                )
                :   contactData?.data.length > 0
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
                                                    <th scope="col" className="px-6 py-4">نام</th>
                                                    <th scope="col" className="px-6 py-4">ایمیل</th>
                                                    <th scope="col" className="px-6 py-4">وضعیت</th>
                                                    <th scope="col" className="px-6 py-4">تاریخ ثبت</th>
                                                    <th scope="col" className="px-6 py-4">عملیات</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    contactData?.data?.map((contact : Contact) => <ContactListItem key={contact?.id} contact={contact} router={router} mutateContact={mutateContact} /> )
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
                contactData?.last_page > 1 && (
                    <>
                        {/* pagination */}
                        <div>
                            <ReactCustomPaginate
                                page={page}
                                pageCount={contactData?.last_page}
                                onPageChangeHandler={onChangePageHandler}
                            />
                        </div>
                    </>
                )
            }

        </>
    )
}
