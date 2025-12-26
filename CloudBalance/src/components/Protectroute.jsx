import { Navigate } from "react-router-dom";
import { getToken } from "../utils/Utils";
// import { getLoginStatus, setLoginStatus } from "../utils/Utils";

const Protectedroute = ({children})=>{

    return getToken()?children:<Navigate to="/login"/>

}


export default Protectedroute