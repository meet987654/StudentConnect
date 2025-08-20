import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ProgressTracker() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: steps, isLoading: stepsLoading } = useQuery({
    queryKey: ["/api/onboarding/steps"],
    retry: false,
  });

  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/onboarding/progress"],
    retry: false,
  });

  const completeMutation = useMutation({
    mutationFn: async ({ stepId, completed }: { stepId: number; completed: boolean }) => {
      await apiRequest("POST", "/api/onboarding/complete", { stepId, completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/onboarding/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Progress Updated!",
        description: "You've earned 50 points for completing this step.",
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

  if (stepsLoading || progressLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solana-purple mx-auto"></div>
      </div>
    );
  }

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Onboarding Setup</h3>
          <p className="text-slate-600">Onboarding steps are being configured. Check back later!</p>
        </CardContent>
      </Card>
    );
  }

  const completedSteps = Array.isArray(progress) ? progress.filter((p: any) => p.isCompleted) : [];
  const progressPercentage = Array.isArray(steps) ? Math.round((completedSteps.length / steps.length) * 100) : 0;

  // Mock onboarding steps if none exist in database
  const defaultSteps = [
    {
      id: 1,
      name: "create_profile",
      title: "Create Profile",
      description: "Set up your student profile and connect your university email",
      points: 50,
      order: 1,
      isRequired: true
    },
    {
      id: 2,
      name: "join_community",
      title: "Join Community", 
      description: "Connect with Telegram and follow @SuperteamIE on Twitter",
      points: 50,
      order: 2,
      isRequired: true
    },
    {
      id: 3,
      name: "first_event",
      title: "Attend Event",
      description: "Join your first Superteam Ireland meetup or workshop",
      points: 100,
      order: 3,
      isRequired: true
    }
  ];

  const stepsToShow = Array.isArray(steps) && steps.length > 0 ? steps : defaultSteps;
  const currentStep = completedSteps.length < stepsToShow.length ? completedSteps.length : stepsToShow.length - 1;

  return (
    <section className="py-8 bg-white rounded-2xl border border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Onboarding Journey</h2>
          <p className="text-slate-600">Complete these steps to unlock exclusive opportunities</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm font-medium text-solana-purple">{progressPercentage}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
        
        {/* Onboarding Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {stepsToShow.map((step: any, index: number) => {
            const isCompleted = completedSteps.some((p: any) => p.stepId === step.id);
            const isCurrent = index === currentStep && !isCompleted;
            const isLocked = index > currentStep && !isCompleted;
            
            return (
              <Card 
                key={step.id} 
                className={`relative transition-all ${
                  isCompleted 
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" 
                    : isCurrent 
                    ? "bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-solana-purple transform scale-105 shadow-lg"
                    : "bg-slate-50 border-slate-200 opacity-75"
                }`}
              >
                <CardContent className="p-6">
                  {/* Status Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center">
                    {isCompleted ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                    ) : isCurrent ? (
                      <div className="w-8 h-8 bg-solana-purple rounded-full flex items-center justify-center animate-pulse">
                        <i className="fas fa-arrow-right text-white text-sm"></i>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                        <span className="text-slate-500 text-sm font-bold">{index + 1}</span>
                      </div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isCompleted ? "bg-green-100" : isCurrent ? "bg-purple-100" : "bg-slate-100"
                  }`}>
                    <i className={`text-xl ${
                      step.name === "create_profile" ? "fas fa-user-plus" :
                      step.name === "join_community" ? "fab fa-telegram" :
                      step.name === "first_event" ? "fas fa-calendar" :
                      "fas fa-check"
                    } ${
                      isCompleted ? "text-green-600" : isCurrent ? "text-purple-600" : "text-slate-400"
                    }`}></i>
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 ${
                    isCompleted || isCurrent ? "text-slate-900" : "text-slate-600"
                  }`}>
                    {step.title}
                  </h3>

                  <p className={`text-sm mb-4 ${
                    isCompleted || isCurrent ? "text-slate-600" : "text-slate-500"
                  }`}>
                    {step.description}
                  </p>

                  {/* Action Button */}
                  <div className="mt-6">
                    {isCompleted ? (
                      <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
                        <i className="fas fa-check-circle mr-1"></i>
                        Completed
                      </Badge>
                    ) : isCurrent ? (
                      <Button
                        className="w-full bg-solana-purple text-white hover:bg-purple-700"
                        onClick={() => {
                          if (step.name === "join_community") {
                            // Open social media links and mark as complete
                            window.open("https://t.me/superteamireland", "_blank");
                            window.open("https://twitter.com/SuperteamIE", "_blank");
                            completeMutation.mutate({ stepId: step.id, completed: true });
                          } else if (step.name === "create_profile") {
                            // Mark profile creation as complete (assuming they're logged in)
                            completeMutation.mutate({ stepId: step.id, completed: true });
                          }
                        }}
                        disabled={completeMutation.isPending}
                        data-testid={`button-complete-step-${step.name}`}
                      >
                        {completeMutation.isPending ? "Completing..." : 
                         step.name === "join_community" ? "Join Now" : "Complete"}
                      </Button>
                    ) : (
                      <Badge variant="secondary" className="text-slate-400">
                        <i className="fas fa-lock mr-1"></i>
                        Locked
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievement Preview */}
        {completedSteps.length > 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Your Achievements</h3>
            <div className="flex justify-center space-x-6">
              {completedSteps.length >= 1 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <i className="fas fa-star text-white text-xl"></i>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">First Step</h4>
                  <p className="text-xs text-slate-500">Profile Created</p>
                </div>
              )}
              
              {completedSteps.length >= 2 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <i className="fas fa-users text-white text-xl"></i>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">Community</h4>
                  <p className="text-xs text-slate-500">Joined Network</p>
                </div>
              )}
              
              {completedSteps.length >= 3 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <i className="fas fa-handshake text-white text-xl"></i>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">Networker</h4>
                  <p className="text-xs text-slate-500">First Event</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
