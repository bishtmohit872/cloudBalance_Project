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
import AwsAccountList from "../components/AwsAccountList";
import AwsCloud from "../awsCloud/AwsCloud";
import CostExplorer from "../costExplorer/CostExplorer";

const routes = createBrowserRouter([

    {
        path:"/login",
        element:<Login/>,
        index:true,
        errorElement:<Error/>
    },
    {
        path:"/onboardlist",
        element:<AwsAccountList/>
    },
    {
        path:"/",
        element:<Protectedroute><App/></Protectedroute>,
        children:[

            { 
                path:"user",
                element:<UserList/>,
                index:true,
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
            },
            {
                path:"onboarding",
                element:<Onboard/>
            },
            {
                path:"aws-cloud",
                element:<AwsCloud/>
            },
            {
                path:"cost-explorer",
                element:<CostExplorer/>
            }

        ],
        errorElement:<Error/>  
    },
    
    
    
])


export default routes