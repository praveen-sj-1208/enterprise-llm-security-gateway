function ChatBubble({ type, message }) {

    const isUser = type === "user";

    return (
        <div
            className={`message-row ${isUser ? "user-row" : "ai-row"}`}
        >
            <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>

                <div className="message-header">
                    <span className="avatar">
                        {isUser ? "👤" : "🤖"}
                    </span>

                    <strong>
                        {isUser ? "You" : "Enterprise AI"}
                    </strong>
                </div>

                <div className="message-text">
                    {message}
                </div>

            </div>
        </div>
    );

}

export default ChatBubble;