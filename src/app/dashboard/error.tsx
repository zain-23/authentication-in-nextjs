"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card>
        <CardHeader className="space-y-3">
          <CardTitle className="text-center font-light text-3xl text-red-500">
            Something went wrong.
          </CardTitle>
          <CardDescription>{error.message}</CardDescription>
          <Button onClick={() => reset()}>Try again</Button>
        </CardHeader>
      </Card>
    </div>
  );
}
