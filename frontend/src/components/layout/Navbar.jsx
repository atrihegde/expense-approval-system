import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const initials = user?.first_name?.[0]?.toUpperCase() || "?";

    return (
        <nav style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            height: "64px",
            background: "#ffffff",
            borderBottom: "1px solid #E2E8F0",
            position: "sticky",
            top: 0,
            zIndex: 100,
            fontFamily: "'Inter', sans-serif",
        }}>
            <span style={{ fontWeight: 600, fontSize: "15px", color: "#1E293B", letterSpacing: "0.01em" }}>
                Expense Approval System
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "6px 12px", borderRadius: "8px", background: "#F1F5F9",
                }}>
                    <div style={{
                        width: "30px", height: "30px", borderRadius: "50%",
                        background: "#6366F1", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: "13px", flexShrink: 0,
                    }}>
                        {initials}
                    </div>
                    <span style={{ fontSize: "14px", color: "#334155", fontWeight: 500 }}>
                        Welcome, {user?.first_name}
                    </span>
                </div>

                <button
                    onClick={() => { logout(); navigate("/"); }}
                    style={{
                        padding: "7px 16px", borderRadius: "7px",
                        border: "1px solid #E2E8F0", background: "#fff",
                        color: "#64748B", fontSize: "13px", fontWeight: 500,
                        cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "#FEF2F2";
                        e.currentTarget.style.borderColor = "#FECACA";
                        e.currentTarget.style.color = "#DC2626";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.borderColor = "#E2E8F0";
                        e.currentTarget.style.color = "#64748B";
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}