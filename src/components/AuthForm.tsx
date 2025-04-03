import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
        <h2 className="text-xl font-semibold">Login</h2>
      </CardHeader>
      <CardContent>
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <Label className="mt-2">Senha</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button className="mt-4 w-full" onClick={handleLogin}>Entrar</Button>
      </CardContent>
    </Card>
  );
}
