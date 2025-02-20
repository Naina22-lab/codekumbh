import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Sidebar } from "./components/Sidebar"
import { Header } from './components/Header'
import { Globe } from './components/Globe'
import { Dashboard } from './components/Dashboard'
import { AIAssistant } from './components/AIAssistant'
import { TripPlanner } from './components/TripPlanner'
import { Deals } from './components/Deals'
import { Gamification } from './components/Gamification'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  const appRouter = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/register', element: <Signup /> },
    { path: '/login', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/tripPlanner', element: <TripPlanner /> },
    { path: '/deals', element: <Deals /> },
    { path: '/gamification', element: <Gamification /> }
  ])

  return <RouterProvider router={appRouter} />
}

export default App