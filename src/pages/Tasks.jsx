import { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/Topbar";
import TaskModal from "../components/TaskModal";
import { Plus } from "lucide-react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Tasks() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const today = new Date().toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (!auth.currentUser) return;

    const fetchTasks = async () => {
      try {
        const q = query(
          collection(db, "tasks"),
          where("userId", "==", auth.currentUser.uid)
        );

        const snapshot = await getDocs(q);

        const fetchedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(fetchedTasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const todaysTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const taskDate = task.dueDate.toDate();

    return (
      taskDate.toDateString() === new Date().toDateString() &&
      task.status !== "Completed"
    );
  });

  const completedToday = tasks.filter((task) => {
    if (task.status !== "Completed") return false;
    if (!task.completedAt) return false;

    return (
      task.completedAt.toDate().toDateString() ===
      new Date().toDateString()
    );
  });

  const carryOverTasks = tasks.filter((task) => {
    if (task.status === "Completed") return false;

    return task.dueDate.toDate() < new Date();
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 p-6">

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Tasks
              </h1>

              <p className="text-slate-500 mt-1">
                {today}
              </p>
            </div>

            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl shadow mt-8 p-6">
            <h2 className="text-xl font-semibold">
              Today's Progress
            </h2>

            <div className="w-full bg-slate-200 rounded-full h-3 mt-4">
              <div className="bg-indigo-600 h-3 rounded-full w-0"></div>
            </div>

            <p className="text-slate-500 mt-3">
              {completedToday.length} of {todaysTasks.length + completedToday.length} tasks completed
            </p>
          </div>

          {/* Today's Tasks */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Today's Tasks
            </h2>

            {todaysTasks.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
                No tasks for today.
              </div>
            ) : (
              <div className="space-y-4">
                {todaysTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">
                        {task.title}
                      </h3>

                      <p className="text-slate-500">
                        {task.projectName}
                      </p>

                      <p className="text-sm mt-2">
                        Priority:
                        <span className="font-medium">
                          {" "}{task.priority}
                        </span>
                      </p>
                    </div>

                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                      Mark Complete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Completed Today */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Completed Today
            </h2>

            {completedToday.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
                No completed tasks today.
              </div>
            ) : (
              <div className="space-y-4">
                {completedToday.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-xl shadow p-5"
                  >
                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="text-slate-500">
                      {task.projectName}
                    </p>

                    <p className="text-green-600 font-medium mt-2">
                      Completed
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Carry Over Tasks */}
          <section className="mt-10 mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Carry Over Tasks
            </h2>

            {carryOverTasks.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
                No carry over tasks 🎉
              </div>
            ) : (
              <div className="space-y-4">
                {carryOverTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500"
                  >
                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="text-slate-500">
                      {task.projectName}
                    </p>

                    <p className="text-red-600 mt-2">
                      Overdue
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
}

export default Tasks;