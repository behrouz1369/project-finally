import { ErrorMessage, Field, FieldProps } from "formik";
import { ChangeEvent, FC } from "react";

interface optionsValue{
    label:string,
    value:string
}

interface SelectBoxProps{
    label:string,
    name:string,
    labelClassName?:string,
    selectClassName?:string,
    options:optionsValue[],
    onChange? : (e : ChangeEvent) => void
}

const SelectBox:FC<SelectBoxProps> = ({
    label,
    name,
    labelClassName,
    selectClassName,
    options,
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
                                <select
                                    {...field}
                                    className={`text-md font-semibold border-2 border-gray-400 p-3 rounded ${selectClassName ?? ''}`}
                                    onChange={onChange || field.onChange}
                                    >
                                    <option value="" label="انتخاب کنید" />
                                    {options?.map((option) => (
                                        <option key={option.value} defaultValue={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )
                    }
                </Field>
                <ErrorMessage name={name} className={`text-sm text-red-600`} component={'div'} />
            </div>
        </>
    )
}

export default SelectBox
