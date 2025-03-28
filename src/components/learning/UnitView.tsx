
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionCard, { Question } from "./QuestionCard";
import { ArrowLeft } from "lucide-react";

type UnitViewProps = {
  unitId: string;
  title: string;
  type: string;
  content?: React.ReactNode;
  questions?: Question[];
  onBack: () => void;
  onComplete: () => void;
};

const UnitView = ({ 
  title, 
  type, 
  content, 
  questions = [], 
  onBack, 
  onComplete 
}: UnitViewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = React.useState<boolean[]>([]);

  const handleQuestionComplete = (correct: boolean) => {
    const newAnsweredCorrectly = [...answeredCorrectly, correct];
    setAnsweredCorrectly(newAnsweredCorrectly);
    
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1500);
    } else {
      // Completed all questions
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Module
      </Button>

      {questions.length > 0 ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-display">{title}</h1>
            <div className="text-sm text-cyber-text-secondary">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
          
          <QuestionCard 
            question={questions[currentQuestionIndex]} 
            onComplete={handleQuestionComplete} 
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            {content || (
              <div className="text-center py-8">
                <p className="text-cyber-text-secondary mb-4">
                  Content for this {type} is being developed.
                </p>
                <Button onClick={onComplete}>Mark as Complete</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UnitView;
