import React, { useRef, useState } from "react";
import Section from "./components/Section";
import Card from "./components/Card";
import Pill from "./components/Pill";
import Navbar from "./components/Navbar";
import FormModal from "./components/FormModal";
import ProjectModal from "./components/ProjectModal";
import SubscribeModal from "./components/SubscribeModal";
import SubstackModal from "./components/SubstackModal";
import type { FormModalRef, FormField } from "./components/FormModal";
import type { ProjectModalRef } from "./components/ProjectModal";
import type { ProjectData } from "./components/ProjectModal";
import type { SubscribeModalRef, SubscribeFormData } from "./components/SubscribeModal";
import type { SubstackModalRef } from "./components/SubstackModal";
import { fetchSubstackPosts } from "./lib/substack";
import type { SubstackPost } from "./lib/substack";
import { chips, testimonials, workContent, logos, events } from "./data";


const LOGO_DATA_URL = "/images/logo.png";

export default function AW_Speaker_DataScientist() {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const formModalRef = useRef<FormModalRef>(null);
  const projectModalRef = useRef<ProjectModalRef>(null);
  const subscribeModalRef = useRef<SubscribeModalRef>(null);
  const substackModalRef = useRef<SubstackModalRef>(null);
  const [substackPosts, setSubstackPosts] = useState<SubstackPost[]>([]);
  const [substackLoading, setSubstackLoading] = useState(true);

  React.useEffect(() => {
    let cancelled = false;

    fetchSubstackPosts()
      .then((posts) => {
        if (!cancelled) setSubstackPosts(posts);
      })
      .finally(() => {
        if (!cancelled) setSubstackLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
              const baseUrl = "https://www.youtube.com/embed/33EJ-QIHwZg?si=X-EXdg5OWbL_jVpr";
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
        const baseUrl = "https://www.youtube.com/embed/33EJ-QIHwZg?si=X-EXdg5OWbL_jVpr";
        videoRef.current.src = `${baseUrl}&autoplay=1`;
      }
    }
  };

  const handleDownloadResume = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/file/ArteaWright_Resume.pdf';
    link.download = 'ArteaWright_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenFormModal = () => {
    formModalRef.current?.open();
  };

  const handleFormSubmit = async (formData: Record<string, string>) => {
    try {
      // Import supabase client (used here only to invoke the email-sending Edge Function)
      const { supabase } = await import('./lib/supabase');

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) {
        console.error('Failed to send contact email:', error);
        throw error; // Throw error so modal stays open
      }

      console.log('Contact form email sent successfully');
    } catch (error: any) {
      console.error('Form submission error:', error);
      alert(`Error: ${error?.message || 'Failed to send your message. Please try again.'}`);
      throw error; // Re-throw to keep modal open
    }
  };

  const handleSubscribeSubmit = async (formData: SubscribeFormData) => {
    try {
      const { supabase } = await import('./lib/supabase');

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
        alert('Database configuration error. Please contact support.');
        throw new Error('Supabase credentials missing');
      }

      const { error } = await supabase
        .from('web_subs')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phone || null,
            project_adds: formData.projectUpdates,
            substack: formData.substackUpdates,
            workshop: formData.workshopUpdates,
          },
        ]);

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Subscription submitted successfully');
    } catch (error: any) {
      console.error('Subscribe submission error:', error);
      if (error?.message && !error.message.includes('Supabase credentials missing')) {
        alert(`Error: ${error.message}`);
      }
      throw error;
    }
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
      <Navbar onSubscribeClick={() => subscribeModalRef.current?.open()} />

      {/* HERO */}
      <div style={{ backgroundColor: '#2b0818', paddingTop: '20px' }}>
        <Section id="hero" className="flex items-center justify-center min-h-screen max-w-screen-lg">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-stretch w-full lg:h-[85vh]">

          {/* Title Badge - Mobile First */}
          <div className="lg:hidden text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm font-medium" style={{ backgroundColor: '#ffece0', color: '#7e1946' }}>
              <span className="titles">Emerging Tech Advocate • Technologist • Panelist • Consultant</span>
            </div>
          </div>

          {/* Video Side - Desktop Left, Mobile Second */}
          <div className="video w-full flex items-center h-[400px] lg:h-full order-2 lg:order-1">
            {showVideo ? (
              <iframe
                ref={videoRef}
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-xl lg:h-full lg:object-contain"
                src="https://www.youtube.com/embed/33EJ-QIHwZg?si=X-EXdg5OWbL_jVpr&autoplay=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ aspectRatio: '16/9', minHeight: '200px' }}
              ></iframe>
            ) : (
              <div className="w-full h-full relative rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '200px' }}>
                <video
                  src="/videos/HeroVideo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
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
                <span className="titles">Emerging Tech Advocate • Technologist • Panelist • Consultant</span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl lg:mb-6" style={{ color: '#fffbf2' }}>
                The Future is Just Tomorrow, asking if you were paying attention today.
            </h1>
            <p className="mx-auto mt-4 max-w-prose text-sm lg:text-base lg:mx-0 lg:mt-0 lg:mb-8" style={{ color: '#fffbf2' }}>
                Uncovering unseen patterns and converting them into decisions, resources, and products that thrive in a human + emerging tech + machine collaboration era.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start lg:mb-8">
              <p className="text-xs sm:text-sm lg:text-base" style={{ color: '#fffbf2' }}>Topics: </p>
              {chips.map((c) => (
                <Pill key={c}>{c}</Pill>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start lg:mt-0">
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleOpenFormModal(); }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80" style={{ backgroundColor: '#fffbf2', color: '#7e1946' }}>
                📝 Contact Me
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
      <Section id="about" className="pt-8 sm:pt-12" direction="left">
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
              Over the last 6 years, I've worked to close the gap between the people shaping tomorrow and connecting mid-career professionals, forward-thinking organizations, and nontraditional talent to the emerging tech spaces that will define what comes next.

My work spans workshops that give people hands-on exposure to emerging technology, fractional consulting that helps organizations diagnose what's broken and architect what comes next, advisory roles guiding curriculum and talent pipeline decisions, and speaking that challenges audiences to position proactively instead of reactively. Whether I'm in a room full of early-career technologists or advising decision-makers on inclusive hiring pipelines, the throughline is the same — reading the signals early, connecting people to real opportunity, and building a future that belongs to more of us.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs" style={{ color: '#9d9171' }}>
                <span>🎓 Upskilling Workshops</span>
                <span>🏛️ Insights & Research</span>
                <span>📅 10+ talks</span>
              </div>
            </div>
          </div>
        </Card>
        <button
          onClick={handleDownloadResume}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80"
          style={{ backgroundColor: '#ab4e68' }}
        >
          Download Resume
        </button>

        <div className="mt-6 text-center">
          <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#7e1946' }}>Need Hands-On Support?</h3>
          <p className="mt-1 text-xs sm:text-sm" style={{ color: '#4b4453' }}>
            For organizations and professionals looking for consultant support with Future-Fit Careers and Talent services and emerging tech integration.
          </p>
        </div>
        <a
          href="https://www.paypal.com/ncp/payment/9L4MJ58MBKGDL"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80"
          style={{ backgroundColor: '#2b0818' }}
        >
          Book a Consultation
        </a>
      </Section>

      {/* WORK EXPERIENCE */}
      <Section id="work" className="pt-8 sm:pt-12" direction="right">
        <h2 className="mb-4 text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>Applied Work and Impact</h2>
        <p className="text-xs sm:text-sm" style={{ color: '#4b4453' }}>
          Data and research translated to real-world solutions.
        </p>
        <div className="mt-4 w-full overflow-hidden rounded-2xl shadow-xl" style={{ aspectRatio: '16/9', maxHeight: '360px' }}>
          <video
            src="/videos/RoboticAgMachine.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
          {workContent.map((project) => {
            const { k, i, t, image } = project;
            return (
              <Card 
                key={k} 
                className="project_cards overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer group"
                onClick={() => {
                  const projectData: ProjectData = {
                    title: k,
                    icon: i,
                    description: t,
                    image: image,
                    research: (project as any).research
                  };
                  projectModalRef.current?.open(projectData);
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Image Section */}
                  {image && (
                    <div className="w-full h-40 sm:h-48 overflow-hidden rounded-t-xl relative">
                      <img
                        src={image}
                        alt={k}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        onError={(e) => {
                          // Fallback to a gradient background if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.style.background = 'linear-gradient(135deg, #ab4e68, #c4a287)';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  {/* Content Section */}
                  <div className="flex items-start gap-3 p-4 flex-1 transition-colors duration-300 group-hover:bg-white/50">
                    <div className="rounded-xl p-2 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" aria-hidden style={{ backgroundColor: '#fffbf2', color: '#7e1946', border: '1px solid #c4a287' }}>{i}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold transition-colors duration-300 group-hover:text-[#ab4e68]" style={{ color: '#7e1946' }}>{k}</p>
                      <p className="text-sm mt-1" style={{ color: '#4b4453' }}>{t}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* SUBSTACK */}
      <Section id="substack" className="pt-8 sm:pt-12" direction="left">
        <h2 className="mb-4 text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>Substack</h2>
        <div className="grid grid-cols-1 gap-4">
          {substackLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <Card key={idx} className="animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl p-2 shrink-0 h-9 w-9" aria-hidden style={{ backgroundColor: '#fffbf2', border: '1px solid #c4a287' }} />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-4 rounded" style={{ backgroundColor: '#f0e6d6', width: '60%' }} />
                    <div className="h-3 rounded" style={{ backgroundColor: '#f0e6d6', width: '90%' }} />
                    <div className="h-3 rounded" style={{ backgroundColor: '#f0e6d6', width: '30%' }} />
                  </div>
                </div>
              </Card>
            ))
          ) : substackPosts.length > 0 ? (
            substackPosts.map((post) => (
              <Card
                key={post.slug}
                className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
                onClick={() => substackModalRef.current?.open(post)}
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl p-2 shrink-0" aria-hidden style={{ backgroundColor: '#fffbf2', color: '#7e1946', border: '1px solid #c4a287' }}>📰</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base" style={{ color: '#7e1946' }}>{post.title}</h3>
                    <p className="mt-1 text-xs sm:text-sm" style={{ color: '#4b4453' }}>{post.description || `${post.excerpt.slice(0, 140)}…`}</p>
                    <p className="mt-2 text-xs" style={{ color: '#9d9171' }}>
                      {new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                      {" • "}{post.readingTimeMinutes} min read
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <div className="flex items-start gap-3">
                <div className="rounded-xl p-2 shrink-0" aria-hidden style={{ backgroundColor: '#fffbf2', color: '#7e1946', border: '1px solid #c4a287' }}>📰</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base" style={{ color: '#7e1946' }}>New Articles Coming Soon</h3>
                  <p className="mt-1 text-xs sm:text-sm" style={{ color: '#4b4453' }}>Subscribe to get notified the moment new posts go live.</p>
                </div>
              </div>
            </Card>
          )}
        </div>
        <a href="https://arteaintech.substack.com/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 active:opacity-80" style={{ backgroundColor: '#2b0818' }}>
          Subscribe for More
        </a>
      </Section>

      {/* EVENTS */}
      <Section id="events" className="pt-8 sm:pt-12" direction="right">
        <h2 className="mb-4 text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#7e1946' }}>Workshops</h2>
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
      <Section id="testimonials" className="pt-8 sm:pt-12 pb-8 sm:pb-12" direction="left">
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
          <p>© {new Date().getFullYear()} Artea Wright. Centering clear insights in the age of emerging tech convergence.</p>
        </div>
      </footer>

      {/* CHATBOT */}
      {/* <Chatbot /> */}

      {/* FORM MODAL */}
      <FormModal
        ref={formModalRef}
        title="What can I help you with?"
        subtitle="Thanks for reaching out! Please fill out the form below and I'll get back to you within 2 business days."
        fields={formFields}
        buttonText="✉️ Send Inquiry"
        onSubmit={handleFormSubmit}
      />

      {/* PROJECT MODAL */}
      <ProjectModal ref={projectModalRef} />

      {/* SUBSCRIBE MODAL */}
      <SubscribeModal ref={subscribeModalRef} onSubmit={handleSubscribeSubmit} />

      {/* SUBSTACK MODAL */}
      <SubstackModal ref={substackModalRef} />
    </div>
  );
}
