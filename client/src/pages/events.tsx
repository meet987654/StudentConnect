import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/use-toast";
import Header from "../components/navigation/header";
import EventCard from "../components/events/event-card";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { isUnauthorizedError } from "../lib/authUtils";
import { apiRequest, queryClient } from "../lib/queryClient";
import { Event } from "../shared/schema";
import { EventCreateForm } from "../components/events/event-create-form";

export default function Events() {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    retry: false,
  });

  const { data: featuredEvents = [] } = useQuery<Event[]>({
    queryKey: ["/api/events/featured"],
    retry: false,
  });

  const createEventMutation = useMutation({
    mutationFn: async (eventData: any) => {
      return apiRequest("POST", "/api/events", eventData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      queryClient.invalidateQueries({ queryKey: ["/api/events/featured"] });
      setShowCreateDialog(false);
      toast({
        title: "Event Created",
        description: "Your event has been successfully created!",
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
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredEvents = events.filter((event: Event) => {
    if (activeTab === "all") return true;
    if (activeTab === "featured") return event.isFeatured;
    return event.eventType === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Events & Workshops
              </h1>
              <p className="text-lg text-slate-600">
                Join our community events and accelerate your Web3 learning
              </p>
            </div>
            {user && (
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-solana-purple hover:bg-solana-purple/90">
                    <i className="fas fa-plus mr-2"></i>
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                  </DialogHeader>
                  <EventCreateForm onSubmit={(data) => createEventMutation.mutate(data)} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Featured Events Banner */}
        {featuredEvents.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-solana-purple to-superteam-blue rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="bg-white/20 text-white mb-4">
                    <i className="fas fa-star mr-1"></i>
                    Featured Event
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">
                    {featuredEvents[0]?.title}
                  </h2>
                  <p className="text-blue-100 mb-4">
                    {featuredEvents[0]?.shortDescription}
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <i className="fas fa-calendar mr-2"></i>
                      {featuredEvents[0]?.date ? new Date(featuredEvents[0].date).toLocaleDateString() : 'TBA'}
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {featuredEvents[0]?.location}
                    </div>
                  </div>
                </div>
                <Button 
                  className="bg-white text-solana-purple hover:bg-slate-50"
                  data-testid="button-rsvp-featured"
                >
                  RSVP Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Event Filters */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-5">
              <TabsTrigger value="all" data-testid="tab-all-events">All</TabsTrigger>
              <TabsTrigger value="featured" data-testid="tab-featured-events">Featured</TabsTrigger>
              <TabsTrigger value="workshop" data-testid="tab-workshop-events">Workshops</TabsTrigger>
              <TabsTrigger value="hackathon" data-testid="tab-hackathon-events">Hackathons</TabsTrigger>
              <TabsTrigger value="meetup" data-testid="tab-meetup-events">Meetups</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Events List */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Events */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-solana-purple mx-auto"></div>
                <p className="text-slate-600 mt-4">Loading events...</p>
              </div>
            ) : filteredEvents && filteredEvents.length > 0 ? (
              <div className="space-y-6">
                {filteredEvents.map((event: any) => (
                  <EventCard key={event.id} event={event} showFullDetails />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-calendar text-slate-400 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No Events Found
                  </h3>
                  <p className="text-slate-600">
                    {activeTab === "all" 
                      ? "No events are currently scheduled. Check back later!"
                      : `No ${activeTab} events found. Try a different filter.`
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Event Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-code text-green-600 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Workshops</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {events?.filter((e: any) => e.eventType === 'workshop').length || 0}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-trophy text-purple-600 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Hackathons</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {events?.filter((e: any) => e.eventType === 'hackathon').length || 0}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-users text-blue-600 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Meetups</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {events?.filter((e: any) => e.eventType === 'meetup').length || 0}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-question-circle text-yellow-600 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Office Hours</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {events?.filter((e: any) => e.eventType === 'office_hours').length || 0}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Quick Events */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Quick Access</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    data-testid="button-weekly-office-hours"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-question-circle text-blue-600 text-sm"></i>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">Weekly Office Hours</p>
                        <p className="text-xs text-slate-500">Every Friday, 4 PM</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    data-testid="button-study-groups"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-book text-green-600 text-sm"></i>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">Study Groups</p>
                        <p className="text-xs text-slate-500">Join learning sessions</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
