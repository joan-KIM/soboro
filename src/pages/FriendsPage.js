import React from "react";
import {Link} from "react-router-dom";

export default function FriendsPage() {
    return (
        <div>
            <h1>팔로우 목록</h1>
            <Link to="/profile">뒤로가기</Link>
        </div>
    )
}