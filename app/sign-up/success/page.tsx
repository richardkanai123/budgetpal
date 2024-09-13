import Link from 'next/link'
import React from 'react'

const SuccessSignUpPage = () => {
  return (
      <div className='w-full h-screen mx-auto flex flex-col justify-center items-center align-middle gap-6 text-pretty'>
          <h1 className='text-xl font-bold text-lime-400'>Successfully Created Account</h1>
          <p className='text-sm text-gray-500'>You can now sign in to your account</p>
          <Link href="/sign-in" className='text-blue-500 underline hover:underline-offset-auto'>Sign In Now</Link>
    </div>
  )
}

export default SuccessSignUpPage