
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
              SecureHabit is a cybersecurity training web platform aiming to address the increasing risks posed by cybercrime and online harms by equipping non-technical users with essential cybersecurity knowledge through an accessible, engaging platform.
            </p>
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
              <span className="font-display font-semibold text-cyber-text-primary">SecureHabits</span>
            </div>
            <div className="text-cyber-text-secondary text-sm">
              © {new Date().getFullYear()} SecureHabits.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
