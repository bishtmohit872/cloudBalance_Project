export const setToken = (token)=>{
    localStorage.setItem('token',token)
}

export const getToken = ()=>{
    const status = localStorage.getItem('token')
    return status
}

export const removeToken=()=>{
    localStorage.removeItem("token")
}
