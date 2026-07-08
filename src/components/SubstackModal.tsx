import React, { useState, useImperativeHandle, forwardRef } from "react";
import type { SubstackPost } from "../lib/substack";

export interface SubstackModalProps {
  onClose?: () => void;
}

export interface SubstackModalRef {
  open: (post: SubstackPost) => void;
  close: () => void;
}

const SubstackModal = forwardRef<SubstackModalRef, SubstackModalProps>(
  ({ onClose }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<SubstackPost | undefined>(undefined);

    useImperativeHandle(ref, () => ({
      open: (post: SubstackPost) => {
        setCurrentPost(post);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
        setCurrentPost(undefined);
        onClose?.();
      },
    }));

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setIsOpen(false);
        setCurrentPost(undefined);
        onClose?.();
      }
    };

    if (!isOpen || !currentPost) return null;

    const { title, description, excerpt, url, date, readingTimeMinutes } = currentPost;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <div
          className="w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: "rgba(255,251,242,0.95)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs" style={{ color: "#9d9171" }}>
                {new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                {" • "}{readingTimeMinutes} min read
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setCurrentPost(undefined);
                  onClose?.();
                }}
                className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black/5 hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#7e1946" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#7e1946" }}>
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-sm sm:text-base italic" style={{ color: "#4b4453" }}>
                {description}
              </p>
            )}
            <p className="mt-4 text-sm sm:text-base" style={{ color: "#4b4453" }}>
              {excerpt}
            </p>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80"
              style={{ backgroundColor: "#ab4e68" }}
            >
              Read More on Substack
            </a>
          </div>
        </div>
      </div>
    );
  }
);

SubstackModal.displayName = "SubstackModal";

export default SubstackModal;
