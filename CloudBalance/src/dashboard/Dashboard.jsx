import { useEffect } from "react"
import Layout from "./Layout"
import { useNavigate } from "react-router-dom"

const Dashboard = ()=>{
    const navigate = useNavigate()
    
    useEffect(()=>{
        navigate("/user")
    },[])
    return (

        <div className="size-full border-2">
            <p>dashboard render</p>
        </div>
    )
}


export default Dashboard