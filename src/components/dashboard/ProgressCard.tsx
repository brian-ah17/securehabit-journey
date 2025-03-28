
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProgressCardProps = {
  progress: number;
  points: number;
  streak: number;
  nextBadge: {
    name: string;
    requiredPoints: number;
  };
};

const ProgressCard = ({ progress, points, streak, nextBadge }: ProgressCardProps) => {
  // Calculate percentage progress towards next badge
  const badgeProgress = Math.min(Math.round((points / nextBadge.requiredPoints) * 100), 100);
  
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
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="bg-cyber-primary/10 p-2 rounded-full">
                  <Award size={18} className="text-cyber-primary" />
                </div>
                <div>
                  <p className="text-xs text-cyber-text-secondary">Points Earned</p>
                  <p className="font-semibold">{points}</p>
                </div>
              </div>
            </div>
            
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
          </div>
          
          {/* Next badge */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyber-text-secondary">Next Badge: {nextBadge.name}</span>
              <span className="font-medium">{badgeProgress}%</span>
            </div>
            <Progress value={badgeProgress} className="h-2" />
            <p className="text-xs text-cyber-text-secondary mt-2">
              {nextBadge.requiredPoints - points} more points needed
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
