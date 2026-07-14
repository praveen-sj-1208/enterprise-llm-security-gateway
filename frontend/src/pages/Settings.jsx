import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Settings() {

    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role") || "USER";

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePassword = async () => {

        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match");
            return;
        }

        try {

            const res = await api.post("/auth/change-password", {
                username,
                current_password: currentPassword,
                new_password: newPassword
            });

            alert(res.data.message);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {

            alert(
                err.response?.data?.detail ||
                "Unable to change password"
            );

        }

    };

    return (

        <div className="dashboard">

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="content p-4">

                    <h2 className="mb-4">
                        ⚙️ Settings
                    </h2>

                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <div className="card bg-dark text-white shadow">

                                <div className="card-body">

                                    <h4>👤 User Profile</h4>

                                    <hr />

                                    <p><strong>Username :</strong> {username}</p>

                                    <p><strong>Role :</strong> {role}</p>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="card bg-dark text-white shadow">

                                <div className="card-body">

                                    <h4>🖥 System Status</h4>

                                    <hr />

                                    <p>🟢 Backend : Online</p>

                                    <p>🟢 Database : Connected</p>

                                    <p>🟢 API : Running</p>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="card bg-dark text-white shadow">

                                <div className="card-body">

                                    <h4>🛡 Security</h4>

                                    <hr />

                                    <p>✅ JWT Authentication Enabled</p>

                                    <p>✅ Prompt Injection Detection Enabled</p>

                                    <p>✅ SQL Injection Detection Enabled</p>

                                    <p>✅ Rate Limiting Enabled</p>

                                </div>

                            </div>

                        </div>                        <div className="col-md-6 mb-4">

                            <div className="card bg-dark text-white shadow">

                                <div className="card-body">

                                    <h4>ℹ️ About Project</h4>

                                    <hr />

                                    <p>
                                        Enterprise LLM Security Gateway
                                    </p>

                                    <p>
                                        Version : 1.0.0
                                    </p>

                                    <p>
                                        Built with FastAPI + React
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-12 mb-4">

                            <div className="card bg-dark text-white shadow">

                                <div className="card-body">

                                    <h4>🔑 Change Password</h4>

                                    <hr />

                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                    />

                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />

                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />

                                    <button
                                        className="btn btn-warning"
                                        onClick={changePassword}
                                    >
                                        🔐 Change Password
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Settings;