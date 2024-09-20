import { auth } from '@/Auth'
import { fetchTransactionsByCategory } from '@/lib/helpers'
import React from 'react'
import TransactionLink from './TransactionLink'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function RelatedTransationsLister({ category, currentTransactionId }: { category: string, currentTransactionId: string }) {
    const session = await auth()

    if (!session) {
        return (
            <div className="text-center">
                <h1 className="text-2xl text-yellow-300">Unauthorized</h1>
                <p className="text-secondary"> You must be logged in to view.</p>
            </div>
        )
    }

    const res = await fetchTransactionsByCategory(category)
    if (!res.success) {
        return (
            <div className="text-center">
                <h1 className="text-2xl text-yellow-300">Error</h1>
                <p className="text-secondary"> {res.message}</p>
            </div>
        )
    }

    const transactions = res.data

    // if no transactions found
    if (transactions === null || (res.success && (!transactions || transactions.length === 0))) {
        return (
            <div className="text-center">
                <p className=""> No recent related transctions found</p>
            </div>
        )
    }

    // remove the current transaction from the list
    const RecentRelatedTransacion = transactions.filter((transaction) => transaction.id !== currentTransactionId)

    return (
        <ScrollArea dir='ltr' className="h-fit max-h-[300px] w-full rounded-md border p-4">
            {
                RecentRelatedTransacion.map((transaction) => (
                    <TransactionLink key={transaction.id} transaction={transaction} />
                ))
            }
        </ScrollArea>
    )
}
