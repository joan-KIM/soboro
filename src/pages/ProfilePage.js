import React from "react";
import {Link, Outlet} from "react-router-dom";

export default function ProfilePage() {
    return (
        <div>
            <h1>마이페이지</h1>
            <Link to="/">뒤로가기</Link>
            <ul>
                <li>
                    <Link to="edit">마이페이지 수정</Link>
                </li>
                <li>
                    <Link to="/follower/list">팔로우 목록</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    )
}