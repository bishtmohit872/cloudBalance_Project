import axiosInstance from "../axiosConfig/axiosconfig"

export const fetchCostExplorerMonthWiseData = async(groupBy)=>{
    const res = await axiosInstance.get("/snow/cost/month-wise",{
        params:{
            groupby:groupBy
        }
    })
    return res.data
}

export const fetchCostExplorerSideOption = async(column)=>{
    if(column==null) return null

    const res = await axiosInstance.get("/snow/cost",{
        params:{
            column:column
        }
    })
    return res.data
}

export const fetchCostExplorerByCategory = async(category,value)=>{
    if(category==null || value==null) return null

    const res = await axiosInstance.get("/snow/cost/by-category",{
        params:{
            category:category,
            value:value,
        }
    })
    return res.data
}