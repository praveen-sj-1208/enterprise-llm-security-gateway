import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../styles/dashboard.css";

function AuditLogs() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadLogs = async () => {

        try {

            const res = await api.get("/audit/");

            setLogs(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadLogs();

    }, []);

    return (

        <div className="dashboard">

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="chat-container">

                    <div className="card chat-card">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <h3>📊 Audit Logs</h3>

                                <a
                                    href="http://127.0.0.1:8000/audit/export"
                                    className="btn btn-success"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Export CSV
                                </a>

                            </div>

                            <hr />

                            {
                                loading ?

                                    <p>Loading...</p>

                                    :

                                    <table className="table table-dark table-striped">

                                        <thead>

                                            <tr>

                                                <th>User</th>
                                                <th>Status</th>
                                                <th>Reason</th>
                                                <th>Time</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                logs.map((log) => (

                                                    <tr key={log.id}>

                                                        <td>{log.username}</td>

                                                        <td>{log.status}</td>

                                                        <td>{log.reason}</td>

                                                        <td>{log.created_at}</td>

                                                    </tr>

                                                ))

                                            }

                                        </tbody>

                                    </table>

                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AuditLogs;