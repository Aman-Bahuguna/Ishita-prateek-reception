import { useEffect } from "react";
import { FestivitiesTimelineSection } from "./sections/FestivitiesTimelineSection";
import { HeroSection } from "./sections/HeroSection";
import { InvitationDetailsSection } from "./sections/InvitationDetailsSection";
import { LocationSection } from "./sections/LocationSection";
import { RsvpSection } from "./sections/RsvpSection";
import { ScratchDateSection } from "./sections/ScratchDateSection";
import { WeddingCountdown } from "./sections/WeddingCountdown";

export default function App() {
  useEffect(() => {
    document.title = "Ishita & Prateek - 2nd Dec";
  }, []);

  return (
    <main className="wedding-page">
      <HeroSection />
      <ScratchDateSection />
      <WeddingCountdown />
      <InvitationDetailsSection />
      <FestivitiesTimelineSection />
      <LocationSection />
      <RsvpSection />
    </main>
  );
}
