import { useSelector } from "react-redux"
// import { setLoginStatus } from "../utils/Utils"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeSideBarState, removeLoginUser, setSwitchAccount } from "../redux/store"
import { removeToken } from "../utils/Utils"
import { useFetchAwsOnboardAccountsByUserEmail } from "../queryApi/query"

const Navbar = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginUser = useSelector((store)=>store.loginUserInfo)
    const showAccount = useSelector(store=>store.switchAccount)
    const sideBarState = useSelector(store=>store.sideBarState)
    
    const {data,isLoading} = useFetchAwsOnboardAccountsByUserEmail(loginUser?.email)
    // console.log(data)
    
    const handleSideBarState=()=>{
        dispatch(changeSideBarState(!sideBarState))
    }

    const handleLogout=()=>{
        // setLoginStatus(false)
        removeToken()
        dispatch(removeLoginUser())
        navigate("/login")
    }

    const handleSelectAccount=(AccountName)=>{
        // console.log(AccountName,data)
        data?.forEach(({id,accountName})=>{
            if(accountName==AccountName){
                dispatch(setSwitchAccount(id))
                return
            }
            else if(AccountName==="Assigned Accounts"){
                dispatch(setSwitchAccount(null))
            }
        })
        // dispatch(setSwitchAccount(accountId))
    }

    
    return(
        <header className="h-max w-screen py-4 px-4 flex items-center justify-between shadow-md bg-color-white relative z-10">
            <div className="h-max w-[550px] flex items-end justify-start">
                <div className="h-max w-[250px] flex items-end justify-between">
                    <Link to="/dashboard"><img className="h-full w-[200px]" src="/assets/cloudbalance.png" /></Link>
                    <img className="size-6 cursor-pointer" src="/assets/menu.png" alt="menu" onClick={handleSideBarState}/>
                </div>
                
                {
                    showAccount!=false&&(
                        <select className="h-10 w-[160px] px-2 ml-9 border border-gray-300 outline-none focus:outline-none text-sm rounded-md" onClick={(e)=>handleSelectAccount(e.target.value)}>
                            <option>Assigned Accounts</option>
                            {
                                data?.map((account,index)=>(
                                    <option key={index} className="text-sm text-blue-950">{account.accountName}</option>
                                )) 
                            }
                        </select>
                    )
                }
            </div>

            <div className="h-max w-[390px]  flex items-center justify-start">
                <div className="h-max w-[280px] flex items-center justify-start border-r-2 border-gray-400">
                    <img className="size-12 shadow-md shadow-gray-400 rounded-full" src="/assets/user.png" alt="user"/>

                    <div className="w-40 text-sm ml-4">
                        <p className="text-[#499FDC] font-bold">Welcome</p>
                        <p className="pr-2 inline capitalize font-semibold text-gray-700 border-r">{loginUser?.firstName+" "+loginUser?.lastName}</p>
                        <span className="ml-2 text-xs text-blue-900 uppercase font-medium">{loginUser?.role}</span>
                    </div>
                </div>

                <div className="flex items-center ml-2 justify-evenly rounded-md">
                    <img className="size-8" src="/assets/logout.png" alt="logout"/>
                    <button className="ml-2 px-4 py-2 outline-none bg-[#499FDC] text-white rounded-md cursor-pointer hover:bg-blue-500" onClick={handleLogout}>Logout</button>
                </div>
            </div>


        </header>
    )
}


export default Navbar