import React, { useRef, useState } from "react";
import Section from "./components/Section";
import Card from "./components/Card";
import Pill from "./components/Pill";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import FormModal from "./components/FormModal";
import type { FormModalRef, FormField } from "./components/FormModal";
import { chips, topics, testimonials, workContent, logos, events } from "./data";


const LOGO_DATA_URL = "/images/logo.png";

export default function AW_Speaker_DataScientist() {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const formModalRef = useRef<FormModalRef>(null);

  // Enhanced smooth and slow scrolling
  React.useEffect(() => {
    const smoothScrollTo = (targetY: number, duration: number = 1200) => {
      const startY = window.pageYOffset;
      const distance = targetY - startY;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            smoothScrollTo(offsetPosition, 1200); // 1200ms for slower scroll
          }
        }
      }
    };

    // Add smooth scroll behavior to all anchor links
    document.addEventListener('click', handleSmoothScroll, true);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll, true);
    };
  }, []);

  const handleLearnMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Scroll to video section smoothly and slowly
    const videoSection = document.getElementById('hero');
    if (videoSection) {
      const headerOffset = 80;
      const elementPosition = videoSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Use the same smooth scroll function
      const smoothScrollTo = (targetY: number, duration: number = 1200) => {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime: number | null = null;

        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const ease = easeInOutCubic(progress);

          window.scrollTo(0, startY + distance * ease);

          if (progress < 1) {
            requestAnimationFrame(animation);
          } else {
            // After scroll completes, show video
            setShowVideo(true);
            if (videoRef.current) {
              const baseUrl = "https://www.youtube.com/embed/EaF5SGvw5tI?si=mgH-hs2QPlzN7jPN";
              videoRef.current.src = `${baseUrl}&autoplay=1`;
            }
          }
        };

        requestAnimationFrame(animation);
      };

      smoothScrollTo(offsetPosition, 1200);
    } else {
      setShowVideo(true);
      if (videoRef.current) {
        const baseUrl = "https://www.youtube.com/embed/EaF5SGvw5tI?si=mgH-hs2QPlzN7jPN";
        videoRef.current.src = `${baseUrl}&autoplay=1`;
      }
    }
  };

  const handleDownloadResume = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/file/ArteaWright_Data-Science.pdf';
    link.download = 'ArteaWright_Data-Science.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenFormModal = () => {
    formModalRef.current?.open();
  };

  const handleFormSubmit = (formData: Record<string, string>) => {
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call or other logic here
  };

  const formFields: FormField[] = [
    { name: "name", label: "Your Name", placeholder: "Ada Lovelace", type: "text", required: true },
    { name: "email", label: "Email", placeholder: "you@example.edu", type: "email", required: true },
    { name: "organization", label: "Organization", placeholder: "Bootcamp, institute, or company", type: "text", required: false },
    { name: "message", label: "Message", placeholder: "Tell me about your audience, goals, and dates.", type: "textarea", required: false },
  ];

  return (
    <div className="min-h-screen text-gray-900" style={{ background: "linear-gradient(to bottom, #fffbf2, #ffffff)" }}>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div style={{ backgroundColor: '#2b0818', paddingTop: '20px' }}>
        <Section id="hero" className="flex items-center justify-center min-h-screen max-w-screen-lg">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-stretch w-full lg:h-[85vh]">

          {/* Title Badge - Mobile First */}
          <div className="lg:hidden text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm font-medium" style={{ backgroundColor: '#ffece0', color: '#7e1946' }}>
              <span className="titles">Data Scientist • Keynote Speaker • Panelist • Consultant</span>
            </div>
          </div>

          {/* Video Side - Desktop Left, Mobile Second */}
          <div className="video w-full flex items-center lg:h-full order-2 lg:order-1">
            {showVideo ? (
              <iframe
                ref={videoRef}
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-xl lg:h-full lg:object-contain"
                src="https://www.youtube.com/embed/EaF5SGvw5tI?si=mgH-hs2QPlzN7jPN&autoplay=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ aspectRatio: '16/9', minHeight: '200px' }}
              ></iframe>
            ) : (
              <div className="w-full h-full relative rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '200px' }}>
                <img
                  src="/images/headshot.jpg"
                  alt="Artea Wright"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content Side - Desktop Right, Mobile Third */}
          <div className="introduction text-center lg:text-left lg:flex lg:flex-col lg:justify-center lg:h-full order-3 lg:order-2">
            {/* Title Badge - Desktop Only */}
            <div className="hidden lg:block mb-6 lg:mb-8">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm font-medium" style={{ backgroundColor: '#ffece0', color: '#7e1946' }}>
                <span className="titles">Data Scientist • Keynote Speaker • Panelist • Consultant</span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl lg:mb-6" style={{ color: '#fffbf2' }}>
                Pattern Discovery in Human–Machine Collaboration.
            </h1>
            <p className="mx-auto mt-4 max-w-prose text-sm lg:text-base lg:mx-0 lg:mt-0 lg:mb-8" style={{ color: '#fffbf2' }}>
                Uncovering unseen patterns and converting them into decisions, systems, and products for the future of human–machine collaboration.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start lg:mb-8">
              <p className="text-xs sm:text-sm lg:text-base" style={{ color: '#fffbf2' }}>Topics: </p>
              {chips.map((c) => (
                <Pill key={c}>{c}</Pill>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start lg:mt-0">
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleOpenFormModal(); }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80" style={{ backgroundColor: '#fffbf2', color: '#7e1946' }}>
                🎤 Invite to Speak
              </a>
              <a href="#reel" onClick={handleLearnMoreClick} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-200 hover:bg-white/10 hover:scale-105 active:scale-95 active:bg-white/5" style={{ color: '#fffbf2', borderColor: '#fffbf2' }}>
                ▶️ Learn More
              </a>
            </div>
          </div>
        </div>
        </Section>

         {/* SOCIAL PROOF */}
      <Section id="logos" className="pt-8 pb-8">
      <p className="text-sm lg:text-base" style={{ color: '#7e1946' }}>...Partners, Employers, and Collaborators:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center gap-4 opacity-70">
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt={`Logo ${index + 1}`} className="py-2 text-center text-xs w-full h-auto object-contain" style={{ color: '#9d9171' }}/>
          ))}
        </div>
      </Section>
      </div>


      {/* ABOUT */}
      <Section id="about" className="pt-8 sm:pt-12">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row">
            {LOGO_DATA_URL ? (
              <img src={LOGO_DATA_URL} alt="Speaker mark" className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 self-center rounded-2xl object-contain sm:self-start" />
            ) : (
              <div aria-label="Speaker portrait placeholder" role="img" className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 self-center rounded-2xl sm:self-start" style={{ background: 'linear-gradient(135deg,#ab4e68,#c4a287)' }} />
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>About Artea</h2>
              <p className="mt-2 text-xs sm:text-sm" style={{ color: '#4b4453' }}>
              Artea serves as a voice advocating for the anticipation and architecting of the future of human–machine collaboration. By blending data science, software engineering, and Generative AI, she surfaces unseen patterns and converts them into decisions about design systems, and products. Current focus through 2030: the impact of the converging emerging technologies on the future of work in tech; The mission: equip institutions and communities to modernize curricula, build equitable pathways, and ensure the workforce thrives in a rapidly changing economy.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs" style={{ color: '#9d9171' }}>
                <span>🎓 Faculty PD</span>
                <span>🏛️ Policy & Industry</span>
                <span>📅 100+ talks</span>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* WORK EXPERIENCE */}
      <Section id="work" className="pt-8 sm:pt-12">
        <h2 className="mb-4 text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>Applied Work and Impact</h2>
        <p className="text-xs sm:text-sm" style={{ color: '#4b4453' }}>
          Data and research translated to real-world solutions. Delivering measurable outcomes for businesses and institutions.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
          {workContent.map(({ k, i, t }) => (
            <Card key={k} className="project_cards">
              <div className="flex items-start gap-3">
                <div className="rounded-xl p-2 shrink-0" aria-hidden style={{ backgroundColor: '#fffbf2', color: '#7e1946', border: '1px solid #c4a287' }}>{i}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#7e1946' }}>{k}</p>
                  <p className="text-sm mt-1" style={{ color: '#4b4453' }}>{t}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* TOPICS & FORMATS */}
      <Section id="topics" className="pt-8 sm:pt-12">
        <h2 className="mb-4 text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>Talks & Formats</h2>
        <div id="download-resume" className="grid grid-cols-1 gap-4">
          {topics.map((t) => (
            <Card key={t.title}>
              <div className="flex items-start gap-3">
                <div className="rounded-xl p-2 shrink-0" aria-hidden style={{ backgroundColor: '#fffbf2', color: '#7e1946', border: '1px solid #c4a287' }}>{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base" style={{ color: '#7e1946' }}>{t.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm" style={{ color: '#4b4453' }}>{t.blurb}</p>
                  {t.formats && t.formats.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {t.formats.map((format) => (
                        <Pill key={format}>{format}</Pill>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* Buttons for Requests */}
        <a href="https://calendly.com/arteawright/30min" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80" style={{ backgroundColor: '#2b0818' }}>
          Request an Introductory Call
        </a>
        <button 
          onClick={handleDownloadResume}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80" 
          style={{ backgroundColor: '#ab4e68' }}
        >
          Download Resume
        </button>
      </Section>
      
      {/* EVENTS */}
      <Section id="events" className="pt-8 sm:pt-12">
        <h2 className="mb-4 text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>Upcoming Talks</h2>
        <div className="grid grid-cols-1 gap-4">
          {events.map((event, index) => (
            <Card key={index}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium" style={{ color: '#7e1946' }}>{event.title}</h3>
                  <p className="text-xs mt-1 break-words" style={{ color: '#9d9171' }}>{event.date} • {event.location}</p>
                </div>
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium shrink-0 transition-all duration-200 hover:opacity-80 hover:underline active:opacity-70" style={{ color: '#ab4e68' }}>
                  Details →
                </a>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-sm" style={{ color: '#4b4453', fontWeight: 'bold' }}>...</p>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" className="pt-8 sm:pt-12 pb-8 sm:pb-12">
        <h2 className="mb-4 text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>Testimonials</h2>
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((t, idx) => (
            <Card key={idx}>
              <p className="text-sm italic" style={{ color: '#4b4453' }}>“{t.quote}”</p>
              <p className="mt-2 text-xs" style={{ color: '#9d9171' }}>— {t.by}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      {/* <Section id="contact" className="pt-12 pb-16">
        <Card>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>Invite to Speak</h2>
          <p className="mt-2 text-sm" style={{ color: '#4b4453' }}>
            Share your event or program needs. You'll receive a response within 2 business days.
          </p>
          <div className="mt-4">
            <button
              onClick={handleOpenFormModal}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white" 
              style={{ backgroundColor: '#ab4e68' }}
            >
              ✉️ Send Inquiry
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4" style={{ color: '#9d9171' }}>
            <a href="#" aria-label="LinkedIn" className="rounded p-2 hover:bg-gray-100">in</a>
            <a href="#" aria-label="Twitter / X" className="rounded p-2 hover:bg-gray-100">𝕏</a>
          </div>
        </Card>
      </Section> */}

      {/* FOOTER */}
      <footer className="border-t border-black/5 py-8" style={{ backgroundColor: 'rgba(255,251,242,0.9)' }}>
        <div className="mx-auto max-w-screen-md px-4 text-center text-xs" style={{ color: '#9d9171' }}>
          <p>© {new Date().getFullYear()} Artea Wright. Centering clear insights in the age of AI convergence in tech.</p>
        </div>
      </footer>

      {/* CHATBOT */}
      <Chatbot />

      {/* FORM MODAL */}
      <FormModal
        ref={formModalRef}
        title="Invite to Speak"
        subtitle="Share your event or program needs. You'll receive a response within 2 business days."
        fields={formFields}
        buttonText="✉️ Send Inquiry"
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
