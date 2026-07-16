import { useContext } from "react";
import {
  Search,
  Bell,
  CircleUserRound,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="h-20 w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-8 flex items-center justify-between shadow-lg">
       <div className="h-full w-full px-10 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-indigo-100 mt-1">
          Welcome back, {user?.displayName?.split(" ")[0] || "User"}.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-80 rounded-xl bg-white/20 border border-white/20 py-3 pl-11 pr-4 text-white placeholder:text-indigo-200 outline-none focus:border-white focus:bg-white/30 transition"
          />
        </div>

        <button className="relative w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
          <Bell size={21} className="text-white" />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        <button className="flex items-center gap-3 rounded-xl bg-white/20 hover:bg-white/30 px-3 py-2 transition">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <CircleUserRound
              size={42}
              className="text-white"
            />
          )}

          <div className="hidden md:block text-left">
            <h3 className="font-semibold text-white">
              {user?.displayName || "User"}
            </h3>

            <p className="text-sm text-indigo-100">
              {user?.email}
            </p>
          </div>

          <ChevronDown
            size={18}
            className="hidden md:block text-white"
          />
        </button>
      </div>
      </div>
    </header>
  );
}

export default Topbar;