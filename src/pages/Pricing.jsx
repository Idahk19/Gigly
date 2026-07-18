import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "KES 0",
    period: "/month",
    description: "For freelancers just getting started.",
    features: [
      "Up to 3 active projects",
      "Basic task tracking",
      "1 client",
      "Deadline reminders",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "KES 1,200",
    period: "/month",
    description: "For freelancers ready to grow their business.",
    features: [
      "Unlimited projects",
      "Unlimited clients",
      "Task history & filters",
      "Payment tracking",
      "Priority notifications",
    ],
    highlight: true,
  },
  {
    name: "Business",
    price: "KES 3,500",
    period: "/month",
    description: "For small teams managing multiple freelancers.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team task assignment",
      "Productivity insights",
      "Priority support",
    ],
    highlight: false,
  },
];

function Pricing() {
  return (
    <div>
      <Navbar />

      <section className="relative py-28 bg-gradient-to-br from-slate-200 via-indigo-100">
        <div className="text-center mb-6">
          <h2 className="inline-block text-2xl md:text-3xl font-bold text-indigo-600 relative">
            Simple, Transparent Pricing
            <span className="absolute left-1/2 -bottom-5 h-1 w-30 -translate-x-1/2 rounded-full bg-indigo-600"></span>
          </h2>
        </div>

        <p className="text-center text-slate-600 max-w-xl mx-auto mt-8">
          Start for free and upgrade whenever you're ready to manage more
          projects, more clients, and more deadlines with Gigly.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col ${
                plan.highlight
                  ? "bg-indigo-600 border-indigo-500 text-white lg:-translate-y-3"
                  : "bg-white/20 backdrop-blur-lg border-white/30"
              }`}
            >
              <h3
                className={`text-2xl font-semibold ${
                  plan.highlight ? "text-white" : "text-slate-900"
                }`}
              >
                {plan.name}
              </h3>

              <p
                className={`mt-3 leading-7 ${
                  plan.highlight ? "text-indigo-100" : "text-slate-600"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={plan.highlight ? "text-indigo-100" : "text-slate-500"}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlight ? "bg-white/20" : "bg-indigo-100"
                      }`}
                    >
                      <Check
                        size={12}
                        strokeWidth={3}
                        className={plan.highlight ? "text-white" : "text-indigo-600"}
                      />
                    </div>
                    <span
                      className={plan.highlight ? "text-indigo-50" : "text-slate-600"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full py-3 rounded-2xl font-semibold transition duration-300 ${
                  plan.highlight
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Pricing;