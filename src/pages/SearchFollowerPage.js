import React from "react";
import { Link,Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function SearchFollowerPage() {
    const user = useAuth();
    if(!user){
        return <Navigate to="/account/login" replace={true} />
    }
    return (
        <div>
            <h1>팔로우 검색/추가 페이지</h1>
            <Link to="/">뒤로가기</Link>
        </div>
    )
}