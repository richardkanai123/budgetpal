import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { transactions } from '@/lib/dummyData'
import { fetchAllTransactions } from '@/lib/helpers'
import TransactionLink from './TransactionLink'

const RecentTransactions = async () => {
  const data = await fetchAllTransactions()
  console.log(data)


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