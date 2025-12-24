import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React from "react";
import { getToken } from "./getToken";

export function useAuth() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();

        if (!token) {
            setError("Authentification requise !");
            setLoading(false);
            navigate("/auth", { replace: true });
            return;
        }

        setSuccess(true);
        setLoading(false);
    }, [navigate]);

    return { loading, error, success };
}
