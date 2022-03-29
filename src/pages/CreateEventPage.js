import React from "react";
import {Link, Navigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function CreateEventPage() {
    const user = useAuth();
    if(!user){
        return <Navigate to="/account/login" replace={true} />
    }
    return (
        <div>
            <h1>이벤트 등록 페이지</h1>
            <Link to="/">뒤로가기</Link>
        </div>
    )
}