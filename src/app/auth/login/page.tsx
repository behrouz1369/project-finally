'use client'

import LoginForm from "@/components/forms/auth/loginForm";
import Input from "@/components/shared/forms/input";
import SelectBox from "@/components/shared/forms/selectBox";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectToken, updateToken } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function LoginPage() {
    const router = useRouter()

    const dispatch = useAppDispatch()

    const token = useAppSelector(selectToken)

    const setToken = (token:string) => {
        dispatch(updateToken(token))
    }

    const clearToken = () => {
        dispatch(updateToken(undefined))
    }

    useEffect(()=>{
        if(token !== undefined){
            router.push('/admin')
        }

        return () => {
            clearToken()
        }
    },[token])


    return (
        <>
            <div className="bg-gray-200 flex justify-center items-center w-full h-screen p-5">
                <div className="flex flex-col gap-5 rounded bg-white shadow-lg overflow-hidden w-full md:w-1/2 lg:w-1/4 shadow-gray-300">
                    <div className="flex justify-center w-full bg-blue-600 p-5">
                        <header className="text-xl text-gray-100 font-bold">ورود به پنل مدیریت</header>
                    </div>
                    <div className="p-5 pb-10">
                        {/* Form Login */}
                        <LoginForm router={router} setToken={setToken} clearToken={clearToken} />
                    </div>
                </div>
            </div>
        </>
    )
}
