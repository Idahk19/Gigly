import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Support() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-slate-900">
            Support Center
          </h1>

          <p className="mt-4 text-slate-600">
            We're here to help. If you have any questions, encounter any issues,
            or need assistance using Gigly, you can reach out to our support
            team.
          </p>

          <div className="mt-10 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    How do I create a new project?
                  </h3>
                  <p className="mt-2 text-slate-700 leading-7">
                    After logging in, navigate to your dashboard and click
                    <strong> New Project</strong>. Fill in the required details
                    and save your project.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Can I edit or delete a project?
                  </h3>
                  <p className="mt-2 text-slate-700 leading-7">
                    Yes. Open the project from your dashboard and choose either
                    the Edit or Delete option.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    I forgot my password. What should I do?
                  </h3>
                  <p className="mt-2 text-slate-700 leading-7">
                    Click the <strong>Forgot Password</strong> link on the login
                    page and follow the instructions to reset your password.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Is my data secure?
                  </h3>
                  <p className="mt-2 text-slate-700 leading-7">
                    Yes. We use industry-standard security measures to help
                    protect your information and keep your data safe.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Contact Support
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                If you couldn't find the answer you're looking for, our support
                team is ready to help.
              </p>

              <div className="mt-6 space-y-3 text-slate-700">
                <p>
                  <strong>Email:</strong> support@gigly.com
                </p>

                <p>
                  <strong>Phone:</strong> +254 700 123 456
                </p>

                <p>
                  <strong>Business Hours:</strong> Monday – Friday, 8:00 AM –
                  5:00 PM (EAT)
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Response Time
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                We aim to respond to all support requests within 24–48 business
                hours. During peak periods, responses may take slightly longer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Feedback
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                We value your feedback. If you have suggestions for improving
                Gigly or would like to report a bug, please send us an email.
                Your input helps us build a better platform for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Support;