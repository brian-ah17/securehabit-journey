
import React from "react";
import { ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-display text-cyber-primary mb-6">About SecureHabit</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold font-display text-cyber-text-primary mb-3">Introduction</h2>
            <p className="text-cyber-text-secondary">
              SecureHabit is a cybersecurity training web platform developed as part of a dissertation project titled "Cyberwarfare: Navigating the Lawless Digital Battlefield." The aim of this project is to address the increasing risks posed by cybercrime and online harms by equipping non-technical users with essential cybersecurity knowledge through an accessible, engaging platform.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold font-display text-cyber-text-primary mb-3">Motivation</h2>
            <p className="text-cyber-text-secondary">
              Survey results and literature reviewed during the research phase revealed a persistent gap in public awareness, particularly among non-technical users. Whilst many are aware of cyber threats, few possess the confidence or knowledge to protect themselves or report incidents effectively. This platform responds to that need by offering a centralised space for practical cybersecurity education.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold font-display text-cyber-text-primary mb-3">Learnings</h2>
            <p className="text-cyber-text-secondary mb-4">
              Key insights from the project that shaped the development of SecureHabit include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-cyber-text-secondary">
              <li>Many users are unsure how to report cybercrime or which tools to use.</li>
              <li>Simplicity and directness are critical for user engagement.</li>
              <li>Empowering users through small, confidence-building modules is more effective than long-form theoretical content.</li>
              <li>Trust and user data protection are essential, especially in a space teaching online safety.</li>
            </ul>
          </section>
          
          <div className="mt-8 pt-4 border-t border-slate-200">
            <a 
              href="https://github.com/yourusername/securehabit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-cyber-primary hover:underline"
            >
              View project on GitHub
              <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="font-display font-semibold text-cyber-text-primary">SecureHabit</span>
            </div>
            <div className="text-cyber-text-secondary text-sm">
              © {new Date().getFullYear()} SecureHabit. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
