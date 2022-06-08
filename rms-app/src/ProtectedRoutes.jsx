import { Outlet } from "react-router-dom";
import Auth from "./Auth";
import { Home } from "./pages/Pin/Home";


export const ProtectedRoutes = () =>{
    return Auth.isAuthenticated ? <Outlet/>:<Home/>
} 