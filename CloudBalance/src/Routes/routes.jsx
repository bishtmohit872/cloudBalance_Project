import { createBrowserRouter } from "react-router-dom";

import Login from "../auth/Login";
import App from "../App";
import Protectedroute from "../components/Protectroute";
import Dashboard from "../dashboard/Dashboard";
import User from "../dashboard/pages/UserPages/User";
import UserList from "../dashboard/pages/UserPages/UserList";
import UserForm from "../dashboard/pages/UserPages/UserForm";
import Error from "../dashboard/Error";
import Onboard from "../onboarding/Onboard";

const routes = createBrowserRouter([

    {
        path:"/login",
        element:<Login/>,
        index:true,
        errorElement:<Error/>
    },
    {
        path:"/",
        element:<Protectedroute><App/></Protectedroute>,
        children:[

            {
                path:"dashboard",
                element:<Dashboard/>,
            },
            { 
                path:"/user",
                element:<UserList/>,
            },
            {
                path:"onboarding",
                element:<Onboard/>
            },

        ],
        errorElement:<Error/>  
    },
    
    
    
])


export default routes