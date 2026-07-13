import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function ChatHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            const res = await api.get("/audit/history");
            setHistory(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="dashboard">

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="chat-container">

                    <div className="card chat-card">

                        <div className="card-body">

                            <h3>📜 Chat History</h3>

                            <hr />

                            {
                                history.map((item) => (

                                    <div
                                        key={item.id}
                                        className="card mb-3"
                                        style={{
                                            background: "#374151",
                                            color: "white"
                                        }}
                                    >

                                        <div className="card-body">

                                            <h6>
                                                🧑 Prompt
                                            </h6>

                                            <p>{item.prompt}</p>

                                            <h6>
                                                🤖 Response
                                            </h6>

                                            <p>{item.response}</p>

                                            <small>
                                                {item.created_at}
                                            </small>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ChatHistory;