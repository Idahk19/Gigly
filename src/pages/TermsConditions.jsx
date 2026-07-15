
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FileText,
  BadgeCheck,
  User,
  CreditCard,
  Copyright,
  ShieldAlert,
  Ban,
  RefreshCcw,
  Mail,
} from "lucide-react";

function Terms() {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-6">
            <FileText size={42} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Terms & Conditions
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-indigo-100">
            These Terms and Conditions govern your use of Gigly. By accessing
            or using our platform, you agree to comply with these terms and help
            us maintain a safe and reliable experience for everyone.
          </p>

          <p className="mt-6 text-indigo-200">
            Last updated: July 2026
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-5">
            <BadgeCheck className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Acceptance of Terms
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            By creating an account or using Gigly, you agree to these Terms and
            Conditions. If you do not agree with any part of these terms, you
            should discontinue using the platform.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <FileText className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Use of the Platform
            </h2>
          </div>

          <ul className="list-disc list-inside space-y-3 text-slate-600 leading-8 mb-14">
            <li>Provide accurate and up-to-date account information.</li>
            <li>Keep your login credentials secure.</li>
            <li>Use Gigly only for lawful purposes.</li>
            <li>Respect the rights and privacy of other users.</li>
            <li>Avoid activities that interfere with the platform.</li>
          </ul>

          <div className="flex items-center gap-4 mb-5">
            <User className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              User Accounts
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities carried out using your
            account. Please notify us immediately if you suspect unauthorized
            access.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <CreditCard className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Payments
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            Gigly may provide tools to help you manage invoices, payments, and
            project finances. Users remain responsible for ensuring the accuracy
            of any financial information entered into the platform.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <Copyright className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Intellectual Property
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            All content, branding, logos, graphics, and software associated
            with Gigly are protected by intellectual property laws. You may not
            copy, distribute, or reproduce any part of the platform without
            prior written permission.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <ShieldAlert className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Limitation of Liability
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            Gigly is provided on an "as is" basis. While we strive to provide a
            reliable service, we are not responsible for indirect, incidental,
            or consequential damages arising from the use of the platform.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <Ban className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Account Termination
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-14">
            We reserve the right to suspend or terminate accounts that violate
            these Terms and Conditions, engage in fraudulent activity, or misuse
            the platform in any way.
          </p>

          <div className="flex items-center gap-4 mb-5">
            <RefreshCcw className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-slate-900">
              Changes to These Terms
            </h2>
          </div>

          <p className="text-slate-600 leading-8 mb-16">
            We may revise these Terms and Conditions periodically. Any updates
            will be published on this page, and your continued use of Gigly
            after the changes become effective constitutes acceptance of the
            revised terms.
          </p>

          <div className="border-t border-slate-200 pt-14 text-center">
            <Mail className="mx-auto text-indigo-600 mb-5" size={42} />

            <h2 className="text-3xl font-bold text-slate-900">
              Questions About These Terms?
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-8">
              If you have any questions regarding these Terms and Conditions,
              feel free to contact our team. We'll be happy to assist you.
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

export default Terms;

