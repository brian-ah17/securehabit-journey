
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Eye, BookOpen } from "lucide-react";
import Header from "@/components/layout/Header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-cyber-primary to-cyber-secondary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
                Strengthen Your Digital Defense
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                A complete cybersecurity training platform designed for everyone. Learn essential 
                skills to protect yourself online, recognize threats, and build secure digital habits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-cyber-primary hover:bg-white/90"
                >
                  <Link to="/dashboard">
                    Start Learning
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUgMHYzME0wIDE1aDMwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIvPjwvc3ZnPg==')] opacity-20 mix-blend-overlay" />
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold mb-4 font-display text-cyber-text-primary">
                Learn Practical Cybersecurity Skills
              </h2>
              <p className="text-lg text-cyber-text-secondary">
                Our framework is designed to help you build real-world security skills through interactive exercises and practical simulations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="bg-cyber-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-display">Awareness & Mindset</h3>
                <p className="text-cyber-text-secondary">
                  Learn about the fundamentals of cybercrime and understand how a security mindset can help protect you.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="bg-cyber-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-display">Digital Hygiene</h3>
                <p className="text-cyber-text-secondary">
                  Discover practical steps to secure your accounts, create strong passwords, and maintain good security practices.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="bg-cyber-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-display">Threat Recognition</h3>
                <p className="text-cyber-text-secondary">
                  Practice identifying phishing attempts, scams, and social engineering tactics through realistic simulations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 font-display">Ready to build your cyber defense skills?</h3>
                  <p className="text-cyber-text-secondary mb-6">
                    Start your training journey today and learn how to protect yourself in the digital world.
                  </p>
                  <Button 
                    asChild
                    className="w-full md:w-auto bg-cyber-primary hover:bg-cyber-primary/90"
                  >
                    <Link to="/dashboard">
                      Get Started
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-cyber-primary to-cyber-secondary p-8 md:p-12 text-white flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <BookOpen className="mr-3 h-6 w-6" />
                    <h4 className="text-lg font-semibold">Four Core Modules</h4>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <span>Awareness & Cybercrime Mindset</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <span>Digital Hygiene & Security</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <span>Recognizing & Reporting Threats</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <span>Legal & Social Context</span>
                    </li>
                  </ul>
                  <p className="text-white/80 text-sm">
                    All modules include interactive exercises, quizzes, and simulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-cyber-primary mr-2" />
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

export default Index;
