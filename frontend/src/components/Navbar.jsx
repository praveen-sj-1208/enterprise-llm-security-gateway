import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav
            className="navbar navbar-dark"
            style={{
                background: "#111827",
                borderBottom: "1px solid #374151",
                padding: "14px 24px"
            }}
        >

            <div className="container-fluid">

                <div
                    className="navbar-brand fw-bold"
                    style={{
                        fontSize: "24px"
                    }}
                >
                    🛡 Enterprise LLM Security Gateway
                </div>

                <div
                    className="d-flex align-items-center"
                    style={{
                        gap: "15px"
                    }}
                >

                    <div
                        style={{
                            color: "white",
                            background: "#1f2937",
                            padding: "8px 14px",
                            borderRadius: "10px"
                        }}
                    >
                        👤 {username}
                    </div>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;