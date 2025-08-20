import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/navigation/header";
import ProgressTracker from "@/components/onboarding/progress-tracker";
import EventCard from "@/components/events/event-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Event, UserAchievement } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: featuredEvents = [], isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events/featured"],
    retry: false,
  });

  const { data: stats = {} } = useQuery({
    queryKey: ["/api/stats"],
    retry: false,
  });

  const { data: userAchievements = [] } = useQuery<UserAchievement[]>({
    queryKey: ["/api/users/achievements"],
    retry: false,
  });

  const joinCommunityMutation = useMutation({
    mutationFn: async (type: 'telegram' | 'twitter') => {
      await apiRequest("POST", "/api/onboarding/complete", {
        stepId: 2, // Community join step
        completed: true
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/onboarding/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Progress Updated",
        description: "Community step completed! You've earned 50 points.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Show dashboard for both logged in and logged out users
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {isLoggedIn ? `Welcome back, ${user?.firstName || user?.email}!` : "Welcome to Superteam Ireland!"}
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                {isLoggedIn ? "Continue your journey in the Solana ecosystem" : "Join Ireland's leading Web3 community"}
              </p>
            </div>
            {isLoggedIn && (
              <div className="text-right">
                <p className="text-2xl font-bold text-solana-purple">{user?.points || 0}</p>
                <p className="text-sm text-slate-500">Points</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Tracker - Only show for logged in users */}
        {isLoggedIn && (
          <div className="mb-8">
            <ProgressTracker />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Events */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Featured Events</h2>
                <Button 
                  variant="outline" 
                  className="text-solana-purple border-solana-purple hover:bg-solana-purple hover:text-white"
                  onClick={() => window.location.href = '/events'}
                >
                  View All Events
                </Button>
              </div>
              
              {eventsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-solana-purple mx-auto"></div>
                </div>
              ) : featuredEvents && featuredEvents.length > 0 ? (
                <div className="space-y-6">
                  {featuredEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-calendar text-slate-400 text-xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Featured Events</h3>
                    <p className="text-slate-600">Check back later for upcoming events and workshops.</p>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => {
                    window.open('https://t.me/superteamireland', '_blank');
                    if (isLoggedIn) joinCommunityMutation.mutate('telegram');
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={joinCommunityMutation.isPending}
                  data-testid="button-join-telegram-dashboard"
                >
                  <i className="fab fa-telegram mr-2"></i>
                  {joinCommunityMutation.isPending ? 'Joining...' : 'Join Telegram'}
                </Button>
                
                <Button 
                  onClick={() => {
                    window.open('https://twitter.com/SuperteamIE', '_blank');
                    if (isLoggedIn) joinCommunityMutation.mutate('twitter');
                  }}
                  variant="outline"
                  className="w-full border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                  disabled={joinCommunityMutation.isPending}
                  data-testid="button-follow-twitter-dashboard"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  {joinCommunityMutation.isPending ? 'Following...' : 'Follow @SuperteamIE'}
                </Button>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Members</span>
                  <span className="font-semibold">{(stats as any)?.totalUsers || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Events Hosted</span>
                  <span className="font-semibold">{(stats as any)?.totalEvents || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Active Users</span>
                  <span className="font-semibold">{(stats as any)?.activeUsers || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {userAchievements && userAchievements.length > 0 ? (
                  <div className="space-y-3">
                    {userAchievements.slice(0, 3).map((achievement: any) => (
                      <div key={achievement.id} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <i className="fas fa-star text-white"></i>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">Achievement Earned</p>
                          <p className="text-xs text-slate-500">Recently completed</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-trophy text-slate-400"></i>
                    </div>
                    <p className="text-sm text-slate-600">No achievements yet</p>
                    <p className="text-xs text-slate-500">Complete onboarding steps to earn your first badge!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
