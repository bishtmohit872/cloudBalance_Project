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
        path:"user"
    },
    {
        id:2,
        name:"Onboarding",
        logo:<LuSquareUser className="size-7"/>,
        path:"/onboarding"
    },
    {
        id:3,
        name:"Aws Service",
        logo:<FaAws className="size-7"/>,
        path:"aws-cloud"
    },
    {
        id:4,
        name:"Cost Explorer",
        logo:<BsFileEarmarkBarGraph className="size-7"/>,
        path:"cost-explorer"
    },
]

export default MenuList
