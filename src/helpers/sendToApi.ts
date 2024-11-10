import ValidateErrors from "@/exceptions/validateErrors"
import ValidateMessageError from "@/exceptions/validateMessage"
import Cookies from "universal-cookie"


interface Props {
    url:string,
    options?:any
}

const $BASE_URL = 'https://react-camp-api.roocket.ir/api'
const cookies = new Cookies()

const SendToApi = async ({url,options} : Props) => {

    try {
        let res = await fetch(`${$BASE_URL}${url}`,{
            method:'post',
            headers:{
                "Content-Type": "application/json",
            },
            ...options
        })

        if(res.status !== 200){
            if(res.status === 422){
                let dataError = await res.json()
                throw new ValidateErrors(dataError.errors);
            }else if(res.status === 401 || res.status === 500){
                let dataError1 = await res.json()
                throw new Error(dataError1.message)
            }
        }

        if(res.ok){
            let data = await res.json()

            return data
        }
    } catch (error) {
        throw error
    }
}

export default SendToApi

export const DeleteToApi = async ({url} : Props) => {

    try {
        let res = await fetch(`${$BASE_URL}${url}`,{
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
                "authorization": `Bearer ${cookies.get('shopy_token_finally')}`
            },
        })

        if(res.status !== 200){
            if(res.status === 401 || res.status === 500){
                let dataError1 = await res.json()
                throw new ValidateMessageError(dataError1?.message)
            }
        }
        if(res.ok){
            let data = await res.json()
            return data
        }
    } catch (error) {
        throw error
    }
}
