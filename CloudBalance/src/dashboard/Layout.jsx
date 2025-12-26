import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SideMenuBar from "./pages/SideMenuBar"

const Layout = () =>{

    const [openSidebar, setOpenSideBar] = useState(false)

    return(
        <div className="h-screen w-screen relative flex flex-col items-center">
            <Navbar state={openSidebar} setState={setOpenSideBar}/>

            <main className="h-full w-screen flex justify-between relative overflow-hidden">
                <SideMenuBar state={openSidebar}/>
                <Outlet/>
            </main>
            
            <Footer/>
            
        </div>
    )
}

export default Layout