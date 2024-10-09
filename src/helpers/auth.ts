

const StoreLoginToken = async (options:{}) => {
    await fetch('/api/login' , {
        method:'POST',
        headers:{
            "Content-Type" : "application/json"
        },
        ...options
    })
}

const RemoveLoginToken = async () => {
    await fetch('/api/logout' , {
        method:'POST',
        headers:{
            "Content-Type" : "application/json"
        }
    })
}

export {StoreLoginToken , RemoveLoginToken}
