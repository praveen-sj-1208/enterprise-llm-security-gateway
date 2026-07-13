import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCharts from "../components/DashboardCharts";
import api from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState({
        total_requests: 0,
        allowed_requests: 0,
        blocked_requests: 0,
        prompt_injection_blocked: 0,
        sql_injection_blocked: 0,
        rate_limit_blocked: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const res = await api.get("/dashboard/");
            setStats(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="dashboard">

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="content p-4">

                    <h2 className="mb-4">
                        📊 Dashboard
                    </h2>

                    <div className="row">

                        <div className="col-md-4 mb-3">
                            <div className="card bg-dark text-white shadow">
                                <div className="card-body">
                                    <h5>Total Requests</h5>
                                    <h2>{stats.total_requests}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card bg-success text-white shadow">
                                <div className="card-body">
                                    <h5>Allowed</h5>
                                    <h2>{stats.allowed_requests}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card bg-danger text-white shadow">
                                <div className="card-body">
                                    <h5>Blocked</h5>
                                    <h2>{stats.blocked_requests}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card bg-warning text-dark shadow">
                                <div className="card-body">
                                    <h5>Prompt Injection</h5>
                                    <h2>{stats.prompt_injection_blocked}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card bg-info text-dark shadow">
                                <div className="card-body">
                                    <h5>SQL Injection</h5>
                                    <h2>{stats.sql_injection_blocked}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card bg-secondary text-white shadow">
                                <div className="card-body">
                                    <h5>Rate Limit</h5>
                                    <h2>{stats.rate_limit_blocked}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                    <DashboardCharts stats={stats} />

                </div>

            </div>

        </div>

    );

}

export default Dashboard;