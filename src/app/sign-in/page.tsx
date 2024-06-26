"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { siginSchema } from "@/schema/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Signin } from "./action";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignIn = () => {
  const { toast } = useToast();
  const [passwordType, setPasswordType] = useState<boolean>(false);

  const signForm = useForm<z.infer<typeof siginSchema>>({
    resolver: zodResolver(siginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: handleSignUp, isPending } = useMutation({
    mutationKey: ["sign-in-key"],
    mutationFn: Signin,
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });
  const onSubmit = (data: z.infer<typeof siginSchema>) => {
    handleSignUp({ data });
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Your details in safe hand</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signForm}>
            <form
              onSubmit={signForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={signForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="jhondoe" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="********"
                          type={passwordType ? "text" : "password"}
                          {...field}
                        />
                        <Eye
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setPasswordType(!passwordType)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button isLoading={isPending} loadingText="Submitting...">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
