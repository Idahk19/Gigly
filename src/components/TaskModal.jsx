import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "sonner";


function TaskModal({ isOpen, onClose }) {
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    projectId: "",
    projectName: "",
    title: "",
    priority: "Medium",
    dueDate: "",
    status: "Todo",
  });

  useEffect(() => {  // fatch projects
    if (!isOpen || !auth.currentUser) return;

    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          where("userId", "==", auth.currentUser.uid)
        );

        const snapshot = await getDocs(q);
         console.log("Projects");

        setProjects(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target; // object destructuring

    if (name === "projectId") {
      const selectedProject = projects.find(
        (project) => project.id === value
      );

      setFormData((prev) => ({
        ...prev,
        projectId: value,
        projectName: selectedProject?.projectName || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "tasks"), {
        ...formData,
        userId: auth.currentUser.uid,
        dueDate: Timestamp.fromDate(new Date(formData.dueDate)),
        createdAt: Timestamp.now(),
        completedAt: null,
      });

      toast.success("Task added successfully!");

      setFormData({
        projectId: "",
        projectName: "",
        title: "",
        priority: "Medium",
        dueDate: "",
        status: "Todo",
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Task</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Project
            </label>

            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task..."
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Task
          </button>

        </form>
      </div>
    </div>
  );
}

export default TaskModal;