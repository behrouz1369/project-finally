
import InnerArticleCatForm from "@/components/admin/articleCat/InnerArticleCatForm"

import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"
import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Post } from "@/services/apiServices"
import { withFormik } from "formik"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "react-toastify"
import * as yup from 'yup'

const validationsSchema = yup.object().shape({
    title: yup.string().required().min(3).max(255),
})

interface createArticleCatFormValueProps{
    router : AppRouterInstance,
}

const CreateArticleCatForm = withFormik<createArticleCatFormValueProps , ArticleCatFormValuesInterface>({
    mapPropsToValues : (props) => {
        return  {
            title:''
        }
    },

    validationSchema : validationsSchema,

    handleSubmit: async (values, {props , setFieldError}) =>{
        try {

            // send api to server for create category article
            let res = await Post({
                url: '/admin/article-category',
                values: values
            })

            props.router.push('/admin/categoriesArticles')

            toast.success('شما با موفقیت دسته بندی مقاله را اضافه کردید.!!!')

        } catch (error) {
           if(error instanceof ValidateErrors){
                Object.entries(error.message).forEach(([key , value]) => setFieldError(key, value as string))
           }else if(error instanceof Error){
                toast.error(error.message)
           }
        }
    }

})(InnerArticleCatForm)


export default CreateArticleCatForm
