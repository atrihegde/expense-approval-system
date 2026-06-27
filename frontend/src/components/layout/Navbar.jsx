import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-light bg-light shadow-sm px-4">
            <span className="navbar-brand mb-0 h5">
                Expense Approval System
            </span>

            <div>
                <span className="me-3">
                    Welcome, {user?.first_name}
                </span>

                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                        logout();
                        navigate("/");
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}