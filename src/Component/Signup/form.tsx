"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/Component/Signup/schema";
import { account } from "@/appwrite/config";
import { ID } from "appwrite";
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
import { redirect } from "next/navigation";



const SignUpForm = () => {


    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });
    
      function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
          account.create(
            ID.unique(),
            values.email,
            values.password,
            values.firstName + " " + values.lastName
          ).then(() => redirect("/Login"));
        } catch (err) {
          console.error(err);
        }
      }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3 lg:space-y-8 mx-auto w-full max-w-md text-white">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter First Name" {...field} className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter First Name" className="text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password" type="password" className="text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </Form>
    )
}

export default SignUpForm;