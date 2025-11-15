"use client"

import { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[120px]">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <MainContent />
      </div>
    </div>
  )
}

export default App
