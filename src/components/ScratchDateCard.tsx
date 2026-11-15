import { useEffect, useRef, useState } from "react";

export function ScratchDateCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card || isRevealed) return;

    const paintCover = () => {
      const rect = card.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.globalCompositeOperation = "source-over";

      const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#9b2540");
      gradient.addColorStop(0.48, "#74152b");
      gradient.addColorStop(1, "#4f0d20");
      context.fillStyle = gradient;
      context.fillRect(0, 0, rect.width, rect.height);

      context.strokeStyle = "rgba(255, 233, 184, .075)";
      context.lineWidth = 1;
      for (let offset = -rect.height; offset < rect.width; offset += 13) {
        context.beginPath();
        context.moveTo(offset, rect.height);
        context.lineTo(offset + rect.height, 0);
        context.stroke();
      }

      const inset = Math.max(10, rect.width * 0.03);
      context.strokeStyle = "rgba(236, 203, 132, .5)";
      context.lineWidth = 1;
      context.strokeRect(inset, inset, rect.width - inset * 2, rect.height - inset * 2);
      context.strokeStyle = "rgba(236, 203, 132, .2)";
      context.strokeRect(
        inset + 4,
        inset + 4,
        rect.width - (inset + 4) * 2,
        rect.height - (inset + 4) * 2,
      );

      context.strokeStyle = "rgba(239, 207, 139, .58)";
      context.beginPath();
      context.arc(
        rect.width / 2,
        rect.height / 2,
        Math.min(rect.width, rect.height) * 0.19,
        0,
        Math.PI * 2,
      );
      context.stroke();
      context.beginPath();
      context.arc(
        rect.width / 2,
        rect.height / 2,
        Math.min(rect.width, rect.height) * 0.14,
        0,
        Math.PI * 2,
      );
      context.stroke();
    };

    paintCover();
    const observer = new ResizeObserver(paintCover);
    observer.observe(card);
    return () => observer.disconnect();
  }, [isRevealed]);

  const pointFromEvent = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const scratchLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.globalCompositeOperation = "destination-out";
    context.lineWidth = Math.max(34, canvas.clientWidth * 0.105);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  };

  const checkRevealProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    for (let index = 3; index < pixels.length; index += 4 * 20) {
      if (pixels[index] < 64) transparentPixels += 1;
    }
    if (transparentPixels / (pixels.length / (4 * 20)) > 0.38) {
      setIsRevealed(true);
    }
  };

  const startScratching = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    isScratchingRef.current = true;
    const point = pointFromEvent(event);
    lastPointRef.current = point;
    scratchLine(point, point);
  };

  const continueScratching = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || !lastPointRef.current) return;
    const point = pointFromEvent(event);
    scratchLine(lastPointRef.current, point);
    lastPointRef.current = point;
  };

  const stopScratching = () => {
    if (!isScratchingRef.current) return;
    isScratchingRef.current = false;
    lastPointRef.current = null;
    checkRevealProgress();
  };

  return (
    <div ref={cardRef} className={`scratch-card ${isRevealed ? "is-revealed" : ""}`}>
      <div className="scratch-card-reveal" aria-live="polite">
        <span className="date-kicker">Save the date</span>
        <strong>
          <span>02</span>
          <i aria-hidden="true" />
          <span>12</span>
          <i aria-hidden="true" />
          <span>2026</span>
        </strong>
        <span className="date-caption">The celebration of Ishita &amp; Prateek</span>
      </div>
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        onPointerDown={startScratching}
        onPointerMove={continueScratching}
        onPointerUp={stopScratching}
        onPointerCancel={stopScratching}
        onPointerLeave={stopScratching}
        aria-label="Scratch this card to reveal the wedding date"
      />
      <button className="reveal-date-button" type="button" onClick={() => setIsRevealed(true)}>
        Reveal date
      </button>
    </div>
  );
}
