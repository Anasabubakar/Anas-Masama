import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CurvedMarquee } from '@/components/sections/CurvedMarquee';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';
import { Timeline } from '@/components/sections/Timeline';
import { Labs } from '@/components/sections/Labs';
import { SlottrBookingWidget } from '@/components/sections/SlottrBookingWidget';
import { Contact } from '@/components/sections/Contact';
import { Butler } from '@/components/Butler';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-transparent">
      <Header />
      <main className="flex-1">
        <Hero />
        <CurvedMarquee />
        <About />
        <Services />
        <Skills />
        <Timeline />
        <Labs />
        <SlottrBookingWidget />
        <Contact />
      </main>
      <Footer />
      <Butler />
    </div>
  );
}
