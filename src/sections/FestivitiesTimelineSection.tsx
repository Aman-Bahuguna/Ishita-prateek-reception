import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const festivities = [
  {
    name: "Reception Ceremony",
    time: "7:00 PM",
    icon: "🎉",
  },
  {
    name: "Dinner",
    time: "8:00 PM",
    icon: "🍽️",
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
          <p className="festivities-eyebrow">Event timeline</p>
          <h2 id="festivities-title" className="festivities-title">
            Evening of Elegance
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
                  <span className="festivity-marker-icon festivity-marker-emoji">
                    {festivity.icon}
                  </span>
                </div>
                <div className="festivity-copy">
                  <h3>{festivity.name}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="festivities-footer">
          06 · 12 · 2026 — come celebrate and make memories with us
        </p>
      </div>
    </section>
  );
}
