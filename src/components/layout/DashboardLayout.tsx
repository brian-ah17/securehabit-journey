
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { 
  LayoutDashboard, 
  Shield, 
  BookOpen, 
  AlertTriangle, 
  GraduationCap, 
  Settings,
  ChevronRight
} from "lucide-react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  
  const sidebarItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Awareness",
      icon: Shield,
      path: "/modules/awareness",
    },
    {
      label: "Digital Hygiene",
      icon: BookOpen,
      path: "/modules/digital-hygiene",
    },
    {
      label: "Threat Detection",
      icon: AlertTriangle,
      path: "/modules/threat-detection",
    },
    {
      label: "Legal Context",
      icon: GraduationCap,
      path: "/modules/legal-context",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-cyber-text-primary mb-4 uppercase tracking-wider">
              Learning Modules
            </h2>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== "/dashboard" && location.pathname.includes(item.path));
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-cyber-primary text-white"
                        : "text-cyber-text-secondary hover:bg-slate-50 hover:text-cyber-primary"
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto bg-cyber-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
