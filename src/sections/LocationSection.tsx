const VENUE_QUERY = "Agarwal Sabha, Kosi Road, Ramnagar, Nainital";
const VENUE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_QUERY)}`;
const VENUE_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}&output=embed`;

export function LocationSection() {
  return (
    <section className="location-section" aria-labelledby="location-title">
      <div className="location-ornament location-ornament-left" aria-hidden="true" />
      <div className="location-ornament location-ornament-right" aria-hidden="true" />

      <div className="location-content">
        <header className="location-header">
          <p className="location-eyebrow">Where we celebrate</p>
          <h2 id="location-title">The Venue</h2>
          <span className="location-divider" aria-hidden="true">
            <i />
          </span>
        </header>

        <div className="location-card">
          <div className="location-copy">
            <span className="location-pin" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 10c0 5.2-8 11-8 11s-8-5.8-8-11a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.7" />
              </svg>
            </span>
            <div>
              <p className="location-label">Wedding venue</p>
              <h3>Agarwal Sabha</h3>
              <address>Kosi Road, Ramnagar, Nainital</address>
            </div>
          </div>

          <a
            className="location-map"
            href={VENUE_MAP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Agarwal Sabha, Kosi Road, Ramnagar in Google Maps"
          >
            <iframe
              src={VENUE_EMBED_URL}
              title="Map showing Agarwal Sabha in Ramnagar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
            />
            <span className="location-map-action">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 5h5v5M19 5l-8 8" />
                <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
              Open in Google Maps
            </span>
          </a>

          <a className="location-directions" href={VENUE_MAP_URL} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 3 9 9-9 9-9-9 9-9Z" />
              <path d="M8.5 12h7M13 9.5l2.5 2.5-2.5 2.5" />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
