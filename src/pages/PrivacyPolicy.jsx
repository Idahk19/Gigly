
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ShieldCheck,
  Database,
  Lock,
  Globe,
  UserCheck,
  RefreshCcw,
  Mail,
} from "lucide-react";

function Privacy() {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-6">
            <ShieldCheck size={42} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-indigo-100">
            Your privacy matters to us. This Privacy Policy explains how Gigly
            collects, uses, stores, and protects your information whenever you
            use our platform.
          </p>

          <p className="mt-6 text-indigo-200">
            Last updated: July 2026
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-5">
            <ShieldCheck className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Introduction
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            Gigly respects your privacy and is committed to protecting the
            personal information you share with us. We only collect the
            information necessary to provide our services, improve your
            experience, and keep your account secure.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <Database className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Information We Collect
            </h2>
          </div>

          <ul className="list-disc list-inside grid md:grid-cols-2 gap-3 text-slate-600 leading-8 mb-14">
            <li>Full name</li>
            <li>Email address</li>
            <li>Account credentials</li>
            <li>Projects you create</li>
            <li>Client information</li>
            <li>Tasks and payment records</li>
            <li>Device and browser information</li>
            <li>Usage analytics</li>
          </ul>

          <div className="flex items-center gap-4 mb-5">
            <UserCheck className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              How We Use Your Information
            </h2>
          </div>

          <ul className="list-disc list-inside space-y-3 text-slate-600 leading-8 mb-14">
            <li>Create and manage your account.</li>
            <li>Organize your projects, clients, and tasks.</li>
            <li>Improve your experience on Gigly.</li>
            <li>Respond to support requests.</li>
            <li>Protect the security of our platform.</li>
          </ul>

          <div className="flex items-center gap-4 mb-5">
            <Lock className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Data Security
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            We use industry-standard security measures to protect your
            information against unauthorized access, alteration, disclosure,
            or destruction. While we continuously improve our security,
            no online service can guarantee absolute protection.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <Globe className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Third-Party Services
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            Gigly uses trusted third-party services such as Firebase for user
            authentication, hosting, cloud storage, and analytics. These
            providers only process your information when necessary to deliver
            our services.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <UserCheck className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Your Rights
            </h2>
          </div>

          <ul className="list-disc list-inside space-y-3 text-slate-600 leading-8 mb-14">
            <li>Access your personal information.</li>
            <li>Update your account details.</li>
            <li>Request deletion of your account.</li>
            <li>Request a copy of your stored data.</li>
          </ul>

          <div className="flex items-center gap-4 mb-5">
            <RefreshCcw className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Changes to This Policy
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-16">
            We may update this Privacy Policy from time to time. Whenever
            changes are made, the updated version will be published on this
            page together with the revised date.
          </p>

          <div className="border-t border-slate-200 pt-14 text-center">
            <Mail className="mx-auto text-indigo-600 mb-5" size={42} />

            <h2 className="text-3xl font-bold text-slate-900">
              Contact Us
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-8">
              If you have any questions about this Privacy Policy or how your
              information is handled, feel free to contact our support team.
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

export default Privacy;
