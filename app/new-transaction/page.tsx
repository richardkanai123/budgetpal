import { auth } from '@/Auth'
import NewTransaction from '@/components/Customui/Transactions/Add-New-Transaction'
import { redirect } from 'next/navigation'

const NewTransactionPage = async () => {
  const session = await auth()
  if (!session) {
    redirect('/sign-in')
  }
  return (
    <div className='mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Add New Transaction</h1>

      <NewTransaction />
    </div>
  )
}

export default NewTransactionPage