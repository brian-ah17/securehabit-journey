
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionCard, { Question } from "./QuestionCard";
import { ArrowLeft, Award, Sparkles, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState(0);

  // Calculate score based on correct answers
  useEffect(() => {
    if (answeredCorrectly.length > 0) {
      const correctCount = answeredCorrectly.filter(correct => correct).length;
      setScore(Math.round((correctCount / answeredCorrectly.length) * 100));
    }
  }, [answeredCorrectly]);

  // Fire confetti when unit is completed successfully
  useEffect(() => {
    if (showCompletion && score > 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [showCompletion, score]);

  const handleQuestionComplete = (correct: boolean) => {
    const newAnsweredCorrectly = [...answeredCorrectly, correct];
    setAnsweredCorrectly(newAnsweredCorrectly);
    
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Completed all questions
      setShowCompletion(true);
    }
  };

  const handleFinishUnit = () => {
    onComplete();
  };

  // Show completion screen when all questions are answered
  if (showCompletion) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={onBack} className="mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Module
        </Button>
        
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {score > 80 ? (
                <div className="bg-green-100 p-4 rounded-full">
                  <Award size={48} className="text-green-600" />
                </div>
              ) : score > 60 ? (
                <div className="bg-blue-100 p-4 rounded-full">
                  <Sparkles size={48} className="text-blue-600" />
                </div>
              ) : (
                <div className="bg-amber-100 p-4 rounded-full">
                  <CheckCircle size={48} className="text-amber-600" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-display">Unit Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="text-lg mb-2">Your Score</p>
              <div className="text-4xl font-bold">{score}%</div>
              <p className="text-cyber-text-secondary mt-2">
                You answered {answeredCorrectly.filter(correct => correct).length} out of {questions.length} questions correctly
              </p>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleFinishUnit} className="bg-cyber-primary hover:bg-cyber-primary/90 px-8">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
