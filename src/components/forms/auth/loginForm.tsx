import InnerLoginForm from '@/components/auth/login/innerLoginForm';
import { loginFormValuesInterface } from '@/contracts/auth';
import ValidationError from '@/exceptions/validationError';
import { StoreLoginToken } from '@/helpers/auth';
import callApi from '@/helpers/callApi';
import { withFormik } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
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
            token:props.token || ''
        }
    },
    validationSchema : validateSchema,
    handleSubmit: async (values,{props,setFieldError}) => {
       try {
        let data = await callApi().post('/admin/login',values)
        if(data.status === 200){
            if(props.token){
                await StoreLoginToken(data.data.token)
                await props.router.push('/')
                props.clearToken()
            }
            props.setToken(data.data.token)
        }
       } catch (error) {
        if(error instanceof ValidationError){
            Object.entries(error.messeges).forEach(([key,value])=> setFieldError(key , value as string))
        }
       }
    }
})(InnerLoginForm)

export default LoginForm
