
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  LifeBuoy,
  CircleHelp,
  Lock,
  Clock3,
  MessageSquare,
  Mail,
  Phone,
} from "lucide-react";

function Support() {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-6">
            <LifeBuoy size={42} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Support Center
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-indigo-100">
            Need help using Gigly? We're here to answer your questions,
            troubleshoot issues, and help you get the most out of your
            freelance workspace.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-5">
            <CircleHelp className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-10 mb-16">

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                How do I create a new project?
              </h3>

              <p className="mt-3 text-slate-600 leading-8">
                After signing in, open your dashboard and click
                <strong> New Project</strong>. Fill in the required information
                and save to start managing your work.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Can I edit or delete a project?
              </h3>

              <p className="mt-3 text-slate-600 leading-8">
                Yes. Open the project from your dashboard, then choose the Edit
                or Delete option depending on the action you'd like to perform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                I forgot my password. What should I do?
              </h3>

              <p className="mt-3 text-slate-600 leading-8">
                Click the <strong>Forgot Password</strong> link on the login
                page and follow the instructions sent to your email to reset
                your password.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Is my information secure?
              </h3>

              <p className="mt-3 text-slate-600 leading-8">
                Yes. Gigly uses trusted cloud services and modern security
                practices to help keep your account and information protected.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 mb-5">
            <Lock className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Contact Support
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-8">
            If you couldn't find the answer you're looking for, our support team
            is happy to help. Reach out using any of the methods below.
          </p>

          <div className="space-y-5 text-slate-700 mb-16">
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-600" size={22} />
              <span>support@gigly.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-indigo-600" size={22} />
              <span>+254 700 123 456</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <Clock3 className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Response Time
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-16">
            We aim to respond to all enquiries within 24–48 business hours.
            During busy periods, responses may take a little longer, but we'll
            always do our best to assist you as quickly as possible.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <MessageSquare className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Feedback
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-16">
            Your feedback helps us improve Gigly. If you've found a bug, have a
            feature request, or simply want to share your experience, we'd love
            to hear from you.
          </p>

          <div className="border-t border-slate-200 pt-14 text-center">
            <Mail className="mx-auto text-indigo-600 mb-5" size={42} />

            <h2 className="text-3xl font-bold text-slate-900">
              Still Need Help?
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-8">
              Our support team is always ready to assist you with any questions
              about your account, projects, or using Gigly.
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

export default Support;
