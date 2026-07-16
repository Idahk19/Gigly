import React from 'react'
import Sidebar from '../components/SideBar'

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <h1 className="text-3xl font-bold p-8">
          Dashboard
        </h1>
      </div>
    </div>
  )
}

export default Dashboard
