import Cookies from 'universal-cookie';


const cookies = new Cookies()

const StoreLoginToken = (token:string,options={}) => {
    cookies.set('shopy_token', token , {
        path:'/',
        maxAge : 60*60*24,
        sameSite :'lax',
        ...options
    })

    return true
}

const RemoveLoginToken = async () => {
    cookies.remove('shopy_token' , {
        path:'/',
        maxAge : 0,
        sameSite :'lax',
    })
}

export {StoreLoginToken , RemoveLoginToken}
