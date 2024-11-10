
import { Form, FormikProps } from "formik"
import Input from "@/components/shared/forms/input"
import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"
import SelectBox from "@/components/shared/forms/selectBox"
import CheckBox from "@/components/shared/forms/checkBox"
import TextAreaBox from "@/components/shared/forms/textareaBox"
import { Article } from "@/app/models/article"
import { CategoryArticle } from "@/app/models/category-article"
import { ContactFormValuesInterface } from "@/contract/admin/contact"

type contactFormValues = FormikProps<ContactFormValuesInterface> & {
   contact: any
}

const InnerContactForm = (props:contactFormValues) => {

    return (
        <>
           <Form className="w-full">
                <div className="flex flex-col gap-10 pt-5 w-full">
                        <CheckBox
                            label="بررسی"
                            name="is_reviewed"
                            value={props?.contact?.is_reviewed}
                        />

                    <div className="flex justify-center pt-5 border-t-2 border-gray-500 w-full">
                        <button type="submit" className="text-[16px] text-white font-bold bg-green-600 rounded py-2 px-4 hover:bg-green-700 transition-all"> ثبت </button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default InnerContactForm
