import useSWR from "swr";
import callApi from "@/helpers/callApi";
import Cookies from "universal-cookie"




const useAuth = () => {
    const cookie = new Cookies();
    const {data , error} = useSWR('user_me' , () => {
        return callApi().get('/admin/current-user')
    })

    return {user : data?.data?.user , error , loading : !data && !error}
}

export default useAuth
