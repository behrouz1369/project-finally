import { categoryArticleValuesInterface } from "@/contracts/category-article";
import MessageError from "@/exceptions/messageError";
import ValidationError from "@/exceptions/validationError";
import callApi from "@/helpers/callApi";
import Cookies from "universal-cookie";

interface Props{
    url?:string,
    values?: categoryArticleValuesInterface,
    page?:string,
    perPage?:string
}

const cookie = new Cookies()
const URL_BASE = 'https://react-camp-api.roocket.ir/api'
export const CreatePost = async ({url,values}:Props) => {
    try {
        const res = await fetch(`${URL_BASE}${url}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization : `Bearer ${cookie.get('shopy_token')}`
            },
            body: JSON.stringify(values),
        })

        switch (res.status) {
            case 422:
                const data1 = await res.json();
                throw new ValidationError(data1?.message);
            case 401 | 500:
                const data = await res.json()
                throw new MessageError(data?.message)
        }

        if(res.ok){
            let data =await res.json()
            return data
        }
    } catch (error) {
        throw error
    }
}

export const Get = async ({url , page , perPage} : Props) => {
    try {
        const res = await fetch(`${URL_BASE}${url}?page=${page}&per_page=${perPage}`,{
            method: "get",
                headers: {
                    authorization : `Bearer ${cookie.get('shopy_token')}`
                },
        })

        switch (res.status) {
            case 422:
                const data1 = await res.json();
                throw new ValidationError(data1?.message);
            case 401 | 500:
                const data = await res.json()
                throw new MessageError(data?.message)
        }

        if(res.ok){
            let data = await res.json()
            return data
        }
    } catch (error) {
        throw error
    }
}

export const GetSingle = async ({url} : Props) => {
    try {
        const res = await fetch(`${URL_BASE}${url}`,{
            method: "get",
                headers: {
                    authorization : `Bearer ${cookie.get('shopy_token')}`
                },
        })

        switch (res.status) {
            case 422:
                const data1 = await res.json();
                throw new ValidationError(data1?.message);
            case 401 | 500:
                const data = await res.json()
                throw new MessageError(data?.message)
        }

        if(res.ok){
            let data = await res.json()
            return data
        }
    } catch (error) {
        throw error
    }
}

export const Delete = async ({url} : Props) => {
    try {
        const res = await fetch(`${URL_BASE}${url}`,{
            method: "delete",
                headers: {
                    authorization : `Bearer ${cookie.get('shopy_token')}`
                },
        })

        switch (res.status) {
            case 422:
                const data1 = await res.json();
                throw new ValidationError(data1?.message);
            case 401 | 500:
                const data = await res.json()
                throw new MessageError(data?.message)
        }

        if(res.ok){
            let data = await res.json()
            return data
        }
    } catch (error) {
        throw error
    }
}

export const Patch = async ({url,values} : Props) => {
    try {
        const res = await fetch(`${URL_BASE}${url}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization : `Bearer ${cookie.get('shopy_token')}`
            },
            body: JSON.stringify(values),
        })

        switch (res.status) {
            case 422:
                const data1 = await res.json();
                throw new ValidationError(data1?.errors);
            case 401 | 500:
                const data = await res.json()
                throw new MessageError(data?.message)
        }

        if(res.ok){
            let data = await res.json()
            return data
        }
    } catch (error) {
        throw error
    }
}
