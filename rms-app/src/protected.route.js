import React, { Component } from "react";
import { Route, Redirect, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { APP_ROUTES } from "./consts";

export const ProtectedRoute = ({component:Component, ...rest}) => {
    let navigate = useNavigate();
    return(
        <Route {...rest} render={
            (props)=>{
                if(Auth.isAuthenticated()){
                    return <Component {...props}/>
                }
                else{
                    return navigate(APP_ROUTES.HOME.PATH);
                }
            }
        }/>
    )
}