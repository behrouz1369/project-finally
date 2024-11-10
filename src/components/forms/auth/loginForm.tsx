import { StorageToken } from "@/app/helpers/auth"
import InnerLoginForm from "@/components/auth/innerLoginForm"
import { LoginFormValuesInterface } from "@/contract/auth/login"
import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import SendToApi from "@/helpers/sendToApi"
import { withFormik } from "formik"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "react-toastify"
import * as yup from 'yup'

const validationsSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(12)
})

interface LoginFormValueProps{
    router : AppRouterInstance,
    setToken: (token:string) => void,
    clearToken:()=>void
}

const LoginForm = withFormik<LoginFormValueProps , LoginFormValuesInterface>({
    mapPropsToValues : (props) => {
        return  {
            email:'',
            password:''
        }
    },

    validationSchema : validationsSchema,

    handleSubmit: async (values, {props , setFieldError}) =>{
        try {

            // send api to server for login user to panel admin
            let res = await SendToApi({
                url: '/admin/login',
                options:{
                    body:JSON.stringify(values)
                }
            })

            props.setToken(res?.token)

            await StorageToken(res?.token)

            props.router.push('/admin')

            toast.success('شما با موفقیت وارد شدید!!!')

        } catch (error) {
           if(error instanceof ValidateErrors){
                Object.entries(error.message).forEach(([key , value]) => setFieldError(key, value as string))
           }else if(error instanceof Error){
                toast.error(error.message)
           }
        }
    }

})(InnerLoginForm)


export default LoginForm
