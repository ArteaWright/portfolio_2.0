import React, { useState, useImperativeHandle, forwardRef } from "react";

export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "textarea" | "tel" | "url";
  required?: boolean;
}

export interface FormModalProps {
  title: string;
  subtitle?: string;
  fields: FormField[];
  buttonText?: string;
  onSubmit?: (formData: Record<string, string>) => void;
  onClose?: () => void;
}

export interface FormModalRef {
  open: () => void;
  close: () => void;
}

const FormModal = forwardRef<FormModalRef, FormModalProps>(
  ({ title, subtitle, fields, buttonText = "Submit", onSubmit, onClose }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});
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
        setFormData({});
        setIsSuccess(false);
        setIsSubmitting(false);
        onClose?.();
      },
    }));

    const handleInputChange = (name: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setIsSuccess(false);
      
      try {
        await onSubmit?.(formData);
        // Show success animation
        setIsSuccess(true);
        setIsSubmitting(false);
        
        // Close modal after success animation
        setTimeout(() => {
          setIsOpen(false);
          setFormData({});
          setIsSuccess(false);
        }, 1500);
      } catch (error) {
        // Keep modal open if there's an error
        setIsSubmitting(false);
        setIsSuccess(false);
        console.error('Form submission error:', error);
      }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setIsOpen(false);
        setFormData({});
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
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm" style={{ color: "#4b4453" }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {isSuccess ? (
              // Success Animation
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce" style={{ backgroundColor: '#ab4e68' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold" style={{ color: '#7e1946' }}>Thank you!</p>
                <p className="text-sm text-center" style={{ color: '#4b4453' }}>Your inquiry has been submitted successfully.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {fields.map((field) => (
                  <label key={field.name} className="text-sm">
                    <span className="mb-1 block" style={{ color: "#7e1946" }}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={4}
                        className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ borderColor: "#c4a287" }}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        required={field.required}
                        disabled={isSubmitting}
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ borderColor: "#c4a287" }}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        required={field.required}
                        disabled={isSubmitting}
                      />
                    )}
                  </label>
                ))}
              </div>
            )}

            {/* Footer */}
            {!isSuccess && (
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setFormData({});
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
                    buttonText
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

FormModal.displayName = "FormModal";

export default FormModal;

