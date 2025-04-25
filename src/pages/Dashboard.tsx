import { useState, useEffect } from "react";
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  GraduationCap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressCard from "@/components/dashboard/ProgressCard";
import ModuleCard from "@/components/dashboard/ModuleCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userProgress, setUserProgress] = useState({
    progress: 25,
    streak: 3,
    nextBadge: {
      name: "Cyber Guardian",
      requiredPoints: 200,
    },
  });

  // Mock modules data
  const modules = [
    {
      id: "awareness",
      title: "Awareness & Mindset",
      description: "Understand cybercrime basics and develop a security mindset.",
      icon: <Shield className="h-6 w-6 text-cyber-primary" />,
      progress: 75,
      isLocked: false,
    },
    {
      id: "digital-hygiene",
      title: "Digital Hygiene & Security",
      description: "Learn practical steps to secure your accounts and devices.",
      icon: <Lock className="h-6 w-6 text-cyber-primary" />,
      progress: 40,
      isLocked: false,
    },
    {
      id: "threat-detection",
      title: "Recognising Threats",
      description: "Identify phishing, scams, and other common cyber threats.",
      icon: <AlertTriangle className="h-6 w-6 text-cyber-primary" />,
      progress: 0,
      isLocked: false,
    },
    {
      id: "legal-context",
      title: "Legal & Social Context",
      description: "Understand the legal framework around cybercrime.",
      icon: <GraduationCap className="h-6 w-6 text-cyber-primary" />,
      progress: 0,
      isLocked: true,
    },
  ];

  // Recommendation based on progress
  const getRecommendedModule = () => {
    const inProgressModules = modules.filter(
      m => m.progress > 0 && m.progress < 100 && !m.isLocked
    );
    
    if (inProgressModules.length > 0) {
      return inProgressModules[0];
    }
    
    const notStartedModules = modules.filter(
      m => m.progress === 0 && !m.isLocked
    );
    
    return notStartedModules[0] || modules[0];
  };

  const recommendedModule = getRecommendedModule();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome and overview */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display mb-2">Welcome Back!</h1>
        <p className="text-cyber-text-secondary">
          Continue your cybersecurity training journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Progress section */}
        <div className="lg:col-span-1">
          <ProgressCard {...userProgress} />
        </div>

        {/* Recommended next step */}
        <div className="lg:col-span-2">
          <Card className="border border-slate-200 shadow-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-display">Continue Your Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-slate-50 rounded-lg p-4 md:p-6 flex-1 w-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-cyber-primary/10 p-3 rounded-full mr-4">
                      {recommendedModule.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{recommendedModule.title}</h3>
                      <p className="text-sm text-cyber-text-secondary">
                        {recommendedModule.progress > 0 ? `${recommendedModule.progress}% complete` : "Not started"}
                      </p>
                    </div>
                  </div>
                  <p className="text-cyber-text-secondary mb-5 text-sm">
                    {recommendedModule.description}
                  </p>
                  <Button 
                    asChild
                    className="w-full sm:w-auto bg-cyber-primary hover:bg-cyber-primary/90"
                  >
                    <Link to={`/modules/${recommendedModule.id}`}>
                      {recommendedModule.progress > 0 ? "Continue" : "Start"} Module
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 md:p-6 w-full md:w-auto">
                  <h3 className="font-semibold mb-2 text-center">Quick Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-cyber-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-cyber-text-secondary">Use unique passwords for each account</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-cyber-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-cyber-text-secondary">Enable two-factor authentication</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-cyber-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-cyber-text-secondary">Check sender emails before clicking links</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Learning modules */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-display mb-1">Learning Modules</h2>
        <p className="text-cyber-text-secondary mb-6">
          Complete all modules to become cyber-savvy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.id} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
