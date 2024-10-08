import { ErrorMessage, Field } from 'formik';

interface Props {
    type?:string,
    name:string,
    label:string,
    inputClassName?:string,
    labelClassName?:string,
    errorClassName?:string,
    children?: any
}

export default function Input({
    type ='text',
    name,
    label,
    inputClassName,
    labelClassName,
    errorClassName,
    children
} : Props) {

    return (
        <>
            <label
                htmlFor="email"
                className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName ?? ''}`}
            >
                {name} :
            </label>
            <div className="mt-2">
                <Field
                    id={name}
                    name={name}
                    type={type}
                    className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${inputClassName ?? ''}`}
                    {...children}
                />
                <ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`} component={'div'} />
            </div>
        </>
    )
}
