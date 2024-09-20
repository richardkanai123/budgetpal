import { auth } from '@/Auth'
import RelatedTransationsLister from '@/components/Customui/Transactions/RelatedTransationsLister'
import { Button } from '@/components/ui/button'
import { fetchTransactionById } from '@/lib/helpers'
import Link from 'next/link'
import React, { Suspense } from 'react'

const TransactionDetailsPage = async ({ params }: { params: { id: string } }) => {

  const session = await auth()

  if (!session) {
    return (
      <div className='flex flex-col items-center justify-center h-screen text-center'>
        <h1 className='text-2xl text-yellow-300'>Unauthorized</h1>
        <p className='text-secondary'> You must be logged in to view this page.</p>
        <Button asChild>
          <Link href="/signin">Sign In Now</Link>
        </Button>
      </div>
    )
  }

  const response = await fetchTransactionById(params.id)

  if (!response.success) {
    return (
      <div className='flex flex-col items-center justify-center h-screen text-center'>
        <h1 className='text-2xl text-yellow-300'>Error</h1>
        <p className='text-secondary'> {response.message}</p>
        <Button asChild>
          <Link href="/transactions">Go Back</Link>
        </Button>
      </div>
    )
  }
  const transaction = response.data
  if (transaction === null) {
    return (
      <div className='flex flex-col items-center justify-center h-screen text-center'>
        <h1 className='text-2xl text-yellow-300'>Error</h1>
        <p className='text-secondary'> {response.message}</p>
        <Button asChild>
          <Link href="/transactions">Go Back</Link>
        </Button>
      </div>
    )
  }

  const { id, amount, category, description, transactiondate, type } = transaction

  return (
    <>
      <div className='w-full p-4 flex flex-col bg-opacity-85 gap-4  '>
        <h1 className='text-xl text-primary font-bold underline'>
          Transaction Details
        </h1>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Amount: {amount}</p>
          <p className="text-base">Type: {type}</p>
          <p className="text-base">Category: {category}</p>
          <p className="text-base">Description: {description}</p>
          <p className="text-base">Date: {transactiondate.toLocaleDateString()}</p>
        </div>
        <Button className='max-w-xs mt-6' size="sm" asChild>
          <Link href="/transactions">Other Transactions</Link>
        </Button>

        {/* related transactions */}
        <div className="flex flex-col gap-1">
          <h1 className='text-xl text-primary font-light underline'>
            Related Transactions
          </h1>
          <div className="flex flex-col gap-1">
            <Suspense fallback={<div>Loading...</div>}>
              <RelatedTransationsLister category={category} currentTransactionId={id} />
            </Suspense>
          </div>

        </div>
      </div>
    </>

  )
}

export default TransactionDetailsPage