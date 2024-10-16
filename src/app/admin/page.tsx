'use client'

import { Btn } from "@/components/shared/btns"
import { RemoveLoginToken } from "@/helpers/auth"
import { useAppSelector } from "@/hooks"
import useAuth from "@/hooks/useAuth"
import { selectUser } from "@/store/auth"
import Image from "next/image"
import { useRouter } from "next/navigation"


const DashboardAdmin = () => {
    const router = useRouter()

    const {user} = useAuth()

    const logoutHandler = () => {
        RemoveLoginToken()
        router.push('/auth/login')
    }
    return (
        <>
            <div className="flex bg-gray-200 border-2 border-dashed rounded p-10 w-full h-screen">
                <div className="flex flex-col gap-5 rounded bg-white p-5 w-full h-auto">
                    {/* Header Dashboard */}
                    <div className="">
                        <h2 className="text-3xl text-gray-900 font-bold">صفحه اصلی مدیریت :</h2>
                    </div>

                    <div className="border rounded p-5">
                        <div>
                            {/* <Image /> */}
                        </div>

                        <div className="flex flex-col justify-between gap-3 h-[150px]">
                        <h3 className="text-md font-medium text-gray-600">نام کاربر : <span className="text-xl font-semibold text-gray-700">{user}</span></h3>
                            <div className="flex justify-end">
                               <Btn value="Log Out" onClick={logoutHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardAdmin
