import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { Navigate,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux' //access the state of global variable of app with help of redux
import { addLoginUser } from '../redux/store.js'
import { encryptData, getToken,setToken} from '../utils/Utils.js'
import axiosInstance from '../axiosConfig/axiosconfig.js'
// import axios from 'axios'

const Login = () =>{

    const dispatch = useDispatch()

    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigate  = useNavigate()
  
    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        const email = usernameRef.current.value;
        const password = passwordRef.current.value; 

        try{
            const userDetails = await axiosInstance.post("/auth/login",{email,password})
            setToken(userDetails?.data?.Jwt)
            toast.success(`Welcome ${userDetails?.data?.userResponseDTO?.firstName}`)
            // dispatch(addLoginUser(userDetails?.data?.userResponseDTO))
            dispatch(addLoginUser(encryptData(userDetails?.data?.userResponseDTO)))
            navigate("/dashboard")
        }
        catch(error){
            toast.error(error?.response?.data?.error)
        }
    }

    useEffect(()=>{
        if(getToken()){
            navigate("/dashboard")
        }
        else{
            navigate("/login")
        }
    },[])


    return(
        <div className='h-screen w-screen flex items-center justify-center'>
            <form className="h-max w-150 space-y-8 flex flex-col items-center justify-center" onSubmit={handleSubmit} action="">
                
                <div className='h-6 w-[300px] mb-15 flex justify-center'>
                    <img src="/assets/cloudbalance.png" className='h-11 w-50' alt="CloudBalance"/>
                </div>

                <div className='h-max flex flex-col w-full space-y-2'>
                    <label className="font-light text-sm" htmlFor="username">Email</label>
                    <input className="p-2 border border-gray-200 focus:outline-none focus:border-blue-200 rounded-md" id="username" type="email" placeholder='Email' ref={usernameRef} required/>
                </div>

                <div className='h-max flex flex-col w-full space-y-2'>
                    <label className="font-light text-sm" htmlFor="password">Password</label>
                    <input className="p-2 border border-gray-200 focus:outline-none focus:border-blue-200 rounded-md" id="password" type="password" placeholder='Password' ref={passwordRef} required/>
                </div>

                <button className='w-full py-2 bg-[#499FDC] text-white font-medium cursor-pointer rounded-md hover:bg-blue-500'>Submit</button>
            </form>
        </div>
    )
}

export default Login