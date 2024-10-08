

const StoreLoginToken = async (token : string) => {
    await fetch('/api/login' , {
        method:'post',
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(token)
    })
}

const RemoveLoginToken = async () => {
    await fetch('/api/logout' , {
        method:'post',
        headers:{
            "Content-Type" : "application/json"
        }
    })
}

export {StoreLoginToken , RemoveLoginToken}
