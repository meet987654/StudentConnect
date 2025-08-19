import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    university: string;
    bio: string;
    skills: string[];
    profileImageUrl?: string;
    isOnline?: boolean;
  };
}

export default function MemberCard({ member }: MemberCardProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
    }, 1000);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSkillColor = (skill: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-teal-100 text-teal-800',
      'bg-yellow-100 text-yellow-800',
    ];
    
    const index = skill.length % colors.length;
    return colors[index];
  };

  return (
    <Card className="border border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-15 h-15">
              <AvatarImage src={member.profileImageUrl} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-solana-purple to-solana-green text-white">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            
            {/* Online Status */}
            <div className="absolute -bottom-1 -right-1 flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-full border-2 border-white ${
                member.isOnline ? 'bg-green-400' : 'bg-slate-400'
              }`}></div>
            </div>
          </div>

          {/* Member Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-900 truncate" data-testid={`text-member-name-${member.id}`}>
                {member.name}
              </h4>
              <div className="flex items-center space-x-1 text-xs">
                <div className={`w-2 h-2 rounded-full ${
                  member.isOnline ? 'bg-green-400' : 'bg-slate-400'
                }`}></div>
                <span className="text-slate-500">
                  {member.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-2" data-testid={`text-member-university-${member.id}`}>
              {member.university}
            </p>

            <p className="text-sm text-slate-500 mb-4 line-clamp-2" data-testid={`text-member-bio-${member.id}`}>
              {member.bio}
            </p>

            {/* Skills */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 2).map((skill, index) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className={`text-xs px-2 py-1 ${getSkillColor(skill)}`}
                    data-testid={`badge-skill-${member.id}-${skill.toLowerCase()}`}
                  >
                    {skill}
                  </Badge>
                ))}
                {member.skills.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-1 bg-slate-100 text-slate-600">
                    +{member.skills.length - 2}
                  </Badge>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="text-solana-purple hover:text-purple-700 hover:bg-purple-50 px-3 py-1"
                onClick={handleConnect}
                disabled={isConnecting}
                data-testid={`button-connect-member-${member.id}`}
              >
                {isConnecting ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
