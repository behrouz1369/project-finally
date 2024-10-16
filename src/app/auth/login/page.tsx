'use client'
import LoginForm from "@/components/forms/auth/loginForm";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { selectTokenVerify, updateTokenVerify } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const LoginPage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectTokenVerify)





    const setTokenVerify = (token : string) => {
        dispatch(updateTokenVerify(token))
    }
    const clearTokenVerify = () => {
        dispatch(updateTokenVerify(undefined))
    }

    useEffect(()=>{
        if(token === undefined){
            router.push('/auth/login')
        }


        return () => {
            clearTokenVerify()
        }
    },[token])

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           صفحه ورود  به پنل مدیریت
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <LoginForm  setToken={setTokenVerify} token={token} clearToken={clearTokenVerify} router={router} />
        </div>
      </div>
    </>
  );
};

export default LoginPage
