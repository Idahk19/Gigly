
import { Link } from "react-router-dom";
import HeroImage from "../assets/images/HeroImage.avif";
import HeroImage2 from "../assets/images/HeroImage2.avif";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HeroImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="relative z-10  mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Organize Your{" "}
              <span className="text-indigo-600">
                Freelance Business
              </span>{" "}
              In One Place.
            </h1>

            <p className="mt-8 text-lg text-slate-900 leading-8 max-w-xl">
              Manage projects, organize clients, track tasks, monitor payments,
              and meet every deadline using one clean, modern workspace.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Get Started
              </Link>

              <Link
                to="/about"
                className="border border-slate-300 hover:border-indigo-600 hover:text-indigo-600 px-8 py-4 rounded-xl font-semibold transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={HeroImage2}
              alt="Gigly Dashboard"
              className="w-full rounded-xl max-w-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

