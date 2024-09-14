import { auth } from '@/Auth'
import ServerAuthButton from '@/components/authComponents/ServerAuthButton'
import React from 'react'

const ProfilePage = async () => {
  const session = await auth()

  console.log(session)

  if (!session) {
    return <div className='mx-auto flex flex-col items-center align-middle gap-2'>
      <p>You are currently not logged in</p>
      <ServerAuthButton />
    </div>
  }

  return (

    <div>
      <p>Profile: {session?.user?.name}</p>
      <ServerAuthButton />
    </div>
  )
}

export default ProfilePage