import { useContext } from "react";
import {
  Search,
  CircleUserRound,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

function TopBar() {
  const { user } = useContext(AuthContext);

  return (
   <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-lg">
  <div className="pl-20 pr-4 sm:pl-20 sm:pr-6 lg:px-10 py-4 flex items-center justify-between">

    {/* Left */}
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
        Dashboard
      </h1>

      <p className="hidden sm:block text-indigo-100 mt-1 text-sm">
        Welcome back, {user?.displayName?.split(" ")[0] || "User"}.
      </p>
    </div>

    {/* Right */}
    <div className="flex items-center gap-2 sm:gap-4">

      {/* Notification */}
      <NotificationBell />

      {/* Profile */}
      <button className="flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 px-2 sm:px-3 py-2">

        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
        ) : (
          <CircleUserRound
            size={36}
            className="text-white"
          />
        )}

        <div className="hidden lg:block text-left">
          <h3 className="font-semibold text-white">
            {user?.displayName || "User"}
          </h3>

          <p className="text-xs text-indigo-100">
            {user?.email}
          </p>
        </div>

        <ChevronDown
          size={18}
          className="hidden lg:block text-white"
        />
      </button>

    </div>

  </div>
</header>
  );
}

export default TopBar;