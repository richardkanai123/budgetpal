import NewTransaction from '@/components/Customui/Transactions/Add-New-Transaction'

const NewTransactionPage = () => {
  return (
    <div className='mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Add New Transaction</h1>

      <NewTransaction />
    </div>
  )
}

export default NewTransactionPage