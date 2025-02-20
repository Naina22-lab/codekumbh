"use client";

import { useState, useEffect } from "react";
import { Send, Mic, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with safety settings
const genAI = new GoogleGenerativeAI("AIzaSyCU4Ks3wdEqpHlbBs8y7fifUZz5L6FtY1c");

const CHAT_HISTORY_KEY = 'travel_chat_history';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load chat history on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  // Enhanced travel context check
  const getTravelContext = (query) => {
    const contexts = {
      destination: ["country", "city", "place", "destination", "location", "where"],
      accommodation: ["hotel", "resort", "hostel", "airbnb", "stay", "room"],
      transportation: ["flight", "plane", "train", "bus", "transport", "car"],
      activities: ["sightseeing", "tour", "visit", "explore", "adventure", "experience"],
      planning: ["itinerary", "plan", "schedule", "booking", "reservation", "when"],
      general: ["travel", "trip", "vacation", "holiday", "tourist", "guide"]
    };

    const matchedContexts = Object.entries(contexts)
      .filter(([_, keywords]) => 
        keywords.some(keyword => query.toLowerCase().includes(keyword))
      )
      .map(([context]) => context);

    return matchedContexts.length > 0 ? matchedContexts : null;
  };

  const generatePrompt = (userInput, contexts) => {
    if (!contexts) {
      return {
        isTravel: false,
        prompt: null
      };
    }

    const contextualPrompts = {
      destination: "Focus on providing detailed information about the location, including cultural aspects, best times to visit, and key attractions.",
      accommodation: "Provide specific advice about accommodation options, considering factors like location, budget, and amenities.",
      transportation: "Offer detailed transportation advice, including options, costs, and practical tips.",
      activities: "Suggest specific activities and experiences, including practical details and insider tips.",
      planning: "Help with trip planning, including timeline suggestions and logistical considerations.",
      general: "Provide comprehensive travel advice and recommendations."
    };

    const relevantPrompts = contexts.map(context => contextualPrompts[context] || "");
    
    return {
      isTravel: true,
      prompt: `As a travel assistant, please help with: ${userInput}
              
              Focus areas: ${relevantPrompts.join(' ')}
              
              Please provide specific, practical, and actionable advice. Include relevant details about safety, costs, and timing where appropriate.`
    };
  };

  // const getGeminiResponse = async (userInput) => {
  //   try {
  //     const model = genAI.getGenerativeModel({ 
  //       model: "gemini-pro",
  //       safetySettings: [
  //         {
  //           category: "HARM_CATEGORY_HARASSMENT",
  //           threshold: "BLOCK_MEDIUM_AND_ABOVE",
  //         },
  //         {
  //           category: "HARM_CATEGORY_HATE_SPEECH",
  //           threshold: "BLOCK_MEDIUM_AND_ABOVE",
  //         },
  //       ],
  //     });

  //     const chat = model.startChat({
  //       history: messages.map(msg => ({
  //         role: msg.isUser ? "user" : "model",
  //         parts: msg.text,
  //       })),
  //     });

  //     const result = await chat.sendMessage(userInput);
  //     const response = await result.response;
  //     return response.text();
  //   } catch (error) {
  //     console.error("Gemini API Error:", error);
  //     throw new Error("Failed to get response from AI. Please try again.");
  //   }
  // };
  const getGeminiResponse = async (userInput) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro"
      });
  
      const result = await model.generateContent(userInput);
      const response = await result.response.text();  // Fix: Correct response extraction
      return response;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to get response from AI. Please try again.");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage = input.trim();
    setInput("");
    setError(null);
    setIsLoading(true);
  
    try {
      // Add user message immediately
      setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
  
      // Send user input directly to the AI
      const response = await getGeminiResponse(userMessage);
  
      // Add AI response
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (err) {
      setError(err.message);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I encountered an error. Please try again.",
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 w-96 bg-gray-800 rounded-xl shadow-lg transition-all duration-300 ${
        isOpen ? "h-[32rem]" : "h-14"
      }`}
    >
      <div
        className="h-14 bg-blue-600 rounded-t-xl flex items-center justify-between px-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-white">ErrozBot</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <>
          <div className="h-[calc(32rem-7rem)] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser 
                      ? "bg-blue-600 text-white" 
                      : msg.isError 
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-700 text-white flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing your request...
                </div>
              </div>
            )}
          </div>
          <div className="h-14 border-t border-gray-700 flex items-center px-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent outline-none text-white"
              placeholder="Ask about your travel plans..."
              disabled={isLoading}
            />
            <button 
              onClick={handleSend} 
              className={`ml-2 ${
                isLoading ? 'text-gray-500' : 'text-blue-400 hover:text-blue-300'
              }`}
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
            <button 
              className="ml-2 text-blue-400 hover:text-blue-300"
              disabled={isLoading}
            >
              <Mic size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};