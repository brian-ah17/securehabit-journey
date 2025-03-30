
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Shield, 
  User 
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 py-4 px-4 md:px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-cyber-primary" />
          <span className="text-xl font-display font-semibold text-cyber-text-primary hidden sm:inline-block">
            SecureHabit
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="font-medium text-cyber-text-secondary hover:text-cyber-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/resources" className="font-medium text-cyber-text-secondary hover:text-cyber-primary transition-colors">
            Resources
          </Link>
          <Link to="/about" className="font-medium text-cyber-text-secondary hover:text-cyber-primary transition-colors">
            About
          </Link>
          <Button asChild variant="outline" size="sm" className="ml-4 flex items-center gap-2">
            <Link to="/login">
              <User size={16} />
              <span>Account</span>
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-cyber-text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-cyber-text-primary" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-white border-b border-slate-200 z-50 animate-fade-in">
            <div className="py-4 px-6 flex flex-col space-y-4">
              <Link 
                to="/dashboard" 
                className="font-medium text-cyber-text-primary hover:text-cyber-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/resources" 
                className="font-medium text-cyber-text-primary hover:text-cyber-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/about" 
                className="font-medium text-cyber-text-primary hover:text-cyber-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Button asChild variant="outline" size="sm" className="w-full justify-center items-center gap-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <User size={16} />
                  <span>Account</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
