import { LoginFormValuesInterface } from "@/contract/auth/login"
import { Form, FormikProps } from "formik"
import Input from "@/components/shared/forms/input"


const InnerLoginForm = (props:FormikProps<LoginFormValuesInterface>) => {

    return (
        <>
           <Form>
                <div className="flex flex-col gap-10">
                    <Input
                        label="ایمیل آدرس"
                        type="email"
                        name="email"
                        placeholder="ایمیل خود را وارد کنید..."
                    />


                    <Input
                        label=" رمز عبور"
                        type="password"
                        name="password"
                        placeholder="رمز عبور خود را وارد کنید..."
                    />

                    <div className="flex justify-center border-t-2 border-gray-500 pt-5">
                        <button type="submit" className="text-[16px] text-white font-bold bg-green-600 rounded py-2 px-4 hover:bg-green-700 transition-all">ورود به پنل مدیریت</button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default InnerLoginForm
