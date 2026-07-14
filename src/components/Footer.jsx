 import React from 'react'
 import {
  FolderKanban,
  Mail,
} from "lucide-react";
import { Link } from 'react-router-dom';
 
 function Footer() {
   return (
     <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                <FolderKanban className="w-5 h-5 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Gigly
              </h2>
              <p className="mt-5 leading-7 text-slate-400">
                 Less juggling between apps, more time doing what you love.
              </p>
            </div>
             <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/features" className="hover:text-indigo-400 transition">
                  Features
                </Link>
              </li>

              <li>
                <Link to="/pricing" className="hover:text-indigo-400 transition">
                  Pricing
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-indigo-400 transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
    </footer>
   )
 }
 
 export default Footer
 