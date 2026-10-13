import React from "react";
import * as LucideIcons from "lucide-react";

interface IconHelperProps {
  name: string;
  className?: string;
  size?: number;
}

export function IconHelper({ name, className = "h-5 w-5", size }: IconHelperProps) {
  const iconsMap = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string; size?: number }>
  >;
  const IconComponent = iconsMap[name] || LucideIcons.Globe;
  return <IconComponent className={className} size={size} />;
}

