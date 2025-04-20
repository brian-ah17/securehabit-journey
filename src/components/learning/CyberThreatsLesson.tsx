
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Shield, Mail, Bug, Database, MessageSquareX } from "lucide-react";

interface ThreatInfo {
  title: string;
  description: string;
  example: string;
  keyFacts: string[];
  icon: React.ReactNode;
  image: string;
}

const threats: ThreatInfo[] = [
  {
    title: "Phishing Attacks",
    description: "Deceptive attempts to steal sensitive information by posing as trustworthy entities.",
    example: "An email claiming to be from your bank requesting urgent verification of your account details.",
    keyFacts: [
      "91% of cyber attacks start with a phishing email",
      "Average cost of a phishing attack on an organization is $4.65 million",
      "Over 60% of people have clicked on a phishing link in the past year"
    ],
    icon: <Mail className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Malware",
    description: "Malicious software designed to disrupt, damage, or gain unauthorized access to computer systems.",
    example: "A free software download that secretly installs ransomware on your device.",
    keyFacts: [
      "Over 450,000 new malicious programs are registered every day",
      "Ransomware damage costs exceeded $20 billion in 2023",
      "Mobile malware attacks increased by 50% in the past year"
    ],
    icon: <Bug className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Data Breaches",
    description: "Unauthorized access to confidential information, often resulting in stolen personal or financial data.",
    example: "A company's customer database being hacked and personal information being sold on the dark web.",
    keyFacts: [
      "Average cost of a data breach is $4.45 million globally",
      "58% of data breaches involve personal data",
      "The average time to identify a breach is 207 days"
    ],
    icon: <Database className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Social Engineering",
    description: "Psychological manipulation techniques used to trick people into revealing sensitive information.",
    example: "A caller pretending to be tech support to gain remote access to your computer.",
    keyFacts: [
      "98% of cyber attacks rely on social engineering",
      "Average cost of a social engineering attack is $130,000",
      "33% of data breaches involve social engineering"
    ],
    icon: <MessageSquareX className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

const CyberThreatsLesson = () => {
  const [currentThreatIndex, setCurrentThreatIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (currentThreatIndex < threats.length - 1) {
      setCurrentThreatIndex(currentThreatIndex + 1);
      setProgress(((currentThreatIndex + 1) / threats.length) * 100);
    }
  };

  const handlePrevious = () => {
    if (currentThreatIndex > 0) {
      setCurrentThreatIndex(currentThreatIndex - 1);
      setProgress(((currentThreatIndex - 1) / threats.length) * 100);
    }
  };

  const currentThreat = threats[currentThreatIndex];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-cyber-text-secondary">Progress</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Slider
          value={[progress]}
          max={100}
          step={1}
          className="w-full"
          disabled
        />
      </div>

      <Card className="border border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            {currentThreat.icon}
            {currentThreat.title}
          </CardTitle>
          <Shield className="w-6 h-6 text-cyber-primary" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
              <img 
                src={currentThreat.image} 
                alt={currentThreat.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-4">
              <p className="text-lg text-cyber-text-secondary">
                {currentThreat.description}
              </p>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-cyber-primary hover:underline">
                  View Example
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 bg-slate-50 rounded-lg">
                  {currentThreat.example}
                </CollapsibleContent>
              </Collapsible>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Key Facts:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {currentThreat.keyFacts.map((fact, index) => (
                    <li key={index} className="text-cyber-text-secondary">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentThreatIndex === 0}
        >
          Previous Threat
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentThreatIndex === threats.length - 1}
          className="bg-cyber-primary hover:bg-cyber-primary/90"
        >
          Next Threat
        </Button>
      </div>
    </div>
  );
};

export default CyberThreatsLesson;
