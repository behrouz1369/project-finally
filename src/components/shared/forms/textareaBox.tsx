import { ErrorMessage, Field, FieldProps } from "formik";
import { ChangeEvent, FC } from "react";

interface TextareaBoxProps{
    label:string,
    name:string,
    labelClassName?:string,
    textareaClassName?:string,
    row?:number,
    onChange? : (e : ChangeEvent) => void
}

const TextAreaBox:FC<TextareaBoxProps> = ({
    label,
    name,
    labelClassName,
    textareaClassName,
    row=5,
    onChange
}) => {

    return(
        <>
            <div className="flex flex-col gap-2">
                <label htmlFor={name} className={`text-lg text-gray-600 font-semibold ${labelClassName ?? ''}`}> {label} :</label>
                <Field  name={name} id={name}>
                    {
                        ({field,meta} : FieldProps) => (
                            <>
                               <textarea
                                    {...field}
                                    className={`text-md font-semibold border-2 border-gray-400 p-3 rounded ${textareaClassName ?? ''}`}
                                    rows={row}
                                    onChange={onChange || field.onChange}
                               />
                            </>
                        )
                    }
                </Field>
                <ErrorMessage name={name} className={`text-sm text-red-600`} component={'div'}/>
            </div>
        </>
    )
}

export default TextAreaBox
