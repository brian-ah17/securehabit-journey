
import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Question } from "../components/learning/QuestionCard";
import { toast } from "@/components/ui/use-toast";

// Mock questions for modules
const moduleQuestions = {
  "awareness": [
    {
      unitId: "unit-4",
      questions: [
        {
          id: "q1",
          question: "Which of the following is NOT a common type of cyber attack?",
          options: [
            "Phishing",
            "Ransomware",
            "Microwaving",
            "Social Engineering"
          ],
          correctAnswer: 2,
          explanation: "Microwaving is not a cyber attack. Phishing, ransomware, and social engineering are all common types of cyber attacks that target individuals and organisations."
        },
        {
          id: "q2",
          question: "What is the primary goal of a ransomware attack?",
          options: [
            "Steal personal information",
            "Lock access to data until a ransom is paid",
            "Delete all data permanently",
            "Gain unauthorised network access"
          ],
          correctAnswer: 1,
          explanation: "Ransomware attacks encrypt or lock access to the victim's data, and the attackers demand a ransom payment (usually in cryptocurrency) to restore access."
        }
      ]
    }
  ],
  "digital-hygiene": [
    {
      unitId: "unit-5",
      questions: [
        {
          id: "q1",
          question: "Which of the following is the MOST secure password?",
          options: [
            "password123",
            "Fluffy2010",
            "P@$$w0rd",
            "diverse-correct-battery-staple"
          ],
          correctAnswer: 3,
          explanation: "The password 'diverse-correct-battery-staple' is the most secure as it uses multiple random words with sufficient length, making it difficult to crack while being easier to remember than complex character combinations."
        },
        {
          id: "q2",
          question: "What is two-factor authentication (2FA)?",
          options: [
            "Having two different passwords",
            "Using something you know and something you have to authenticate",
            "Changing your password twice a year",
            "Sharing your password with a trusted friend as backup"
          ],
          correctAnswer: 1,
          explanation: "Two-factor authentication combines something you know (like a password) with something you have (like a phone) or something you are (like biometrics) to verify your identity."
        }
      ]
    }
  ],
  "threat-detection": [
    {
      unitId: "unit-5",
      questions: [
        {
          id: "q1",
          question: "Which of these is a warning sign of a phishing email?",
          options: [
            "It comes from someone in your contacts",
            "The sender's domain matches the company they claim to represent",
            "It creates urgency and threatens negative consequences",
            "It has a professional signature with contact information"
          ],
          correctAnswer: 2,
          explanation: "Creating a sense of urgency and threatening negative consequences (like account suspension) is a classic phishing tactic to make recipients act quickly without careful consideration."
        },
        {
          id: "q2",
          question: "What should you do if you suspect a scam call claiming to be from your bank?",
          options: [
            "Provide the requested information to resolve the issue quickly",
            "Hang up and call the bank's official number to verify",
            "Give limited information but not passwords or PINs",
            "Ask the caller detailed questions to verify their identity"
          ],
          correctAnswer: 1,
          explanation: "Always hang up and call the official number on your bank card or official website. Scammers can be convincing and asking questions isn't reliable, as they may have researched answers."
        }
      ]
    }
  ],
  "legal-context": [
    {
      unitId: "unit-4",
      questions: [
        {
          id: "q1",
          question: "Which entity typically has primary responsibility for investigating cybercrimes?",
          options: [
            "Private cybersecurity companies",
            "Internet service providers",
            "Law enforcement agencies",
            "Social media platforms"
          ],
          correctAnswer: 2,
          explanation: "Law enforcement agencies, such as the National Crime Agency in the UK or specialised cybercrime units in other countries, have the primary responsibility for investigating cybercrimes."
        },
        {
          id: "q2",
          question: "What is one of the challenges law enforcement faces in prosecuting cybercrime?",
          options: [
            "Cybercrimes are always committed by the same people",
            "Jurisdiction issues when attackers operate across borders",
            "Lack of interest from the public",
            "Too few cybercrimes to justify resources"
          ],
          correctAnswer: 1,
          explanation: "Jurisdiction issues are a major challenge because cybercriminals often operate from countries with weak cybercrime laws or poor international cooperation, making prosecution difficult."
        }
      ]
    }
  ]
};

// Module data type
type Unit = {
  id: string;
  title: string;
  type: string;
  completed: boolean;
  duration: string;
  locked: boolean;
};

type Module = {
  title: string;
  description: string;
  progress: number;
  estimatedTime: string;
  points: number;
  objectives: string[];
  units: Unit[];
};

// Mock data for modules
const modulesData: Record<string, Module> = {
  "awareness": {
    title: "Awareness & Mindset",
    description: "Understand the fundamentals of cybercrime and develop a security mindset to protect yourself online.",
    progress: 0,
    estimatedTime: "30 minutes",
    points: 50,
    objectives: [
      "Understand common types of cybercrime",
      "Learn how cybercriminals target individuals",
      "Develop a cybersecurity mindset",
      "Recognise the importance of digital self-defence"
    ],
    units: [
      {
        id: "unit-1",
        title: "Introduction to Cybersecurity",
        type: "video",
        completed: false,
        duration: "5 min",
        locked: false
      },
      {
        id: "unit-2",
        title: "Types of Cyber Threats",
        type: "lesson",
        completed: false,
        duration: "10 min",
        locked: false
      },
      {
        id: "unit-3",
        title: "Case Study: Ransomware Attack",
        type: "activity",
        completed: false,
        duration: "8 min",
        locked: false
      },
      {
        id: "unit-4",
        title: "Security Mindset Assessment",
        type: "quiz",
        completed: false,
        duration: "7 min",
        locked: false
      }
    ]
  },
  "digital-hygiene": {
    title: "Digital Hygiene & Security",
    description: "Learn practical steps to secure your accounts, create strong passwords, and maintain good security practices.",
    progress: 0,
    estimatedTime: "45 minutes",
    points: 70,
    objectives: [
      "Create and manage strong passwords",
      "Set up two-factor authentication",
      "Secure your devices and accounts",
      "Learn safe browsing practices"
    ],
    units: [
      {
        id: "unit-1",
        title: "Password Security Fundamentals",
        type: "video",
        completed: false,
        duration: "6 min",
        locked: false
      },
      {
        id: "unit-2",
        title: "Two-Factor Authentication",
        type: "lesson",
        completed: false,
        duration: "8 min",
        locked: false
      },
      {
        id: "unit-3",
        title: "Device Security Checklist",
        type: "activity",
        completed: false,
        duration: "12 min",
        locked: false
      },
      {
        id: "unit-4",
        title: "Safe Browsing Practices",
        type: "lesson",
        completed: false,
        duration: "10 min",
        locked: false
      },
      {
        id: "unit-5",
        title: "Digital Hygiene Assessment",
        type: "quiz",
        completed: false,
        duration: "9 min",
        locked: false
      }
    ]
  },
  "threat-detection": {
    title: "Recognising Threats",
    description: "Learn to identify phishing attempts, scams, and other common cyber threats through practical examples.",
    progress: 0,
    estimatedTime: "40 minutes",
    points: 60,
    objectives: [
      "Identify phishing emails and messages",
      "Recognise social engineering techniques",
      "Detect common online scams",
      "Learn proper reporting procedures"
    ],
    units: [
      {
        id: "unit-1",
        title: "Phishing Fundamentals",
        type: "video",
        completed: false,
        duration: "7 min",
        locked: false
      },
      {
        id: "unit-2",
        title: "Social Engineering Tactics",
        type: "lesson",
        completed: false,
        duration: "10 min",
        locked: false
      },
      {
        id: "unit-3",
        title: "Phishing Email Detection",
        type: "activity",
        completed: false,
        duration: "12 min",
        locked: false
      },
      {
        id: "unit-4",
        title: "Scam Detection Practice",
        type: "activity",
        completed: false,
        duration: "8 min",
        locked: false
      },
      {
        id: "unit-5",
        title: "Threat Recognition Test",
        type: "quiz",
        completed: false,
        duration: "8 min",
        locked: false
      }
    ]
  },
  "legal-context": {
    title: "Legal & Social Context",
    description: "Understand the legal framework around cybercrime and how law enforcement addresses digital threats.",
    progress: 0,
    estimatedTime: "35 minutes",
    points: 50,
    objectives: [
      "Understand cybersecurity regulations",
      "Learn about law enforcement's role",
      "Know your rights and responsibilities",
      "Recognise reporting procedures"
    ],
    units: [
      {
        id: "unit-1",
        title: "Introduction to Cybercrime Law",
        type: "video",
        completed: false,
        duration: "8 min",
        locked: false
      },
      {
        id: "unit-2",
        title: "Law Enforcement & Cybercrime",
        type: "lesson",
        completed: false,
        duration: "10 min",
        locked: false
      },
      {
        id: "unit-3",
        title: "Case Study: Legal Response",
        type: "activity",
        completed: false,
        duration: "12 min",
        locked: false
      },
      {
        id: "unit-4",
        title: "Legal Context Assessment",
        type: "quiz",
        completed: false,
        duration: "5 min",
        locked: false
      }
    ]
  }
};

type ModuleContextType = {
  loading: boolean;
  module: Module | null;
  selectedUnit: Unit | null;
  setSelectedUnit: (unit: Unit | null) => void;
  completeUnit: (unitId: string) => void;
  getQuestionsForUnit: (unitId: string) => Question[];
  isQuizUnit: (unitId: string) => boolean;
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState<Module | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    // Simulate API call to fetch module data
    const timer = setTimeout(() => {
      if (moduleId && modulesData[moduleId as keyof typeof modulesData]) {
        setModule(modulesData[moduleId as keyof typeof modulesData]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [moduleId]);

  const getQuestionsForUnit = (unitId: string): Question[] => {
    if (!moduleId) return [];
    
    const moduleQuestionSet = moduleQuestions[moduleId as keyof typeof moduleQuestions];
    if (!moduleQuestionSet) return [];
    
    const unitQuestions = moduleQuestionSet.find(q => q.unitId === unitId);
    return unitQuestions ? unitQuestions.questions : [];
  };

  const isQuizUnit = (unitId: string): boolean => {
    if (!module) return false;
    const unit = module.units.find(u => u.id === unitId);
    return unit?.type === "quiz";
  };

  const completeUnit = (unitId: string) => {
    if (!module) return;
    
    const updatedUnits = module.units.map(unit => 
      unit.id === unitId ? { ...unit, completed: true } : unit
    );
    
    // Count completed units for progress calculation
    const completedCount = updatedUnits.filter(unit => unit.completed).length;
    const totalUnits = updatedUnits.length;
    const newProgress = Math.round((completedCount / totalUnits) * 100);
    
    const updatedModule = {
      ...module,
      units: updatedUnits,
      progress: newProgress
    };
    
    // Update module in the "database"
    if (moduleId) {
      modulesData[moduleId as keyof typeof modulesData] = updatedModule;
    }
    
    setModule(updatedModule);
    setSelectedUnit(null);
    
    toast({
      title: "Unit Completed!",
      description: "Your progress has been updated.",
    });
  };

  return (
    <ModuleContext.Provider value={{
      loading,
      module,
      selectedUnit,
      setSelectedUnit,
      completeUnit,
      getQuestionsForUnit,
      isQuizUnit
    }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModule = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error("useModule must be used within a ModuleProvider");
  }
  return context;
};
