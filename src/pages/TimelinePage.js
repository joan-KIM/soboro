import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function TimelinePage() {
    const user = useAuth();
    if(!user){
        return <Navigate to="/account/login" replace={true} />
    }
    
    return (
        <div>
            <h1>타임라인 페이지</h1>
            <ul>
                <li>
                    <Link to="/filter">이벤트 검색하기</Link>
                </li>  
                <li>
                    <Link to="/follower/search">팔로우 추가</Link>
                </li>
                <li>
                    <Link to="/profile">마이페이지</Link>
                </li>
                <li>
                    <Link to="/event/create">이벤트 등록하기</Link>
                </li>
                <li>
                    <Link to="/event">이벤트 상세</Link>
                </li>
            </ul>
        </div>
    )
}