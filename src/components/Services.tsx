import React, { useCallback, useEffect, useRef, useState } from "react";
import Section from "./Section";
import Card from "./Card";
import { services, servicesIntro, serviceDetails } from "../data";
import { tonalGradient } from "../lib/color";

const MIDNIGHT_WINE = "#7e1946";
const HEADING_TEXT = "#fffbf2";
const BODY_TEXT = "#ffece0";

// Derived from the base color rather than hardcoded. Contrast is checked against
// the (slightly dimmer) body text so it also holds at the lighter end.
const CARD_GRADIENT = tonalGradient(MIDNIGHT_WINE, BODY_TEXT, { lift: 0.2, minContrast: 4.5 });

interface ServicesProps {
  onBook: () => void;
  children?: React.ReactNode; // closing CTA
}

export default function Services({ onBook, children }: ServicesProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const syncActive = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    activeRef.current = nearest;
    setActiveIndex(nearest);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActive);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [syncActive]);

  const goTo = (index: number) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // One-time CTA highlight on the active card when the carousel scrolls into view.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHighlightIndex(activeRef.current);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(Math.max(0, activeIndex - 1));
    if (e.key === "ArrowRight") goTo(Math.min(services.length - 1, activeIndex + 1));
  };

  const arrowClass =
    "hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 focus:outline-none focus-visible:ring-2";

  return (
    <Section id="services" className="pt-8 sm:pt-12" direction="right">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#ab4e68" }}>{servicesIntro.eyebrow}</p>
        <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight" style={{ color: MIDNIGHT_WINE }}>{servicesIntro.headline}</h2>
        <p className="mx-auto mt-2 max-w-prose text-xs sm:text-sm" style={{ color: "#4b4453" }}>{servicesIntro.subhead}</p>
      </div>

      <div ref={carouselRef} className="mt-6">
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Services"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[8%] py-2 md:px-[16%] focus:outline-none focus-visible:ring-2 rounded-3xl"
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${services.length}`}
              className="flex shrink-0 basis-full snap-center flex-col rounded-3xl p-6 shadow-xl sm:p-8"
              style={{ background: CARD_GRADIENT.css, color: BODY_TEXT }}
            >
              <span
                className="self-start rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: "rgba(255,251,242,0.16)", color: HEADING_TEXT }}
              >
                {service.audience}
              </span>
              <h3 className="mt-4 text-xl font-bold leading-snug sm:text-2xl" style={{ color: HEADING_TEXT }}>{service.title}</h3>
              <p className="mt-3 text-sm">{service.description}</p>
              <p className="mt-5 border-t pt-4 text-base font-semibold" style={{ color: HEADING_TEXT, borderColor: "rgba(255,251,242,0.3)" }}>
                {service.price}
              </p>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <button
                  type="button"
                  onClick={onBook}
                  className={`cta-primary inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold shadow transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95${highlightIndex === i ? " cta-highlight" : ""}`}
                  style={{ backgroundColor: HEADING_TEXT, color: MIDNIGHT_WINE }}
                >
                  {service.primary.label}
                </button>
                <a
                  href={service.secondary.href}
                  className="inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 hover:bg-white/10 hover:scale-[1.03] active:scale-95"
                  style={{ color: HEADING_TEXT, borderColor: HEADING_TEXT }}
                >
                  {service.secondary.label}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous service"
            disabled={activeIndex === 0}
            onClick={() => goTo(activeIndex - 1)}
            className={arrowClass}
            style={{ color: MIDNIGHT_WINE, borderColor: MIDNIGHT_WINE }}
          >
            ←
          </button>
          <div className="flex items-center">
            {services.map((service, i) => (
              <button
                key={service.id}
                type="button"
                aria-label={`Show ${service.title}`}
                aria-current={activeIndex === i}
                onClick={() => goTo(i)}
                className="p-2 focus:outline-none focus-visible:ring-2 rounded-full"
              >
                <span
                  className="block h-2.5 rounded-full transition-all duration-300"
                  style={{ width: activeIndex === i ? 24 : 10, backgroundColor: activeIndex === i ? MIDNIGHT_WINE : "#c4a287" }}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next service"
            disabled={activeIndex === services.length - 1}
            onClick={() => goTo(activeIndex + 1)}
            className={arrowClass}
            style={{ color: MIDNIGHT_WINE, borderColor: MIDNIGHT_WINE }}
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {serviceDetails.map((detail) => (
          <div key={detail.id} id={detail.id}>
            <Card className="h-full">
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: MIDNIGHT_WINE }}>{detail.title}</h3>
              <ol className="mt-3 space-y-3">
                {detail.items.map((item) => (
                  <li key={item.heading}>
                    <p className="text-xs sm:text-sm font-semibold" style={{ color: "#ab4e68" }}>{item.heading}</p>
                    <p className="mt-0.5 text-xs sm:text-sm" style={{ color: "#4b4453" }}>{item.text}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        ))}
      </div>

      {children && <div className="mt-8">{children}</div>}
    </Section>
  );
}
