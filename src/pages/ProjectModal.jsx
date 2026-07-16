import { useState } from "react";
import { X } from "lucide-react";

function ProjectModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

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
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Project Information
              </h3>

              <p className="text-slate-600">
                Project fields will go here.
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Client Information
              </h3>

              <p className="text-slate-600">
                Client fields will go here.
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Payment Information
              </h3>

              <p className="text-slate-600">
                Payment fields will go here.
              </p>
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