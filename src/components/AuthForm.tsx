import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ email }));
    window.location.href = "/dashboard";
  };

  return (
    <Card className="w-96 mx-auto mt-20 p-4">
      <Tabs defaultValue="sign-in" className="space-y-4">
        <TabsContent value="sign-in">
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to see the dashboard</CardDescription>
          <TabsList className="w-full mt-2">
            <TabsTrigger value="sign-in" className="gap-2">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="sign-up" className="gap-2">
              Sign Up
            </TabsTrigger>
        </TabsList>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </div>
              <Button className="mt-4 w-full" type="submit">
                Entrar
              </Button>
          </form>
        </TabsContent>
        <TabsContent value="sign-up">
          <form onSubmit={(e) => e.preventDefault()}>
            <CardTitle>Register</CardTitle>
            <CardDescription>Register to see the dashboard</CardDescription>
            <TabsList className="w-full mt-2">
              <TabsTrigger value="sign-in" className="gap-2">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="sign-up" className="gap-2">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>
            <Button className="mt-4 w-full" type="submit">
              Register
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
