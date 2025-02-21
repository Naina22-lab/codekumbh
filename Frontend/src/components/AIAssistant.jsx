import React, { useState, useEffect } from "react";
import { Send, Mic, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI("AIzaSyDiTHDmORMC6jFGcLjhJ_NKziawQ9RYadc");
const CHAT_HISTORY_KEY = "chat_history";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  const getGeminiResponse = async (userInput) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userInput);
      const response = await result.response.text();
      return response;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Sorry, I couldn't process your request. Please try again later.");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setError(null);
    setIsLoading(true);

    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    try {
      const response = await getGeminiResponse(userMessage);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [...prev, { text: err.message, isUser: false, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const MessageContent = ({ text }) => {
    return (
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <p className="m-0" {...props} />,
            strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
            em: ({ node, ...props }) => <span className="italic" {...props} />
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className={`fixed bottom-4 right-4 w-96 bg-gray-800 rounded-xl shadow-lg transition-all duration-300 ${isOpen ? "h-[32rem]" : "h-14"}`}>
      <div className="h-14 bg-blue-600 rounded-t-xl flex items-center justify-between px-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="font-bold text-white">AI Travel Assistant</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <>
          <div className="h-[calc(32rem-7rem)] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.isUser ? "bg-blue-600 text-white" : msg.isError ? "bg-red-600 text-white" : "bg-gray-700 text-white"}`}>
                  {msg.isUser ? msg.text : <MessageContent text={msg.text} />}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-700 text-white flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                </div>
              </div>
            )}
          </div>
          <div className="h-14 border-t border-gray-700 flex items-center px-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent outline-none text-white"
              placeholder="Ask about your travel plans..."
              disabled={isLoading}
            />
            <button onClick={handleSend} className={`ml-2 ${isLoading ? "text-gray-500" : "text-blue-400 hover:text-blue-300"}`} disabled={isLoading}>
              <Send size={20} />
            </button>
            <button className="ml-2 text-blue-400 hover:text-blue-300" disabled={isLoading}>
              <Mic size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;
