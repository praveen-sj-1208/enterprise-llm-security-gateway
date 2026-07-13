function Loader() {

    return (

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 0",
                color: "#cbd5e1"
            }}
        >

            <div
                className="spinner-grow spinner-grow-sm text-primary"
                role="status"
            ></div>

            <div
                className="spinner-grow spinner-grow-sm text-primary"
                role="status"
                style={{
                    animationDelay: "0.2s"
                }}
            ></div>

            <div
                className="spinner-grow spinner-grow-sm text-primary"
                role="status"
                style={{
                    animationDelay: "0.4s"
                }}
            ></div>

            <span
                style={{
                    marginLeft: "8px"
                }}
            >
                Enterprise AI is thinking...
            </span>

        </div>

    );

}

export default Loader;