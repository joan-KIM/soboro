import React from "react";
import {Link, Navigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function FollowersPage() {
    const user = useAuth();
    if(!user){
        return <Navigate to="/account/login" replace={true} />
    }

    return (
        <div>
            <h1>팔로우 목록</h1>
            <Link to="/profile">뒤로가기</Link>
        </div>
    )
}