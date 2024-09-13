import TransactionsLister from '@/components/Customui/Transactions/Lister'
import prisma from '@/lib/prisma'
import React, { Suspense } from 'react'

const TransactionsPage = async () => {
  // get all transactions
  const transactions = await prisma.transaction.findMany({
    // sort by date
    orderBy: {
      createdAt: 'desc'
    }
})

  return (
    <div className='w-full'>
			<h1 className='text-center text-xl font-semibold leading-4 tracking-wider mb-4'>
				All Transactions
			</h1>

			<Suspense fallback={<div>Loading...</div>}>
				<TransactionsLister data={transactions} />
			</Suspense>
		</div>
  )
}

export default TransactionsPage
