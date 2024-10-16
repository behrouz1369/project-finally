import InnerCategoryArticleForm from '@/components/admin/category-article/innerCategoryArticleForm';


import { categoryArticleValuesInterface } from '@/contracts/category-article';
import MessageError from '@/exceptions/messageError';
import ValidationError from '@/exceptions/validationError';
import { CategoryArticle } from '@/models/categoryArticle';
import { Patch } from '@/services/api';
import { withFormik } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';

import * as yup from 'yup'


interface EditCategoryArticleFormProps{
    router: AppRouterInstance,
    articleCat?:CategoryArticle,
    mutateCat?:KeyedMutator<any>,
    page?:string | undefined
}



const validateSchema = yup.object().shape({
    title:yup.string().required().min(3).max(255)
})





const EditCategoryArticleForm = withFormik<EditCategoryArticleFormProps , categoryArticleValuesInterface>({
    mapPropsToValues:(props) => {
        return {
            title: props.articleCat?.title ?? "",
        }
    },
    validationSchema : validateSchema,
    handleSubmit: async (values,{props,setFieldError}) => {


       try {
            // Create Article Category
            const data = await Patch({
                url:`/admin/article-category/${props.articleCat?.id}`,
                values:values
            })

            if(props.mutateCat){
                await props.mutateCat()
            }

            props.router.push(`/admin/article-category?page=${props?.page}`)

            toast.success('دسته بندی مقاله با موفقیت ویرایش شد.')
        } catch (error) {
            if(error instanceof ValidationError){
                Object.entries(error.messeges).forEach(([key,value])=> setFieldError(key , value as string))
            }else if(error instanceof MessageError){
                toast.error(error.messege)
            }


            toast.error('مشکلی در ویرایش دسته بندی بوجود آمده است.')
        }
    }
})(InnerCategoryArticleForm)

export default EditCategoryArticleForm
