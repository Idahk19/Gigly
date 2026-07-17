import { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/Topbar";
import TaskModal from "../components/TaskModal";import {
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  AlertCircle,
  TrendingUp,
  Pencil,
  Trash2,
} from "lucide-react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  Timestamp,
   deleteDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

function Tasks() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
const [editedTitle, setEditedTitle] = useState("");
const [editedPriority, setEditedPriority] = useState("Medium");

  const today = new Date().toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });// Creates todays date

  const fetchTasks = async () => {  //running while we wait
    if (!auth.currentUser) return; //if nobody is logged in stop

    try { // go to collection in db, query tasks in colletion
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", auth.currentUser.uid) // condition
      );

      const snapshot = await getDocs(q); //reply from server

      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // every other thing
      })); // go through every doc and make a new array

      setTasks(fetchedTasks); // store in rect state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { // when the page first loads run fetchTasks
    fetchTasks();
  }, []); // [] run only once

  const handleMarkComplete = async (taskId) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), { // updates firestore
        status: "Completed",
        completedAt: Timestamp.now(),
      });

      await fetchTasks(); // new data after update
    } catch (error) {
      console.log(error);
    }
  };
  // deleting tasks
 const handleDeleteTask = async (taskId) => {
  const result = await Swal.fire({
    title: "Delete task?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteDoc(doc(db, "tasks", taskId));

    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId)
    );

    toast.success("Task deleted.");
  } catch (error) {
    toast.error("Failed to delete task.");
  }
};
const handleEdit = (task) => {
  setEditingTaskId(task.id);
  setEditedTitle(task.title);
  setEditedPriority(task.priority);
};
// saving editted tsak
const handleSaveEdit = async (taskId) => {
  try {
    await updateDoc(doc(db, "tasks", taskId), {
      title: editedTitle,
      priority: editedPriority,
    });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: editedTitle,
              priority: editedPriority,
            }
          : task
      )
    );

    setEditingTaskId(null);

    toast.success("Task updated successfully.");
  } catch (error) {
    console.log(error);
    toast.error("Failed to update task.");
  }
};

  const todaysTasks = tasks.filter((task) => {
    if (!task.dueDate) return false; 

    const taskDate = task.dueDate.toDate(); // converts firestore timestamp into js date

    return (
      taskDate.toDateString() === new Date().toDateString() &&
      task.status !== "Completed"  // compare the date with todays date 
    );
  });

  const completedToday = tasks.filter((task) => {
    if (task.status !== "Completed") return false;
    if (!task.completedAt) return false;

    const completed =
      task.completedAt.toDate instanceof Function // checkif completedAt has a toDate function
        ? task.completedAt.toDate()
        : new Date(task.completedAt); // make it a date today

    return completed.toDateString() === new Date().toDateString();
  });  // toDateString removes time

  const totalToday = todaysTasks.length + completedToday.length;
  const progress = totalToday === 0 ? 0 : (completedToday.length / totalToday) * 100;

  const today1 = new Date();
  today1.setHours(0, 0, 0, 0); //change to midnight to avoid errors

  const carryOverTasks = tasks.filter((task) => {
    if (task.status === "Completed") return false;
    if (!task.dueDate) return false; // skip ones that dont have a due date

    const dueDate =
      task.dueDate.toDate instanceof Function
        ? task.dueDate.toDate()
        : new Date(task.dueDate);

    dueDate.setHours(0, 0, 0, 0); // set to midnight
    
    return dueDate < today1; 
  });

  const history = tasks.reduce((groups, task) => {
    if (!task.dueDate) return groups; // skips tasks 

    const date =
      task.dueDate.toDate instanceof Function
        ? task.dueDate.toDate()
        : new Date(task.dueDate);

    const formattedDate = date.toLocaleDateString("en-KE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }); // Friday, 17 July 2026  has that instead of Fri Jul 17 2026

    if (!groups[formattedDate]) {  // if not created
      groups[formattedDate] = []; // create empty array
    }

    groups[formattedDate].push(task); // add task

    return groups;
  }, {});

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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Tasks
              </h1>
              <p className="text-slate-500 mt-1 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-400" />
                {today}
              </p>
            </div>

            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Today</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{totalToday}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <Calendar size={24} className="text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100/50 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Completed</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">{completedToday.length}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-rose-100/50 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Carry Over</p>
                  <p className="text-3xl font-bold text-rose-600 mt-1">{carryOverTasks.length}</p>
                </div>
                <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center">
                  <AlertCircle size={24} className="text-rose-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Progress</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-1">{Math.round(progress)}%</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-indigo-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 mt-6 p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-slate-900">Today's Progress</h2>
              <span className="text-sm font-medium text-indigo-600">
                {completedToday.length} / {totalToday} tasks
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                  minWidth: progress > 0 ? "12px" : "0px",
                }}
              />
            </div>
          </div>

          {/* Today's Tasks */}
          <section className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-900">Today's Tasks</h2>
              <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
                {todaysTasks.length}
              </span>
            </div>

            {todaysTasks.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 p-12 text-center">
                <Circle size={48} className="text-indigo-200 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">All caught up! </p>
                <p className="text-slate-400 text-sm mt-1">No pending tasks for today</p>
              </div>
            ) : (
              <div className="grid gap-4">
               {todaysTasks.map((task) => (
  <div
    key={task.id}
    className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-5 hover:shadow-lg transition"
  >
    {editingTaskId === task.id ? (
      <>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full border rounded-xl p-3 mb-3"
        />

        <select
          value={editedPriority}
          onChange={(e) =>
            setEditedPriority(e.target.value)
          }
          className="w-full border rounded-xl p-3 mb-4"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={() => handleSaveEdit(task.id)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
          >
            Save
          </button>

          <button
            onClick={() => setEditingTaskId(null)}
            className="bg-slate-200 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">
              {task.title}
            </h3>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>

          <p className="text-slate-500 mt-1">
            {task.projectName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleMarkComplete(task.id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition"
            title="Complete"
          >
            <CheckCircle2 size={18} />
          </button>

          <button
            onClick={() => handleEdit(task)}
            className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-xl transition"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => handleDeleteTask(task.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    )}
  </div>
))}
              </div>
            )}
          </section>

          {/* Completed Today */}
          <section className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-900">Completed Today</h2>
              <span className="bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full">
                {completedToday.length}
              </span>
            </div>

            {completedToday.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 p-12 text-center">
                <CheckCircle2 size={48} className="text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500">No tasks completed yet today</p>
                <p className="text-slate-400 text-sm mt-1">Keep going! </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedToday.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl shadow-sm border border-emerald-100/50 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {task.title}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                          {task.projectName || "No Project"}
                        </p>
                      </div>
                      <div className="bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        <span className="text-xs font-medium text-emerald-700">Done</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Carry Over Tasks */}
          <section className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-rose-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-900">Carry Over Tasks</h2>
              <span className="bg-rose-100 text-rose-700 text-sm font-medium px-3 py-1 rounded-full">
                {carryOverTasks.length}
              </span>
            </div>

            {carryOverTasks.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 p-12 text-center">
                <Clock size={48} className="text-indigo-200 mx-auto mb-4" />
                <p className="text-slate-500">No carry over tasks</p>
                <p className="text-slate-400 text-sm mt-1">Great job staying on track! </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {carryOverTasks.map((task) => {
                  const dueDate =
                    task.dueDate.toDate instanceof Function
                      ? task.dueDate.toDate()
                      : new Date(task.dueDate);

                  dueDate.setHours(0, 0, 0, 0);

                  const daysOverdue = Math.floor(
                    (today1 - dueDate) / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div
                      key={task.id}
                      className="bg-white rounded-2xl shadow-sm border-l-4 border-rose-500 p-5 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {task.title}
                          </h3>
                          <p className="text-slate-500 text-sm mt-1">
                            {task.projectName || "No Project"}
                          </p>
                        </div>
                        <div className="bg-rose-50 px-4 py-2 rounded-xl border border-rose-200">
                          <p className="text-rose-700 font-medium text-sm flex items-center gap-1">
                            <AlertCircle size={16} />
                            {daysOverdue === 1
                              ? "1 day overdue"
                              : `${daysOverdue} days overdue`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Task History */}
          <section className="mt-10 pb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-900">Task History</h2>
            </div>

            {Object.keys(history).length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 p-12 text-center">
                <Clock size={48} className="text-indigo-200 mx-auto mb-4" />
                <p className="text-slate-500">No task history yet</p>
                <p className="text-slate-400 text-sm mt-1">Complete tasks to see them here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(history)
                  .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                  .map(([date, tasks]) => (
                    <div
                      key={date}
                      className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                        <h3 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
                          <Calendar size={20} />
                          {date}
                        </h3>
                      </div>

                      <div className="divide-y divide-slate-100">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-slate-50/50 transition-colors"
                          >
                            <div>
                              <h4 className="font-semibold text-slate-900">
                                {task.title}
                              </h4>
                              <p className="text-sm text-slate-500">
                                {task.projectName || "No Project"}
                              </p>
                            </div>

                            <span
                              className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}
                            >
                              {task.status || "Pending"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          fetchTasks();
        }}
      />
    </div>
  );
}

export default Tasks;