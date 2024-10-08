import { Form, FormikProps } from 'formik';

import Input from "@/components/shared/form/input"
import { loginFormValuesInterface } from '@/contracts/auth';



const InnerLoginForm = (props:FormikProps<loginFormValuesInterface>) => {

    return (
        <>
            <Form action="#" method="POST" className="space-y-6">
                <div>
                    <Input
                        name="email"
                        type="email"
                        label="آدرس ایمیل"
                    />
                </div>

                <div>
                    <Input
                        name="password"
                        type="password"
                        label="رمز عبور"
                    />
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    ورود
                </button>
                </div>
            </Form>
        </>
    )
}

export default InnerLoginForm
