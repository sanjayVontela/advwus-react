import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthProvider = createContext();

const AuthContext = ({ children }) => {
    const [userId, setUserId] = useState();
    const [notification, setNotification] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const exemptPaths = ["/", "/forgot", "/signup"];

    useEffect(() => {
        const Id = localStorage.getItem("id");
        setUserId(Id);

        // Redirect to login if not authenticated and path is not exempt
        if (!Id && !exemptPaths.includes(location.pathname)) {
            navigate("/login");
        }
    }, [navigate, location.pathname]);

    return (
        <AuthProvider.Provider value={{ userId, setUserId, notification, setNotification }}>
            {children}
        </AuthProvider.Provider>
    );
};

export const AuthState = () => {
    return useContext(AuthProvider);
};

export default AuthContext;
