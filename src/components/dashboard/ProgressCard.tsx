
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProgressCardProps = {
  progress: number;
  streak: number;
  nextBadge: {
    name: string;
    requiredPoints: number;
  };
};

const ProgressCard = ({ progress, streak, nextBadge }: ProgressCardProps) => {
  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-display">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyber-text-secondary">Overall Completion</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Learning streak */}
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="bg-cyber-accent/10 p-2 rounded-full">
                <TrendingUp size={18} className="text-cyber-accent" />
              </div>
              <div>
                <p className="text-xs text-cyber-text-secondary">Learning Streak</p>
                <p className="font-semibold">{streak} days</p>
              </div>
            </div>
          </div>
          
          {/* Next badge */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyber-text-secondary">Next Badge: {nextBadge.name}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
