import { Outlet } from "react-router-dom"
import User from "./User"

const UserLayout = () =>{
    return(
        <div className="size-full flex items-center justify-center">
            <Outlet/>
        </div>
    )
}

export default UserLayout