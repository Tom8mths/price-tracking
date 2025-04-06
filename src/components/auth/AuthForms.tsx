import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthForms() {
  return (
    <Card className="w-96 mx-auto mt-20 p-4">
      <Tabs defaultValue="sign-in" className="space-y-4">
        <TabsList className="w-full mt-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="sign-in">
          <LoginForm />
        </TabsContent>

        <TabsContent value="sign-up">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
