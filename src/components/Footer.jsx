 import React from 'react'
 import {
  FolderKanban,
  Mail,
} from "lucide-react";
 
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
        </div>
      </div>
    </div>
    </footer>
   )
 }
 
 export default Footer
 