"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserDetails, logout } from "./actions";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data, error } = useQuery({
    queryKey: ["get-user-detail"],
    queryFn: async () => await getUserDetails(),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["logout-key"],
    mutationFn: logout,
  });
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Profile</CardTitle>
          <CardDescription>
            You can update your profile and password.
          </CardDescription>
          <Button
            variant={"destructive"}
            onClick={() => mutate()}
            isLoading={isPending}
            loadingText="Logging out..."
          >
            Log out
          </Button>
          <div className="h-px w-full bg-secondary" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-lg">Full name</Label>
            <p className="text-muted-foreground">{data?.fullName}</p>
          </div>
          <div>
            <Label className="text-lg">Username</Label>
            <p className="text-muted-foreground">{data?.username}</p>
          </div>
          <div>
            <Label className="text-lg">Email</Label>
            <p className="text-muted-foreground">{data?.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
