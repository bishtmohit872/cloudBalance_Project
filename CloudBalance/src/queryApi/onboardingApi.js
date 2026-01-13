import axiosInstance from "../axiosConfig/axiosconfig"

export const fetchOnboardingAccounts = async()=>{
    const res = await axiosInstance.get("/onboard")
    return res.data
}

export const fetchOnboardingAccountsByUserEmail = async(email)=>{
    const res = await axiosInstance.get(`/onboard/user/${email}`)
    return res.data
}
