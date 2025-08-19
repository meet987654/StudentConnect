import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/navigation/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function Resources() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("beginner");

  const { data: resources, isLoading } = useQuery({
    queryKey: ["/api/resources", selectedDifficulty],
    retry: false,
  });

  // Learning tracks data
  const learningTracks = [
    {
      id: "beginner",
      title: "Beginner Track",
      description: "Start your Web3 journey with fundamental concepts and hands-on tutorials.",
      icon: "fas fa-seedling",
      color: "green",
      progress: 25,
      lessons: [
        { title: "Introduction to Blockchain", completed: true },
        { title: "Solana Fundamentals", completed: true },
        { title: "Setting up Development Environment", completed: false },
        { title: "Your First Smart Contract", completed: false },
      ]
    },
    {
      id: "intermediate", 
      title: "Intermediate Track",
      description: "Build complex dApps and integrate advanced Solana features.",
      icon: "fas fa-rocket",
      color: "blue",
      progress: 60,
      lessons: [
        { title: "Advanced Smart Contracts", completed: true },
        { title: "Token Programs", completed: true },
        { title: "Cross-Program Invocation", completed: false },
        { title: "Frontend Integration", completed: false },
      ]
    },
    {
      id: "advanced",
      title: "Advanced Track", 
      description: "Master Solana architecture and build production-ready applications.",
      icon: "fas fa-brain",
      color: "purple",
      progress: 0,
      lessons: [
        { title: "Runtime Optimization", completed: false },
        { title: "Security Best Practices", completed: false },
        { title: "MEV and Arbitrage", completed: false },
        { title: "Validator Operations", completed: false },
      ]
    }
  ];

  const quickResources = [
    {
      title: "Documentation",
      description: "Official Solana docs", 
      icon: "fas fa-book",
      color: "yellow",
      url: "https://docs.solana.com"
    },
    {
      title: "Code Examples",
      description: "GitHub repositories",
      icon: "fab fa-github", 
      color: "slate-800",
      url: "https://github.com/solana-labs"
    },
    {
      title: "Discord",
      description: "Get help instantly",
      icon: "fab fa-discord",
      color: "indigo",
      url: "https://discord.com/invite/solana"
    },
    {
      title: "Video Tutorials", 
      description: "Step-by-step guides",
      icon: "fab fa-youtube",
      color: "red",
      url: "https://www.youtube.com/c/SolanaLabs"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string, text: string, button: string } } = {
      green: { bg: "from-green-50 to-emerald-50 border-green-200", text: "text-green-600", button: "bg-green-600 hover:bg-green-700" },
      blue: { bg: "from-blue-50 to-indigo-50 border-blue-200", text: "text-blue-600", button: "bg-blue-600 hover:bg-blue-700" },
      purple: { bg: "from-purple-50 to-pink-50 border-purple-200", text: "text-purple-600", button: "bg-purple-600 hover:bg-purple-700" },
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Learning Resources</h1>
          <p className="text-lg text-slate-600">Everything you need to start building on Solana</p>
        </div>

        {/* Learning Tracks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {learningTracks.map((track) => {
            const colorClasses = getColorClasses(track.color);
            const isLocked = track.id === "advanced" && track.progress === 0;
            
            return (
              <Card key={track.id} className={`bg-gradient-to-br ${colorClasses.bg} border`}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-${track.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                    <i className={`${track.icon} ${colorClasses.text} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{track.title}</h3>
                  <p className="text-slate-600 mb-6">{track.description}</p>
                  
                  {/* Progress */}
                  {track.progress > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-slate-700 mb-2">
                        <span>Progress</span>
                        <span>{track.progress}%</span>
                      </div>
                      <Progress value={track.progress} className="h-2" />
                    </div>
                  )}
                  
                  {/* Lessons Preview */}
                  <div className="space-y-3 mb-8">
                    {track.lessons.map((lesson, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-700">
                        <i className={`${lesson.completed ? 'fas fa-check-circle' : 'fas fa-circle'} ${lesson.completed ? colorClasses.text.replace('text-', 'text-') : 'text-slate-300'} mr-2`}></i>
                        {lesson.title}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${isLocked ? 'opacity-75 cursor-not-allowed' : colorClasses.button} text-white`}
                    disabled={isLocked}
                    data-testid={`button-start-track-${track.id}`}
                  >
                    {isLocked ? (
                      <>
                        <i className="fas fa-lock mr-2"></i>
                        Locked
                      </>
                    ) : track.progress > 0 ? (
                      "Continue Learning"
                    ) : (
                      "Start Learning"
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Quick Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer" onClick={() => window.open(resource.url, '_blank')}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${resource.color === 'slate-800' ? 'bg-slate-800' : `bg-${resource.color}-100`} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <i className={`${resource.icon} ${resource.color === 'slate-800' ? 'text-white' : `text-${resource.color}-600`}`}></i>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{resource.title}</h4>
                  <p className="text-sm text-slate-600">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Resources */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resource Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Learning Materials</CardTitle>
                  <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <TabsList>
                      <TabsTrigger value="beginner" data-testid="tab-beginner-resources">Beginner</TabsTrigger>
                      <TabsTrigger value="intermediate" data-testid="tab-intermediate-resources">Intermediate</TabsTrigger>
                      <TabsTrigger value="advanced" data-testid="tab-advanced-resources">Advanced</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solana-purple mx-auto"></div>
                    <p className="text-slate-600 mt-4">Loading resources...</p>
                  </div>
                ) : resources && resources.length > 0 ? (
                  <div className="space-y-4">
                    {resources.map((resource: any) => (
                      <div key={resource.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-2">{resource.title}</h4>
                            <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {resource.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {resource.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(resource.url, '_blank')}
                            data-testid={`button-view-resource-${resource.id}`}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-book text-slate-400 text-xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Resources Found</h3>
                    <p className="text-slate-600">Resources for {selectedDifficulty} level are coming soon!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Study Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-code text-green-600"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 text-sm">Rust Beginners</p>
                    <p className="text-xs text-slate-500">12 members • Next: Wed 7 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-coins text-blue-600"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 text-sm">DeFi Deep Dive</p>
                    <p className="text-xs text-slate-500">8 members • Next: Fri 3 PM</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full text-sm" data-testid="button-join-study-group">
                  Join Study Group
                </Button>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-slate-700 mb-2">
                      <span>Overall Progress</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Completed Lessons</span>
                      <span className="font-medium">7/25</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Certificates Earned</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Study Time</span>
                      <span className="font-medium">14h 32m</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
