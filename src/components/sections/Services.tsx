import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Lightbulb, SquareCode } from "lucide-react";

const services = [
  {
    icon: <SquareCode className="w-10 h-10" />,
    title: 'Web Development',
    description: 'I build fast, responsive, and scalable web applications using modern technologies like Next.js and React to bring your vision to life online.',
  },
  {
    icon: <Lightbulb className="w-10 h-10" />,
    title: 'Innovation',
    description: 'I create intuitive and beautiful user interfaces that provide a seamless user experience, ensuring your product is a delight to use.',
  },
  {
    icon: <BrainCircuit className="w-10 h-10" />,
    title: 'AI/ML',
    description: 'I leverage modern AI tools like Genkit and Gemini to build intelligent features, from chatbots to smart data analysis, into your applications.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-secondary/20">
      <div className="container">
        <div className="text-center mb-16">
          <p className="font-semibold text-primary uppercase tracking-widest font-body">My Service</p>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-2">Crafting stories through design and innovation</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group flex flex-col items-center text-center p-8 bg-card border-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-15px_hsl(var(--primary))] hover:-translate-y-2">
              <div className="p-4 bg-background rounded-full border-4 border-secondary text-primary mb-6 transition-colors duration-300 group-hover:text-primary group-hover:border-primary/20">
                {service.icon}
              </div>
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
