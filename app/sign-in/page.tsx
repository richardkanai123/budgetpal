'use client'
import SignInForm from "@/components/authComponents/Sign-in-form"
import Link from "next/link"


  

const SignInPage = () => {

  return (
    <div className="w-full h-full m-auto flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl font-semibold">Sign In</h1>
      <p className="text-sm text-gray-500">Sign in to your account</p>
      <SignInForm/>
     
      <div className="w-full text-center">
        <p className="text-sm text-gray-500"> 
          Don&apos;t have an account?
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
          </p>
      </div>
    </div>
  )
}
export default SignInPage