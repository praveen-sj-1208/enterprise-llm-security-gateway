import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function DashboardCharts({ stats }) {

    const pieData = {
        labels: ["Allowed", "Blocked"],
        datasets: [
            {
                data: [
                    stats.allowed_requests,
                    stats.blocked_requests
                ],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]
            }
        ]
    };

    const barData = {
        labels: [
            "Prompt Injection",
            "SQL Injection",
            "Rate Limit"
        ],
        datasets: [
            {
                label: "Blocked Attacks",
                data: [
                    stats.prompt_injection_blocked,
                    stats.sql_injection_blocked,
                    stats.rate_limit_blocked
                ],
                backgroundColor: [
                    "#f59e0b",
                    "#06b6d4",
                    "#6b7280"
                ]
            }
        ]
    };

    return (

        <div className="row mt-4">

            <div className="col-md-6 mb-4">

                <div className="card bg-dark text-white">

                    <div className="card-body">

                        <h5 className="mb-3">
                            Allowed vs Blocked
                        </h5>

                        <Pie data={pieData} />

                    </div>

                </div>

            </div>

            <div className="col-md-6 mb-4">

                <div className="card bg-dark text-white">

                    <div className="card-body">

                        <h5 className="mb-3">
                            Security Events
                        </h5>

                        <Bar data={barData} />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCharts;