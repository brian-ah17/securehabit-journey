
import React, { useState } from "react";
import { Shield, LogIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      console.log("Initiating Google login");
      
      // Simulate API call to Google auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful authentication
      toast({
        title: "Authentication successful",
        description: "You've been logged in successfully!",
        variant: "default",
      });
      
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Google authentication error:", error);
      toast({
        title: "Authentication failed",
        description: "There was a problem logging in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyber-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-cyber-primary" />
            </div>
            <h2 className="text-2xl font-bold font-display text-cyber-text-primary">Welcome to SecureHabit</h2>
            <p className="mt-2 text-cyber-text-secondary">Sign in to track your progress.</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
              )}
              {isLoading ? "Connecting..." : "Continue with Google"}
            </Button>
            
            <div className="text-center pt-4">
              <p className="text-xs text-cyber-text-secondary">
                By continuing, you agree to the Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center">
            <div className="text-cyber-text-secondary text-sm">
              © {new Date().getFullYear()} SecureHabits.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
