import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Badge from "@/components/common/Badge";
import { Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type ModuleCardProps = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  isLocked: boolean;
};

const ModuleCard = ({
  id,
  title,
  description,
  icon,
  progress,
  isLocked,
}: ModuleCardProps) => {
  // Determine badge variant based on progress and lock status
  const getBadgeVariant = () => {
    if (isLocked) return "locked";
    if (progress === 100) return "completed";
    if (progress > 0) return "progress";
    return "progress";
  };

  return (
    <Card className={`overflow-hidden border border-slate-200 shadow-sm h-full flex flex-col ${
      isLocked ? "opacity-75" : "card-hover"
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-cyber-primary/10 p-3 rounded-full">
            {icon}
          </div>
          <Badge variant={getBadgeVariant()} />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-cyber-text-secondary text-sm mb-4">{description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-cyber-text-secondary">
            <span>{progress}% complete</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        {isLocked ? (
          <Button
            variant="outline"
            className="w-full text-cyber-text-secondary"
            disabled
          >
            <Lock size={16} className="mr-2" />
            Locked
          </Button>
        ) : (
          <Button
            asChild
            className="w-full bg-cyber-primary hover:bg-cyber-primary/90"
          >
            <Link to={`/modules/${id}`}>
              {progress > 0 && progress < 100 ? "Continue" : "Start"} Module
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
