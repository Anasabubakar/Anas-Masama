import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WhatsappIcon } from '../icons/WhatsappIcon';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.05l8.6-9.83-8.209-9.064h7.585l5.243 7.185L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z" />
  </svg>
);


export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Anas Masama. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.github.com/Anasabubakar" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group border border-border rounded-md hover:border-primary p-2 transition-colors duration-300">
                <Github className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/Anasmasama" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group border border-border rounded-md hover:border-primary p-2 transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.twitter.com/Anas_Abubakar70" target="_blank" rel="noopener noreferrer" aria-label="X" className="group border border-border rounded-md hover:border-primary p-2 transition-colors duration-300">
                <XIcon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://wa.me/+2347064294297" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group border border-border rounded-md hover:border-primary p-2 transition-colors duration-300">
                <WhatsappIcon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
