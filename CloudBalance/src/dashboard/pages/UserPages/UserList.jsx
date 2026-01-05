import { useEffect, useState } from "react"
import { IoPersonAddOutline } from "react-icons/io5"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { Link } from "react-router-dom"
import UserForm from "./UserForm"
import { useUsers } from "../../../queryApi/query"
import { useSelector } from "react-redux"

import { CiFilter } from "react-icons/ci";

import { tableHeader, tableBody } from "./tableConfig/config"
import Loader from "../../../components/Loader"

const UserList = () => {

    const [formVisiblity, setFormVisiblity] = useState(false)
    const [userData, setUserData] = useState({})
    const [mode, setMode] = useState("")
    const [userList,setUserList] = useState()

    let { data,isLoading } = useUsers();
    
    const userId = useSelector(store => store?.loginUserInfo?.id)

    useEffect(()=>{
        if(data){
            setUserList(data)
        }
    },[data])

    const handleEdit = (user, mode) => {
        setMode(mode)
        setUserData(user)
        setFormVisiblity(true)
    }

    const handleAdd = (mode) => {
        setUserData([])
        setMode(mode)
        setFormVisiblity(true)
    }

    const handleSorting=(type)=>{
        if(type==="First Name"){
            const sortData = [...data].sort((a,b)=>a.firstName.localeCompare(b.firstName))
            setUserList(sortData)
        }
        else if(type==="Last Name"){
            const sortData = [...data].sort((a,b)=>a.lastName.localeCompare(b.lastName))
            setUserList(sortData)
        }
        else if(type==="Email"){
            const sortData = [...data].sort((a,b)=>a.email.localeCompare(b.email))
            setUserList(sortData)
        }
    }


    return (
        <div className="h-full w-full py-8 px-20 flex flex-col items-center space-y-2 text-lg relative">
            {
                isLoading?<Loader/>:
                (<>
                    <div className="w-full flex items-end justify-between">
                        <p className="text-blue-950 font-extrabold text-2xl">Users List</p>
                        <button to="addUser" onClick={() => handleAdd("add")} className="py-2 px-3 bg-blue-950 text-white rounded-lg flex items-center justify-center hover:bg-blue-900 cursor-pointer">
                            <span className="mr-2"><IoPersonAddOutline /></span>
                            <p>Add User</p>
                        </button>
                    </div>

                    <table className="h-[600px] w-full text-center">
                        <thead className="shadow-lg">
                            <tr className="bg-[#499FDC] w-max border text-left text-white">
                                {
                                    tableHeader.map((header, index) => (
                                        <th key={index} className="border border-gray-300 px-4 py-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <span>{header.name}</span>
                                                {
                                                    header.filter?(<CiFilter className="cursor-pointer text-lg hover:text-gray-300" onClick={()=>handleSorting(header.name)}/>):""  
                                                }
                                            </div>
                                        </th>
                                    ))
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {
                                userList?.map((user, index) => (userId !== user.id) ? (
                                    <tr key={index} className={`px-0 py-2 text-blue-950 hover:bg-[#225172] hover:text-white ${index % 2 != 0 ? 'bg-gray-100' : ""}`}>
                                        {
                                            tableBody.map((data, index) => (
                                                <td key={index} className="px-4 text-left border border-gray-300">
                                                    {data.key != "role" ? user[data.key] : (
                                                        <p className="w-[100px] text-center bg-[#1088dd] rounded-full px-2 text-white font-bold">{user[data.key]}</p>
                                                    )}
                                                </td>
                                            ))
                                        }
                                        <td className="h-full px-4 flex items-center justify-start border border-gray-300">
                                            <button className="cursor-pointer" onClick={() => handleEdit(user, "edit")}>
                                                <MdOutlineModeEditOutline />
                                            </button>
                                        </td>
                                    </tr>
                                ) : "")
                            }

                        </tbody>
                    </table>
                    <UserForm mode={mode} show={formVisiblity} setShow={setFormVisiblity} data={userData} />
                </>)
            }
        </div>
    )
}

export default UserList