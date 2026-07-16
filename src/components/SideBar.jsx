import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CreditCard,
  ListTodo,
  Settings,
  LogOut,
  House,
  BriefcaseBusiness,
} from "lucide-react";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
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
      name: "Clients",
      path: "/dashboard/clients",
      icon: Users,
    },
    {
      name: "Payments",
      path: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      name: "Tasks",
      path: "/dashboard/tasks",
      icon: ListTodo,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col">

      <div className="h-20 flex items-center px-8 border-b border-slate-200">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
          <BriefcaseBusiness className="text-white" />
        </div>

        <div className="ml-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Gigly
          </h1>

          <p className="text-sm text-slate-500">
            Freelancer Workspace
          </p>
        </div>
      </div>

      <nav className="flex-1 px-5 py-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
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
  );
}

export default Sidebar;