import React from "react";
import EditEvent from './EditEvent';
import {Link, Route, Routes} from "react-router-dom";

export default function Event() {
    return (
        <div>
            <h1>이벤트 상세보기 페이지</h1>
            <Link to="/event/edit">이벤트 수정</Link>

            <Routes>
                <Route path="/event/edit" element={<EditEvent />} />
            </Routes>
        </div>
    )
}