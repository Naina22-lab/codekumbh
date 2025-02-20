"use client";

import { useState } from "react";
import { Send, Mic } from "lucide-react";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { text: "I'm processing your request. Please wait.", isUser: false }]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 w-80 bg-gray-800 rounded-xl shadow-lg transition-all duration-300 ${
        isOpen ? "h-96" : "h-14"
      }`}
    >
      <div
        className="h-14 bg-blue-600 rounded-t-xl flex items-center justify-between px-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold">AI Travel Assistant</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <>
          <div className="h-72 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-3/4 p-2 rounded-lg ${msg.isUser ? "bg-blue-600" : "bg-gray-700"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="h-14 border-t border-gray-700 flex items-center px-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent outline-none text-white"
              placeholder="Ask anything..."
            />
            <button onClick={handleSend} className="ml-2 text-blue-400 hover:text-blue-300">
              <Send size={20} />
            </button>
            <button className="ml-2 text-blue-400 hover:text-blue-300">
              <Mic size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
