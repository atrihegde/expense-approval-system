import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Sidebar() {
    const { user } = useContext(AuthContext);

    return (
        <div
            className="bg-white text-dark"
            style={{
                width: "250px",
                minHeight: "100vh",
            }}
        >
            <h4 className="mb-4">Expense App</h4>

            <ul className="nav flex-column">

                {/* <li className="nav-item">
                    <NavLink
                        className="nav-link text-dark"
                        to="/employee/dashboard"
                    >
                        Dashboard
                    </NavLink>
                </li> */}

                {user?.role === "ADMIN" && (
                    <>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-dark"
                                to="/admin/employees"
                            >
                                Employees
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-dark"
                                to="/admin/categories"
                            >
                                Categories
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-dark"
                                to="/admin/claims"
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
                                className="nav-link text-dark"
                                to="/employee/dashboard"
                            >
                                Dashboard
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-dark"
                                to="/employee/claims"
                            >
                                My Claims
                            </NavLink>
                        </li>
                    </>
                )}

            </ul>
        </div>
    );
}