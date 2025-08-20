import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    description?: string;
    shortDescription?: string;
    location?: string;
    date: string;
    startTime: string;
    endTime: string;
    imageUrl?: string;
    eventType: string;
    isFeatured?: boolean;
  };
  showFullDetails?: boolean;
}

export default function EventCard({ event, showFullDetails = false }: EventCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const rsvpMutation = useMutation({
    mutationFn: async (status: string) => {
      await apiRequest("POST", `/api/events/${event.id}/rsvp`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      queryClient.invalidateQueries({ queryKey: ["/api/events/featured"] });
      toast({
        title: "RSVP Confirmed!",
        description: "You've successfully registered for this event.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Please log in to RSVP for events.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "RSVP Failed",
        description: "Failed to register for event. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-IE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'fas fa-code';
      case 'hackathon':
        return 'fas fa-trophy';
      case 'meetup':
        return 'fas fa-users';
      case 'office_hours':
        return 'fas fa-question-circle';
      default:
        return 'fas fa-calendar';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'hackathon':
        return 'bg-purple-100 text-purple-800';
      case 'meetup':
        return 'bg-blue-100 text-blue-800';
      case 'office_hours':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Event Image */}
        <div className="w-full h-48 bg-gradient-to-br from-solana-purple to-solana-green rounded-t-lg overflow-hidden flex items-center justify-center">
          {event.imageUrl ? (
            <img 
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`${event.imageUrl ? 'hidden' : ''} text-white text-center`}>
            <i className="fas fa-calendar-alt text-4xl mb-2"></i>
            <p className="text-lg font-semibold">{event.title}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Event Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {event.isFeatured && (
                <Badge className="bg-solana-purple/10 text-solana-purple">
                  <i className="fas fa-star mr-1"></i>
                  Featured
                </Badge>
              )}
              <Badge className={`${getEventTypeColor(event.eventType)}`}>
                <i className={`${getEventTypeIcon(event.eventType)} mr-1`}></i>
                {event.eventType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
            <span className="text-sm text-slate-500">{formatDate(event.date)}</span>
          </div>

          {/* Event Title and Description */}
          <h3 className="text-xl font-bold text-slate-900 mb-3" data-testid={`text-event-title-${event.id}`}>
            {event.title}
          </h3>

          <p className="text-slate-600 mb-4" data-testid={`text-event-description-${event.id}`}>
            {showFullDetails ? event.description : event.shortDescription || event.description}
          </p>

          {/* Event Details */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-slate-500">
              {event.location && (
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span data-testid={`text-event-location-${event.id}`}>{event.location}</span>
                </div>
              )}
              <div className="flex items-center">
                <i className="fas fa-clock mr-2"></i>
                <span data-testid={`text-event-time-${event.id}`}>
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </span>
              </div>
            </div>
          </div>

          {/* Attendees and RSVP */}
          <div className="flex items-center justify-between">
            {/* Mock attendees display */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32" />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32" />
                  <AvatarFallback>A2</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32" />
                  <AvatarFallback>A3</AvatarFallback>
                </Avatar>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-600">+5</span>
                </div>
              </div>
              <span className="text-sm text-slate-500">8 attending</span>
            </div>

            {/* RSVP Button */}
            {user ? (
              <Button 
                className="bg-solana-purple text-white hover:bg-purple-700"
                onClick={() => rsvpMutation.mutate('attending')}
                disabled={rsvpMutation.isPending}
                data-testid={`button-rsvp-event-${event.id}`}
              >
                <i className="fas fa-calendar-plus mr-2"></i>
                {rsvpMutation.isPending ? 'RSVPing...' : 'RSVP Now'}
              </Button>
            ) : (
              <Button 
                className="bg-solana-purple text-white hover:bg-purple-700"
                onClick={() => window.location.href = '/api/login'}
                data-testid={`button-login-to-rsvp-${event.id}`}
              >
                <i className="fas fa-calendar-plus mr-2"></i>
                Login to RSVP
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}