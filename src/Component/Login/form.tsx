"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { account } from "@/appwrite/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "./schema";
import {useRouter} from "next/navigation";
import useAuth from "@/context/useAuth";



const LoginForm = () => {
    const {setAuthStatus} = useAuth()
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });
    
      async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
        await account.createEmailPasswordSession(
            values.email,
            values.password,
        );
        setAuthStatus(true);
        router.push("/Home");

        } catch (err) {
          console.error(err);
        }
      }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3 lg:space-y-8 mx-auto w-full max-w-md text-white">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email" className="text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Password" type="password" className="text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </Form>
    )
}

export default LoginForm;