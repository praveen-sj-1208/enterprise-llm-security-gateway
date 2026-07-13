import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBubble from "../components/ChatBubble";
import Loader from "../components/Loader";
import "../styles/dashboard.css";
import api from "../services/api";

function Chat() {

    const username = localStorage.getItem("username");

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            type: "ai",
            message: "👋 Welcome! I'm your Enterprise AI Assistant."
        }
    ]);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    const sendPrompt = async () => {

        if (!prompt.trim() || loading) return;

        const userPrompt = prompt;

        setMessages(prev => [
            ...prev,
            {
                type: "user",
                message: userPrompt
            }
        ]);

        setPrompt("");
        setLoading(true);

        try {

            const res = await api.post("/chat/", {
                username,
                prompt: userPrompt
            });

            const aiReply = res.data.blocked
                ? "❌ " + res.data.reason
                : res.data.response;

            setMessages(prev => [
                ...prev,
                {
                    type: "ai",
                    message: aiReply
                }
            ]);

        } catch {

            setMessages(prev => [
                ...prev,
                {
                    type: "ai",
                    message: "❌ Unable to connect to server."
                }
            ]);

        } finally {

            setLoading(false);

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

                            <h3>🤖 Enterprise AI Assistant</h3>

                            <hr />

                            <div className="chat-window">

                                {messages.map((msg, index) => (

                                    <ChatBubble
                                        key={index}
                                        type={msg.type}
                                        message={msg.message}
                                    />

                                ))}

                                {loading && <Loader />}

                                <div ref={bottomRef}></div>

                            </div>

                            <div className="mt-4">

                                <textarea
                                    className="form-control"
                                    rows={4}
                                    placeholder="Type your prompt..."
                                    value={prompt}
                                    onChange={(e) =>
                                        setPrompt(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            sendPrompt();
                                        }
                                    }}
                                />

                                <button
                                    className="btn btn-primary mt-3"
                                    disabled={loading}
                                    onClick={sendPrompt}
                                >
                                    {loading ? "Sending..." : "Send Prompt"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Chat;