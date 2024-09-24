import { auth } from '@/Auth'
import TransactionLink from '@/components/Customui/Transactions/TransactionLink'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FetchAllTransactionsByType } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import React, { Suspense } from 'react'

const DynamicTypesPage = async ({ params }: { params: { type: string } }) => {

    const session = await auth()
    if (!session) {
        return <div>Not authenticated</div>
    }

    const res = await FetchAllTransactionsByType(params.type)
    if (!res.success) {
        return <div>
            <h1>Error fetching transactions</h1>
            <p>{res.message}</p>
        </div>
    }


    const transactions = res.data
    if (!transactions || transactions.length === 0) {
        return <div>No transactions found for type:{params.type}</div>
    }

    if (transactions && transactions.length > 0) {
        return (
            <div>
                <h1 className='my-4 '>Transactions for type: {params.type}s</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <ScrollArea
                        className={cn("mx-auto w-full flex flex-col gap-6 px-2 ")}>
                        {
                            transactions.map((transaction) =>
                                <TransactionLink key={transaction.id} transaction={transaction} />
                            )

                        }
                    </ScrollArea>
                </Suspense>
            </div>
        )
    }
}

export default DynamicTypesPage