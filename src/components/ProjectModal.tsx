import React, { useState, useImperativeHandle, forwardRef } from "react";

export interface ProjectData {
  title: string;
  icon: string;
  description: string;
  image?: string;
  research?: {
    overview?: string;
    methodology?: string;
    findings?: string[];
    impact?: string;
    technologies?: string[];
    links?: { label: string; url: string }[];
  };
}

export interface ProjectModalProps {
  project?: ProjectData;
  onClose?: () => void;
}

export interface ProjectModalRef {
  open: (project: ProjectData) => void;
  close: () => void;
}

const ProjectModal = forwardRef<ProjectModalRef, ProjectModalProps>(
  ({ onClose }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<ProjectData | undefined>(undefined);

    useImperativeHandle(ref, () => ({
      open: (projectData: ProjectData) => {
        setCurrentProject(projectData);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
        setCurrentProject(undefined);
        onClose?.();
      },
    }));

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setIsOpen(false);
        setCurrentProject(undefined);
        onClose?.();
      }
    };

    if (!isOpen || !currentProject) return null;

    const { title, icon, description, image, research } = currentProject;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <div
          className="w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: "rgba(255,251,242,0.95)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Image */}
          <div className="relative">
            {image && (
              <div className="w-full h-64 sm:h-80 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.style.background = 'linear-gradient(135deg, #ab4e68, #c4a287)';
                    }
                  }}
                />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setCurrentProject(undefined);
                  onClose?.();
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95"
                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="rounded-xl p-3 shrink-0" style={{ backgroundColor: '#fffbf2', color: '#7e1946', border: '1px solid #c4a287' }}>
                <span className="text-2xl">{icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#7e1946" }}>
                  {title}
                </h2>
                <p className="mt-2 text-sm sm:text-base" style={{ color: "#4b4453" }}>
                  {description}
                </p>
              </div>
            </div>

            {/* Research Information */}
            {research && (
              <div className="space-y-6">
                {research.overview && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "#7e1946" }}>Overview</h3>
                    <p className="text-sm sm:text-base" style={{ color: "#4b4453" }}>{research.overview}</p>
                  </div>
                )}

                {research.methodology && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "#7e1946" }}>Methodology</h3>
                    <p className="text-sm sm:text-base" style={{ color: "#4b4453" }}>{research.methodology}</p>
                  </div>
                )}

                {research.findings && research.findings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: "#7e1946" }}>Key Findings</h3>
                    <ul className="space-y-2">
                      {research.findings.map((finding, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-sm mt-1" style={{ color: "#ab4e68" }}>•</span>
                          <p className="text-sm sm:text-base flex-1" style={{ color: "#4b4453" }}>{finding}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {research.impact && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "#7e1946" }}>Impact</h3>
                    <p className="text-sm sm:text-base" style={{ color: "#4b4453" }}>{research.impact}</p>
                  </div>
                )}

                {research.technologies && research.technologies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: "#7e1946" }}>Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {research.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "#fffbf2", color: "#7e1946", border: "1px solid #c4a287" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {research.links && research.links.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: "#7e1946" }}>Resources</h3>
                    <div className="flex flex-col gap-2">
                      {research.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:opacity-80 hover:underline"
                          style={{ color: "#ab4e68" }}
                        >
                          {link.label}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProjectModal.displayName = "ProjectModal";

export default ProjectModal;

