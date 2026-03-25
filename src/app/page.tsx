import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Timeline } from '@/components/sections/Timeline';
import { Projects } from '@/components/sections/Projects';
import { HireMe } from '@/components/sections/HireMe';
import { Skills } from '@/components/sections/Skills';
import { Services } from '@/components/sections/Services';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-transparent">
      <Header />
      <main className="flex-1 pb-[calc(7rem+env(safe-area-inset-bottom))]">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Timeline />
        <Projects />
        <HireMe />
      </main>
      <Footer />
    </div>
  );
}
