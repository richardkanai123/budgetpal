import { auth } from '@/Auth'
import BalanceCard from '@/components/Customui/HeroCard'
import MainMenu from '@/components/Customui/MainMenu'
import RecentTransactions from '@/components/Customui/Transactions/RecentTransactions'
import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

const MainPage = async () => {
  const session = await auth()

  if (!session) {
    return (
      <div className='mx-auto min-h-screen flex flex-col px-4 transition-all ease-linear '>
        <div className='flex flex-col gap-8'>
          <h1 className='text-2xl font-semibold text-lime-600'>
            Welcome to BudgetPal!
          </h1>
          <p className='text-lg text-gray-600'>
            Please sign in to continue.
          </p>
          <Link
            href='/sign-in'
            className='flex items-center content-center rounded-md text-lime-700 hover:text-lime-500 text-right transition-all duration-2000 font-semibold ease-linear animate-pulse delay-3000  hover:animate-none hover:bg-lime-500 hover:bg-opacity-10 hover:px-3 '>
            <ArrowBigRight className='mr-2' />
            Sign in Now
          </Link>
        </div>
      </div>
    )

  } else

    return (
      <div className='mx-auto min-h-screen flex flex-col px-4 transition-all ease-linear '>
        <BalanceCard />

        <MainMenu />
        <div className='border-t shadow-sm mt-4'>
          <div className='flex items-center justify-between mb-3 p-4'>
            <h1 className='text-xl text-lime-600 font-semibold'>
              Recent	Transactions
            </h1>
            <Link
              href='/transactions'
              className='flex items-center content-center rounded-md text-lime-700 hover:text-lime-500 text-right transition-all duration-2000 font-semibold ease-linear animate-pulse delay-3000  hover:animate-none hover:bg-lime-500 hover:bg-opacity-10 hover:px-3 '>
              See all
              <ArrowBigRight className='w-4 h-4 ml-1' />
            </Link>
          </div>
          <Suspense fallback={<div>Loading...</div>} >
            <RecentTransactions />
          </Suspense>

        </div>
      </div>
    )
}

export default MainPage