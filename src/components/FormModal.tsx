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

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => {
        setIsOpen(false);
        setFormData({});
        onClose?.();
      },
    }));

    const handleInputChange = (name: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(formData);
      setIsOpen(false);
      setFormData({});
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
                      className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2"
                      style={{ borderColor: "#c4a287" }}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2"
                      style={{ borderColor: "#c4a287" }}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  )}
                </label>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setFormData({});
                  onClose?.();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold border"
                style={{ color: "#7e1946", borderColor: "#c4a287" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow"
                style={{ backgroundColor: "#ab4e68" }}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

FormModal.displayName = "FormModal";

export default FormModal;

