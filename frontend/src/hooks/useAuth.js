import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { getToken } from "./getToken";

export function useAuth() {
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            navigate("/auth", { replace: true });
        }
    }, [token, navigate]);

    return !!token;
}
