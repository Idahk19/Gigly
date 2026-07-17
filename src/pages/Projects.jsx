import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/Topbar";
import ProjectModal from "../components/ProjectModal";
import { Plus, Pencil, Trash2 } from "lucide-react";

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

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // editing
  const [editingProject, setEditingProject] = useState(null);

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

  // Delete Project
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));

      toast.success("Project deleted.");

      fetchProjects();
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete.");
    }
  };

  // Edit Project
  const handleEdit = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };
    return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="p-8">

          <div className="flex justify-between items-center mb-8">

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
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
            >
              <Plus size={18} />
              New Project
            </button>

          </div>

          {projects.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-10 text-center text-slate-500">
              No projects created.
            </div>

          ) : (

            <div className="grid lg:grid-cols-2 gap-8">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="bg-white rounded-3xl shadow-lg p-7 border border-slate-200 hover:shadow-xl transition"
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

                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                      {project.status}
                    </span>

                  </div>

                  {/* Project */}

                  <div className="mt-6 space-y-2">

                    <h3 className="font-semibold text-slate-800">
                      Project Details
                    </h3>

                    <p>
                      <strong>Budget:</strong> KES {project.budget}
                    </p>

                    <p>
                      <strong>Start:</strong> {project.startDate}
                    </p>

                    <p>
                      <strong>Deadline:</strong> {project.deadline}
                    </p>

                    <p className="text-slate-600">
                      {project.description}
                    </p>

                  </div>

                  {/* Client */}

                  <div className="mt-7 border-t pt-5">

                    <h3 className="font-semibold text-slate-800 mb-3">
                      Client Information
                    </h3>

                    <p><strong>Name:</strong> {project.clientName}</p>

                    <p><strong>Email:</strong> {project.clientEmail}</p>

                    <p><strong>Phone:</strong> {project.clientPhone}</p>

                    <p><strong>Company:</strong> {project.company}</p>

                    <p><strong>Address:</strong> {project.address}</p>

                  </div>

                  {/* Payment */}

                  <div className="mt-7 border-t pt-5">

                    <h3 className="font-semibold text-slate-800 mb-3">
                      Payment
                    </h3>

                    <p><strong>Amount:</strong> KES {project.amount}</p>

                    <p><strong>Method:</strong> {project.paymentMethod}</p>

                    <p><strong>Status:</strong> {project.paymentStatus}</p>

                    <p><strong>Due:</strong> {project.dueDate}</p>

                    <p><strong>Reference:</strong> {project.reference}</p>

                    <p><strong>Notes:</strong> {project.notes}</p>

                  </div>

                  {/* Buttons */}

                  <div className="flex gap-3 mt-8">

                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project.id)}
                      className="flex-1 flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
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