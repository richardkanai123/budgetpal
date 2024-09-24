import TransactionsLister from '@/components/Customui/Transactions/Lister'
import { Button } from '@/components/ui/button'
import { fetchAllTransactions } from '@/lib/helpers'
import { Transaction } from '@prisma/client'
import { Upload } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

const TransactionsPage = async () => {

  // get all transactions
  const res = await fetchAllTransactions()
  if (!res.success) {
    return <div> Error fetching transactions</div>
  }

  if ((res.success && res.data === null) || res.data?.length === 0) {
    return <h1 className="text-muted-foreground">No recent transactions</h1>
  }

  if (res.success && res.data) {
    const transactions = res.data as Transaction[]


    return (
      <div className='w-full px-2  relative'>

        <div className='w-full mx-auto flex flex-col md:flex-row items-center justify-around align-middle  gap-4 p-2 border-b mb-4'>

          <h1 className='text-center text-xl font-semibold leading-4 tracking-wider mb-4'>
            All Transactions
          </h1>

          <Button variant="default">
            <Link href='/new-transaction' className='flex gap-2 align-middle'>
              <Upload className='w-4 h-4' />
              Add New Transaction
            </Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TransactionsLister data={transactions} />
        </Suspense>
      </div>
    )
  }
}

export default TransactionsPage
