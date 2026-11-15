export function LotusSticker({ className }: { className: string }) {
  return (
    <svg
      className={`invitation-lotus-sticker ${className}`}
      viewBox="0 0 120 92"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 72C49 59 46 43 60 17c14 26 11 42 0 55Z" />
        <path d="M58 71C40 65 29 52 27 29c22 9 31 23 31 42Z" />
        <path d="M62 71c18-6 29-19 31-42-22 9-31 23-31 42Z" />
        <path d="M51 72C31 73 17 65 8 47c22 0 36 8 43 25Z" />
        <path d="M69 72c20 1 34-7 43-25-22 0-36 8-43 25Z" />
        <path d="M19 76c19 7 63 7 82 0M31 83c16 4 42 4 58 0" />
      </g>
    </svg>
  );
}
