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

    return (
        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;