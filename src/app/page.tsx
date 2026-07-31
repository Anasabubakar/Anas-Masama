import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CurvedMarquee } from '@/components/sections/CurvedMarquee';
import { About } from '@/components/sections/About';
import { Timeline } from '@/components/sections/Timeline';
import { Labs } from '@/components/sections/Labs';
import { Booking } from '@/components/sections/Booking';
import { Contact } from '@/components/sections/Contact';
import { Skills } from '@/components/sections/Skills';
import { Services } from '@/components/sections/Services';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-transparent">
      <Header />
      <main className="flex-1 pb-[calc(7rem+env(safe-area-inset-bottom))]">
        <Hero />
        <CurvedMarquee />
        <About />
        <Services />
        <Skills />
        <Timeline />
        <Labs />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
