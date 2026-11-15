import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

const ASSET_ROOT = "/envelope-cutouts/mobile";

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const blessingRef = useRef<HTMLParagraphElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const namesRef = useRef<HTMLHeadingElement>(null);
  const coupleRef = useRef<HTMLImageElement>(null);
  const scrollCueRef = useRef<HTMLAnchorElement>(null);
  const unlockTimerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;

    if (!canScroll) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [canScroll]);

  useEffect(
    () => () => {
      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
      }
    },
    [],
  );

  useLayoutEffect(() => {
    if (!isOpen || !heroContentRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: reducedMotion ? 0.1 : 1,
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          logoRef.current,
          {
            autoAlpha: 0,
            y: -12,
            scale: 0.92,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reducedMotion ? 0.01 : 0.85,
          },
        )
        .fromTo(
          blessingRef.current,
          {
            autoAlpha: 0,
            y: 10,
            filter: "blur(3px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reducedMotion ? 0.01 : 0.9,
            ease: "power2.out",
          },
          reducedMotion ? ">" : 1.15,
        )
        .fromTo(
          welcomeRef.current,
          {
            autoAlpha: 0,
            y: 18,
            clipPath: "inset(0 100% 0 0)",
            filter: "blur(5px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0 0% 0 0)",
            filter: "blur(0px)",
            duration: reducedMotion ? 0.01 : 1.15,
            ease: "power2.out",
          },
          reducedMotion ? ">" : "-=0.3",
        )
        .fromTo(
          namesRef.current,
          {
            autoAlpha: 0,
            y: 42,
            scale: 0.9,
            rotationX: -46,
            filter: "blur(8px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: reducedMotion ? 0.01 : 1.35,
            ease: "back.out(1.35)",
          },
          reducedMotion ? ">" : "-=0.28",
        )
        .fromTo(
          coupleRef.current,
          {
            autoAlpha: 0,
            y: 46,
            scale: 0.96,
            filter: "blur(5px) drop-shadow(0 18px 15px rgb(76 43 31 / 0.12))",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter:
              "blur(0px) drop-shadow(0 5px 4px rgb(73 35 30 / 0.16)) drop-shadow(0 18px 15px rgb(76 43 31 / 0.26)) drop-shadow(-10px 25px 28px rgb(86 53 37 / 0.16))",
            duration: reducedMotion ? 0.01 : 1.45,
          },
          reducedMotion ? ">" : "-=0.35",
        )
        .fromTo(
          scrollCueRef.current,
          {
            autoAlpha: 0,
            y: 14,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: reducedMotion ? 0.01 : 0.8,
            ease: "power2.out",
          },
          reducedMotion ? ">" : "-=0.55",
        );
    }, heroContentRef);

    return () => context.revert();
  }, [isOpen]);

  const openEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    void videoRef.current?.play();

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => setIsMusicPlaying(false));
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    unlockTimerRef.current = window.setTimeout(
      () => setCanScroll(true),
      prefersReducedMotion ? 100 : 7800,
    );
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => setIsMusicPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/punjabi-wedding-song.mp3"
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
        onEnded={() => setIsMusicPlaying(false)}
      />

      <img
        ref={logoRef}
        className="wedding-logo"
        src="/images/wedding-monogram.png"
        alt="Prateek and Ishita wedding monogram"
      />

      <section className="hero-section" aria-label="Wedding invitation">
        <video
          ref={videoRef}
          className={`hero-video ${isOpen ? "is-visible" : ""}`}
          src="/video/wedding-hero.mp4"
          poster="/video/wedding-hero-poster.jpg"
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        <div ref={heroContentRef} className={`hero-content ${isOpen ? "is-visible" : ""}`}>
          <div className="hero-copy">
            <p ref={blessingRef} className="hero-blessing" lang="sa">
              ॐ श्री गणेशाय नमः
            </p>
            <p ref={welcomeRef} className="hero-welcome">
              Welcome to the reception celebration of
            </p>
            <h1 ref={namesRef} className="hero-names">
              Prateek <span>&amp;</span> Ishita
            </h1>
          </div>

          <img
            ref={coupleRef}
            className="couple-cutout"
            src="/images/ishita-prateek-cutout.png"
            alt="Prateek and Ishita"
          />

          <a
            ref={scrollCueRef}
            className="scroll-cue"
            href="#next-section"
            aria-label="Scroll down to see more"
          >
            <span>Scroll down</span>
            <span className="scroll-cue-arrows" aria-hidden="true">
              <span className="scroll-cue-arrow" />
              <span className="scroll-cue-arrow" />
            </span>
          </a>
        </div>

        <div
          className={`envelope-preloader ${isOpen ? "is-opening" : ""}`}
          onClick={openEnvelope}
        >
          <div className="fullscreen-envelope" aria-label="Open the envelope">
            <div className="envelope-underlay" aria-hidden="true" />
            <div className="envelope-light" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <img
              className="envelope-piece envelope-left"
              src={`${ASSET_ROOT}/envelope-left-mobile.png`}
              alt=""
              aria-hidden="true"
            />
            <img
              className="envelope-piece envelope-right"
              src={`${ASSET_ROOT}/envelope-right-mobile.png`}
              alt=""
              aria-hidden="true"
            />
            <img
              className="envelope-piece envelope-bottom"
              src={`${ASSET_ROOT}/envelope-bottom-mobile.png`}
              alt=""
              aria-hidden="true"
            />

            <div className="top-envelope-piece">
              <img
                className="envelope-piece envelope-top envelope-top-front"
                src={`${ASSET_ROOT}/envelope-top-mobile.png`}
                alt=""
                aria-hidden="true"
              />
              <img
                className="envelope-piece envelope-top envelope-top-back"
                src={`${ASSET_ROOT}/envelope-top-mobile.png`}
                alt=""
                aria-hidden="true"
              />
              <button
                className="seal-button"
                type="button"
                onClick={openEnvelope}
                disabled={isOpen}
                aria-label="Open the wedding invitation"
              >
                <span className="seal-cue" aria-hidden="true">
                  Tap Here!
                </span>
                <img src={`${ASSET_ROOT}/envelope-stamp.png`} alt="" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <button
          className={`music-control ${isMusicPlaying ? "is-playing" : ""}`}
          type="button"
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? "Pause wedding music" : "Play wedding music"}
          aria-pressed={isMusicPlaying}
          title={isMusicPlaying ? "Pause music" : "Play music"}
        >
          <span className="music-control-icon" aria-hidden="true">
            {isMusicPlaying ? (
              <>
                <span className="pause-bar" />
                <span className="pause-bar" />
              </>
            ) : (
              <span className="play-triangle" />
            )}
          </span>
          <span className="music-control-ring" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
