import InnerLoginForm from '@/components/auth/login/innerLoginForm';
import { loginFormValuesInterface } from '@/contracts/auth';
import ValidationError from '@/exceptions/validationError';
import { StoreLoginToken } from '@/helpers/auth';
import callApi from '@/helpers/callApi';
import { withFormik } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';
import * as yup from 'yup'


interface loginFormProps{
    setToken: (token:string) => void,
    token?:string,
    clearToken: () => void,
    router: AppRouterInstance
}



const validateSchema = yup.object().shape({
    email: yup.string().required().email(),
    password:yup.string().required().min(8).max(8)
})



const LoginForm = withFormik<loginFormProps,loginFormValuesInterface>({
    mapPropsToValues:(props) => {
        return {
            email:'',
            password:'',
            token:props.token || '',
        }
    },
    validationSchema : validateSchema,
    handleSubmit: async (values,{props,setFieldError}) => {
       try {
            let data = await callApi().post('/admin/login',values)

            if(data.status === 200){
                // add token into the redux
                props.setToken(data.data?.token)

                //Creating a cookie and storing the token inside the cookie
                if(StoreLoginToken(data.data?.token)){
                    props.router.push('/admin')

                    // clear token form the redux
                    props.clearToken()
                }

                toast.success('کاربر با موفقیت وارد شد.')
            }
        } catch (error) {
            if(error instanceof ValidationError){
                Object.entries(error.messeges).forEach(([key,value])=> setFieldError(key , value as string))
            }else if(error instanceof Error){
                toast.error(error.message)
            }
        }
    }
})(InnerLoginForm)

export default LoginForm
