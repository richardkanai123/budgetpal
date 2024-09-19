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
import { resetPassword } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
    email: z.string().email("Must be a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
})
const ResetPasswordPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "all",
        delayError: 300,
        shouldFocusError: true,
        shouldUnregister: true,
    })

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)

        try {
            const res = await resetPassword(values)

            if (!res.success) {
                form.setError('root', {
                    message: res.message,
                });
            } else {

                toast({
                    title: 'Password reset successful',
                    description: 'Now you can log in.',
                })

                router.push('/sign-in')

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
            <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-lg bg-opacity-80 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg shadow-lg mx-auto">
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

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg'>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="Confirm password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Confirm your password and make sure to it secure.
                            </FormDescription>
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
                            </span>  Updating
                        </> : "Reset Password"
                    }
                </Button>

            </form>
        </Form>
    )
}

export default ResetPasswordPage