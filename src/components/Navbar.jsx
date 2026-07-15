import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  FolderKanban,
  House,
  CircleDollarSign,
  Info,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-indigo-200 backdrop-blur-lg border-b border-slate-200">
      <div className="h-20 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <FolderKanban className="text-white w-5 h-5" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Gigly
          </h1>
        </Link>

        <ul className="hidden md:flex items-center gap-10 font-medium text-slate-600">
          <li>
            <Link
              to="/"
              className="hover:text-indigo-600 transition flex items-center gap-2"
            >
              <House size={18} />
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/pricing"
              className="hover:text-indigo-600 transition flex items-center gap-2"
            >
              <CircleDollarSign size={18} />
              Pricing
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-indigo-600 transition flex items-center gap-2"
            >
              <Info size={18} />
              About
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-slate-700 font-medium">
                Hi, {user.displayName?.split(" ")[0] || "User"}
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-700 hover:text-indigo-600 font-medium transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-md transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-slate-700" />
          ) : (
            <Menu className="w-7 h-7 text-slate-700" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-lg">
          <div className="px-6 py-6 flex flex-col gap-5">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              Pricing
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              About
            </Link>

            <hr className="border-slate-200" />

            {user ? (
              <>
                <p className="text-slate-700 font-medium">
                  Hi, {user.displayName?.split(" ")[0] || "User"}
                </p>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3 text-slate-700 hover:text-indigo-600 font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;