import axiosInstance from "../axiosConfig/axiosconfig"

export const fetchOnboardingAccounts = async()=>{
    const res = await axiosInstance.get("/onboard")
    return res.data
}


export const fetchOnboardingAccountsByUserEmail = async(email)=>{
    const res = await axiosInstance.get(`/onboard/user/${email}`)
    return res.data
}

export const saveOnboardingAccounts = async(iamRoleARN,accountName)=>{
    console.log(iamRoleARN,accountName)
    const res = await axiosInstance.post("/onboard",{
        "accountARN":iamRoleARN,
        "accountName":accountName
    })
    return res.data
}
