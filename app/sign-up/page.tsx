import SignUpForm from '@/components/authComponents/sign-up-form'
import Link from 'next/link'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="w-full h-full m-auto flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl font-semibold">Sign Up</h1>
      <p className="text-sm text-gray-500">Create Account on BudgetPal</p>

          <SignUpForm/>
     
      <div className="w-full text-center">
        <p className="text-sm text-gray-500"> 
          Do you have an existing account?
              </p>
               <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
      </div>
    </div>
  )
}

export default SignUpPage