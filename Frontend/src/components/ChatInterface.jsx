"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

export const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, input])
      setInput("")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 bg-gray-700">
        <h3 className="text-xl font-semibold text-white">AI Travel Assistant</h3>
      </div>
      <div className="h-64 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <span className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">{msg}</span>
          </motion.div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-700">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
            placeholder="Ask about your trip..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
