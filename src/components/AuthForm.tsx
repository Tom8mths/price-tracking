import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ email }));
    window.location.href = "/dashboard";
  };

  return (
    <Card className="w-96 mx-auto mt-20 p-4">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to see the dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Label className="mb-2">Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <Label className="mt-2 mb-2">Senha</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button className="mt-4 w-full" onClick={handleLogin}>Entrar</Button>
      </CardContent>
    </Card>
  );
}
