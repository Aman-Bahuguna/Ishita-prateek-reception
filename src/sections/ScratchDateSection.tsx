import { ScratchDateCard } from "../components/ScratchDateCard";

export function ScratchDateSection() {
  return (
    <section id="next-section" className="scratch-date-section" aria-labelledby="scratch-title">
      <div className="scratch-ornament scratch-ornament-left" aria-hidden="true" />
      <div className="scratch-ornament scratch-ornament-right" aria-hidden="true" />
      <div className="scratch-section-content">
        <p className="scratch-eyebrow">Reception</p>
        <h2 id="scratch-title">Evening of Elegance</h2>
        <p className="scratch-intro">
          An elegant evening of celebration awaits. Scratch to reveal the date.
        </p>
        <ScratchDateCard />
        <p className="scratch-instruction">
          <span aria-hidden="true" /> Scratch to reveal our forever <span aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
