import { Card, CardContent } from "./card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  color, 
  change, 
  changeType = "neutral" 
}: StatsCardProps) {
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          iconBg: "bg-blue-100",
          iconText: "text-blue-600",
          accent: "text-blue-600"
        };
      case "green":
        return {
          iconBg: "bg-green-100", 
          iconText: "text-green-600",
          accent: "text-green-600"
        };
      case "purple":
        return {
          iconBg: "bg-purple-100",
          iconText: "text-purple-600", 
          accent: "text-purple-600"
        };
      case "orange":
        return {
          iconBg: "bg-orange-100",
          iconText: "text-orange-600",
          accent: "text-orange-600"
        };
      default:
        return {
          iconBg: "bg-slate-100",
          iconText: "text-slate-600",
          accent: "text-slate-600"
        };
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-600";
      case "negative": 
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  const colorClasses = getColorClasses(color);
  
  return (
    <Card className="border border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${colorClasses.iconBg} rounded-lg flex items-center justify-center`}>
            <i className={`${icon} ${colorClasses.iconText} text-lg`}></i>
          </div>
          {change && (
            <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
              {changeType === "positive" && "+"}
              {change}
            </span>
          )}
        </div>
        
        <div>
          <p className="text-2xl font-bold text-slate-900 mb-1" data-testid={`stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          <p className="text-sm text-slate-600" data-testid={`stat-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
