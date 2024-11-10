
import { Article } from "@/app/models/article"
import { CategoryArticle } from "@/app/models/category-article"
import InnerArticleCatForm from "@/components/admin/articleCat/InnerArticleCatForm"
import InnerArticleForm from "@/components/admin/articles/InnerArticleForm"
import InnerContactForm from "@/components/admin/contact/InnerContactForm"
import InnerNameProfileForm from "@/components/admin/profile/InnerNameProfileForm"
import InnerPasswordProfileForm from "@/components/admin/profile/InnerPasswordProfileForm"
import { ArticleFormValuesInterface } from "@/contract/admin/article"

import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"
import { ContactFormValuesInterface } from "@/contract/admin/contact"
import { ProfileNameFormValuesInterface, ProfilePasswordFormValuesInterface } from "@/contract/admin/profile"
import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import { Patch, Post } from "@/services/apiServices"
import { withFormik } from "formik"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"
import * as yup from 'yup'

const validationsSchema = yup.object().shape({
    password : yup.string().required().min(8),
    password_confirmation : yup.string().required().min(8),
})

interface editPasswordProfileFormValueProps{
    router : AppRouterInstance,
    // profileName:any,
    mutateProfile:KeyedMutator<any>
}

const EditPasswordProfileForm = withFormik<editPasswordProfileFormValueProps , ProfilePasswordFormValuesInterface>({

    mapPropsToValues : (props) => {

        return  {
            password:'',
            password_confirmation:''
        }
    },

    validationSchema : validationsSchema,

    handleSubmit: async (values, {props , setFieldError}) =>{
        try {

            // send api to server for password profile edit
            let res = await Patch({
                url: `/admin/profile/update-password`,
                values: values
            })

            if(props?.mutateProfile){
                props?.mutateProfile()
            }

            props.router.push('/admin/profile')

            toast.success('  با موفقیت تغییرات ایجاد شد.')

        } catch (error) {
          if(error instanceof ValidateMessageError){
                toast.error(error.message)
           }
        }
    }

})(InnerPasswordProfileForm)


export default EditPasswordProfileForm
