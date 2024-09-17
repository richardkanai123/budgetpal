'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { signIn, signOut } from '@/lib/helpers'
import { useRouter } from 'next/navigation'

const ClientAuthButton = () => {
    const { data: session } = useSession()
    const router = useRouter()

    if (session == null) {
        return (
            <Button onClick={async () => await signIn()}>Sign In</Button>
        )
    }

    return (
        <Button variant='destructive' onClick={async () => await signOut().then(() => router.replace('/sign-in'))}>Sign out {session.user?.name}</Button>
    )
}

export default ClientAuthButton