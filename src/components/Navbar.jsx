import React from 'react'
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
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-slate-200">
        <nav>
            <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <FolderKanban className="text-white w-5 h-5" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Gigly
          </h1>
        </Link>
            </div> 
        </nav>
      
    </div>
  )
}

export default Navbar
