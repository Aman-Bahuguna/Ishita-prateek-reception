import { ScratchDateCard } from "../components/ScratchDateCard";

export function ScratchDateSection() {
  return (
    <section id="next-section" className="scratch-date-section" aria-labelledby="scratch-title">
      <div className="scratch-ornament scratch-ornament-left" aria-hidden="true" />
      <div className="scratch-ornament scratch-ornament-right" aria-hidden="true" />
      <div className="scratch-section-content">
        <p className="scratch-eyebrow">The beginning of forever</p>
        <h2 id="scratch-title">A Date to Remember</h2>
        <p className="scratch-intro">Our forever has a date. Scratch to find it.</p>
        <ScratchDateCard />
        <p className="scratch-instruction">
          <span aria-hidden="true" /> Scratch to reveal our forever <span aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
