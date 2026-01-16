import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchUsers,addUser, editUser } from "./userApi"
import toast from "react-hot-toast"
import { fetchOnboardingAccounts, fetchOnboardingAccountsByUserEmail, saveOnboardingAccounts } from "./onboardingApi";
import { fetchCostExplorerByAccountId, fetchCostExplorerByCategory, fetchCostExplorerMonthWiseData, fetchCostExplorerSideOption } from "./costExplorerApi";


///////////////////////// user query ///////////////////////////////
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("User Added Successfully")
      queryClient.invalidateQueries(["users"])
    },
    onError:(err)=>{
        if(err?.response?.status===403){
          toast.error("You are not authorized to perform this action !")
        }
        else{
          toast.error(err?.response?.data?.error)
        }
    }
  });
};

export const useEditUser = () =>{
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn:({id,payload})=>editUser(id,payload),
    onSuccess:(data,variables)=>{
      toast.success("User Updated !")
      queryClient.invalidateQueries(["users"])
      const email = variables?.payload?.email
      queryClient.invalidateQueries(["awsAccount",email])
    },
    onError:(err)=>{
      if(err?.response?.status===403){
          toast.error("You are not authorized to perform this action !")
      }
      else{
          toast.error(err?.response?.data?.error)
      }
    }
  })
}

///////////////////////// onboard query ///////////////////////////////

export const useFetchOnboard = () =>{
  return useQuery({
    queryKey:["onboard"],
    queryFn:fetchOnboardingAccounts
  })
}

export const useFetchAwsOnboardAccountsByUserEmail = (email)=>{
  return useQuery({
    queryKey:["awsAccount",email],
    queryFn:()=>fetchOnboardingAccountsByUserEmail(email),
    enabled:!!email,
  })
}

export const useSaveAwsOnboardAccount=()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:({iamRoleARN,accountName})=>{
      console.log(iamRoleARN,accountName)
      return saveOnboardingAccounts(iamRoleARN,accountName)
    },
    onSuccess:()=>{
      toast.success("New AwsAccount Created!")
      queryClient.invalidateQueries(["onboard"])
    },
    onError:(err)=>{
      console.log(err)
      toast.error(err?.response?.data?.error)
    }
  })
}

//////////////////////// costExplorer query ///////////////////////////

export const useFetchCostExplorerMonthWiseData = (groupBy,value,accountId)=>{
  return useQuery({
    queryKey:["monthWise",groupBy,value],
    queryFn:()=>fetchCostExplorerMonthWiseData(groupBy),
    enabled:(!!groupBy && !value) || !accountId
  })
}

export const useFetchCostExplorerColumn=(column)=>{
  return useQuery({
    queryKey:["sideSubOption",column],
    queryFn:()=>fetchCostExplorerSideOption(column),
  })
}

export const useFetchCostExplorerCategory=(category,value)=>{
  return useQuery({
    queryKey:["category-value",category,value],
    queryFn:()=>fetchCostExplorerByCategory(category,value),
    enabled:!!value,
  })
}

export const useFetchByAccountId=(accountId)=>{
  return useQuery({
    queryKey:["accountId",accountId],
    queryFn:()=>fetchCostExplorerByAccountId(accountId),
    enabled: typeof accountId === "number"
  })
}