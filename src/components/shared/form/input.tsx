import { ErrorMessage, Field } from 'formik';

interface Props {
    type?:string,
    name:string,
    label:string,
    inputClassName?:string,
    labelClassName?:string,
    errorClassName?:string,
    divInputClassName?:string
}

export default function Input({
    type ='text',
    name,
    label,
    inputClassName,
    labelClassName,
    errorClassName,
    divInputClassName,
    ...props
} : Props) {

    return (
        <>
            <label
                htmlFor={name}
                className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName ?? ''}`}
            >
                {label} :
            </label>
            <div className={`mt-2 ${divInputClassName ?? ''}`}>
                <Field
                    id={name}
                    name={name}
                    type={type}
                    className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${inputClassName ?? ''}`}
                    {...props}
                />
                <ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`} component={'div'} />
            </div>
        </>
    )
}
