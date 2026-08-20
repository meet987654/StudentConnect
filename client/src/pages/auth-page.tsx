import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { useToast } from "../hooks/use-toast";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthValues = z.infer<typeof authSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { login, register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/");
    return null;
  }

  const loginForm = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const onLogin = (data: AuthValues) => {
    setIsLoading(true);
    login(data, {
      onError: (error: Error) => {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
      },
    });
  };

  const onRegister = (data: AuthValues) => {
    setIsLoading(true);
    register(data, {
      onError: (error: Error) => {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-solana-purple/20 via-superteam-blue/10 to-solana-green/20 pointer-events-none" />
      
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center z-10">
        <div className="hidden md:block text-slate-800">
          <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium mb-6 shadow-sm border border-slate-200">
            <i className="fas fa-rocket text-solana-purple mr-2"></i>
            Superteam Ireland
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Launch your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-superteam-blue">
              Web3 Career
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-md">
            Join the fastest growing community of student builders in Ireland. Learn, connect, and build on Solana.
          </p>
        </div>

        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
            <CardDescription>Sign in or create an account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="student@university.ie" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-solana-purple hover:bg-purple-700" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="student@university.ie" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a strong password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-solana-purple hover:bg-purple-700" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
