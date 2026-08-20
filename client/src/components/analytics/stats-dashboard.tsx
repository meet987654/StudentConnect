import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatsCard from "../ui/stats-card";
export default function StatsDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats"],
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-8 bg-slate-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Members",
      value: stats?.totalUsers || 547,
      icon: "fas fa-users",
      color: "blue",
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Active Projects",
      value: stats?.totalProjects || 89,
      icon: "fas fa-code",
      color: "green",
      change: "+23%", 
      changeType: "positive" as const
    },
    {
      title: "Events Hosted",
      value: stats?.totalEvents || 34,
      icon: "fas fa-calendar",
      color: "purple",
      change: "+8%",
      changeType: "positive" as const
    },
    {
      title: "Active This Month",
      value: stats?.activeUsers || 127,
      icon: "fas fa-chart-line",
      color: "orange",
      change: "+15%",
      changeType: "positive" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          change={stat.change}
          changeType={stat.changeType}
        />
      ))}
    </div>
  );
}
