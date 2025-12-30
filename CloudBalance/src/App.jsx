import { Navigate, Outlet } from "react-router-dom"
import Layout from "./dashboard/Layout"
import { useEffect } from "react"
import { getToken } from "./utils/Utils"
import { useNavigate } from "react-router-dom"

function App() {
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(getToken()){
      navigate("/user")
    }
    else{
      navigate("/login")
    }
  },[])

  return <Layout/>

}

export default App
