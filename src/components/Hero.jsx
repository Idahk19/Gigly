import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  FolderKanban,
  Users,
  CreditCard,
} from "lucide-react";
import HeroImage from "../assets/images/HeroImage.webp";

function Hero() {
  return (
  <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-100 to-indigo-300">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src={HeroImage}
      alt=""
      className="w-full h-full object-cover"
    />
  </div>

  {/* Blur Overlay */}
  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Side */}
      <div>
        <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
          Organize Your{" "}
          <span className="text-indigo-600">Freelance Business</span>{" "}
          In One Place.
        </h1>

        <p className="mt-8 text-lg text-slate-900 leading-8 max-w-xl">
          Manage projects, organize clients, track tasks, monitor payments,
          and meet every deadline using one clean, modern workspace.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition duration-300"
          >
            See Features 
          </Link>

          <Link
            to="/about"
            className="border border-slate-300 hover:border-indigo-600 hover:text-indigo-600 px-8 py-4 rounded-xl font-semibold transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div></div>

    </div>
  </div>

</section>
  );
}

export default Hero;