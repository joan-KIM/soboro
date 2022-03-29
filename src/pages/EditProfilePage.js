import React from "react";
import {Link, Navigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function EditProfilePage() {
    const user = useAuth();
    if(!user){
        return <Navigate to="/account/login" replace={true} />
    }

    return (
        <div>
            <h1>마이페이지 수정</h1>
            <Link to="/profile">뒤로가기</Link>
        </div>
    )
}