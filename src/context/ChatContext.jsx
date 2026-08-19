"use client";

import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext({
  isChatbotOpen: false,
  setIsChatbotOpen: () => {},
  toggleChatbot: () => {}
});

export function ChatProvider({ children }) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  return (
    <ChatContext.Provider value={{ isChatbotOpen, setIsChatbotOpen, toggleChatbot }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}

// Backward compatibility alias for components importing useHomeData
export function useHomeData() {
  return useContext(ChatContext);
}
