import TransactionsLister from '@/components/Customui/Transactions/Lister'
import { Button } from '@/components/ui/button'
import { getRecentTransactions } from '@/lib/helpers'
import { Upload } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

const TransactionsPage = async () => {

  // get all transactions
  const res = await getRecentTransactions()
  if (!res.success) {
    return null
  }
  const transactions = res.data

  if (!transactions || transactions.length === 0) {
    return <h1 className="text-muted-foreground">No recent transactions</h1>
  }


  return (
    <div className='w-full'>

      <h1 className='text-center text-xl font-semibold leading-4 tracking-wider mb-4'>
        All Transactions
      </h1>

      <div className='w-full mx-auto flex items-center justify-around align-middle gap-4 p-4'>

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

export default TransactionsPage
