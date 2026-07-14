import React from 'react'
import RegisterImage from "../assets/images/RegisterImage.avif"

function Register() {
  return (
    <section>
    <div className="absolute inset-0">
            <img
              src={RegisterImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
    <div className="max-w-5xl mx-auto mt-5 rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
 <div className="grid lg:grid-cols-2 gap-8 items-center">
    <div className="  p-10">
    <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
  Welcome to Gigly!
</h1>

<p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
  Simplify your freelance workflow by managing projects, clients,
  tasks, and payments from one beautiful workspace.
</p>  
    </div>
    

    <div className="bg-white/40 p-10">
      <h2 className="text-3xl font-bold text-slate-900">
  Create Account
</h2>

<p className="mt-2 text-slate-600">
  Join Gigly and start organizing your freelance business.
</p>

<form className="mt-8 space-y-5">
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Full Name
    </label>
    <input
      type="text"
      placeholder="Enter your full name"
      className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />
  </div>

  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Email Address
    </label>
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />
  </div>

  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Password
    </label>
    <input
      type="password"
      placeholder="Create a password"
      className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />
  </div>

  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Confirm Password
    </label>
    <input
      type="password"
      placeholder="Confirm your password"
      className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />
  </div>

  <button
    type="submit"
    className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
  >
    Create Account
  </button>

  <p className="text-center text-slate-600">
    Already have an account?{" "}
    <a
      href="/login"
      className="font-semibold text-indigo-600 hover:text-indigo-700"
    >
      Sign In
    </a>
  </p>
</form>
    </div>
    </div>
     </div>
     </section>
  )
}

export default Register
