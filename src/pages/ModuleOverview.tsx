
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  PlayCircle, 
  FileText, 
  Clock, 
  CheckCircle, 
  Award,
  LockKeyhole,
  ShieldCheck
} from "lucide-react";
import UnitView from "@/components/learning/UnitView";
import { ModuleProvider, useModule } from "@/contexts/ModuleContext";

// Unit type icons
const getUnitTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <PlayCircle size={16} />;
    case "lesson":
      return <FileText size={16} />;
    case "quiz":
      return <CheckCircle size={16} />;
    case "activity":
      return <ShieldCheck size={16} />;
    default:
      return <FileText size={16} />;
  }
};

const ModuleOverviewContent = () => {
  const { 
    loading, 
    module, 
    selectedUnit, 
    setSelectedUnit, 
    completeUnit,
    getQuestionsForUnit 
  } = useModule();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyber-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-cyber-text-secondary">Loading module...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/dashboard">
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4 font-display">Module Not Found</h2>
          <p className="text-cyber-text-secondary mb-6">
            Sorry, the module you're looking for doesn't exist or isn't available yet.
          </p>
          <Button asChild>
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // If a unit is selected, show the unit view
  if (selectedUnit) {
    const questions = getQuestionsForUnit(selectedUnit.id);
    
    return (
      <UnitView
        unitId={selectedUnit.id}
        title={selectedUnit.title}
        type={selectedUnit.type}
        questions={questions}
        onBack={() => setSelectedUnit(null)}
        onComplete={() => completeUnit(selectedUnit.id)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <Button asChild variant="outline" className="mb-6">
        <Link to="/dashboard">
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      {/* Module Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold font-display">{module.title}</h1>
            <p className="text-cyber-text-secondary mt-1">{module.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock size={18} className="text-cyber-text-secondary mr-2" />
              <span className="text-sm text-cyber-text-secondary">{module.estimatedTime}</span>
            </div>
            <div className="flex items-center">
              <Award size={18} className="text-cyber-text-secondary mr-2" />
              <span className="text-sm text-cyber-text-secondary">{module.points} points</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-cyber-text-secondary">Progress</span>
            <span className="font-medium">{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
        </div>

        {/* Continue button */}
        <div className="flex justify-end">
          <Button className="bg-cyber-primary hover:bg-cyber-primary/90">
            {module.progress > 0 ? "Continue Module" : "Start Module"}
          </Button>
        </div>
      </div>

      {/* Module Content */}
      <Tabs defaultValue="units" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="units">Learning Units</TabsTrigger>
          <TabsTrigger value="objectives">Learning Objectives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="units" className="space-y-4">
          {module.units.map((unit, index) => (
            <Card key={unit.id} className={`border border-slate-200 ${unit.locked ? 'opacity-75' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-cyber-text-secondary">{index + 1}</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{unit.title}</span>
                        {unit.completed && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium rounded-full px-2 py-0.5 flex items-center">
                            <CheckCircle size={12} className="mr-1" />
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-cyber-text-secondary mt-1">
                        <span className="flex items-center mr-3">
                          {getUnitTypeIcon(unit.type)}
                          <span className="ml-1 capitalize">{unit.type}</span>
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {unit.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {unit.locked ? (
                      <Button variant="outline" disabled className="flex items-center">
                        <LockKeyhole size={16} className="mr-2" />
                        Locked
                      </Button>
                    ) : (
                      <Button 
                        variant={unit.completed ? "outline" : "default"} 
                        className={unit.completed ? "text-cyber-text-secondary" : "bg-cyber-primary hover:bg-cyber-primary/90"}
                        onClick={() => setSelectedUnit(unit)}
                      >
                        {unit.completed ? "Review" : "Start"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="objectives">
          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 font-display">Learning Objectives</h3>
              <ul className="space-y-3">
                {module.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-cyber-primary">{index + 1}</span>
                    </div>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Wrapper component that provides context
const ModuleOverview = () => {
  return (
    <ModuleProvider>
      <ModuleOverviewContent />
    </ModuleProvider>
  );
};

export default ModuleOverview;
