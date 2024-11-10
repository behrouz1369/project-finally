
import { Article } from "@/app/models/article"
import { CategoryArticle } from "@/app/models/category-article"
import InnerArticleCatForm from "@/components/admin/articleCat/InnerArticleCatForm"
import InnerArticleForm from "@/components/admin/articles/InnerArticleForm"
import { ArticleFormValuesInterface } from "@/contract/admin/article"

import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"
import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Patch, Post } from "@/services/apiServices"
import { withFormik } from "formik"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"
import * as yup from 'yup'

const validationsSchema = yup.object().shape({
    title: yup.string().required().min(3).max(255),
    slug: yup.string().required().min(3).max(255),
    category_id: yup.number().required(),
    is_published : yup.boolean().required(),
})

interface editArticleFormValueProps{
    router : AppRouterInstance,
    article:Article,
    articlesCat:CategoryArticle[],
    mutateArticleEdit:KeyedMutator<any>
}

const EditArticleForm = withFormik<editArticleFormValueProps , ArticleFormValuesInterface>({
    mapPropsToValues : (props) => {
        return  {
            title:props?.article?.title,
            slug:props?.article?.slug,
            category_id:props?.article?.category_id ?? 1,
            is_published:props?.article?.is_published,
            keywords:props?.article?.keywords ?? '',
            description:props?.article?.description ?? '',
            summary:props?.article?.summary ?? '',
            content:props?.article?.content ?? '',
            image_url:props?.article?.image_url ?? ''
        }
    },

    validationSchema : validationsSchema,

    handleSubmit: async (values, {props , setFieldError}) =>{
        try {

            // send api to server for edit article
            let res = await Patch({
                url: `/admin/article/${props?.article?.slug}`,
                values: values
            })

            if(props?.mutateArticleEdit){
                props?.mutateArticleEdit()
            }



            props.router.push('/admin/articles')

            toast.success('شما با موفقیت   مقاله را ویرایش کردید.!!!')

        } catch (error) {
           if(error instanceof ValidateErrors){
                Object.entries(error.message).forEach(([key , value]) => setFieldError(key, value as string))
           }else if(error instanceof Error){
                toast.error(error.message)
           }
        }
    }

})(InnerArticleForm)


export default EditArticleForm
