import React from 'react'
import { SessionProvider } from 'next-auth/react'
import ClientAuthButton from './ClientAuthButton'

import { auth } from '@/Auth'
const ServerAuthButton = async () => {
    const session = await auth()

    if (session && session.user) {
        session.user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email
        }
    }
  return (
   
      <SessionProvider session={session}>
          <ClientAuthButton/>
      </SessionProvider>
  )
}

export default ServerAuthButton