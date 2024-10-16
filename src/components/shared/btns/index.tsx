interface Props {
    value:string,
    className?:string
    onClick?:() => void,
    type?:'submit' | 'button'
}

export function  Btn({
    value,
    className,
    onClick,
    type='button'
} :Props){

    return (
        <>
            <button type={type} onClick={onClick} className={`text-sm text-white bg-blue-600 rounded py-2 px-4 hover:bg-blue-700 transition-all ${className ?? ''}`}>{value}</button>
        </>
    )
}
