import { Login } from "@mui/icons-material";
import { useAccessToken } from "../../store/token";
import { Component, useEffect } from "react";

interface ContentRequireAccessTokenInterface {
    children: Component | any;
}

export const ContentRequireAccessToken = ({  children, } : ContentRequireAccessTokenInterface) => {

    const { accessToken } = useAccessToken();
    const { setAccessToken, killAccessToken } = useAccessToken(store => store);

    useEffect(() => {
        const token = localStorage.getItem('access_token') || null;
        if(token) {
            setAccessToken(token);
        } else {
            killAccessToken();
        }
    }, []);

    return <>{accessToken ? children : <Login/>}</>;
}