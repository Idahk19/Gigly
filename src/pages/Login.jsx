import React from 'react'
import RegisterImage from "../assets/images/RegisterImage.avif"
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

     const { login, googleSignIn } = useContext(AuthContext);

    const handleSubmit = async (e) =>{
      e.preventDefault();

      try{
        const userCredential = await login(email, password);

    setEmail("")
    setPassword("")

      alert("Login successful!");
      navigate("/")
  } catch (error) {
    alert(error.message);
  }
  
      }
       const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();

      console.log("Google User:", result.user);

      alert("Google Sign-In successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    }
  return (
    <section>
    <div className="absolute inset-0">
            <img
              src={RegisterImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
    <div className="max-w-5xl mx-auto mt-10 rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
 <div className="grid lg:grid-cols-2 gap-8 items-center">
    <div className="  p-10">
    <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
  Welcome back, Gigly Pro!
</h1>

<p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
  Ready to get things done?
</p>  
    </div>
    

    <div className="bg-white/40 p-10">
      <h2 className="text-3xl font-bold text-slate-900">
  Log In
</h2>

<p className="mt-2 text-slate-600">
  Lets get productive!
</p>

<form className="mt-8 space-y-5" onSubmit={handleSubmit}>
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Email Address
    </label>
    <input
      type="email"
      placeholder="Enter your email"
       value={email}
  onChange={(e) => setEmail(e.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />
  </div>

 <div className="relative">
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Password
    </label>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 pr-10 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-2/3 -translate-y-1/2 text-slate-500 hover:text-indigo-600"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
  <p className="mt-2 text-right text-sm text-indigo-600 hover:underline cursor-pointer">
    Forgot Password?
  </p>
  <button
    type="submit"
    className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
  >
    Login
  </button>

  <p className="text-center text-slate-600">
    Don't have an account ?{" "}
     <Link
                  to="/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Create Account
                </Link>
  </p>
</form>
    </div>
    </div>
     </div>
     </section>
  )
}

export default Register
