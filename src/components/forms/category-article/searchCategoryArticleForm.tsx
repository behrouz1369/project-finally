import InnerCategoryArticleForm from '@/components/admin/category-article/innerCategoryArticleForm';
import InnerSearchCategoryArticleForm from '@/components/admin/category-article/innerSearchCategoryArticleForm';
import { categoryArticleValuesInterface } from '@/contracts/category-article';
import MessageError from '@/exceptions/messageError';
import ValidationError from '@/exceptions/validationError';
import { CategoryArticle } from '@/models/categoryArticle';
import {  CreatePost } from '@/services/api';
import { withFormik } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';
import * as yup from 'yup'


interface SearchCategoryArticleFormProps{
    router: AppRouterInstance,
    setTitle:(title:string) => void,

}



const validateSchema = yup.object().shape({
    // title:yup.string().required().min(3).max(255)
})



const SearchCategoryArticleForm = withFormik<SearchCategoryArticleFormProps , categoryArticleValuesInterface>({
    mapPropsToValues:(props) => {
        return {
            title:''
        }
    },
    validationSchema : validateSchema,
    handleSubmit: async (values,{props,setFieldError}) => {


       try {
            let res = props.setTitle(values?.title)



            // props.router.push('/admin/article-category')

            // toast.success('دسته بندی مقاله با موفقیت وارد شد.')
        } catch (error) {
            if(error instanceof ValidationError){
                Object.entries(error.messeges).forEach(([key,value])=> setFieldError(key , value as string))
            }else if(error instanceof MessageError){
                toast.error(error.messege)
            }

            toast.error('مشکلی در ثبت دسته بندی بوجود آمده است.')
        }
    }
})(InnerSearchCategoryArticleForm)

export default SearchCategoryArticleForm
