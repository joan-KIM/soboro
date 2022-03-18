import React from "react";
import {Outlet, Link} from "react-router-dom";

export default function EventPage() {
    return (
        <div>
            <h1>이벤트 상세보기 페이지</h1>
            <Link to="/">뒤로가기</Link> <br />
            <Link to="edit">이벤트 수정하기</Link>

            <Outlet />
        </div>
    )
}