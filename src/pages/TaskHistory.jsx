import { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import {
  Calendar,
  Clock,
  Search,
  SlidersHorizontal,
  CalendarRange,
} from "lucide-react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function TaskHistory() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchTasks = async () => {
    if (!auth.currentUser) return;

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toDateSafe = (value) => {
    if (!value) return null;
    return value.toDate instanceof Function ? value.toDate() : new Date(value);
  };

  // dropdown source data
  const projectOptions = useMemo(() => {
    const names = tasks.map((task) => task.projectName).filter(Boolean);
    return ["All", ...Array.from(new Set(names))];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const from = dateFrom ? new Date(dateFrom) : null;
    if (from) from.setHours(0, 0, 0, 0);

    const to = dateTo ? new Date(dateTo) : null;
    if (to) to.setHours(23, 59, 59, 999);

    return tasks.filter((task) => {
      if (!task.dueDate) return false;

      const dueDate = toDateSafe(task.dueDate);

      const matchesSearch =
        q === "" ||
        task.title?.toLowerCase().includes(q) ||
        task.projectName?.toLowerCase().includes(q);

      const matchesProject =
        filterProject === "All" || task.projectName === filterProject;

      const matchesPriority =
        filterPriority === "All" || task.priority === filterPriority;

      const matchesStatus =
        filterStatus === "All" || (task.status || "Pending") === filterStatus;

      const matchesFrom = !from || dueDate >= from;
      const matchesTo = !to || dueDate <= to;

      return (
        matchesSearch &&
        matchesProject &&
        matchesPriority &&
        matchesStatus &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [tasks, searchQuery, filterProject, filterPriority, filterStatus, dateFrom, dateTo]);

  const history = useMemo(() => {
    return filteredTasks.reduce((groups, task) => {
      const date = toDateSafe(task.dueDate);

      const formattedDate = date.toLocaleDateString("en-KE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }

      groups[formattedDate].push(task);

      return groups;
    }, {});
  }, [filteredTasks]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    filterProject !== "All" ||
    filterPriority !== "All" ||
    filterStatus !== "All" ||
    dateFrom !== "" ||
    dateTo !== "";

  const clearFilters = () => {
    setSearchQuery("");
    setFilterProject("All");
    setFilterPriority("All");
    setFilterStatus("All");
    setDateFrom("");
    setDateTo("");
  };

  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-emerald-100 text-emerald-700",
      "In Progress": "bg-amber-100 text-amber-700",
      Pending: "bg-indigo-100 text-indigo-700",
    };
    return colors[status] || "bg-slate-100 text-slate-700";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: "bg-rose-100 text-rose-700 border-rose-200",
      Medium: "bg-amber-100 text-amber-700 border-amber-200",
      Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return colors[priority] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Task History
            </h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <Clock size={16} className="text-indigo-400" />
              A record of every task, grouped by due date
            </p>
          </div>

          {/* Search + Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 mt-8 p-5">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by task or project name..."
                  className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                />
              </div>

              {/* Filters row */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-slate-400" />
                  <select
                    value={filterProject}
                    onChange={(e) => setFilterProject(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                  >
                    {projectOptions.map((project) => (
                      <option key={project} value={project}>
                        {project === "All" ? "All Projects" : project}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>

                <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-white">
                  <CalendarRange size={16} className="text-slate-400" />
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="text-sm focus:outline-none text-slate-600"
                  />
                  <span className="text-slate-400 text-sm">to</span>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="text-sm focus:outline-none text-slate-600"
                  />
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 px-3 py-2.5"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 flex items-center gap-2">
            <span className="text-sm text-slate-500">
              {filteredTasks.length} task{filteredTasks.length === 1 ? "" : "s"} found
            </span>
          </div>

          {/* History List */}
          <section className="mt-4 pb-10">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 p-12 text-center">
                <p className="text-slate-400">Loading task history...</p>
              </div>
            ) : Object.keys(history).length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 p-12 text-center">
                <Clock size={48} className="text-indigo-200 mx-auto mb-4" />
                <p className="text-slate-500">No tasks match your search</p>
                <p className="text-slate-400 text-sm mt-1">
                  Try adjusting your filters or date range
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(history)
                  .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                  .map(([date, tasksForDate]) => (
                    <div
                      key={date}
                      className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
                          <Calendar size={20} />
                          {date}
                        </h3>
                        <span className="bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
                          {tasksForDate.length} task{tasksForDate.length === 1 ? "" : "s"}
                        </span>
                      </div>

                      <div className="divide-y divide-slate-100">
                        {tasksForDate.map((task) => (
                          <div
                            key={task.id}
                            className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-slate-50/50 transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-3">
                                <h4 className="font-semibold text-slate-900">
                                  {task.title}
                                </h4>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                                    task.priority
                                  )}`}
                                >
                                  {task.priority || "No Priority"}
                                </span>
                              </div>
                              <p className="text-sm text-slate-500 mt-1">
                                {task.projectName || "No Project"}
                              </p>
                            </div>

                            <span
                              className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                                task.status
                              )}`}
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
    </div>
  );
}

export default TaskHistory;