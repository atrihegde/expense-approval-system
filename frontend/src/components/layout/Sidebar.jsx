import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const navLinkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 16px",
    margin: "2px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: isActive ? 600 : 400,
    color: isActive ? "#fff" : "#94A3B8",
    background: isActive ? "#6366F1" : "transparent",
    textDecoration: "none",
    transition: "all 0.15s",
    borderLeft: isActive ? "3px solid #818CF8" : "3px solid transparent",
});

export default function Sidebar() {
    const { user } = useContext(AuthContext);

    return (
        <div style={{
            width: "240px",
            minHeight: "100vh",
            background: "#0F172A",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            fontFamily: "'Inter', sans-serif",
        }}>
            {/* App title — same text as your original */}
            <div style={{
                padding: "24px 20px 20px",
                borderBottom: "1px solid #1E293B",
                marginBottom: "12px",
            }}>
                <h4 style={{ margin: 0, color: "#F1F5F9", fontWeight: 700, fontSize: "16px" }}>
                    Expense App
                </h4>
            </div>

            {/* Section label */}
            <div style={{ padding: "0 20px 8px" }}>
                <span style={{
                    fontSize: "10px", fontWeight: 600,
                    color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                    {user?.role === "ADMIN" ? "Admin Panel" : "My Workspace"}
                </span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>

                {/* {<li className="nav-item">
                    <NavLink className="nav-link text-dark" to="/employee/dashboard">
                        Dashboard
                    </NavLink>
                </li>} */}

                {user?.role === "ADMIN" && (
                    <>
                        <li className="nav-item">
                            <NavLink to="/admin/employees" style={navLinkStyle}>
                                Employees
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/admin/categories" style={navLinkStyle}>
                                Categories
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/admin/claims" style={navLinkStyle}>
                                Claims
                            </NavLink>
                        </li>
                    </>
                )}

                {user?.role === "EMPLOYEE" && (
                    <>
                        <li className="nav-item">
                            <NavLink to="/employee/dashboard" style={navLinkStyle}>
                                Dashboard
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/employee/claims" style={navLinkStyle}>
                                My Claims
                            </NavLink>
                        </li>
                    </>
                )}

            </ul>
        </div>
    );
}