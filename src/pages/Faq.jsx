
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CircleHelp,
  FolderKanban,
  Users,
  Wallet,
  Lock,
  KeyRound,
  Mail,
} from "lucide-react";

function Faq() {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-6">
            <CircleHelp size={42} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-indigo-100">
            Find quick answers to the questions we receive most often. If you
            can't find what you're looking for, our support team is always happy
            to help.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-5">
            <CircleHelp className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              What is Gigly?
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            Gigly is a freelancer management platform that helps freelancers
            organize projects, manage clients, track payments, and stay
            productive from one simple dashboard.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <FolderKanban className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              How do I create a new project?
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            After signing in, open your dashboard and click the
            <strong> New Project</strong> button. Fill in your project details
            and save to begin managing your work.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <FolderKanban className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Can I edit or delete a project?
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            Yes. Simply open the project from your dashboard and choose either
            the Edit or Delete option whenever you need to make changes.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <Users className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              How do I manage my clients?
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            The Clients section allows you to add, update, and organize client
            information so everything you need is stored in one convenient
            place.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <Wallet className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Can I track project payments?
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            Yes. Gigly helps you record payments, monitor outstanding balances,
            and keep track of your project earnings.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <Lock className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Is my information secure?
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            Yes. We use trusted cloud services and modern security practices to
            help protect your personal information and project data.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <KeyRound className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              I forgot my password. What should I do?
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-16">
            Click the <strong>Forgot Password</strong> link on the login page
            and follow the instructions sent to your email to reset your
            password securely.
          </p>

          <div className="border-t border-slate-200 pt-14 text-center">
            <Mail className="mx-auto text-indigo-600 mb-5" size={42} />

            <h2 className="text-3xl font-bold text-slate-900">
              Still Have Questions?
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-8">
              If you couldn't find the answer you were looking for, our support
              team is ready to help. We aim to respond to all enquiries within
              24–48 business hours.
            </p>

            <p className="mt-8 text-xl font-semibold text-indigo-600">
              support@gigly.com
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Faq;

