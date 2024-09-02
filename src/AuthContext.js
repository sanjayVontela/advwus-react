import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = createContext();

const AuthContext = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const Id = localStorage.getItem("id");
        setUserId(Id);

        if (!Id) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <AuthProvider.Provider value={{ userId, setUserId }}>
            {children}
        </AuthProvider.Provider>
    );
};

export const AuthState = () => {
    return useContext(AuthProvider);
};

export default AuthContext;
