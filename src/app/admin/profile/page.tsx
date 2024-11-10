'use client'

import EditNameProfileForm from "@/components/forms/profile/editNameProfileForm"
import EditPasswordProfileForm from "@/components/forms/profile/editPasswordProfileForm"
import { Get } from "@/services/apiServices"
import { useRouter } from "next/navigation"
import useSWR from "swr"

interface Props {

}

export default function ProfilePage() {

    const router = useRouter()

    const{data , error , mutate} = useSWR({url:`/admin/profile`},Get)



    return (
        <>
            <div className="flex justify-between items-end border-b-2 border-gray-200 pb-5 mb-5">
                <h2 className="text-2xl text-gray-900 font-bold ">   مدیریت پروفایل :</h2>
            </div>

            <div className="flex flex-col gap-5 bg-gray-200 rounded p-5">
                <div className="flex flex-col gap-3 bg-white rounded shadow-lg shadow-gray-100 p-5">
                    <h2 className="text-sm text-gray-600 font-[500]">نام : <span className="text-xl font-semibold text-gray-900">{data?.name}</span></h2>
                    <p className="text-sm text-gray-600 font-[500]">ایمیل : <span className="text-xl font-semibold text-gray-900">{data?.email}</span></p>
                </div>

                <div className="flex justify-center items-start gap-5">
                    <div className="flex bg-white rounded shadow-lg shadow-gray-100 p-5">
                        <EditNameProfileForm router={router}  mutateProfile={mutate} />

                    </div>

                    <div className="flex bg-white rounded shadow-lg shadow-gray-100 p-5">
                        <EditPasswordProfileForm mutateProfile={mutate} router={router} />
                    </div>
                </div>

            </div>
        </>
    )
}
