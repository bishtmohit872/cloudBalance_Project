import { useState } from "react"
import { IoPersonAddOutline } from "react-icons/io5"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { Link } from "react-router-dom"
import UserForm from "./UserForm"
import { useUsers } from "../../../queryApi/query"

const UserList = ()=>{

    const [formVisiblity, setFormVisiblity] = useState(false)
    const [userData,setUserData] = useState({})
    const [mode,setMode] = useState("")

    const { data, isLoading, error } = useUsers();


    const handleEdit=(user,mode)=>{
        setMode(mode)
        setUserData(user)
        setFormVisiblity(true)
    }

    const handleAdd=(mode)=>{
        setMode(mode)
        setFormVisiblity(true)
    }


    return (
        <div className="h-full w-full py-8 px-20 flex flex-col items-center space-y-2 text-lg relative">
            
            <div className="w-full flex items-end justify-between">
                <p className="text-blue-950 font-extrabold text-2xl">Users List</p>
                <button to="addUser" onClick={()=>handleAdd("add")} className="py-2 px-3 bg-blue-950 text-white rounded-lg flex items-center justify-center hover:bg-blue-900 cursor-pointer">
                    <span className="mr-2"><IoPersonAddOutline/></span>
                    <p>Add User</p>
                </button>
            </div>

            <table className="h-[600px] w-full text-center">
                <thead className="shadow-lg">
                    <tr className="bg-blue-950 text-left text-white">
                        {/* <th className="border border-gray-300 px-2 py-2">Id</th>S */}
                        <th className="border border-gray-300 px-4 py-2">First Name</th>
                        <th className="border border-gray-300 px-4 py-2">Last Name</th>
                        <th className="w-[350px] border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Roles</th>
                        <th className="border border-gray-300 text-center px-2 py-2">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((user,index)=>(
                            <tr key={index} className={`px-0 py-2 text-blue-950 hover:bg-blue-900 hover:text-white ${index%2!=0 ? 'bg-gray-100':""}`}>
                                <td className="px-4 text-left border border-gray-300">{user.firstName}</td>
                                <td className="px-4 text-left border border-gray-300">{user.lastName}</td>
                                <td className="px-4 text-left border border-gray-300">{user.email}</td>
                                <td className="px-4 border border-gray-300">
                                    <p className="w-[100px] bg-blue-950 rounded-full px-2 text-white">{user.role}</p>
                                </td>
                                <td className="h-full flex items-center justify-center border border-gray-300">
                                    <button className="cursor-pointer" onClick={()=>handleEdit(user,"edit")}>
                                        <MdOutlineModeEditOutline />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <UserForm mode={mode} show={formVisiblity} setShow={setFormVisiblity} data={userData}/>
        </div>
    )
}

export default UserList