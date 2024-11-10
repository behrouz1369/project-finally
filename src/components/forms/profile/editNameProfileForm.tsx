
import { Article } from "@/app/models/article"
import { CategoryArticle } from "@/app/models/category-article"
import InnerArticleCatForm from "@/components/admin/articleCat/InnerArticleCatForm"
import InnerArticleForm from "@/components/admin/articles/InnerArticleForm"
import InnerContactForm from "@/components/admin/contact/InnerContactForm"
import InnerNameProfileForm from "@/components/admin/profile/InnerNameProfileForm"
import { ArticleFormValuesInterface } from "@/contract/admin/article"

import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"
import { ContactFormValuesInterface } from "@/contract/admin/contact"
import { ProfileNameFormValuesInterface } from "@/contract/admin/profile"
import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Patch, Post } from "@/services/apiServices"
import { withFormik } from "formik"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"
import * as yup from 'yup'

const validationsSchema = yup.object().shape({
    name : yup.string().required().min(3).max(255),
})

interface editNameProfileFormValueProps{
    router : AppRouterInstance,
    mutateProfile:KeyedMutator<any>
}

const EditNameProfileForm = withFormik<editNameProfileFormValueProps , ProfileNameFormValuesInterface>({

    mapPropsToValues : (props) => {

        return  {
            name:''
        }
    },

    validationSchema : validationsSchema,

    handleSubmit: async (values, {props , setFieldError}) =>{
        try {

            // send api to server for name profile edit
            let res = await Patch({
                url: `/admin/profile/update-info`,
                values: values
            })

            if(props?.mutateProfile){
                props?.mutateProfile()
            }

            props.router.push('/admin/profile')

            toast.success('  با موفقیت ویرایش شد.')

        } catch (error) {
          if(error instanceof ValidateMessageError){
                toast.error(error.message)
           }
        }
    }

})(InnerNameProfileForm)


export default EditNameProfileForm
