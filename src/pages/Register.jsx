import React, { useState, useContext } from 'react'
import RegisterImage from "../assets/images/RegisterImage.avif"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

function Register() {

  const [ fullName, setFullName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const navigate = useNavigate();
  const { register, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault();

     if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }
   try {
   const userCredential = await register(fullName, email, password);

    setFullName("");
setEmail("");
setPassword("");
setConfirmPassword("");

    toast.success("Account created successfully!");
    navigate("/login")
    
  } catch (error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      toast.error("This email is already registered.");
      break;

    case "auth/invalid-email":
      toast.error("Please enter a valid email address.");
      break;

    case "auth/weak-password":
      toast.error("Password should be at least 6 characters.");
      break;

    default:
      toast.error("Something went wrong. Please try again.");
  }

  }

  }
  const handleGoogleSignIn = async () => {
  try {
    const result = await googleSignIn();
    toast.success("Signed in with Google successfully!");

    navigate("/");
  } catch (error) {
  console.log("Code:", error.code);
  console.log("Message:", error.message);
  console.log(error);
}
};

  return (
    <section>
    <div className="absolute inset-0">
            <img
              src={RegisterImage}
              alt=""
              className="w-full object-cover min-h-screen"
            />
          </div>
    <div className="max-w-5xl mx-auto mt-6 rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
 <div className="grid lg:grid-cols-2 gap-8 items-center">
    <div className="  p-10">
    <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
  Welcome to Gigly!
</h1>

<p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
  Simplify your freelance workflow!
</p>  
    </div>
    

    <div className="bg-white/40 p-10">
      <h2 className="text-3xl font-bold text-slate-900">
  Create Account
</h2>

<p className="mt-2 text-slate-600">
  Join Gigly and start organizing your freelance business.
</p>

<form
  onSubmit={handleSubmit}
  className="mt-8 space-y-5"
>
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-700">
      Full Name
    </label>
    <input
  type="text"
  placeholder="Enter your full name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  required
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
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
/>
  </div>
<div>
  <label className="block mb-2 text-sm font-medium text-slate-700">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Create a password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 pr-12 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>

<div>
  <label className="block mb-2 text-sm font-medium text-slate-700">
    Confirm Password
  </label>

  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm your password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 pr-12 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600"
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
</div>

<button
  type="submit"
  className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
>
  Create Account
</button>

<div className="relative my-5">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-slate-300"></div>
  </div>

  <div className="relative flex justify-center text-sm">
    <span className="bg-white px-3 text-slate-500">
      OR
    </span>
  </div>
</div>

<button
  type="button"
  onClick={handleGoogleSignIn}
  className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 hover:bg-slate-100 transition"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />

  Continue with Google
</button>

  <p className="text-center text-slate-600">
    Already have an account?{" "}
    <Link
  to="/login"
  className="font-semibold text-indigo-600 hover:text-indigo-700"
>
  Sign In
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
