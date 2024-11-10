
import { Form, FormikProps } from "formik"
import Input from "@/components/shared/forms/input"
import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"


const InnerArticleCatForm = (props:FormikProps<ArticleCatFormValuesInterface>) => {

    return (
        <>
           <Form>
                <div className="flex flex-col gap-10 pt-5">
                    <Input
                        label="عنوان دسته بندی مثاله"
                        name="title"
                        placeholder="عنوان دسته بندی مقاله را وارد کنید..."
                    />

                    <div className="flex justify-center border-t-2 border-gray-500 pt-5">
                        <button type="submit" className="text-[16px] text-white font-bold bg-green-600 rounded py-2 px-4 hover:bg-green-700 transition-all"> ثبت داده  </button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default InnerArticleCatForm
