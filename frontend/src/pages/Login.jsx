import "../styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

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
                `${API}/auth/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "username",
                username
            );

            navigate("/chat");

        } catch (err) {

            console.log(err);

            setMessage(
                err.response?.data?.detail || "Login Failed"
            );

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <div className="show-password">

                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
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

                <p
                    style={{
                        color: "red",
                        marginTop: "15px"
                    }}
                >
                    {message}
                </p>

            </div>

        </div>

    );
}

export default Login;