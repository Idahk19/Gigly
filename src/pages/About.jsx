import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImage from "../assets/images/HeroImage.webp"; // replace with your image
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-900">
              About Gigly
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Gigly is a modern workspace built for freelancers to manage
              projects, clients, tasks and payments in one beautiful and
              organized place.
            </p>
          </div>

          <div className="mt-16 rounded-3xl overflow-hidden shadow-xl">
            <img
              src={HeroImage}
              alt="Gigly workspace"
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-14 mt-20">

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Our Mission
              </h2>

              <p className="mt-6 text-slate-600 leading-8">
                Freelancers spend too much time switching between spreadsheets,
                notes, chats and invoices. Gigly brings everything together into
                one intuitive workspace so you can focus on doing your best
                work.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Why Gigly?
              </h2>

              <p className="mt-6 text-slate-600 leading-8">
                Designed with simplicity in mind, Gigly helps you stay organized,
                track your progress, manage clients professionally and keep your
                freelance business running smoothly.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-3 gap-8 text-center mt-20 border-y border-slate-200 py-12">

            <div>
              <h3 className="text-4xl font-bold text-indigo-600">
                All-in-One
              </h3>
              <p className="mt-2 text-slate-600">
                Workspace
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-indigo-600">
                Simple
              </h3>
              <p className="mt-2 text-slate-600">
                User Experience
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-indigo-600">
                Built For
              </h3>
              <p className="mt-2 text-slate-600">
                Freelancers
              </p>
            </div>

          </div>

          <div className="text-center mt-20">
            <h2 className="text-4xl font-bold text-slate-900">
              Ready to organize your freelance business?
            </h2>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 mt-8 rounded-xl bg-indigo-600 px-8 py-4 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;