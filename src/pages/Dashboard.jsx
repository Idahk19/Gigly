import React, { useState, useEffect } from 'react'
import Sidebar from '../components/SideBar'
import TopBar from '../components/Topbar'
import { Plus, FolderKanban,
    Users,
    Wallet,
    Clock3,
    CheckCircle2,
    CircleDollarSign, } from "lucide-react";
import ProjectModal from '../components/ProjectModal';
import StatsCard from "../components/StatsCard";
import { db, auth } from "../firebase";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
  const fetchProjects = async () => {
    try {
      const q = query(
        collection(db, "projects"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const projectList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjects(projectList);
    } catch (error) {
      console.log(error);
    }
  };

  if (auth.currentUser) {
    fetchProjects();
  }
}, []);
const totalProjects = projects.length;

const totalClients = new Set(
  projects.map(project => project.clientEmail)
).size;

const ongoingProjects = projects.filter(
  project => project.status === "In Progress"
).length;

const completedProjects = projects.filter(
  project => project.status === "Completed"
).length;

const totalRevenue = projects
  .filter(project => project.paymentStatus === "Paid")
  .reduce(
    (sum, project) => sum + Number(project.amount || 0),
    0
  );

const unpaidRevenue = projects
  .filter(project => project.paymentStatus !== "Paid")
  .reduce(
    (sum, project) => sum + Number(project.amount || 0),
    0
  );
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

    <StatsCard
        title="Projects"
        value={totalProjects}
        icon={<FolderKanban className="text-white" />}
        color="bg-indigo-600"
    />

    <StatsCard
        title="Clients"
        value={totalClients}
        icon={<Users className="text-white" />}
        color="bg-violet-600"
    />

    <StatsCard
        title="Revenue"
        value={`KES ${totalRevenue.toLocaleString()}`}
        icon={<Wallet className="text-white" />}
        color="bg-emerald-500"
    />

    <StatsCard
        title="Ongoing"
        value={ongoingProjects}
        icon={<Clock3 className="text-white" />}
        color="bg-amber-500"
    />

    <StatsCard
        title="Completed"
        value={completedProjects}
        icon={<CheckCircle2 className="text-white" />}
        color="bg-blue-600"
    />

    <StatsCard
        title="Unpaid"
        value={`KES ${unpaidRevenue.toLocaleString()}`}
        icon={<CircleDollarSign className="text-white" />}
        color="bg-rose-500"
    />

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
