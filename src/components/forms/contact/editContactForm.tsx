
import { Article } from "@/app/models/article"
import { CategoryArticle } from "@/app/models/category-article"
import InnerArticleCatForm from "@/components/admin/articleCat/InnerArticleCatForm"
import InnerArticleForm from "@/components/admin/articles/InnerArticleForm"
import InnerContactForm from "@/components/admin/contact/InnerContactForm"
import { ArticleFormValuesInterface } from "@/contract/admin/article"

import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"
import { ContactFormValuesInterface } from "@/contract/admin/contact"
import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Patch, Post } from "@/services/apiServices"
import { withFormik } from "formik"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"
import * as yup from 'yup'

const validationsSchema = yup.object().shape({
    // title: yup.string().required().min(3).max(255),
    // slug: yup.string().required().min(3).max(255),
    // category_id: yup.number().required(),
    is_reviewed : yup.boolean().required(),
})

interface editContactFormValueProps{
    router : AppRouterInstance,
    contact:any,
    // articlesCat:CategoryArticle[],
    mutateContact:KeyedMutator<any>
}

const EditContactForm = withFormik<editContactFormValueProps , ContactFormValuesInterface>({
    mapPropsToValues : (props) => {
        return  {
            is_reviewed: false
        }
    },

    validationSchema : validationsSchema,

    handleSubmit: async (values, {props , setFieldError}) =>{
        try {

            // send api to server for edit contact
            let res = await Patch({
                url: `/admin/contact/${props?.contact?.id}/status`,
                values: values
            })

            if(props?.mutateContact){
                props?.mutateContact()
            }



            props.router.push('/admin/contact')

            toast.success('تماس مدنظر با موفقیت بررسی شد.')

        } catch (error) {
          if(error instanceof ValidateMessageError){
                toast.error(error.message)
           }
        }
    }

})(InnerContactForm)


export default EditContactForm
