import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-solana-purple to-solana-green rounded-lg flex items-center justify-center">
                <i className="fas fa-rocket text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Superteam Ireland</h1>
                <p className="text-xs text-slate-500">Student Onboarding</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#events" className="text-slate-600 hover:text-solana-purple transition-colors">Events</a>
              <a href="#community" className="text-slate-600 hover:text-solana-purple transition-colors">Community</a>
              <a href="#resources" className="text-slate-600 hover:text-solana-purple transition-colors">Resources</a>
            </nav>

            <div className="flex items-center space-x-4">
              <a href="#" className="text-slate-400 hover:text-superteam-blue transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-superteam-blue transition-colors">
                <i className="fab fa-telegram text-lg"></i>
              </a>

              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-solana-purple hover:bg-purple-700"
                data-testid="button-login"
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-solana-purple via-superteam-blue to-solana-green py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
                <i className="fas fa-fire text-orange-300 mr-2"></i>
                Join 500+ Irish Students in Web3
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Build the Future with 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Solana
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Connect with Ireland's most ambitious university students building on Solana. 
                Learn, collaborate, and launch your Web3 career with exclusive opportunities and mentorship.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.href = '/api/login'}
                  className="bg-white text-solana-purple px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all transform hover:scale-105 shadow-xl"
                  data-testid="button-start-journey"
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
                  data-testid="button-watch-demo"
                >
                  <i className="fab fa-youtube mr-2"></i>
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="University students collaborating" 
                className="rounded-2xl shadow-2xl w-full"
              />

              {/* Floating Stats Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-green-600"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">547</p>
                    <p className="text-sm text-slate-500">Active Members</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-trophy text-purple-600"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">89</p>
                    <p className="text-sm text-slate-500">Projects Built</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Join Superteam Ireland?</h2>
            <p className="text-lg text-slate-600">Everything you need to succeed in the Solana ecosystem</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <i className="fas fa-graduation-cap text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Learn & Grow</h3>
                <p className="text-slate-600">
                  Access comprehensive learning resources, workshops, and mentorship from industry experts.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <i className="fas fa-users text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Connect</h3>
                <p className="text-slate-600">
                  Network with like-minded students from universities across Ireland building on Solana.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <i className="fas fa-rocket text-purple-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Build</h3>
                <p className="text-slate-600">
                  Participate in hackathons, collaborate on projects, and launch your Web3 career.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge className="inline-flex items-center px-4 py-2 bg-white/10 text-white mb-6">
              <i className="fas fa-fire text-orange-400 mr-2"></i>
              Ready to Join the Movement?
            </Badge>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Complete Your Onboarding &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
                Start Building
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Join our Telegram community, follow @SuperteamIE, and unlock exclusive opportunities 
              in the Solana ecosystem. Your Web3 journey starts here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={() => window.open('https://t.me/superteamireland', '_blank')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl"
              data-testid="button-join-telegram"
            >
              <i className="fab fa-telegram text-2xl mr-3"></i>
              Join Telegram Community
            </Button>

            <Button 
              onClick={() => window.open('https://twitter.com/SuperteamIE', '_blank')}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl border border-slate-600"
              data-testid="button-follow-twitter"
            >
              <i className="fab fa-twitter text-2xl mr-3"></i>
              Follow @SuperteamIE
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-8 text-slate-400">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">547</p>
              <p className="text-sm">Members</p>
            </div>
            <div className="w-px h-8 bg-slate-600"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">89</p>
              <p className="text-sm">Projects</p>
            </div>
            <div className="w-px h-8 bg-slate-600"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">34</p>
              <p className="text-sm">Events</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}