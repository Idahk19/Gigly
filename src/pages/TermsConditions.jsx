import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Terms() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-slate-900">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-slate-600">
            Last updated: July 2026
          </p>

          <div className="mt-10 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Acceptance of Terms
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                By accessing or using Gigly, you agree to be bound by these
                Terms and Conditions. If you do not agree with any part of these
                terms, you should not use the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Use of the Platform
              </h2>

              <p className="mt-3 text-slate-700">
                When using Gigly, you agree to:
              </p>

              <ul className="mt-3 list-disc list-inside space-y-2 text-slate-700">
                <li>Provide accurate and up-to-date account information.</li>
                <li>Keep your login credentials secure.</li>
                <li>Use the platform only for lawful purposes.</li>
                <li>Respect the rights of other users.</li>
                <li>Not attempt to interfere with the platform's operation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                User Accounts
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                You are responsible for maintaining the confidentiality of your
                account and password. You are also responsible for all
                activities that occur under your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Payments
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                Gigly may provide features that help users track projects,
                invoices, and payments. Users are responsible for ensuring the
                accuracy of any financial information entered into the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Intellectual Property
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                All content, branding, logos, designs, and software associated
                with Gigly are the property of Gigly unless otherwise stated.
                You may not copy, reproduce, or distribute any part of the
                platform without permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Limitation of Liability
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                Gigly is provided on an "as is" and "as available" basis. We are
                not liable for any indirect, incidental, or consequential
                damages resulting from the use or inability to use the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Account Termination
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                We reserve the right to suspend or terminate accounts that
                violate these Terms and Conditions or engage in fraudulent,
                abusive, or unlawful activities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Changes to These Terms
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                We may update these Terms and Conditions from time to time.
                Continued use of Gigly after changes are published constitutes
                acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Contact Us
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                If you have any questions regarding these Terms and Conditions,
                please contact us at:
              </p>

              <p className="mt-4 text-slate-700">
                <strong>Email:</strong> support@gigly.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Terms;