import { NavLink } from "react-router-dom";

function Sidebar() {

    const menuStyle = ({ isActive }) => ({
        display: "block",
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "500",
        transition: "0.3s",
        background: isActive ? "#2563EB" : "#111827",
        color: "white",
        border: "1px solid #374151"
    });

    return (

        <div
            style={{
                width: "230px",
                background: "#111827",
                color: "white",
                minHeight: "calc(100vh - 60px)",
                padding: "20px",
                borderRight: "1px solid #374151"
            }}
        >

            <h4 style={{ color: "white" }}>
                Navigation
            </h4>

            <br />

            <NavLink
                to="/dashboard"
                style={menuStyle}
            >
                📊 Dashboard
            </NavLink>

            <NavLink
                to="/chat"
                style={menuStyle}
            >
                🤖 AI Chat
            </NavLink>

            <NavLink
                to="/history"
                style={menuStyle}
            >
                📜 Chat History
            </NavLink>

            <NavLink
                to="/audit"
                style={menuStyle}
            >
                📊 Audit Logs
            </NavLink>

            <NavLink
                to="/settings"
                style={menuStyle}
            >
                ⚙️ Settings
            </NavLink>

        </div>

    );

}

export default Sidebar;