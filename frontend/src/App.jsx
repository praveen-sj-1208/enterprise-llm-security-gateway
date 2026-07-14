import "../styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Render Backend URL from Vercel Environment Variable
const API_URL = import.meta.env.VITE_API_URL;

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const login = async () => {

        try {

            const formData = new URLSearchParams();

            formData.append("username", username);
            formData.append("password", password);

            const response = await axios.post(
                `${API_URL}/auth/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            // Save Token
            localStorage.setItem(
                "token",
                response.data.access_token
            );

            // Save Username
            localStorage.setItem(
                "username",
                username
            );

            // Save Role (if backend returns it)
            if (response.data.role) {
                localStorage.setItem(
                    "role",
                    response.data.role
                );
            }

            setMessage("");

            navigate("/chat");

        }

        catch (err) {

            console.error(err);

            if (err.response) {

                setMessage(
                    err.response.data.detail || "Login Failed"
                );

            }

            else {

                setMessage(
                    "Cannot connect to server."
                );

            }

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1 className="login-title">
                    Enterprise LLM
                </h1>

                <p className="login-sub">
                    Security Gateway
                </p>

                <div className="mb-3">

                    <label className="text-light">
                        Username
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <label className="text-light">
                        Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <div className="show-password">

                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() =>
                            setShowPassword(!showPassword)
                        }
                    />

                    <span className="ms-2">
                        Show Password
                    </span>

                </div>

                <button
                    className="login-btn mt-4"
                    onClick={login}
                >
                    Login
                </button>

                {
                    message && (

                        <p
                            style={{
                                color: "red",
                                marginTop: "15px"
                            }}
                        >
                            {message}
                        </p>

                    )
                }

            </div>

        </div>

    );

}

export default Login;