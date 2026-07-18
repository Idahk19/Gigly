import { useState, useEffect, useRef } from "react";
import { Bell, Clock, AlertCircle, X, CheckCheck } from "lucide-react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// how many days ahead counts as an "upcoming" deadline
const DEADLINE_LOOKAHEAD_DAYS = 3;

// hour (24h) after which incomplete tasks trigger an "end of day" reminder
const END_OF_DAY_HOUR = 18; // 6:00 PM

function getDismissedIds() {
  if (!auth.currentUser) return [];
  try {
    const raw = localStorage.getItem(`dismissedNotifications:${auth.currentUser.uid}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDismissedIds(ids) {
  if (!auth.currentUser) return;
  localStorage.setItem(
    `dismissedNotifications:${auth.currentUser.uid}`,
    JSON.stringify(ids)
  );
}

function toDateSafe(value) {
  if (!value) return null;
  return value.toDate instanceof Function ? value.toDate() : new Date(value);
}

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [dismissedIds, setDismissedIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const buildNotifications = async () => {
    if (!auth.currentUser) return;

    try {
      setLoading(true);

      // fetch projects
      const projectsQuery = query(
        collection(db, "projects"),
        where("userId", "==", auth.currentUser.uid)
      );
      const projectsSnap = await getDocs(projectsQuery);
      const projects = projectsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // fetch tasks
      const tasksQuery = query(
        collection(db, "tasks"),
        where("userId", "==", auth.currentUser.uid)
      );
      const tasksSnap = await getDocs(tasksQuery);
      const tasks = tasksSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      const now = new Date();
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const list = [];

      // --- Upcoming project deadlines ---
      projects.forEach((project) => {
        if (project.status === "Completed") return;
        if (!project.deadline) return;

        const deadline = toDateSafe(project.deadline);
        if (!deadline) return;
        deadline.setHours(0, 0, 0, 0);

        const daysLeft = Math.ceil((deadline - todayStart) / (1000 * 60 * 60 * 24));

        if (daysLeft >= 0 && daysLeft <= DEADLINE_LOOKAHEAD_DAYS) {
          list.push({
            id: `deadline-${project.id}`,
            type: "deadline",
            title: project.projectName || "Untitled project",
            message:
              daysLeft === 0
                ? "Due today"
                : daysLeft === 1
                ? "Due tomorrow"
                : `Due in ${daysLeft} days`,
            urgent: daysLeft <= 1,
            sortValue: daysLeft,
          });
        }
      });

      // --- Incomplete tasks as the day winds down ---
      const isEndOfDay = now.getHours() >= END_OF_DAY_HOUR;

      if (isEndOfDay) {
        tasks.forEach((task) => {
          if (task.status === "Completed") return;
          if (!task.dueDate) return;

          const dueDate = toDateSafe(task.dueDate);
          if (!dueDate) return;

          const isToday = dueDate.toDateString() === now.toDateString();
          if (!isToday) return;

          list.push({
            id: `incomplete-${task.id}`,
            type: "incomplete",
            title: task.title || "Untitled task",
            message: `Still not done — ${task.projectName || "no project"}`,
            urgent: true,
            sortValue: -1,
          });
        });
      }

      list.sort((a, b) => a.sortValue - b.sortValue);

      setNotifications(list);
      setDismissedIds(getDismissedIds());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      buildNotifications();
    }

    // recheck periodically in case the tab stays open across the
    // deadline window or past the end-of-day cutoff
    const interval = setInterval(buildNotifications, 5 * 60 * 1000); // every 5 min
    return () => clearInterval(interval);
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleNotifications = notifications.filter(
    (n) => !dismissedIds.includes(n.id)
  );

  const dismissOne = (id) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    saveDismissedIds(updated);
  };

  const dismissAll = () => {
    const updated = [...dismissedIds, ...visibleNotifications.map((n) => n.id)];
    setDismissedIds(updated);
    saveDismissedIds(updated);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((v) => !v)}
        className="relative p-2.5 rounded-xl hover:bg-indigo-50 transition"
        title="Notifications"
      >
        <Bell size={20} className="text-slate-600" />
        {visibleNotifications.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
            {visibleNotifications.length > 9 ? "9+" : visibleNotifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-indigo-100/50 overflow-hidden z-50"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            {visibleNotifications.length > 0 && (
              <button
                onClick={dismissAll}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <CheckCheck size={14} />
                Clear all
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <p className="text-sm text-slate-400 text-center py-10">
                Loading...
              </p>
            ) : visibleNotifications.length === 0 ? (
              <div className="text-center py-10 px-6">
                <Bell size={32} className="text-indigo-200 mx-auto mb-3" />
                <p className="text-sm text-slate-500">You're all caught up</p>
                <p className="text-xs text-slate-400 mt-1">
                  No upcoming deadlines or overdue tasks today
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {visibleNotifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50/70 transition"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        n.urgent
                          ? "bg-rose-100 text-rose-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {n.type === "deadline" ? (
                        <Clock size={16} />
                      ) : (
                        <AlertCircle size={16} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {n.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                    </div>

                    <button
                      onClick={() => dismissOne(n.id)}
                      className="text-slate-300 hover:text-slate-500 mt-0.5"
                      title="Dismiss"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;