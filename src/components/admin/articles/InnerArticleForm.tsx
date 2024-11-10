
import { Form, FormikProps } from "formik"
import Input from "@/components/shared/forms/input"
import { ArticleCatFormValuesInterface } from "@/contract/admin/articleCat"
import SelectBox from "@/components/shared/forms/selectBox"
import CheckBox from "@/components/shared/forms/checkBox"
import TextAreaBox from "@/components/shared/forms/textareaBox"
import { Article } from "@/app/models/article"
import { CategoryArticle } from "@/app/models/category-article"

type articleFormValues = FormikProps<ArticleCatFormValuesInterface> & {
    articlesCat : CategoryArticle[],
}

const InnerArticleForm = (props:articleFormValues) => {

    return (
        <>
           <Form>
                <div className="flex flex-col gap-10 pt-5">
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1">
                            <Input
                                label="عنوان مقاله"
                                name="title"
                                placeholder="عنوان مقاله را وارد کنید..."
                            />
                        </div>

                        <div className="flex-1">
                            <Input
                                label="slug"
                                name="slug"
                                placeholder="Enter slug ..."
                            />
                        </div>

                        <div className="flex-1">
                            <Input
                                label="کلمات کلیدی :"
                                name="keywords"
                                placeholder=" کلمات کلیدی مقاله را وارد کنید ..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <SelectBox
                                label="دسته بندی مقالات"
                                name="category_id"
                                options={props?.articlesCat}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Input
                                label="محتوا   :"
                                name="content"
                                placeholder="   محتوا مقاله را وارد کنید ..."
                            />
                        </div>

                        <div className="flex-1">
                            <Input
                                label="آدرس تصویر  :"
                                name="image_url"
                                placeholder="  آدرس تصویر مقاله را وارد کنید ..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <TextAreaBox
                                name="description"
                                label="توضیحات"
                            />
                        </div>

                        <div className="flex-1">
                            <TextAreaBox
                                name="summary"
                                label="خلاصه "
                            />
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <div>
                            <CheckBox
                                name="is_published"
                                label="قابل انتشار"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center border-t-2 border-gray-500 pt-5">
                        <button type="submit" className="text-[16px] text-white font-bold bg-green-600 rounded py-2 px-4 hover:bg-green-700 transition-all"> ثبت مقاله</button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default InnerArticleForm
