import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import { isLoggedIn } from "../../services/auth/util";
import AdminNavbar from "./AdminNavbar";

const AdminPrivateRoute = () => {
    if(isLoggedIn()){

        return(
            <>
            <AdminNavbar />
            <Outlet />
            </>
        )
    } else{
        return (
            <Navigate to={"/"} />
        )
    }
}
export default AdminPrivateRoute;