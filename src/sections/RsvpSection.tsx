import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const complimentFamilies = [
  {
    members: ["Mrs. Preeti Agarwal", "Mr. Sanjay Agarwal"],
  },
  {
    members: ["Mrs. Shivani Agarwal", "Mr. Kshitij Agarwal"],
  },
];

export function RsvpSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>(".rsvp-reveal");

      if (reducedMotion) {
        gsap.set(revealItems, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .fromTo(".rsvp-header", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 })
        .fromTo(
          ".rsvp-contact",
          { autoAlpha: 0, y: 26, scale: 0.975 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.85 },
          "-=0.56",
        )
        .fromTo(
          ".rsvp-family",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.13 },
          "-=0.42",
        )
        .fromTo(
          ".rsvp-squad",
          { autoAlpha: 0, y: 30, filter: "blur(4px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 },
          "-=0.28",
        )
        .fromTo(
          ".rsvp-little-ones",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.5",
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="rsvp-section" aria-labelledby="rsvp-title">
      <div className="rsvp-corner rsvp-corner-left" aria-hidden="true" />
      <div className="rsvp-corner rsvp-corner-right" aria-hidden="true" />

      <div className="rsvp-content">
        <header className="rsvp-header rsvp-reveal">
          <p className="rsvp-eyebrow">Your presence is our joy</p>
          <h2 id="rsvp-title">RSVP</h2>
          <p className="rsvp-intro">With excitement and warmth, we await your gracious presence</p>
          <span className="rsvp-divider" aria-hidden="true">
            <i />
          </span>
        </header>

        <div className="rsvp-contact rsvp-reveal">
          <span className="rsvp-contact-label">Kindly RSVP to</span>
          <strong>Mr. Sanjay Agarwal</strong>
        </div>

        <div className="rsvp-compliments">
          <p className="rsvp-compliments-title">With best compliments from</p>
          <div className="rsvp-family-list">
            {complimentFamilies.map((family) => (
              <article className="rsvp-family rsvp-reveal" key={family.members[0]}>
                <h3>
                  {family.members.map((member) => (
                    <span key={member}>{member}</span>
                  ))}
                </h3>
              </article>
            ))}
          </div>
        </div>

        <div className="rsvp-squad rsvp-reveal">
          <span className="rsvp-squad-kicker">From the wedding squad</span>
          <blockquote>
            The wedding bells are ringing, the madness is beginning, and we, the wedding squad, are
            all set to make some unforgettable memories!
          </blockquote>
          <p className="rsvp-with-love">With lots of love,</p>
          <p className="rsvp-squad-names">
            Tushar, Shalu, Arpit, Shivangi, Shobhit, Rupam, Shefali, Neha, Monika, Pragya, Sakshi,
            Ritik, Vasu, Aryan, Chetan, Vaibhav &amp; Aadi
          </p>
        </div>

        <p className="rsvp-little-ones rsvp-reveal">
          <span>Bachchon mein</span>
          Piyush, Neha, Sparsh, Arisha, Krisha, Ridhi, Sidhi &amp; Reyansh
        </p>
      </div>
    </section>
  );
}
