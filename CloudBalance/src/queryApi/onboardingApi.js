import axiosInstance from "../axiosConfig/axiosconfig"

export const fetchOnboardingAccounts = async()=>{
    const res = await axiosInstance.get("/onboard")
    return res.data
}