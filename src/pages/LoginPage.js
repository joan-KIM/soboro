import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
    const user = useAuth();

    if( user ) {
        return <Navigate to="/" replace={true} />
    }
    return (
        <div>
            <h1>로그인 페이지</h1>
        </div>
    )
}