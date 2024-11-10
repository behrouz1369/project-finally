import { ErrorMessage, Field, FieldProps } from "formik";
import { ChangeEvent } from "react";

interface Props{
    label:string,
    name:string,
    placeholder?:string,
    labelClassName?:string,
    inputClassName?:string,
    value:boolean,
    onChange?:(e:ChangeEvent)=>void

}

export default function CheckBox({
    label,
    name,
    placeholder,
    labelClassName,
    inputClassName,
    value,
    onChange

} : Props) {

    return(
        <>
            <div className="flex gap-2">
                <label htmlFor={name} className={`text-sm text-gray-600 font-semibold ${labelClassName ?? ''}`}> {label} :

                <Field
                    name={name}
                    id={name}

                    >
                        {
                            ({field , meta} : FieldProps) => (
                                <>
                                    <input
                                        {...field}
                                        type="checkbox"
                                        onChange={onChange || field.onChange}
                                        className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                            inputClassName ?? ""
                                        }`}

                                    />
                                </>

                            )
                        }

                        </Field>
                </label>
                <ErrorMessage name={name} className={`text-sm text-red-600`} component={'div'}/>
            </div>
        </>
    )
}
