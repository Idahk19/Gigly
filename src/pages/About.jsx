import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-slate-900">
            About Gigly
          </h1>

          <p className="mt-4 text-lg text-slate-600 leading-8">
            Gigly is a freelancer management platform built to help freelancers
            stay organized, productive, and in control of their work. From
            managing projects and clients to tracking payments, Gigly brings
            everything you need into one simple and intuitive workspace.
          </p>

          <div className="mt-12 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Our Mission
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                Our mission is to simplify freelance work by providing tools
                that help professionals manage their business efficiently.
                Whether you're just starting your freelance journey or managing
                multiple clients, Gigly helps you stay focused on delivering
                great work instead of worrying about organization.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                What You Can Do with Gigly
              </h2>

              <ul className="mt-4 list-disc list-inside space-y-3 text-slate-700">
                <li>Create and manage projects.</li>
                <li>Keep client information organized.</li>
                <li>Track project payments and earnings.</li>
                <li>Monitor project progress.</li>
                <li>Access your work from one centralized dashboard.</li>
                <li>Stay organized with an easy-to-use interface.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Why Choose Gigly?
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                Freelancers often juggle multiple projects, deadlines, and
                clients at the same time. Gigly is designed to reduce that
                complexity by providing a clean, reliable platform where you can
                organize your work and keep everything in one place.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Our Vision
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                We envision a future where freelancers can manage their entire
                business effortlessly, allowing them to spend more time doing
                what they love and less time handling administrative tasks.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Our Values
              </h2>

              <ul className="mt-4 list-disc list-inside space-y-3 text-slate-700">
                <li>Simplicity – Easy-to-use tools for every freelancer.</li>
                <li>Productivity – Helping users work smarter.</li>
                <li>Reliability – Keeping your projects and data organized.</li>
                <li>Innovation – Continuously improving the platform.</li>
                <li>Customer Focus – Building features that solve real problems.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Get Started Today
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                Join Gigly today and discover a smarter way to manage your
                freelance business. Stay organized, keep track of your projects,
                and focus on what matters most—delivering exceptional work to
                your clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;