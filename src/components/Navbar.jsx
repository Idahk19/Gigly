import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, FolderKanban } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 mr-3 flex items-center justify-center shadow-md">
            <FolderKanban className="text-white w-5 h-5" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Gigly
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 font-medium text-slate-600">
          <li>
            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/features"
              className="hover:text-indigo-600 transition"
            >
              Features
            </Link>
          </li>

          <li>
            <Link
              to="/pricing"
              className="hover:text-indigo-600 transition"
            >
              Pricing
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-indigo-600 transition"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              <span className="text-slate-700 font-medium">
                Hi, {currentUser.name}
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

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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
              to="/features"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              Features
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

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
              >
                Logout
              </button>
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