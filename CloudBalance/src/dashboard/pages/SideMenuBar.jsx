
import { Link, NavLink } from "react-router-dom"
import MenuList from "./MenuList"
import { useSelector } from "react-redux"
import { decryptData } from "../../utils/Utils"

const SideMenuBar =()=>{

    const state = useSelector(store=>store.sideBarState)
    const loginUser = decryptData(useSelector(store=>store.loginUserInfo))
    // const loginUser = useSelector(store=>store.loginUserInfo)

    return(
        <div className={`h-full ${state?'w-[304px]':'w-[90px]'} relative p-4 transition-all duration-400 bg-white shadow-[4px_0_6px_rgba(0,0,0,0.15)]`}>
                
                <div className="h-max py-4">
                    {
                        MenuList.map((menu)=>(
                            <NavLink key={menu.id} to={menu.path} className={({isActive})=>`${isActive ? " bg-[#499FDC] rounded-md text-white shadow-lg":""} 
                            ${menu.allowedRoles.includes(loginUser?.role)?"block":"hidden"} mb-4 p-4 w-full flex items-center justify-start text-blue-950 overflow-hidden hover:bg-blue-400 hover:text-white rounded-lg`}>
                                <span>{menu.logo}</span>
                                <p className={`ml-2 text-lg text-nowrap transition-opacity duration-300 ${state?'block opacity-100%':'opacity-0'}`}>{menu.name}</p>
                            </NavLink>
                        ))
                    }
                </div>
        </div>
    )
}

export default SideMenuBar