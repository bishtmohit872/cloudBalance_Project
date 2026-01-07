import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SideMenuBar from "./pages/SideMenuBar"

const Layout = () =>{

  
    return(
        <div className="h-screen w-screen relative flex flex-col items-center">
            <Navbar/>

            <main className="h-full w-screen flex justify-start relative overflow-hidden">
                <SideMenuBar/>
                <Outlet/>
            </main>
            
            <Footer/>
            
        </div>
    )
}

export default Layout