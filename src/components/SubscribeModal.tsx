import React, { useState, useImperativeHandle, forwardRef } from "react";

export interface SubscribeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectUpdates: boolean;
  substackUpdates: boolean;
  workshopUpdates: boolean;
}

export interface SubscribeModalProps {
  onSubmit?: (data: SubscribeFormData) => void | Promise<void>;
  onClose?: () => void;
}

export interface SubscribeModalRef {
  open: () => void;
  close: () => void;
}

const emptyForm: SubscribeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  projectUpdates: false,
  substackUpdates: false,
  workshopUpdates: false,
};

const SubscribeModal = forwardRef<SubscribeModalRef, SubscribeModalProps>(
  ({ onSubmit, onClose }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<SubscribeFormData>(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
        setIsSuccess(false);
        setIsSubmitting(false);
      },
      close: () => {
        setIsOpen(false);
        setFormData(emptyForm);
        setIsSuccess(false);
        setIsSubmitting(false);
        onClose?.();
      },
    }));

    const handleFieldChange = (name: keyof SubscribeFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: keyof SubscribeFormData) => {
      setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setIsSuccess(false);

      try {
        await onSubmit?.(formData);
        setIsSuccess(true);
        setIsSubmitting(false);

        setTimeout(() => {
          setIsOpen(false);
          setFormData(emptyForm);
          setIsSuccess(false);
        }, 1500);
      } catch (error) {
        setIsSubmitting(false);
        setIsSuccess(false);
        console.error("Subscribe submission error:", error);
      }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setIsOpen(false);
        setFormData(emptyForm);
        onClose?.();
      }
    };

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <div
          className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden my-auto"
          style={{ backgroundColor: "rgba(255,251,242,0.95)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-black/5" style={{ backgroundColor: "#fffbf2" }}>
            <h2 className="text-xl font-bold tracking-tight" style={{ color: "#7e1946" }}>
              Subscribe for Updates
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#4b4453" }}>
              Get notified about new projects, Substack posts, and upcoming workshops.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce" style={{ backgroundColor: "#ab4e68" }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold" style={{ color: "#7e1946" }}>You're subscribed!</p>
                <p className="text-sm text-center" style={{ color: "#4b4453" }}>Thanks for signing up for updates.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="text-sm">
                    <span className="mb-1 block" style={{ color: "#7e1946" }}>
                      First Name<span className="text-red-500 ml-1">*</span>
                    </span>
                    <input
                      type="text"
                      className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ borderColor: "#c4a287" }}
                      placeholder="Ada"
                      value={formData.firstName}
                      onChange={(e) => handleFieldChange("firstName", e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block" style={{ color: "#7e1946" }}>
                      Last Name<span className="text-red-500 ml-1">*</span>
                    </span>
                    <input
                      type="text"
                      className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ borderColor: "#c4a287" }}
                      placeholder="Lovelace"
                      value={formData.lastName}
                      onChange={(e) => handleFieldChange("lastName", e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </label>
                </div>

                <label className="text-sm">
                  <span className="mb-1 block" style={{ color: "#7e1946" }}>
                    Email<span className="text-red-500 ml-1">*</span>
                  </span>
                  <input
                    type="email"
                    className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: "#c4a287" }}
                    placeholder="you@example.edu"
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </label>

                <label className="text-sm">
                  <span className="mb-1 block" style={{ color: "#7e1946" }}>
                    Phone <span style={{ color: "#9d9171" }}>(optional)</span>
                  </span>
                  <input
                    type="tel"
                    className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: "#c4a287" }}
                    placeholder="(555) 555-5555"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    disabled={isSubmitting}
                  />
                </label>

                <div className="text-sm">
                  <span className="mb-2 block" style={{ color: "#7e1946" }}>
                    What would you like updates on?
                  </span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.projectUpdates}
                        onChange={() => handleCheckboxChange("projectUpdates")}
                        disabled={isSubmitting}
                        className="h-4 w-4 rounded"
                        style={{ accentColor: "#ab4e68" }}
                      />
                      <span style={{ color: "#4b4453" }}>New project updates</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.substackUpdates}
                        onChange={() => handleCheckboxChange("substackUpdates")}
                        disabled={isSubmitting}
                        className="h-4 w-4 rounded"
                        style={{ accentColor: "#ab4e68" }}
                      />
                      <span style={{ color: "#4b4453" }}>New Substack posts</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.workshopUpdates}
                        onChange={() => handleCheckboxChange("workshopUpdates")}
                        disabled={isSubmitting}
                        className="h-4 w-4 rounded"
                        style={{ accentColor: "#ab4e68" }}
                      />
                      <span style={{ color: "#4b4453" }}>New workshops posted</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            {!isSuccess && (
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setFormData(emptyForm);
                    setIsSuccess(false);
                    setIsSubmitting(false);
                    onClose?.();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold border transition-all duration-200 hover:bg-gray-50 hover:scale-105 active:scale-95 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: "#7e1946", borderColor: "#c4a287" }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ backgroundColor: "#ab4e68" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
);

SubscribeModal.displayName = "SubscribeModal";

export default SubscribeModal;