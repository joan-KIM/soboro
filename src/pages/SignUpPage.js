import React from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
    return (
        <div>
            <h1>회원가입 페이지</h1>
            <Link to="/account/login">뒤로가기</Link>
        </div>
    )
}