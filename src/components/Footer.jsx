 import React from 'react'
 import {
  FolderKanban,
  Mail,
} from "lucide-react";
import { Link } from 'react-router-dom';
 
 function Footer() {
   return (
    <footer className="bg-slate-900 text-slate-300">
  <div className="max-w-7xl px-6 py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

      {/* Brand */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Gigly
          </h2>
        </div>

        <p className="leading-7 text-slate-400">
          Less juggling between apps, more time doing what you love.
        </p>
      </div>

      {/* Quick Links */}
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

      {/* Resources */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-5">
          Resources
        </h3>

        <ul className="space-y-3">
          <li>
            <Link to="/faq" className="hover:text-indigo-400 transition">
              FAQs
            </Link>
          </li>

          <li>
            <Link to="/privacy" className="hover:text-indigo-400 transition">
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link to="/terms" className="hover:text-indigo-400 transition">
              Terms of Service
            </Link>
          </li>

          <li>
            <Link to="/support" className="hover:text-indigo-400 transition">
              Support
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-5">
          Contact us
        </h2>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            <span>gigly@gmail.com</span>
          </div>

          <p>+254 757732215</p>
        </div>
      </div>

    </div>
  </div>

  {/* Bottom */}
  <div className="border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center">
      <p className="text-sm text-slate-500">
        &copy; Gigly. All rights reserved.
      </p>
    </div>
  </div>
</footer>
   )
 }
 
 export default Footer
 