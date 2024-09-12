'use client'

import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoaderPinwheel } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})



const SignInForm = () => {


      const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // mode: "all",
    reValidateMode: "onSubmit",
    delayError: 300,
    shouldFocusError: true,
    shouldUnregister: true,
  })
  
  // submit function
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  
  // simulate 3 seconds delay
  await new Promise((resolve) => setTimeout(resolve, 3000))
  console.log(values) 
  // reset form
  form.reset()
}


  return (
    <Form {...form}>
      <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-lg">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
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
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
            {
              form.formState.isSubmitting ? <>
                <span className="animate-spin">
                  <LoaderPinwheel className="w-4 h-4" />
                  </span>
              </> : "Sign In"
            }
        </Button>
      </form>
      </Form>
  )
}

export default SignInForm