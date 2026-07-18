import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Settings,
  LogOut,
  House,
  BriefcaseBusiness,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "Projects",
      path: "/dashboard/projects",
      icon: FolderKanban,
    },
    {
      name: "Tasks",
      path: "/dashboard/tasks",
      icon: ListTodo,
    },
    {
      name: "Task History",
      path: "/dashboard/taskhistory",
      icon: ListTodo,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 z-50 lg:hidden bg-white p-3 rounded-xl shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          w-72
          bg-white
          border-r
          border-slate-200
          flex
          flex-col
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <BriefcaseBusiness className="text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Gigly
              </h1>

              <p className="text-sm text-slate-500">
                Freelancer Workspace
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-8 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-3 rounded-xl font-medium transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-5 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;