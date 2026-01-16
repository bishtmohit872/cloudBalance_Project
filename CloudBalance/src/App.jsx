import { Navigate, Outlet, useLocation } from "react-router-dom"
import Layout from "./dashboard/Layout"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSwitchAccount } from "./redux/store"
import { useNavigate } from "react-router-dom"
import { decryptData } from "./utils/Utils"

function App() {

  const location = useLocation()
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store=>store.loginUserInfo)
  const loginUser = useMemo(() => {
    return user ? decryptData(user) : null;
  }, [user]);

  useEffect(()=>{
    if(loginUser!==null){
      if(loginUser.role==="Customer"){
        navigate("/cost-explorer")
      }
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
