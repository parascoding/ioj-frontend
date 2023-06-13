import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import { isLoggedIn } from "../../services/auth/util";
import UserNavbar from "./UserNavbar";

const UserPrivateRoute = () => {
    if(isLoggedIn()){

        return(
            <>
            <UserNavbar />
            <Outlet />
            </>
        )
    } else{
        return (
            <Navigate to={"/"} />
        )
    }
}
export default UserPrivateRoute;