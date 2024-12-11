import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { access_token } from "../constant";
import Layout from "../../layouts";

function PrivateRoutes() {
    const navigate = useNavigate();
    const [token, setToken] = useState();

    // useEffect(() => {
    //     const token = localStorage.getItem(access_token);
    //     if (!token) {
    //         navigate("/login");
    //         setToken(token);
    //     }
    // }, [token]);

    return (
        <>
            <Layout />
        </>
    );
}

export default PrivateRoutes;
