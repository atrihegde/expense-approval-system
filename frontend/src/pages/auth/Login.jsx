import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import { login as loginAPI } from "../../services/authService";

function Login() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAPI(formData);
            login(response.data);
            if (response.data.user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/employee/dashboard");
            }
        } catch (error) {
            alert("Invalid username or password.");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid #E2E8F0",
        fontSize: "14px",
        color: "#334155",
        outline: "none",
        background: "#F8FAFC",
        boxSizing: "border-box",
        marginBottom: "16px",
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
        }}>
            <div style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                padding: "40px 36px",
                width: "100%",
                maxWidth: "400px",
            }}>

                {/* Logo mark */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                    <div style={{
                        width: "36px", height: "36px", borderRadius: "9px",
                        background: "#6366F1", display: "flex",
                        alignItems: "center", justifyContent: "center",
                    }}>
                        <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                            <rect x="2" y="7" width="20" height="14" rx="2"/>
                            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                        </svg>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "16px", color: "#0F172A" }}>
                        ExpenseApp
                    </span>
                </div>

                {/* Heading */}
                <h2 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "#0F172A" }}>
                    Welcome
                </h2>
                <p style={{ margin: "0 0 28px", fontSize: "14px", color: "#64748B" }}>
                    Sign in to your account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                        Username
                    </label>
                    <input
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#6366F1"}
                        onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                    />

                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        style={{ ...inputStyle, marginBottom: "24px" }}
                        onFocus={e => e.target.style.borderColor = "#6366F1"}
                        onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "11px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#6366F1",
                            color: "#fff",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 1px 3px rgba(99,102,241,0.3)",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#4F46E5"}
                        onMouseLeave={e => e.currentTarget.style.background = "#6366F1"}
                    >
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Login;