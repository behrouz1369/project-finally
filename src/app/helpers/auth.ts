import Cookies from "universal-cookie"

const cookies = new Cookies()

const StorageToken = (token:string,options={}) => {


    cookies.set('shopy_token_finally', token , {
        path: '/',
        maxAge : 60*60*24,
        sameSite :'lax',
        ...options
    })

    return true
}

const RemoveToken = () => {


    cookies.remove('shopy_token_finally' , {
        path: '/',
        maxAge : 0,
        sameSite :'lax',
    })
}

export {StorageToken , RemoveToken}
