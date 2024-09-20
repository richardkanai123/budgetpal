import { auth } from '@/Auth'
import TransactionsLister from '@/components/Customui/Transactions/Lister'
import { FetchAllTransactionsByType } from '@/lib/helpers'
import React from 'react'

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
                <h1>Transactions for type: {params.type}</h1>
                <TransactionsLister data={transactions} />
            </div>
        )
    }
}

export default DynamicTypesPage