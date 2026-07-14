import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import {
  FolderKanban,
  Users,
  CheckSquare,
  CreditCard,
  CalendarDays,
  BarChart3,
} from "lucide-react";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="relative py-28 bg-gradient-to-br from-slate-200 via-indigo-100">
        <div className="text-center mb-6">
  <h2 className="inline-block text-2xl md:text-3xl font-bold text-indigo-600 relative">
    Why Choose Gigly
    <span className="absolute left-1/2 -bottom-5 h-1 w-30 -translate-x-1/2 rounded-full bg-indigo-600"></span>
  </h2>
</div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  <div className="rounded-3xl bg-white/20 backdrop-blur-xlg border border-white/30 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
    <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6">
      <FolderKanban className="w-7 h-7 text-indigo-600" />
    </div>

    <h3 className="text-2xl font-semibold text-slate-900">
      Project Management
    </h3>

    <p className="mt-4 text-slate-600 leading-7">
      Organize all your projects, deadlines, and progress in one place.
    </p>
  </div>
  <div className="rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
    <Users className="w-7 h-7 text-emerald-600" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Client Management
  </h3>

  <p className="mt-4 text-slate-600 leading-7">
    Keep all your clients organized with their contact details, projects, and communication history.
  </p>
</div>

<div className="rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
    <CheckSquare className="w-7 h-7 text-amber-600" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Task Tracking
  </h3>

  <p className="mt-4 text-slate-600 leading-7">
    Break projects into manageable tasks, set priorities, and never miss another deadline.
  </p>
</div>

<div className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/30 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
    <CreditCard className="w-7 h-7 text-violet-600" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Payment Tracking
  </h3>

  <p className="mt-4 text-slate-600 leading-7">
    Monitor invoices, payments received, and outstanding balances from one dashboard.
  </p>
</div>

<div className="rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
  <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mb-6">
    <CalendarDays className="w-7 h-7 text-sky-600" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Calendar & Deadlines
  </h3>

  <p className="mt-4 text-slate-600 leading-7">
    Stay on top of meetings, project milestones, and upcoming deadlines with ease.
  </p>
</div>

<div className="rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
  <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-6">
    <BarChart3 className="w-7 h-7 text-rose-600" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Productivity Insights
  </h3>

  <p className="mt-4 text-slate-600 leading-7">
    Visualize your progress, completed projects, earnings, and productivity trends over time.
  </p>
</div>
</div>
      </section>
       
      <Footer />
    </div>
  )
}

export default Home;
