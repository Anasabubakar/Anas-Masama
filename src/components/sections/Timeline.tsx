import { Briefcase, GraduationCap, Search, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { SafeHireMeDialog } from '../SafeHireMeDialog';

const timelineData = [
  {
    icon: <GraduationCap />,
    date: 'June 2020',
    title: 'Started at Vision Programming Tech',
    description: 'Began my journey into computer science, laying the foundational knowledge for my future career.',
  },
  {
    icon: <GraduationCap />,
    date: 'December 2023',
    title: 'Graduated from Vision Programming Tech',
    description: 'Completed my program and immediately began my freelance career, applying my new skills to real-world projects.',
  },
  {
    icon: <Briefcase />,
    date: 'January 2025 - May 2025',
    title: 'Software Engineer Trainee at Be-Mint 2.0',
    description: 'Honed my skills as a software engineer trainee, contributing to innovative projects and collaborating with a dynamic team.',
  },
  {
    icon: <Search />,
    date: 'Present',
    title: 'Software Engineer & Future Architect',
    description: 'Currently building Earth\'s next generation of innovators through cutting-edge software solutions.',
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16">
           <p className="font-semibold text-primary uppercase tracking-widest font-body">My Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline mt-2">Showcasing Your Talent, Amplifying Your Impact</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {timelineData.map((item, index) => (
            <div key={index} className="p-6 rounded-lg shadow-lg bg-card border-border border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
              <div className='flex items-center justify-between gap-4'>
                <div className='space-y-1'>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm font-medium text-primary">{item.date}</p>
                </div>
                 <div className="w-10 h-10 flex-shrink-0 bg-background border-2 border-primary rounded-full flex items-center justify-center text-primary shadow-[0_0_20px_hsl(var(--primary)/0.75)] transition-all duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <SafeHireMeDialog>
            <Button size="lg">
              Ready to Start a Project? Hire Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </SafeHireMeDialog>
        </div>
      </div>
    </section>
  );
}
