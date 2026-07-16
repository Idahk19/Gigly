import { useState } from "react";
import { X } from "lucide-react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";


function ProjectModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isOpen) return null;

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const [projectName, setProjectName] = useState("");
const [category, setCategory] = useState("");
const [status, setStatus] = useState("Planning");
const [budget, setBudget] = useState("");
const [startDate, setStartDate] = useState("");
const [deadline, setDeadline] = useState("");
const [description, setDescription] = useState("");

const [clientName, setClientName] = useState("");
const [clientEmail, setClientEmail] = useState("");
const [clientPhone, setClientPhone] = useState("");
const [company, setCompany] = useState("");
const [address, setAddress] = useState("");

const [amount, setAmount] = useState("");
const [paymentMethod, setPaymentMethod] = useState("Mpesa");
const [paymentStatus, setPaymentStatus] = useState("Pending");
const [dueDate, setDueDate] = useState("");
const [reference, setReference] = useState("");
const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Create New Project
            </h2>

            <p className="text-slate-500 mt-1">
              Complete the steps below to create a project.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        <div className="px-8 py-6">
          <div className="flex items-center justify-center mb-10">

            <div className="flex items-center">

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                1
              </div>

              <span className="mx-3 font-medium text-slate-700">
                Project
              </span>

              <div className="w-20 h-1 bg-slate-200"></div>
            </div>

            <div className="flex items-center">

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ml-3 ${
                  step >= 2
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                2
              </div>

              <span className="mx-3 font-medium text-slate-700">
                Client
              </span>

              <div className="w-20 h-1 bg-slate-200"></div>
            </div>

            <div className="flex items-center">

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ml-3 ${
                  step >= 3
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                3
              </div>

              <span className="mx-3 font-medium text-slate-700">
                Payment
              </span>

            </div>

          </div>

          {step === 1 && (
  <div className="space-y-6">
    <div>
      <label className="block mb-2 font-medium text-slate-700">
        Project Name
      </label>

      <input
        type="text"
         value={projectName}
    onChange={(e)=>setProjectName(e.target.value)}
        placeholder="Enter project name"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Category
        </label>

        <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={category}
onChange={(e) => setCategory(e.target.value)}
        >
          <option>Web Development</option>
          <option>UI/UX Design</option>
          <option>Graphic Design</option>
          <option>Mobile App</option>
          <option>Marketing</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Status
        </label>

        <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={status}
onChange={(e) => setStatus(e.target.value)}
        >
          <option>Planning</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block mb-2 font-medium text-slate-700">
        Budget (KES)
      </label>

      <input
        type="number"
        value={budget}
onChange={(e) => setBudget(e.target.value)}
        placeholder="50000"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Start Date
        </label>

        <input
          type="date"
          value={startDate}
onChange={(e) => setStartDate(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Deadline
        </label>

        <input
          type="date"
          value={deadline}
onChange={(e) => setDeadline(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>
    </div>

    <div>
      <label className="block mb-2 font-medium text-slate-700">
        Description
      </label>

      <textarea
        rows="4"
        placeholder="Describe the project..."
        value={description}
onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      ></textarea>
    </div>
  </div>
)}

         {step === 2 && (
  <div className="space-y-6">

    <div>
      <label className="block mb-2 font-medium text-slate-700">
        Client Name
      </label>

      <input
        type="text"
        placeholder="John Doe"
        value={clientName}
onChange={(e) => setClientName(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Email
        </label>

        <input
          type="email"
          placeholder="john@example.com"
          value={clientEmail}
onChange={(e) => setClientEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Phone Number
        </label>

        <input
          type="tel"
          placeholder="+254..."
          value={clientPhone}
onChange={(e) => setClientPhone(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>
    </div>

    <div>
      <label className="block mb-2 font-medium text-slate-700">
        Company
      </label>

      <input
        type="text"
        placeholder="ABC Company"
        value={company}
onChange={(e) => setCompany(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium text-slate-700">
        Address
      </label>

      <textarea
        rows="3"
        placeholder="Client address"
        value={address}
onChange={(e) => setAddress(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      ></textarea>
    </div>

  </div>
)}

          {step === 3 && (
  <div className="space-y-6">

    <div className="grid md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Amount (KES)
        </label>

        <input
          type="number"
          placeholder="50000"
          value={amount}
onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Payment Method
        </label>

        <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={paymentMethod}
onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Mpesa</option>
          <option>Bank Transfer</option>
          <option>Cash</option>
          <option>PayPal</option>
          <option>Card</option>
        </select>
      </div>

    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Payment Status
        </label>

        <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={paymentStatus}
onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Partially Paid</option>
          <option>Paid</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-slate-700">
          Due Date
        </label>

        <input
          type="date"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={dueDate}
onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

    </div>

    <div>
      <label className="block mb-2 font-medium text-slate-700">
        Payment Reference
      </label>

      <input
        type="text"
        placeholder="Transaction ID or Invoice Number"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      value={reference}
onChange={(e) => setReference(e.target.value)}
       />
    </div>

    <div>
      <label className="block mb-2 font-medium text-slate-700">
        Notes
      </label>

      <textarea
        rows="3"
        placeholder="Optional notes..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
     value={notes}
onChange={(e) => setNotes(e.target.value)}
     ></textarea>
    </div>

  </div>
)}
        </div>

        <div className="flex justify-between border-t px-8 py-5">

          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl ${
              step === 1
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "border border-slate-300 hover:bg-slate-100"
            }`}
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Create Project
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProjectModal;