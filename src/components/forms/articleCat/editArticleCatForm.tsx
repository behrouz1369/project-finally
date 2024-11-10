
import { CategoryArticle } from "@/app/models/category-article"
import InnerArticleCatForm from "@/components/admin/articleCat/InnerArticleCatForm"

import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"
import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Patch, Post } from "@/services/apiServices"
import { withFormik } from "formik"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "react-toastify"
import * as yup from 'yup'

const validationsSchema = yup.object().shape({
    title: yup.string().required().min(3).max(255),
})

interface editArticleCatFormValueProps{
    router : AppRouterInstance,
    articelCat:CategoryArticle
}

const EditArticleCatForm = withFormik<editArticleCatFormValueProps , ArticleCatFormValuesInterface>({
    mapPropsToValues : (props) => {
        return  {
            title:props?.articelCat?.title
        }
    },

    validationSchema : validationsSchema,

    handleSubmit: async (values, {props , setFieldError}) =>{
        try {
            // send api to server for edit category article
            let res = await Patch({
                url: `/admin/article-category/${props?.articelCat?.id}`,
                values: values
            })

            props.router.push('/admin/categoriesArticles')

            toast.success('شما با موفقیت دسته بندی مقاله را ویرایش کردید.!!!')

        } catch (error) {
           if(error instanceof ValidateErrors){
                Object.entries(error.message).forEach(([key , value]) => setFieldError(key, value as string))
           }else if(error instanceof Error){
                toast.error(error.message)
           }
        }
    }

})(InnerArticleCatForm)


export default EditArticleCatForm
