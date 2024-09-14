'use client'

import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
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
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/helpers'


const formSchema = z.object({
username: z.string().min(5, "Name must be at least 5 characters"),
  email: z.string().email("Must be a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    //confirmpassword must match password
    confirmpassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => {
  if (data.password !== data.confirmpassword) {
    return false
  }
  return data
}, {
  message: "Passwords do not match",
  path: ["confirmpassword"],
})


const SignUpForm = () => {

  // router
  const router = useRouter()

      const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onBlur",
    delayError: 300,
    shouldFocusError: true,
    shouldUnregister: true,
  })
  
  // submit function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    // make values formdata
    const FormValues = new FormData()
    FormValues.append('username', values.username)
    FormValues.append('email', values.email)
    FormValues.append('password', values.password)
    FormValues.append('confirmpassword', values.confirmpassword)


    // wait for 3 sec then call response
    await new Promise((resolve) => setTimeout(resolve, 2000))
 
    try {
      const res = await registerUser(FormValues)
      console.log(res)

      
      if(res.success && res.status === 201) {
        toast({
          title: "Success",
          description: "User registered successfully",
          variant: "default",
        })
        router.push('/sign-in')
      } else {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })
      }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    toast({
      title: "Error",
      description: `Something went wrong, Failed to register user: ${errorMessage}`,
      variant: "destructive",
    })
  }
}

  return (
    <Form {...form}>
      <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-lg bg-opacity-80 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg shadow-lg">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg'>Email</FormLabel>
              <FormControl>
                <Input  type='email' placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Username</FormLabel>
              <FormControl>
                <Input placeholder="Your preferred username" {...field} />
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
               <FormLabel className='text-lg'>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
              
        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
                  <FormLabel className='text-lg'>Confirm Password</FormLabel>
                    <FormDescription>
                      Confirm password by typing same password as above
                  </FormDescription>
              <FormControl>
                <Input type='password' placeholder="confirm password" {...field} />
                  </FormControl>
                
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full p-1">
          {
            form.formState.isSubmitting ? (
              <Button className='self-center mx-auto' size="lg" type="submit" disabled={form.formState.isSubmitting}>
                <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                Creating Account
              </Button>
            ) : (
              <Button className='self-center mx-auto' size="lg" type="submit" disabled={form.formState.isSubmitting}>
                Create Account
              </Button>
            )
          }
              </div>
          </form>
      </Form>
  )
}

export default SignUpForm