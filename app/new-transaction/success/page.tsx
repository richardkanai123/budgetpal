import { Button } from '@/components/ui/button'
import { HomeIcon, Upload } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TransactionSucesssPage() {
    return (
        <div className='w-full h-screen mx-auto text-center  flex flex-col items-center align-middle  justify-center '>
            <h1 className="text-lime-500 text-3xl font-bold">Success!</h1>
            <p className='text-lg text-muted-foreground'>New Transaction Added</p>

            <div className="w-full mx-auto flex items-center justify-center align-middle gap-4 p-4">
                <Button variant="default">
                    <Link href='/new-transaction' className='flex gap-2 items-center align-middle'>
                        <Upload className='w-4 h-4' />
                        Add Another</Link>
                </Button>

                <Button variant="secondary" className='hover:bg-primary'>
                    <Link href='/' className='flex gap-2 items-center align-middle'>
                        <HomeIcon className='w-4 h-4' />
                        Go Home</Link>
                </Button>
            </div>

        </div>
    )
}
