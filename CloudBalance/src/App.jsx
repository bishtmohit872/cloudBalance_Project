import { Navigate, Outlet, useLocation } from "react-router-dom"
import Layout from "./dashboard/Layout"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setSwitchAccount } from "./redux/store"


function App() {

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(location.pathname!=="/cost-explorer"){
      dispatch(setSwitchAccount(false))
    }
  },[location])
  return <Layout/>

}

export default App
