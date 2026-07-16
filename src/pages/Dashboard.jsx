import React, { useState } from 'react'
import Sidebar from '../components/SideBar'
import TopBar from '../components/Topbar'
import { Plus } from "lucide-react";
import ProjectModal from '../components/ProjectModal';

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        <button
  onClick={() => setIsModalOpen(true)}
  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition"
>
  <Plus size={20} />
  New Project
</button>
      </div>
    </main>
    </div>
    
    </div>
<ProjectModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
    </div>
    
  )
}

export default Dashboard
