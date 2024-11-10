'use client'

import { DeleteToApi } from "@/helpers/sendToApi"
import { useAppDispatch } from "@/hooks"
import { selectToken, updateToken } from "@/store/authSlice"
import { useRouter } from "next/navigation"
import { RemoveToken } from "../helpers/auth"
import ValidateMessageError from "@/exceptions/validateMessage"
import { toast } from "react-toastify"
import useAuth from "@/hooks/useAuth"




export default function AdminDashboard() {


    const{user} = useAuth()

    return(
        <>
            <h2 className="text-2xl text-gray-900 font-bold border-b-2 border-gray-200 pb-5">صفحه داشبورد</h2>

            {/* profile */}
            <div className="flex p-5 w-full">
                <div className="flex p-5 rounded shadow-lg shadow-gray-300 w-full">
                    <h3 className="text-lg text-gray-500 font-medium">نام کاربری : <span className="text-xl font-semibold text-gray-700">{user}</span></h3>
                </div>
            </div>
        </>
    )
}
