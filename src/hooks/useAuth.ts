import useSWR from "swr"
import Cookies from "universal-cookie"

interface Props{
    url:string
}
const cookies = new Cookies();

export const Fetcher = async () => {

    const res = await fetch(`https://react-camp-api.roocket.ir/api/admin/current-user`,{
        method:'get',
        headers:{
            "Authorization": `Bearer ${cookies.get('shopy_token_finally')}`
        }
    })

    let data = await res.json()

    return data
}

export default function useAuth () {
    const {data , error , mutate} = useSWR('user_me' , Fetcher)

    return{user:data?.name , error , loading : !data && !error , mutate}
}
