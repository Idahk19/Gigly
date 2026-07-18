import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import ProjectModal from "../components/ProjectModal";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

import { auth, db } from "../firebase";

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { toast } from "sonner";
import Swal from "sweetalert2";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchProjects = async () => {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, "projects"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const fetchedProjects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjects(fetchedProjects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (project) => {
    const result = await Swal.fire({
      title: "Delete this project?",
      text: `"${project.projectName}" will be permanently removed. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "projects", project.id));

      toast.success("Project deleted successfully.");

      fetchProjects();
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete project.");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.projectName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      project.clientName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      project.company
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || project.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="p-6 lg:p-8">

          {/* Header */}

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Projects
              </h1>

              <p className="text-slate-500 mt-1">
                Manage all your freelance projects
              </p>

            </div>

            <button
              onClick={() => {
                setEditingProject(null);
                setIsProjectModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
            >
              <Plus size={18} />
              New Project
            </button>

          </div>

          {/* Search & Filter */}

          <div className="mt-8 mb-8 flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by project, client or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>

          </div>

          {filteredProjects.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-12 text-center">

              <h2 className="text-2xl font-semibold text-slate-700">
                No Projects Found
              </h2>

              <p className="text-slate-500 mt-2">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="grid lg:grid-cols-2 gap-8">

              {filteredProjects.map((project) => (
                              <div
                key={project.id}
                className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {project.projectName}
                    </h2>

                    <p className="text-slate-500 mt-1">
                      {project.category}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold
                      ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : project.status === "Planning"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Project Details */}
                <div className="mt-6 border-t pt-5 space-y-2">
                  <h3 className="font-semibold text-slate-900">
                    Project Details
                  </h3>

                  <p>
                    <strong>Budget:</strong> KES {project.budget}
                  </p>

                  <p>
                    <strong>Start Date:</strong> {project.startDate}
                  </p>

                  <p>
                    <strong>Deadline:</strong> {project.deadline}
                  </p>

                  <p className="text-slate-600">
                    {project.description}
                  </p>
                </div>

                {/* Client */}
                <div className="mt-6 border-t pt-5 space-y-2">
                  <h3 className="font-semibold text-slate-900">
                    Client Information
                  </h3>

                  <p>
                    <strong>Name:</strong> {project.clientName}
                  </p>

                  <p>
                    <strong>Email:</strong> {project.clientEmail}
                  </p>

                  <p>
                    <strong>Phone:</strong> {project.clientPhone}
                  </p>

                  <p>
                    <strong>Company:</strong> {project.company}
                  </p>

                  <p>
                    <strong>Address:</strong> {project.address}
                  </p>
                </div>

                {/* Payment */}
                <div className="mt-6 border-t pt-5 space-y-2">
                  <h3 className="font-semibold text-slate-900">
                    Payment
                  </h3>

                  <p>
                    <strong>Amount:</strong> KES {project.amount}
                  </p>

                  <p>
                    <strong>Method:</strong> {project.paymentMethod}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold
                        ${
                          project.paymentStatus === "Paid"
                            ? "text-green-600"
                            : project.paymentStatus === "Partially Paid"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                    >
                      {project.paymentStatus}
                    </span>
                  </p>

                  <p>
                    <strong>Due Date:</strong> {project.dueDate}
                  </p>

                  <p>
                    <strong>Reference:</strong> {project.reference}
                  </p>

                  {project.notes && (
                    <p>
                      <strong>Notes:</strong> {project.notes}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-white hover:bg-amber-600 transition"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-white hover:bg-red-600 transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => {
            setIsProjectModalOpen(false);
            fetchProjects();
          }}
          project={editingProject}
        />
      </main>
    </div>
  </div>
);
}

export default Projects;