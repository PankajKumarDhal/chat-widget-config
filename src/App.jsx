import React, { useState } from "react";
import ConfigForm from "./ConfigForm";
import ChatPreview from "./ChatPreview";

function App() {
  const [config, setConfig] = useState({
    configName: "config-1",
    botName: "Pankaj",
    fontFamily: "'Space Grotesk', sans-serif",
    headerColor: "#E63A1E",
    headerFontColor: "#FFFFFF",
    backgroundColor: "#EBE1DB",
    chatFontColor: "#323130",
    avatarImage: "",
    launcherImage: "",
  });

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hi! I'm ${config.botName}, your friendly concierge monster. How can I help?`,
    },
  ]);

  const [showChat, setShowChat] = useState(true);

  const handleConfigChange = (updatedConfig) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...updatedConfig }));
  };

  const handleSendMessage = (message) => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: message },
      ]);
    }
  };

  const handleDeleteMessage = (index) => {
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        padding: "20px",
        justifyContent: "space-between",
        boxSizing: "border-box",
        gap: "20px",
      }}
    >
      {/* Configuration Form */}
      <ConfigForm config={config} onConfigChange={handleConfigChange} />

      {/* Chat Preview */}
      {showChat && (
        <ChatPreview
          config={config}
          messages={messages}
          onSendMessage={handleSendMessage}
          onClose={() => setShowChat(false)}
          onDeleteMessage={handleDeleteMessage}
        />
      )}
    </div>
  );
}

export default App;
