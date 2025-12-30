import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchUsers,addUser, editUser } from "./userApi"
import toast from "react-hot-toast"
import { fetchOnboardingAccounts } from "./onboardingApi";

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
        toast.error(err?.response?.data?.error)
    }
  });
};

export const useEditUser = () =>{
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn:({id,payload})=>editUser(id,payload),
    onSuccess:()=>{
      toast.success("User Updated !")
      queryClient.invalidateQueries(["users"])
    },
    onError:(err)=>{
      console.log(err)
      toast.error(err?.response?.data?.error)
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