import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-12-02T00:00:00+05:30").getTime();

export function WeddingCountdown() {
  const getTimeRemaining = () => {
    const difference = Math.max(0, WEDDING_DATE - Date.now());

    return {
      days: Math.floor(difference / 86_400_000),
      hours: Math.floor((difference / 3_600_000) % 24),
      minutes: Math.floor((difference / 60_000) % 60),
      seconds: Math.floor((difference / 1_000) % 60),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeRemaining(getTimeRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Minutes", value: timeRemaining.minutes },
    { label: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <section className="countdown-section" aria-labelledby="countdown-title">
      <div className="countdown-flourish countdown-flourish-left" aria-hidden="true" />
      <div className="countdown-content">
        <p className="countdown-kicker">Counting down to forever</p>
        <h2 id="countdown-title">The Celebration Begins In</h2>
        <div className="countdown-grid" role="timer" aria-label="Countdown to 2 December 2026">
          {countdown.map((unit) => (
            <div className="countdown-unit" key={unit.label}>
              <strong>{String(unit.value).padStart(2, "0")}</strong>
              <span>{unit.label}</span>
            </div>
          ))}
        </div>
        <p className="countdown-date">02 · 12 · 2026</p>
      </div>
      <div className="countdown-flourish countdown-flourish-right" aria-hidden="true" />
    </section>
  );
}
