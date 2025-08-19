import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/navigation/header";
import MemberCard from "@/components/community/member-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

export default function Community() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: leaderboard } = useQuery({
    queryKey: ["/api/users/leaderboard"],
    retry: false,
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    retry: false,
  });

  // Simulated member data - in a real app this would come from API
  const mockMembers = [
    {
      id: "1",
      name: "Aoife Kelly",
      university: "Trinity College Dublin",
      bio: "Building DeFi tools on Solana. Love connecting with other developers!",
      skills: ["DeFi", "Rust"],
      profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      isOnline: true
    },
    {
      id: "2", 
      name: "Niamh O'Brien",
      university: "University College Cork",
      bio: "NFT artist and smart contract developer. Always happy to collaborate!",
      skills: ["NFTs", "Art"],
      profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      isOnline: false
    },
    {
      id: "3",
      name: "Cian Murphy", 
      university: "University College Dublin",
      bio: "Full-stack developer working on Web3 gaming. Let's build the future!",
      skills: ["Gaming", "React"],
      profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      isOnline: true
    },
    {
      id: "4",
      name: "Emma Walsh",
      university: "Dublin City University", 
      bio: "Data scientist exploring blockchain analytics. Love mentoring newcomers!",
      skills: ["Analytics", "Python"],
      profileImageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      isOnline: true
    }
  ];

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Student Community</h1>
            <p className="text-lg text-slate-600">Connect with fellow builders from universities across Ireland</p>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{mockMembers.filter(m => m.isOnline).length} online now</span>
            </div>
            <Button className="bg-solana-purple hover:bg-purple-700" data-testid="button-invite-friends">
              <i className="fas fa-user-plus mr-2"></i>
              Invite Friends
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Community Section */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search members by name, university, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
                data-testid="input-search-members"
              />
            </div>

            {/* Featured Members Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <MemberCard key={member.id} member={member} />
                ))
              ) : (
                <div className="col-span-2">
                  <Card>
                    <CardContent className="py-12 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-search text-slate-400 text-xl"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">No Members Found</h3>
                      <p className="text-slate-600">Try adjusting your search criteria or browse all members.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard && leaderboard.length > 0 ? (
                  <div className="space-y-4">
                    {leaderboard.slice(0, 5).map((member: any, index: number) => (
                      <div key={member.id} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                          index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-500' :
                          index === 2 ? 'bg-gradient-to-br from-orange-600 to-red-500' :
                          'bg-slate-200'
                        }`}>
                          <span className={`text-sm font-bold ${index < 3 ? 'text-white' : 'text-slate-600'}`}>
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 text-sm">
                            {member.firstName || member.email?.split('@')[0] || 'Anonymous'}
                          </p>
                          <p className="text-sm text-slate-500">{member.points || 0} points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-trophy text-slate-400"></i>
                    </div>
                    <p className="text-sm text-slate-600">No rankings yet</p>
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-sm text-solana-purple hover:text-purple-700"
                  data-testid="button-view-full-leaderboard"
                >
                  View Full Leaderboard <i className="fas fa-arrow-right ml-1"></i>
                </Button>
              </CardContent>
            </Card>

            {/* University Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Universities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Trinity College Dublin</span>
                    <span className="text-sm font-medium text-slate-900">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">University College Dublin</span>
                    <span className="text-sm font-medium text-slate-900">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">University College Cork</span>
                    <span className="text-sm font-medium text-slate-900">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Dublin City University</span>
                    <span className="text-sm font-medium text-slate-900">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total Members</span>
                    <span className="text-sm font-medium text-slate-900">{stats?.totalUsers || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Program */}
            <Card className="bg-gradient-to-br from-solana-purple to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Invite Friends</h3>
                <p className="text-purple-100 text-sm mb-4">
                  Earn 100 points for each friend who joins and completes onboarding
                </p>
                <div className="bg-white/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-purple-100">
                      {user?.referralCode || 'GETTING_CODE...'}
                    </span>
                    <Button 
                      onClick={copyReferralCode}
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20 h-6 px-2"
                      data-testid="button-copy-referral-code"
                    >
                      <i className="fas fa-copy mr-1 text-xs"></i>
                      Copy
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white text-solana-purple hover:bg-purple-50"
                  data-testid="button-share-referral"
                >
                  <i className="fas fa-share mr-2"></i>
                  Share Invitation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
