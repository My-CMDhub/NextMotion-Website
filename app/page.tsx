import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Waste } from "@/components/sections/Waste";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Waitlist } from "@/components/sections/Waitlist";
import { ExitPopup } from "@/components/ui/ExitPopup";
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-solar-gold/30">
      <Navbar />
      <Hero />
      <div id="problem">
        <Problem />
      </div>
      <Waste />
      <div id="solution">
        <Solution />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <Waitlist id="join-waitlist" />
      <Footer />
      <ExitPopup />
    </main>
  );
}
