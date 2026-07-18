import React, { useState, useEffect } from 'react'
import Sidebar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { Plus, FolderKanban,
    Users,
    Wallet,
    Clock3,
    CheckCircle2,
    CircleDollarSign,
    ListChecks, } from "lucide-react";
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
    const [tasks, setTasks] = useState([]);

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

  const fetchTasks = async () => {
    try {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(taskList);
    } catch (error) {
      console.log(error);
    }
  };

  if (auth.currentUser) {
    fetchProjects();
    fetchTasks();
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

const totalTasks = tasks.length;

  const recentProjects = [...projects]
  .sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  )
  .slice(0, 5);
  const upcomingProjects = [...projects]
  .sort(
    (a, b) =>
      new Date(a.deadline) - new Date(b.deadline)
  )
  .slice(0, 4);

  const toDateSafe = (value) => {
    if (!value) return null;
    return value.toDate instanceof Function ? value.toDate() : new Date(value);
  };

  const recentTasks = [...tasks]
    .sort((a, b) => {
      const dateA = toDateSafe(a.createdAt) || toDateSafe(a.dueDate) || new Date(0);
      const dateB = toDateSafe(b.createdAt) || toDateSafe(b.dueDate) || new Date(0);
      return dateB - dateA;
    })
    .slice(0, 3);

  const getPriorityColor = (priority) => {
    const colors = {
      High: "bg-rose-100 text-rose-700 border-rose-200",
      Medium: "bg-amber-100 text-amber-700 border-amber-200",
      Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return colors[priority] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-emerald-100 text-emerald-700",
      "In Progress": "bg-amber-100 text-amber-700",
      Pending: "bg-indigo-100 text-indigo-700",
    };
    return colors[status] || "bg-slate-100 text-slate-700";
  };

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

    <StatsCard
        title="Tasks"
        value={totalTasks}
        icon={<ListChecks className="text-white" />}
        color="bg-cyan-600"
    />

</div>
<section className="mt-10">
<h2 className="text-2xl font-bold text-slate-900 mb-5">
Recent Projects
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{recentProjects.map((project)=>(
<div 
key={project.id}
className="bg-white rounded-xl shadow p-5"
>
<h3 className="text-lg font-bold text-indigo-600">
{project.projectName}
</h3>

<p className="text-md text-slate-500 mt-2">
Status:{project.status}
</p>

<p className="text-lg mt-3">
Client: {project.clientName}
</p>

<p className="text-sm text-slate-500 mt-2">
Created: {project.createdAt?.toDate().toLocaleDateString()}
</p>

</div>
))}
</div>
</section>

{/* Recent Tasks */}
<section className="mt-10">
<h2 className="text-2xl font-bold text-slate-900 mb-5">
Recent Tasks
</h2>

{recentTasks.length === 0 ? (
  <div className="bg-white rounded-xl shadow p-8 text-center text-slate-500">
    No tasks yet.
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {recentTasks.map((task) => (
      <div
        key={task.id}
        className="bg-white rounded-xl shadow p-5"
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-indigo-600">
            {task.title}
          </h3>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority || "No Priority"}
          </span>
        </div>

        <p className="text-md text-slate-500 mt-2">
          Project: {task.projectName || "No Project"}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              task.status
            )}`}
          >
            {task.status || "Pending"}
          </span>

          <p className="text-sm text-slate-500">
            Due: {toDateSafe(task.dueDate)?.toLocaleDateString() || "—"}
          </p>
        </div>
      </div>
    ))}
  </div>
)}
</section>


{/* Upcoming Deadlines */}
<section className="mt-10">
<h2 className="text-2xl font-bold text-slate-900 mb-5">
Upcoming Deadlines
</h2>

<div className="space-y-4">
{upcomingProjects.map((project)=>{

const today = new Date();
const deadline = new Date(project.deadline);

const daysLeft = Math.ceil(
(deadline - today) / 
(1000 * 60 * 60 * 24)
);

let urgency = "bg-green-100 text-green-700";

if(daysLeft <= 3){
urgency = "bg-red-100 text-red-700";
}else if(daysLeft <= 7){
urgency = "bg-yellow-100 text-yellow-700";
}

return (
<div
key={project.id}
className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
>
<div>
<h3 className="font-bold text-slate-900">
{project.projectName}
</h3>

<p className="text-slate-500">
Deadline: {project.deadline}
</p>
</div>

<div className={`px-4 py-2 rounded-lg font-semibold ${urgency}`}>
{daysLeft} days left
</div>

</div>
)

})}
</div>
</section>
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