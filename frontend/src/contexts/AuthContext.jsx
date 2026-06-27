import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access") || null
    );

    const login = (data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setAccessToken(data.access);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.clear();

        setAccessToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;