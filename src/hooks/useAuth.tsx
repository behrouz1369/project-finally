import useSWR from "swr";
import callApi from "@/helpers/callApi";
import Cookies from 'universal-cookie';
import { useAppDispatch } from ".";
import { updateUser } from "@/store/auth";



const useAuth = () => {
    const cookie = new Cookies();
    const dispatch = useAppDispatch()

    const {data , error} = useSWR('user_my' , () => {
        return callApi().get('/admin/current-user',{
            headers : {
                authorization :`Bearer ${cookie.get('shopy_token')}`
            }
        })
    })

    dispatch(updateUser(data?.data?.name))

    return {user : data?.data?.name , error , loading : !data && !error}
    // return{user:'behrouz'}
}

export default useAuth
