
import React from "react";
import { Shield, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeVariant = "progress" | "completed" | "locked";

type BadgeProps = {
  variant: BadgeVariant;
  className?: string;
};

const badgeConfig = {
  progress: {
    icon: Clock,
    bgColor: "bg-amber-100",
    textColor: "text-amber-800",
    iconColor: "text-amber-500",
    label: "In Progress",
  },
  completed: {
    icon: CheckCircle,
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    iconColor: "text-green-500",
    label: "Completed",
  },
  locked: {
    icon: Shield,
    bgColor: "bg-slate-100",
    textColor: "text-slate-800",
    iconColor: "text-slate-500",
    label: "Locked",
  },
};

const Badge = ({ variant, className }: BadgeProps) => {
  const config = badgeConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <Icon size={12} className={cn("mr-1", config.iconColor)} />
      {config.label}
    </div>
  );
};

export default Badge;
