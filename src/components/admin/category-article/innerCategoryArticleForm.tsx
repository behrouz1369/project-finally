import { Form, FormikProps } from 'formik';

import Input from "@/components/shared/form/input"
import { categoryArticleValuesInterface } from '@/contracts/category-article';
import { CategoryArticle } from '@/models/categoryArticle';

type CategoryArticleType = FormikProps<categoryArticleValuesInterface> | {
    articleCat? : CategoryArticle
}

export default function InnerCategoryArticleForm (props:CategoryArticleType) {

    return (
        <>
            <Form action="#" method="POST" className="space-y-6">
                <div>
                    <Input
                        name="title"
                        type="text"
                        label="عنوان دسته بندی مقاله"
                    />
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {
                        props?.articleCat
                        ? 'ویرایش'
                        : 'ثبت'
                    }
                </button>
                </div>
            </Form>
        </>
    )
}
