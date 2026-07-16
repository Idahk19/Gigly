import React from 'react'
import Sidebar from '../components/SideBar'
import TopBar from '../components/Topbar'

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
        <div className="flex-1 flex flex-col">
        <TopBar />
    </div>
    </div>
  )
}

export default Dashboard
