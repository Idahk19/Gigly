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
          <p>
            Privacy Policy
Introduction

Gigly respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.

Information We Collect

We may collect:

Your full name
Email address
Account credentials
Project information you create
Client information you choose to store
Payment records you add to your workspace
Device and browser information
How We Use Your Information

We use your information to:

Create and manage your account
Help you organize projects and clients
Improve the Gigly experience
Respond to support requests
Protect the security of our platform
Data Security

We implement appropriate security measures to protect your personal information. While we strive to use commercially acceptable methods, no online platform can guarantee absolute security.

Third-Party Services

Gigly may use trusted third-party services for authentication, hosting, analytics, and cloud storage. These providers process information only as necessary to deliver their services.

Your Rights

You may:

Update your account information
Request deletion of your account
Contact us regarding your personal data
Request a copy of your stored information where applicable
Contact

If you have questions about this Privacy Policy, contact us at:

Email: support@gigly.com
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Privacy;