import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Sidebar() {
    const { user } = useContext(AuthContext);

    return (
        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh",
            }}
        >
            <h4 className="mb-4">Expense App</h4>

            <ul className="nav flex-column">

                <li className="nav-item">
                    <NavLink
                        className="nav-link text-white"
                        to="/dashboard"
                    >
                        Dashboard
                    </NavLink>
                </li>

                {user?.role === "ADMIN" && (
                    <>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-white"
                                to="/admin/employees"
                            >
                                Employees
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-white"
                                to="/categories"
                            >
                                Categories
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-white"
                                to="/claims"
                            >
                                Claims
                            </NavLink>
                        </li>
                    </>
                )}

                {user?.role === "EMPLOYEE" && (
                    <>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-white"
                                to="/my-claims"
                            >
                                My Claims
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-white"
                                to="/new-claim"
                            >
                                New Claim
                            </NavLink>
                        </li>
                    </>
                )}

            </ul>
        </div>
    );
}