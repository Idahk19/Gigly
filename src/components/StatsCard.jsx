import React from "react";

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatsCard;