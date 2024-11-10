import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import { notFound } from "next/navigation"
import Cookies from "universal-cookie"


interface Props {
    url:string,
    values?:any,
    page?:string,
    per_page?:string,
}

const BASE_URL = 'https://react-camp-api.roocket.ir/api'

const cookie = new Cookies()

export const Get = async ({url , page='1' , per_page=''} : Props) => {
    const res = await fetch(`${BASE_URL}${url}?page=${page}&per_page=${per_page}`,{
        headers:{
            "authorization" : `Bearer ${cookie.get('shopy_token_finally')}`
        }
    })

    if(!res.ok){

        if(res.status === 401 || res.status === 500){
            let dataError = res.json()
            if(dataError instanceof ValidateMessageError){
                throw new ValidateMessageError(dataError?.message);
            }
        }
    }

    if(res.ok){
        let data = await res.json()

        return data?.data
    }
}

export const GetSingle = async ({url} : Props) => {
    const res = await fetch(`${BASE_URL}${url}`,{
        headers:{
            "authorization" : `Bearer ${cookie.get('shopy_token_finally')}`
        }
    })

    if(!res.ok){

        if(res.status === 401 || res.status === 500){
            let dataError = res.json()
            if(dataError instanceof ValidateMessageError){
                throw new ValidateMessageError(dataError?.message);
            }
        }else if(res.status === 404){
            throw notFound()
        }
    }

    if(res.ok){
        let data = await res.json()
        return data?.data
    }
}

export const Post = async ({url,values} : Props) => {
    const res = await fetch(`${BASE_URL}${url}`,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "authorization" : `Bearer ${cookie.get('shopy_token_finally')}`
        },
        body: JSON.stringify(values)
    })

    if(!res.ok){
        if(res.status === 422){
            let dataErro1 = res.json()
            if(dataErro1 instanceof ValidateErrors){
                throw new ValidateErrors(dataErro1?.errors)
            }
        } else if(res.status === 401 || res.status === 500){
            let dataError = res.json()
            if(dataError instanceof ValidateMessageError){
                throw new ValidateMessageError(dataError?.message);
            }
        }

    }

    if(res.ok){
        let data = await res.json()
        return data?.data
    }
}

export const Delete = async ({url} : Props) => {
    const res = await fetch(`${BASE_URL}${url}`,{
        method:"delete",
        headers:{
            "Content-Type":"application/json",
            "authorization" : `Bearer ${cookie.get('shopy_token_finally')}`
        },
    })

    if(!res.ok){
         if(res.status === 401 || res.status === 500){
            let dataError = res.json()
            if(dataError instanceof ValidateMessageError){
                throw new ValidateMessageError(dataError?.message);
            }
        }

    }

    if(res.ok){
        let data = await res.json()
        return data?.data
    }
}

export const Patch = async ({url,values} : Props) => {
    const res = await fetch(`${BASE_URL}${url}`,{
        method:"PATCH",
        headers:{
            "Content-Type": "application/json",
            authorization : `Bearer ${cookie.get('shopy_token_finally')}`
        },
        body: JSON.stringify(values)
    })

    if(!res.ok){
        if(res.status === 422){
            let dataErro1 = res.json()
            if(dataErro1 instanceof ValidateErrors){
                throw new ValidateErrors(dataErro1?.errors)
            }
        } else if(res.status === 401 || res.status === 500){
            let dataError = res.json()
            if(dataError instanceof ValidateMessageError){
                throw new ValidateMessageError(dataError?.message);
            }
        }

    }

    if(res.ok){
        let data = await res.json()
        return data
    }
}
