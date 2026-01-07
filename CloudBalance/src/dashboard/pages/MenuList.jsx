import { LuUsers } from "react-icons/lu"
import { LuSquareUser } from "react-icons/lu";
import { FaAws } from "react-icons/fa"
import { FaMoneyBillTrendUp } from "react-icons/fa6"
import { BsFileEarmarkBarGraph } from "react-icons/bs";

const MenuList = [
    {
        id:1,
        name:"User Management",
        logo:<LuUsers className="size-7"/>,
        path:"user",
        allowedRoles:["Admin","ReadOnly"]
    },
    
    {
        id:2,
        name:"Onboarding",
        logo:<LuSquareUser className="size-7"/>,
        path:"/onboarding",
        allowedRoles:["Admin"]
    },
    {
        id:3,
        name:"Aws Service",
        logo:<FaAws className="size-7"/>,
        path:"aws-cloud",
        allowedRoles:["Customer"]
    },
    {
        id:4,
        name:"Cost Explorer",
        logo:<BsFileEarmarkBarGraph className="size-7"/>,
        path:"cost-explorer",
        allowedRoles:["Customer"]
    },
]

export default MenuList
