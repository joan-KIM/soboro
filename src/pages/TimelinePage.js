import React from "react";
import { Link } from "react-router-dom";

export default function TimelinePage() {
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