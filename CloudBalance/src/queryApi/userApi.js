import axiosInstance from "../axiosConfig/axiosconfig"

export const fetchUsers = async () => {
  const res = await axiosInstance.get("/user/all");
  return res.data;
};

export const addUser = async (payload) => {
  const res = await axiosInstance.post("/user/addUser", payload);
  return res.data;
};

export const editUser = async (id,payload) =>{
  const res = await axiosInstance.patch(`/user/editUser/${id}`,payload)
  return res.data;
}
