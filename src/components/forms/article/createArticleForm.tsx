
import { Article } from "@/app/models/article"
import { CategoryArticle } from "@/app/models/category-article"
import InnerArticleCatForm from "@/components/admin/articleCat/InnerArticleCatForm"
import InnerArticleForm from "@/components/admin/articles/InnerArticleForm"
import { ArticleFormValuesInterface } from "@/contract/admin/article"

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
    slug: yup.string().required().min(3).max(255),
    category_id: yup.number().required(),
    is_published : yup.boolean().required(),
})

interface createArticleFormValueProps{
    router : AppRouterInstance,
    articlesCat:CategoryArticle[]
}

const CreateArticleForm = withFormik<createArticleFormValueProps , ArticleFormValuesInterface>({
    mapPropsToValues : (props) => {
        return  {
            title:'',
            slug:'',
            category_id:0,
            is_published:false,
            keywords:'',
            description:'',
            summary:'',
            content:'',
            image_url:''
        }
    },

    validationSchema : validationsSchema,

    handleSubmit: async (values, {props , setFieldError}) =>{
        try {
            console.log(values)
            // send api to server for create article
            let res = await Post({
                url: '/admin/article',
                values: values
            })



            props.router.push('/admin/articles')

            toast.success('شما با موفقیت   مقاله را اضافه کردید.!!!')

        } catch (error) {
           if(error instanceof ValidateErrors){
                Object.entries(error.message).forEach(([key , value]) => setFieldError(key, value as string))
           }else if(error instanceof Error){
                toast.error(error.message)
           }
        }
    }

})(InnerArticleForm)


export default CreateArticleForm
