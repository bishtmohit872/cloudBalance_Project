import { Navigate, Outlet, useLocation } from "react-router-dom"
import Layout from "./dashboard/Layout"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSwitchAccount } from "./redux/store"
import { useNavigate } from "react-router-dom"

function App() {

  const location = useLocation()
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const loginUser = useSelector(store=>store.loginUserInfo)

  useEffect(()=>{
    if(loginUser.role==="Customer"){
      navigate("/cost-explorer")
    }
  },[loginUser])
  
  useEffect(()=>{
    if(location.pathname!=="/cost-explorer"){
      dispatch(setSwitchAccount(false))
    }
  },[location])

  return <Layout/>

}

export default App
