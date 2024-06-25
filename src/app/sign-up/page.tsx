import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Your details in safe hand</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" className="mt-1" />
            </div>
            <Button>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
