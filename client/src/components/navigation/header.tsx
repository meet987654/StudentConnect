import { Link, useLocation } from "wouter";

import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "../shared/schema";
export default function Header() {
  const { user } = useAuth();
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", current: location === "/" },
    { name: "Events", href: "/events", current: location === "/events" },
    { name: "Community", href: "/community", current: location === "/community" },
    { name: "Resources", href: "/resources", current: location === "/resources" },
  ];

  return (
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
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  item.current
                    ? "text-solana-purple"
                    : "text-slate-600 hover:text-solana-purple"
                } transition-colors font-medium`}
                data-testid={`nav-link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Social Media Links */}
            <a 
              href="https://twitter.com/SuperteamIE" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-superteam-blue transition-colors"
              data-testid="link-twitter-header"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://t.me/superteamireland" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-superteam-blue transition-colors"
              data-testid="link-telegram-header"
            >
              <i className="fab fa-telegram text-lg"></i>
            </a>
            
            {/* Login Button for logged out users */}
            {!user && (
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-solana-purple hover:bg-solana-purple/90"
                data-testid="button-login"
              >
                Sign In
              </Button>
            )}

            {/* User Profile */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl || ''} alt="Profile" />
                      <AvatarFallback>
                        {user?.firstName ? user.firstName[0] : user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700 hidden sm:block">
                      {user?.firstName || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <i className="fas fa-user text-slate-400"></i>
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <i className="fas fa-cog text-slate-400"></i>
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center space-x-2 text-red-600 focus:text-red-600"
                    onClick={() => window.location.href = '/api/logout'}
                    data-testid="button-logout"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
