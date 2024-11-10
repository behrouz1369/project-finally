import { ErrorMessage, Field } from "formik";

interface Props{
    label:string,
    type?:string,
    name:string,
    placeholder?:string,
    labelClassName?:string,
    inputClassName?:string,
}

export default function Input({
    label,
    type='text',
    name,
    placeholder,
    labelClassName,
    inputClassName,
} : Props) {

    return(
        <>
            <div className="flex flex-col gap-2">
                <label htmlFor={name} className={`text-sm text-gray-600 font-semibold ${labelClassName ?? ''}`}> {label} :</label>
                <Field
                    name={name}
                    type={type}
                    className={`text-md font-semibold border-2 border-gray-400 p-3 rounded ${inputClassName ?? ''}`}
                    placeholder={placeholder} />
                <ErrorMessage name={name} className={`text-sm text-red-600`} component={'div'}/>
            </div>
        </>
    )
}
