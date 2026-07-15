import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Faq() {
  return (
   <div>
    <Navbar />
  <h2 className="text-2xl font-bold text-slate-900">
    Frequently Asked Questions
  </h2>

  <div className="mt-6 space-y-8">
    <div>
      <h3 className="text-lg font-semibold text-slate-800">
        What is Gigly?
      </h3>
      <p className="mt-2 text-slate-700 leading-7">
        Gigly is a freelancer management platform that helps freelancers
        organize projects, manage clients, track payments, and stay productive
        in one place.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-slate-800">
        How do I create a new project?
      </h3>
      <p className="mt-2 text-slate-700 leading-7">
        After signing in, go to your dashboard and click the <strong>New Project</strong>
        button. Enter your project details and save.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-slate-800">
        Can I edit or delete a project?
      </h3>
      <p className="mt-2 text-slate-700 leading-7">
        Yes. Open the project from your dashboard and use the Edit or Delete
        options to make changes.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-slate-800">
        How do I manage my clients?
      </h3>
      <p className="mt-2 text-slate-700 leading-7">
        You can add, update, and remove client information from the Clients
        section of your dashboard. This helps you keep all client details
        organized in one place.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-slate-800">
        Can I track project payments?
      </h3>
      <p className="mt-2 text-slate-700 leading-7">
        Yes. Gigly allows you to record payments, monitor outstanding balances,
        and keep track of your project earnings.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-slate-800">
        Is my information secure?
      </h3>
      <p className="mt-2 text-slate-700 leading-7">
        Yes. We use industry-standard security practices to help protect your
        personal information and project data.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-slate-800">
        I forgot my password. What should I do?
      </h3>
      <p className="mt-2 text-slate-700 leading-7">
        Click the <strong>Forgot Password</strong> link on the login page and
        follow the instructions to reset your password.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-slate-800">
        How can I contact support?
      </h3>
      <p className="mt-2 text-slate-700 leading-7">
        You can contact our support team by emailing
        <strong> support@gigly.com</strong>. We aim to respond within
        24–48 business hours.
      </p>
    </div>
  </div>
  <Footer />
</div>


  )
}

export default Faq
