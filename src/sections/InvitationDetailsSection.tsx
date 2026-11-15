import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { LotusSticker } from "../components/LotusSticker";

export function InvitationDetailsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const background = scene.querySelector(".invitation-background");
      const intro = scene.querySelector(".invitation-details-intro");
      const people = scene.querySelectorAll(".invitation-person");
      const ampersand = scene.querySelector(".invitation-ampersand");
      const closing = scene.querySelector(".invitation-closing");
      const flourishes = scene.querySelectorAll(".invitation-lotus-sticker");
      const petals = scene.querySelectorAll(".invitation-petal");

      gsap.set([intro, people, ampersand, closing, flourishes, petals], {
        autoAlpha: 0,
      });

      const reveal = () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .fromTo(
            background,
            { scale: 1.055, filter: "saturate(.82) brightness(1.04)" },
            {
              scale: 1,
              filter: "saturate(1) brightness(1)",
              duration: reducedMotion ? 0.01 : 1.8,
            },
          )
          .fromTo(
            intro,
            { autoAlpha: 0, y: 18, letterSpacing: "0.12em" },
            {
              autoAlpha: 1,
              y: 0,
              letterSpacing: "0.045em",
              duration: reducedMotion ? 0.01 : 0.85,
            },
            reducedMotion ? ">" : "-=1.25",
          )
          .fromTo(
            people,
            { autoAlpha: 0, y: 28, filter: "blur(7px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: reducedMotion ? 0.01 : 1,
              stagger: reducedMotion ? 0 : 0.42,
            },
            reducedMotion ? ">" : "-=0.45",
          )
          .fromTo(
            ampersand,
            { autoAlpha: 0, scale: 0.45, rotation: -8 },
            {
              autoAlpha: 1,
              scale: 1,
              rotation: 0,
              duration: reducedMotion ? 0.01 : 0.8,
              ease: "back.out(2)",
            },
            reducedMotion ? ">" : "-=1.36",
          )
          .fromTo(
            closing,
            { autoAlpha: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: reducedMotion ? 0.01 : 1.05,
            },
            reducedMotion ? ">" : "-=0.28",
          )
          .fromTo(
            flourishes,
            { autoAlpha: 0, scale: 0.5, rotation: -15 },
            {
              autoAlpha: 0.78,
              scale: 1,
              rotation: 0,
              stagger: reducedMotion ? 0 : 0.14,
              duration: reducedMotion ? 0.01 : 0.7,
              ease: "back.out(1.8)",
            },
            reducedMotion ? ">" : "-=0.75",
          )
          .fromTo(
            petals,
            { autoAlpha: 0, y: -20, rotation: -20 },
            {
              autoAlpha: 0.76,
              y: 0,
              rotation: 0,
              stagger: reducedMotion ? 0 : 0.07,
              duration: reducedMotion ? 0.01 : 0.55,
            },
            "<",
          );

        if (!reducedMotion) {
          gsap.to(flourishes, {
            y: -7,
            rotation: 2.5,
            duration: 3.2,
            stagger: 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          petals.forEach((petal, index) => {
            gsap.fromTo(
              petal,
              {
                y: -30 - (index % 3) * 18,
                x: 0,
                rotation: index % 2 ? -25 : 20,
              },
              {
                y: () => scene.clientHeight * (0.42 + (index % 4) * 0.06),
                x: index % 2 ? -18 : 18,
                rotation: index % 2 ? -150 : 165,
                duration: 5.8 + (index % 4) * 0.8,
                delay: index * 0.68,
                repeat: -1,
                repeatDelay: 0.45 + (index % 3) * 0.3,
                ease: "none",
              },
            );
          });
        }
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          reveal();
          observer.disconnect();
        },
        { threshold: 0.24 },
      );
      observer.observe(section);

      if (!reducedMotion) {
        const moveX = gsap.quickTo(scene, "rotationY", { duration: 0.75, ease: "power3.out" });
        const moveY = gsap.quickTo(scene, "rotationX", { duration: 0.75, ease: "power3.out" });
        const handlePointerMove = (event: PointerEvent) => {
          const bounds = scene.getBoundingClientRect();
          moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 1.2);
          moveY(-((event.clientY - bounds.top) / bounds.height - 0.5) * 0.8);
        };
        const resetTilt = () => {
          moveX(0);
          moveY(0);
        };
        scene.addEventListener("pointermove", handlePointerMove);
        scene.addEventListener("pointerleave", resetTilt);
        return () => {
          observer.disconnect();
          scene.removeEventListener("pointermove", handlePointerMove);
          scene.removeEventListener("pointerleave", resetTilt);
        };
      }

      return () => observer.disconnect();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="invitation-details-section"
      aria-labelledby="invitation-details-title"
    >
      <div ref={sceneRef} className="invitation-details-scene">
        <img
          className="invitation-background"
          src="/images/invitation-details-background.jpg"
          alt=""
          aria-hidden="true"
        />

        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index}
            className={`invitation-petal invitation-petal-${index + 1}`}
            aria-hidden="true"
          />
        ))}

        <div className="invitation-details-copy">
          <p id="invitation-details-title" className="invitation-details-intro">
            You are invited to the reception celebration of
          </p>

          <div className="invitation-person">
            <h2>Prateek</h2>
            <LotusSticker className="lotus-left" />
            <p className="family-line">
              <span>Grandson of</span>
              Late Hariom Agarwal &amp; Late Prabha Devi
            </p>
            <p className="family-line">
              <span>Son of</span>
              Mrs. Preeti Agarwal &amp; Mr. Sanjay Agarwal
            </p>
          </div>

          <div className="invitation-ampersand" aria-label="and">
            <span aria-hidden="true">&amp;</span>
          </div>

          <div className="invitation-person">
            <h2>Ishita</h2>
            <LotusSticker className="lotus-right" />
            <p className="family-line">
              <span>Daughter of</span>
              Ms. Aparna Agarwal &amp; Late Sanjeev Agarwal
            </p>
          </div>

          <p className="invitation-closing">
            We cordially invite you to join us in celebrating <strong>
              Prateek &amp; Ishita
            </strong>{" "}
            and their beautiful journey of togetherness.
          </p>
        </div>
      </div>
    </section>
  );
}
