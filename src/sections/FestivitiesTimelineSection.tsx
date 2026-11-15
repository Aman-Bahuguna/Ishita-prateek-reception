import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const festivities = [
  {
    name: "The Yellow Affair",
    detail: "Haldi",
    time: "12:00 PM",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="7" />
        <path d="M24 5v7M24 36v7M5 24h7M36 24h7M10.6 10.6l5 5M32.4 32.4l5 5M37.4 10.6l-5 5M15.6 32.4l-5 5" />
      </svg>
    ),
  },
  {
    name: "Lunch",
    time: "1:30 PM",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 25h32M12 25c.6-9 5.1-13.5 12-13.5S35.4 16 36 25M6 31h36M24 11.5V8" />
        <circle cx="24" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    name: "Bhaat Ceremony",
    time: "4:00 PM",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 8c3.5 6.4 7.8 10.3 14 12-3.2 10.4-7.9 16.8-14 20-6.1-3.2-10.8-9.6-14-20 6.2-1.7 10.5-5.6 14-12Z" />
        <path d="M17 24c3.2.2 5.5 1.9 7 5 1.5-3.1 3.8-4.8 7-5M24 13v16" />
      </svg>
    ),
  },
  {
    name: "Tea & Snacks",
    time: "5:30 PM",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 20h26v8c0 6.1-4.9 11-11 11h-4c-6.1 0-11-4.9-11-11v-8ZM35 23h3.5a5.5 5.5 0 0 1 0 11H34M7 40h32" />
        <path d="M17 15c-2-2-.7-4 1-5.5M25 15c-2-2-.7-4 1-5.5" />
      </svg>
    ),
  },
];

export function FestivitiesTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const eyebrow = section.querySelector(".festivities-eyebrow");
      const title = section.querySelector(".festivities-title");
      const rule = section.querySelector(".festivities-title-rule");
      const items = section.querySelectorAll(".festivity-item");
      const footer = section.querySelector(".festivities-footer");
      const petals = section.querySelectorAll(".festivities-petal");
      const glows = section.querySelectorAll(".festivities-glow");
      const lineProgress = section.querySelector(".festivities-line-progress");
      const markers = section.querySelectorAll(".festivity-marker");

      gsap.set(lineProgress, { scaleY: reducedMotion ? 1 : 0, transformOrigin: "top center" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" },
        })
        .fromTo(
          eyebrow,
          { autoAlpha: 0, y: 12, letterSpacing: "0.3em" },
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: "0.2em",
            duration: reducedMotion ? 0.01 : 0.7,
          },
        )
        .fromTo(
          title,
          { autoAlpha: 0, y: 24, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reducedMotion ? 0.01 : 0.9,
          },
          reducedMotion ? ">" : "-=0.42",
        )
        .fromTo(
          rule,
          { autoAlpha: 0, scaleX: 0 },
          { autoAlpha: 1, scaleX: 1, duration: reducedMotion ? 0.01 : 0.7 },
          reducedMotion ? ">" : "-=0.45",
        )
        .fromTo(
          items,
          {
            autoAlpha: 0,
            y: 26,
            scale: 0.97,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: reducedMotion ? 0 : 0.13,
            duration: reducedMotion ? 0.01 : 0.7,
          },
          reducedMotion ? ">" : "-=0.18",
        )
        .fromTo(
          footer,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: reducedMotion ? 0.01 : 0.65 },
          reducedMotion ? ">" : "-=0.25",
        );

      if (reducedMotion) {
        gsap.set(markers, {
          borderColor: "#9a3150",
          backgroundColor: "#fffaf5",
          boxShadow: "0 6px 16px rgba(92, 44, 58, .1), inset 0 0 0 3px rgba(255, 255, 255, .58)",
        });
        gsap.set(section.querySelectorAll(".festivity-marker-icon"), { color: "#8f2048" });
      } else {
        const glowTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".festivities-timeline",
            start: "top 66%",
            end: "bottom 48%",
            scrub: 0.7,
          },
        });

        glowTimeline.to(
          lineProgress,
          {
            scaleY: 1,
            duration: 1,
            ease: "none",
          },
          0,
        );

        markers.forEach((marker, index) => {
          const position = Math.min(index / Math.max(markers.length - 1, 1), 0.92);
          glowTimeline
            .to(
              marker,
              {
                borderColor: "#9a3150",
                backgroundColor: "#fffaf5",
                boxShadow:
                  "0 6px 16px rgba(92, 44, 58, .1), inset 0 0 0 3px rgba(255, 255, 255, .58)",
                duration: 0.08,
                ease: "power2.out",
              },
              position,
            )
            .to(
              marker.querySelector(".festivity-marker-icon"),
              {
                color: "#8f2048",
                duration: 0.08,
              },
              position,
            );
        });

        gsap.to(glows, {
          yPercent: (index) => (index % 2 ? 22 : -18),
          xPercent: (index) => (index % 2 ? -12 : 14),
          rotation: 18,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        petals.forEach((petal, index) => {
          gsap.to(petal, {
            y: 24 + (index % 3) * 12,
            x: index % 2 ? -11 : 11,
            rotation: index % 2 ? -22 : 24,
            duration: 3.2 + (index % 4) * 0.6,
            delay: index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="festivities-section" aria-labelledby="festivities-title">
      <div className="festivities-glow festivities-glow-one" aria-hidden="true" />
      <div className="festivities-glow festivities-glow-two" aria-hidden="true" />
      {Array.from({ length: 8 }, (_, index) => (
        <span
          className={`festivities-petal festivities-petal-${index + 1}`}
          key={index}
          aria-hidden="true"
        />
      ))}

      <div className="festivities-content">
        <header className="festivities-header">
          <h2 id="festivities-title" className="festivities-title">
            Festivities Timeline
          </h2>
          <div className="festivities-title-rule" aria-hidden="true">
            <span />
          </div>
        </header>

        <div className="festivities-timeline">
          <div className="festivities-line" aria-hidden="true">
            <span className="festivities-line-progress" />
          </div>
          <ol className="festivities-list">
            {festivities.map((festivity) => (
              <li className="festivity-item" key={festivity.name}>
                <div className="festivity-time">
                  <time>{festivity.time}</time>
                </div>
                <div className="festivity-marker" aria-hidden="true">
                  <span className="festivity-marker-icon">{festivity.icon}</span>
                </div>
                <div className="festivity-copy">
                  <h3>{festivity.name}</h3>
                  {festivity.detail && <p>{festivity.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="festivities-footer">Come, celebrate and make memories with us</p>
      </div>
    </section>
  );
}
