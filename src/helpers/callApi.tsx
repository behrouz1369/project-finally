import axios from "axios";
import ValidationError from "@/exceptions/validationError";


const callApi = () => {
    const axiosInstance = axios.create({
        baseURL : 'https://react-camp-api.roocket.ir/api'
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            config.withCredentials = true
            return config;
        },
        err => {throw err}
    )

    axiosInstance.interceptors.response.use(
        res => {
            // manage validation
            return res;
        },
        err => {
            const res = err?.response
            if(res){

                if(res.status === 422){
                    throw new ValidationError(res.data.errors)
                }else if(res.status === 401){
                    throw new ValidationError(res.data.message)
                }else if(res.status === 500){
                    throw new ValidationError(res.data.message)
                }
            }
            throw err
        }

    )

    return axiosInstance;
}


export default callApi;
