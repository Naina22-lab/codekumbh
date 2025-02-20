import React, { useState } from 'react'
import { Sidebar } from "./components/Sidebar"
import { Header } from './components/Header'
import { Globe } from './components/Globe'
import { Dashboard } from './components/Dashboard'
import { AIAssistant } from './components/AIAssistant'
import { TripPlanner } from './components/TripPlanner'
import { Deals } from './components/Deals'
import { Gamification } from './components/Gamification'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Globe />
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'planner' && <TripPlanner />}
            {activeTab === 'deals' && <Deals />}
            {activeTab === 'gamification' && <Gamification />}
          </div>
        </div>
      </div>
      <AIAssistant />
    </div>
  )
}
