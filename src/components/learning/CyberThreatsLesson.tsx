import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Shield, Mail, Bug, Database, MessageSquareX, Lock, Smartphone, Fingerprint } from "lucide-react";
import { useParams } from 'react-router-dom';

interface ContentInfo {
  title: string;
  description: string;
  example: string;
  keyFacts: string[];
  icon: React.ReactNode;
  image: string;
}

const cyberThreats: ContentInfo[] = [
  {
    title: "Phishing Attacks",
    description: "Deceptive attempts to steal sensitive information by posing as trustworthy entities.",
    example: "An email claiming to be from your bank requesting urgent verification of your account details.",
    keyFacts: [
      "91% of cyber attacks start with a phishing email",
      "Average cost of a phishing attack on an organisation is £3.7 million",
      "Over 60% of people have clicked on a phishing link in the past year"
    ],
    icon: <Mail className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Malware",
    description: "Malicious software designed to disrupt, damage, or gain unauthorised access to computer systems.",
    example: "A free software download that secretly installs ransomware on your device.",
    keyFacts: [
      "Over 450,000 new malicious programmes are registered every day",
      "Ransomware damage costs exceeded £16 billion in 2023",
      "Mobile malware attacks increased by 50% in the past year"
    ],
    icon: <Bug className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Data Breaches",
    description: "Unauthorised access to confidential information, often resulting in stolen personal or financial data.",
    example: "A company's customer database being hacked and personal information being sold on the dark web.",
    keyFacts: [
      "Average cost of a data breach is £3.5 million globally",
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
      "Average cost of a social engineering attack is £103,000",
      "33% of data breaches involve social engineering"
    ],
    icon: <MessageSquareX className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

const twoFactorAuthInfo: ContentInfo[] = [
  {
    title: "What is Two-Factor Authentication?",
    description: "A security method that requires two different types of verification before granting access to an account or system.",
    example: "Entering your password (something you know) and then entering a code sent to your mobile phone (something you have).",
    keyFacts: [
      "Two-factor authentication can reduce account takeover fraud by up to 99%",
      "80% of data breaches could be prevented by using 2FA",
      "Less than 20% of users enable 2FA when it's optional"
    ],
    icon: <Lock className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Authentication Methods",
    description: "Various ways to implement the second factor of authentication beyond passwords.",
    example: "Using an authenticator app like Google Authenticator to generate time-based one-time passwords.",
    keyFacts: [
      "SMS-based verification codes are convenient but less secure than authenticator apps",
      "Hardware security keys provide the highest level of security for 2FA",
      "Biometric authentication like fingerprints can be both secure and convenient"
    ],
    icon: <Smartphone className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Setting Up 2FA",
    description: "How to enable and configure two-factor authentication on your accounts.",
    example: "Going to your account security settings and enabling 2FA by linking your mobile phone or authenticator app.",
    keyFacts: [
      "Always save backup codes when setting up 2FA in case you lose access to your device",
      "Using 2FA on your email account is critical, as email is often the recovery method for other accounts",
      "Consider using different 2FA methods for your most important accounts"
    ],
    icon: <Shield className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Beyond 2FA: Advanced Security",
    description: "Additional security measures that work with or beyond traditional two-factor authentication.",
    example: "Using biometric verification (fingerprint or facial recognition) as an additional security layer.",
    keyFacts: [
      "Multi-factor authentication can use three or more verification methods for increased security",
      "Adaptive authentication adjusts security requirements based on risk factors like location or device",
      "Passwordless authentication aims to replace passwords entirely with more secure methods"
    ],
    icon: <Fingerprint className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  }
];

const CyberThreatsLesson = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { moduleId } = useParams<{ moduleId: string }>();
  
  const contentItems = moduleId === 'digital-hygiene' ? twoFactorAuthInfo : cyberThreats;
  const currentContent = contentItems[currentContentIndex];

  const handleNext = () => {
    if (currentContentIndex < contentItems.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
      setProgress(((currentContentIndex + 1) / contentItems.length) * 100);
    }
  };

  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
      setProgress(((currentContentIndex - 1) / contentItems.length) * 100);
    }
  };

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
            {currentContent.icon}
            {currentContent.title}
          </CardTitle>
          <Shield className="w-6 h-6 text-cyber-primary" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
              <img 
                src={currentContent.image} 
                alt={currentContent.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-4">
              <p className="text-lg text-cyber-text-secondary">
                {currentContent.description}
              </p>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-cyber-primary hover:underline">
                  View Example
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 bg-slate-50 rounded-lg">
                  {currentContent.example}
                </CollapsibleContent>
              </Collapsible>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Key Facts:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {currentContent.keyFacts.map((fact, index) => (
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
          disabled={currentContentIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentContentIndex === contentItems.length - 1}
          className="bg-cyber-primary hover:bg-cyber-primary/90"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CyberThreatsLesson;
