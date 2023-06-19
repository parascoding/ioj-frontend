import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import { isLoggedIn } from "../../services/auth/auth";
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
            <Navigate to={"/login"} />
        )
    }
}
export default AdminPrivateRoute;