

import React, { useState } from "react";

function ChatPreview({
  config,
  messages,
  onSendMessage,
  onClose,
  onDeleteMessage,
}) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const startSpeechRecognition = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript); // Append the transcript to the input box
    };

    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  const stopSpeechRecognition = () => {
    if (isRecording && SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "700px",
        background: config.backgroundColor,
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: config.fontFamily,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        flex: 1,
      }}
    >
      {/* Close Chat Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "bolder",
          cursor: "pointer",
          color: "blue",
        }}
      >
        ✕
      </button>

      {/* Chat Header */}
      <div
        style={{
          backgroundColor: config.headerColor,
          color: config.headerFontColor,
          padding: "12px",
          textAlign: "center",
          fontWeight: "bold",
          borderRadius: "8px",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        {config.botName}
      </div>

      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "hidden", // Prevent horizontal scroll
          padding: "10px 0",
          marginBottom: "15px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "15px",
              alignItems: "flex-start",
              position: "relative",
              justifyContent:
                message.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <img
              src={config.avatarImage || "https://via.placeholder.com/30"}
              alt="Avatar"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div
              style={{
                backgroundColor: "#fff",
                padding: "12px",
                borderRadius: "12px",
                maxWidth: "80%",
                color: config.chatFontColor,
                position: "relative",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                wordWrap: "break-word",
              }}
            >
              {message.text}
              <button
                onClick={() => onDeleteMessage(index)}
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-1px",
                  background: "#FF0000",
                  border: "none",
                  borderRadius: "50%",
                  fontSize: "14px",
                  color: "#fff",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field with Mic */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #ccc",
          paddingTop: "10px",
          position: "relative",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px 40px 10px 10px", // Add padding for mic icon
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "10px",
            fontSize: "14px",
          }}
        />
        <div
          onMouseDown={startSpeechRecognition}
          onMouseUp={stopSpeechRecognition}
          style={{
            position: "absolute",
            right: "70px",
            bottom: "10px",
            cursor: "pointer",
            color: isRecording ? "#FF0000" : "#007BFF", // Red when recording
          }}
        >
          🎙️
        </div>

        {/* Launcher Image */}
        {config.launcherImage && (
          <img
            src={config.launcherImage}
            alt="Launcher"
            style={{
              position: "absolute",
              bottom: "-40px", // Adjust positioning as necessary
              right: "10px",
              width: "70px",
              height: "40px",
              borderRadius: "10%",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          />
        )}

        <button
          onClick={handleSend}
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPreview;
