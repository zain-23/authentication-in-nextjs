import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const VerifyUser = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="font-normal text-2xl">Enter your account email.</CardTitle>
          <CardDescription>
            We sent forgot password url in this email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="jhondoe@xyz.com" />
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyUser;
