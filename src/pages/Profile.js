import React from "react";
import EditProfile from './EditProfile';
import Followers from './Followers';
import {Link, Route, Routes} from "react-router-dom";

export default function Profile() {
    return (
        <div>
            <h1>마이페이지</h1>
            <ul>
                <li>
                    <Link to="/profile/edit">마이페이지 수정</Link>
                </li>
                <li>
                    <Link to="/follower/list">팔로우 목록</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/follower/list" element={<Followers />} />
            </Routes>
        </div>
    )
}