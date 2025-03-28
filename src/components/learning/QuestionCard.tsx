
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type QuestionCardProps = {
  question: Question;
  onComplete: (correct: boolean) => void;
};

const QuestionCard = ({ question, onComplete }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedOption === null) {
      toast({
        title: "Selection required",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    
    if (correct) {
      toast({
        title: "Correct!",
        description: "Great job! You selected the right answer.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "That's not quite right. Review the explanation for more information.",
        variant: "destructive",
      });
    }
    
    onComplete(correct);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-display">Knowledge Check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">{question.question}</div>
        
        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(value) => setSelectedOption(parseInt(value))}
          className="space-y-3"
          disabled={isSubmitted}
        >
          {question.options.map((option, index) => (
            <div key={index} className={`flex items-center space-x-2 p-3 rounded-md border ${
              isSubmitted && index === question.correctAnswer 
                ? "border-green-500 bg-green-50" 
                : isSubmitted && index === selectedOption 
                  ? "border-red-500 bg-red-50" 
                  : "border-slate-200"
            }`}>
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
              {isSubmitted && index === question.correctAnswer && (
                <CheckCircle size={18} className="text-green-500" />
              )}
              {isSubmitted && index === selectedOption && index !== question.correctAnswer && (
                <XCircle size={18} className="text-red-500" />
              )}
            </div>
          ))}
        </RadioGroup>
        
        {isSubmitted && (
          <div className={`p-4 rounded-md ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
            <h3 className="font-bold mb-2">Explanation:</h3>
            <p>{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-3">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} className="bg-cyber-primary hover:bg-cyber-primary/90">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="bg-cyber-primary hover:bg-cyber-primary/90">
            Continue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
