import React from 'react'
import Sidebar from '../components/SideBar'
import TopBar from '../components/Topbar'
import { Plus } from "lucide-react";

function Dashboard() {
  return (
    
    <div>
        <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
        <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 p-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Projects
          </h2>

          <p className="text-slate-500 mt-1">
            Manage all your freelance projects in one place.
          </p>
        </div>
        <Link to="/projectmodal">
        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-2 py-3 text-white font-semibold hover:bg-indigo-700 transition">
          <Plus size={20} />
          New Project
        </button>
        </Link>
      </div>
    </main>
    </div>
    
    </div>

    </div>
    
  )
}

export default Dashboard
