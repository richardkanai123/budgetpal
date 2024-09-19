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
// import { useRouter } from 'next/navigation'
import { signInWithCredentials } from '@/lib/helpers'
import Link from 'next/link'

const formSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})



const SignInForm = () => {


  // const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    // reValidateMode: "onBlur",
    delayError: 300,
    shouldFocusError: true,
    shouldUnregister: true,
  })

  // submit function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('password', values.password)

      const responseData = await signInWithCredentials(formData)
      if (!responseData) {
        return;
      }
      if (responseData?.success) {
        console.log('success')
        window.location.replace('/')
      } else {
        form.setError('root', {
          message: responseData.error,
        });
      }

    } catch (error) {
      if (error instanceof Error) {
        form.setError('root', {
          message: error.message,
        });
      } else {
        form.setError('root', {
          message: 'An unknown error occurred',
        });
      }
    }

  }


  return (
    <Form {...form}>
      <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-lg bg-opacity-80 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg shadow-lg">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg'>Email</FormLabel>
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
              <FormLabel className='text-lg'>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && <p className='text-red-400 text-sm my-2'>{form.formState.errors.root.message}</p>}



        <Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
          {
            form.formState.isSubmitting ? <>
              <span className="animate-spin">
                <LoaderPinwheel className="w-4 h-4" />
              </span>
            </> : "Sign In"
          }
        </Button>

        {/* forgot password */}
        <div className="w-full my-4">
          <Link href="/reset-password" className="text-right underline hover:text-blue-400 text-blue-500 hover:underline">Forgot password?</Link>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm