import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Privacy() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-slate-900">
            Privacy Policy
          </h1>

          <p className="mt-4 text-slate-600">
            Last updated: July 2026
          </p>

          <div className="mt-10 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Introduction
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                Gigly respects your privacy and is committed to protecting the
                personal information you share with us. This Privacy Policy
                explains how we collect, use, and safeguard your information
                when you use our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Information We Collect
              </h2>

              <p className="mt-3 text-slate-700">
                We may collect the following information:
              </p>

              <ul className="mt-3 list-disc list-inside space-y-2 text-slate-700">
                <li>Your full name</li>
                <li>Email address</li>
                <li>Account credentials</li>
                <li>Project information you create</li>
                <li>Client information you choose to store</li>
                <li>Payment records you add to your workspace</li>
                <li>Device and browser information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                How We Use Your Information
              </h2>

              <p className="mt-3 text-slate-700">
                We use your information to:
              </p>

              <ul className="mt-3 list-disc list-inside space-y-2 text-slate-700">
                <li>Create and manage your account.</li>
                <li>Help you organize projects and clients.</li>
                <li>Improve the Gigly experience.</li>
                <li>Respond to support requests.</li>
                <li>Protect the security of our platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Data Security
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                We implement appropriate security measures to protect your
                personal information. While we strive to use commercially
                acceptable methods, no online platform can guarantee absolute
                security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Third-Party Services
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                Gigly may use trusted third-party services for authentication,
                hosting, analytics, and cloud storage. These providers process
                your information only as necessary to deliver their services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Your Rights
              </h2>

              <p className="mt-3 text-slate-700">
                You have the right to:
              </p>

              <ul className="mt-3 list-disc list-inside space-y-2 text-slate-700">
                <li>Update your account information.</li>
                <li>Request deletion of your account.</li>
                <li>Contact us regarding your personal data.</li>
                <li>Request a copy of your stored information where applicable.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Contact Us
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                If you have any questions about this Privacy Policy, please
                contact us at:
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

export default Privacy;