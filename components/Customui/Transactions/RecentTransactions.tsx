import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
// import { transactions } from '@/lib/dummyData'
// import { fetchAllTransactions } from '@/lib/helpers'
import TransactionLink from './TransactionLink'
// import prisma from '@/lib/prisma'
// import { auth } from '@/Auth'
import { getRecentTransactions } from '@/lib/helpers'

const RecentTransactions = async () => {

  const res = await getRecentTransactions()
  const transactions = res.data

  if (!res.success) {
    return <p>{res.message}</p>
  }

  if (!transactions || transactions.length === 0) {
    return <p className="text-base ">No recent transactions</p>
  }

  return (
    <ScrollArea
      className="mx-auto w-full flex flex-col gap-6 px-2 max-h-[400px]">
      {
        transactions.map((item) => (
          <TransactionLink transaction={item} key={item.id} />
        ))}

    </ScrollArea>
  )
}

export default RecentTransactions